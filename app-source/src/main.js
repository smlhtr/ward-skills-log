import './styles.css'
import {
  TARGET_SKILLS,
  OTHER_SKILLS,
  SECTIONS,
  snapshotAttempts,
  TARGET_TOTAL,
  SNAPSHOT_DONE,
  SNAPSHOT_LEFT,
  SNAPSHOT_LABEL,
  OTHER_COMPLETED,
} from './data.js'

const STORAGE_KEY = 'ward-skills-log-v1'
const ALL_SKILLS = [...TARGET_SKILLS, ...OTHER_SKILLS.map((s) => ({ ...s, target: 0, achieved: 0, other: true }))]

function defaultState() {
  return { theme: 'dark', attempts: snapshotAttempts() }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object' || !data.attempts) return defaultState()
    const base = defaultState()
    return {
      theme: data.theme === 'light' ? 'light' : 'dark',
      attempts: { ...base.attempts, ...data.attempts },
    }
  } catch {
    return defaultState()
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function doneCount(state, skill) {
  const rows = state.attempts[skill.id] || []
  if (skill.other) return rows.filter((a) => a.done).length
  return rows.filter((a) => a.done).length
}

function targetStats(state) {
  let done = 0
  for (const skill of TARGET_SKILLS) {
    const rows = state.attempts[skill.id] || []
    done += rows.filter((a) => a.done).length
  }
  return { done, total: TARGET_TOTAL, left: TARGET_TOTAL - done }
}

let state = loadState()
let filter = 'all'
let query = ''
let openId = null

function setTheme(theme) {
  state.theme = theme
  document.documentElement.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F1419' : '#F4F1EB')
  saveState(state)
}

function skillVisible(skill, statsForSkill) {
  const q = query.trim().toLowerCase()
  if (q && !skill.name.toLowerCase().includes(q) && !skill.section.toLowerCase().includes(q)) return false
  const done = statsForSkill.done
  const met = !skill.other && done >= skill.target
  if (filter === 'outstanding') return !skill.other && !met
  if (filter === 'met') return met
  if (filter === 'other') return !!skill.other
  return true
}

function render() {
  const app = document.getElementById('app')
  const stats = targetStats(state)
  const pct = Math.round((stats.done / stats.total) * 100)

  const visible = ALL_SKILLS.filter((skill) => skillVisible(skill, { done: doneCount(state, skill) }))
  const bySection = SECTIONS.map((section) => ({
    section,
    skills: visible.filter((s) => s.section === section),
  })).filter((g) => g.skills.length)

  app.innerHTML = `
    <header class="topbar">
      <div>
        <h1>Ward Skills Log</h1>
        <div class="sub">Status snapshot ${SNAPSHOT_LABEL} · ${SNAPSHOT_DONE} of ${TARGET_TOTAL} logged, ${SNAPSHOT_LEFT} left</div>
      </div>
      <button class="icon-btn" id="theme-btn" aria-label="Toggle dark mode" title="Toggle dark mode">${state.theme === 'dark' ? '☀' : '☽'}</button>
    </header>

    <section class="summary" aria-live="polite">
      <div class="summary-row">
        <strong>Your progress</strong>
        <span class="sub">${pct}% of target attempts</span>
      </div>
      <div class="kpis">
        <div class="kpi"><b data-testid="done-count">${stats.done}</b><span>Done</span></div>
        <div class="kpi"><b data-testid="total-count">${stats.total}</b><span>Target</span></div>
        <div class="kpi"><b data-testid="left-count">${stats.left}</b><span>Left</span></div>
      </div>
      <div class="bar" aria-hidden="true"><i style="width:${pct}%"></i></div>
    </section>

    <input class="search" id="search" type="search" placeholder="Search skills…" value="${escapeAttr(query)}" />

    <div class="filters" role="tablist">
      ${[['all','All'],['outstanding','Outstanding'],['met','Met'],['other','Other']].map(([id, label]) => `
        <button class="chip" data-filter="${id}" aria-pressed="${filter === id}">${label}</button>
      `).join('')}
    </div>

    ${bySection.map((group) => `
      <h2 class="section-title">${escapeHtml(group.section)}</h2>
      ${group.section.includes('Other') ? `<p class="note">These have no set target. Tick when you log one. <strong>Other: ${OTHER_COMPLETED} already completed</strong> (as of ${SNAPSHOT_LABEL}) — those 3 are not listed individually.</p>` : ''}
      ${group.skills.map((skill) => renderSkill(skill)).join('')}
    `).join('') || `<p class="empty">No skills match that filter.</p>`}

    <div class="actions">
      <button class="btn primary" id="export-btn">Export JSON</button>
      <button class="btn" id="import-btn">Import JSON</button>
      <button class="btn danger" id="reset-btn">Reset to ${SNAPSHOT_LABEL} snapshot</button>
    </div>
    <input id="import-file" type="file" accept="application/json,.json" hidden />
  `

  document.getElementById('theme-btn').onclick = () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark')
    render()
  }
  const search = document.getElementById('search')
  search.addEventListener('input', (e) => { query = e.target.value; render(); document.getElementById('search').focus(); document.getElementById('search').setSelectionRange(query.length, query.length) })
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.onclick = () => { filter = btn.dataset.filter; render() }
  })
  document.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.onclick = () => { openId = openId === btn.dataset.toggle ? null : btn.dataset.toggle; render() }
  })
  document.querySelectorAll('[data-check]').forEach((box) => {
    box.onchange = () => {
      const [skillId, index] = box.dataset.check.split('::')
      const row = state.attempts[skillId][Number(index)]
      row.done = box.checked
      if (row.done && !row.date) row.date = today()
      saveState(state)
      render()
    }
  })
  document.querySelectorAll('[data-field]').forEach((input) => {
    input.addEventListener('change', () => {
      const [skillId, index, field] = input.dataset.field.split('::')
      state.attempts[skillId][Number(index)][field] = input.value
      saveState(state)
    })
  })
  document.getElementById('export-btn').onclick = exportJson
  document.getElementById('import-btn').onclick = () => document.getElementById('import-file').click()
  document.getElementById('import-file').onchange = importJson
  document.getElementById('reset-btn').onclick = () => {
    if (confirm(`Reset all ticks, dates and supervisors to the ${SNAPSHOT_LABEL} snapshot?`)) {
      const theme = state.theme
      state = defaultState()
      state.theme = theme
      saveState(state)
      render()
    }
  }
}

function renderSkill(skill) {
  const rows = state.attempts[skill.id] || []
  const done = rows.filter((a) => a.done).length
  const met = !skill.other && done >= skill.target
  const open = openId === skill.id
  const count = skill.other ? `${done} logged` : `${done} / ${skill.target} done`
  return `
    <article class="card">
      <button class="card-head" data-toggle="${skill.id}" aria-expanded="${open}">
        <h3>${escapeHtml(skill.name)}</h3>
        <div class="meta">
          <span class="count">${count}</span>
          ${met ? '<span class="badge">Met</span>' : (!skill.other ? `<span class="badge left">${skill.target - done} left</span>` : '')}
        </div>
      </button>
      ${open ? `<div class="card-body">${rows.map((row, i) => renderAttempt(skill, row, i)).join('')}</div>` : ''}
    </article>
  `
}

function renderAttempt(skill, row, i) {
  const n = i + 1
  const of = skill.other ? '' : ` of ${skill.target}`
  return `
    <div class="attempt ${row.done ? 'done' : ''}">
      <label class="check">
        <input type="checkbox" data-check="${skill.id}::${i}" ${row.done ? 'checked' : ''} />
        Attempt ${n}${of}
      </label>
      <div class="fields">
        <label class="field"><span>Date</span><input type="date" data-field="${skill.id}::${i}::date" value="${escapeAttr(row.date || '')}" /></label>
        <label class="field"><span>Supervisor</span><input type="text" data-field="${skill.id}::${i}::supervisor" value="${escapeAttr(row.supervisor || '')}" placeholder="Name" /></label>
      </div>
    </div>
  `
}

function exportJson() {
  const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), ...state }, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `ward-skills-log-${today()}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

function importJson(e) {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result)
      if (!data?.attempts) throw new Error('Missing attempts')
      const next = defaultState()
      next.theme = data.theme === 'light' ? 'light' : state.theme
      next.attempts = { ...next.attempts, ...data.attempts }
      state = next
      saveState(state)
      setTheme(state.theme)
      render()
    } catch (err) {
      alert('Could not import that file. Use a JSON export from this app.')
      console.error(err)
    }
  }
  reader.readAsText(file)
}

function today() {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d - tz).toISOString().slice(0, 10)
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
function escapeAttr(s) { return escapeHtml(s) }

setTheme(state.theme)
render()
