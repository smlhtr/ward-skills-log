(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const k="2026-10-02",m="2 Oct 2026",L=3,B=["Bedside basics & monitoring","Bloods & vascular access","Injections & IV","Airway & respiratory","Catheters, drains & wounds","Exams & assessments","Ortho / procedural","Other procedure skills (no target)"],f=[{id:"cbg",section:"Bedside basics & monitoring",name:"Capillary blood glucose",target:4,achieved:0},{id:"bp",section:"Bedside basics & monitoring",name:"Blood pressure (BP) (include postural BP)",target:1,achieved:0},{id:"ecg",section:"Bedside basics & monitoring",name:"Electrocardiogram (ECG)",target:4,achieved:2},{id:"doppler",section:"Bedside basics & monitoring",name:"Bedside arterial doppler",target:1,achieved:0},{id:"venepuncture",section:"Bloods & vascular access",name:"Venepuncture",target:4,achieved:1},{id:"blood-culture",section:"Bloods & vascular access",name:"Aseptic blood culture",target:2,achieved:1},{id:"abg",section:"Bloods & vascular access",name:"Arterial puncture for arterial blood gas",target:2,achieved:1},{id:"iv-cannulation",section:"Bloods & vascular access",name:"Intravenous (IV) cannulation",target:4,achieved:1},{id:"iv-drip",section:"Injections & IV",name:"Setup of IV drip",target:3,achieved:0},{id:"im",section:"Injections & IV",name:"Intramuscular (IM) injection",target:2,achieved:1},{id:"sc",section:"Injections & IV",name:"Subcutaneous (SC) injection / Calculation of dosage, administration of SC insulin",target:4,achieved:2},{id:"oxygen",section:"Airway & respiratory",name:"Initiation of supplemental oxygen (via nasal prong and/or facemask)",target:4,achieved:0},{id:"nebuliser",section:"Airway & respiratory",name:"Administration of nebulised treatment / Administration of inhaler treatment via MDI with spacer",target:1,achieved:0},{id:"airway",section:"Airway & respiratory",name:"Airway Assessment",target:1,achieved:0},{id:"bvm-assembly",section:"Airway & respiratory",name:"Assembly of Bag Valve Mask",target:1,achieved:0},{id:"bvm-vent",section:"Airway & respiratory",name:"Ventilation Using Bag And Mask",target:1,achieved:0},{id:"catheter-f",section:"Catheters, drains & wounds",name:"Urinary catheter insertion — female",target:2,achieved:1},{id:"catheter-m",section:"Catheters, drains & wounds",name:"Urinary catheter insertion — male",target:2,achieved:1},{id:"drains",section:"Catheters, drains & wounds",name:"Removal of surgical drains",target:1,achieved:0},{id:"wound",section:"Catheters, drains & wounds",name:"Wound care and dressing",target:4,achieved:1},{id:"catheter-removal",section:"Catheters, drains & wounds",name:"Removal of Urinary Catheter",target:2,achieved:2},{id:"amt",section:"Exams & assessments",name:"Abbreviated Mental Test (Singapore)",target:1,achieved:0},{id:"adl",section:"Exams & assessments",name:"Functional assessment (ADLs/IADLs)",target:1,achieved:0},{id:"fundoscopy",section:"Exams & assessments",name:"Fundoscopic Examination",target:1,achieved:0},{id:"otoscopy",section:"Exams & assessments",name:"Otoscopic Examination",target:1,achieved:0},{id:"backslab",section:"Ortho / procedural",name:"Application of backslab",target:1,achieved:0},{id:"suturing",section:"Ortho / procedural",name:"Basic suturing",target:1,achieved:0}],A=[{id:"other-consciousness",section:"Other procedure skills (no target)",name:"Monitoring of consciousness level"},{id:"other-sats",section:"Other procedure skills (no target)",name:"Oxygen saturation"},{id:"other-skin-swab",section:"Other procedure skills (no target)",name:"Skin swab for pyogenic culture"},{id:"other-urine",section:"Other procedure skills (no target)",name:"Urine specimen catch (bag & mid-stream urine)"},{id:"other-mdi",section:"Other procedure skills (no target)",name:"Administration of inhaler treatment via MDI without spacer"},{id:"other-gcs",section:"Other procedure skills (no target)",name:"Glasgow coma scale (GCS) scoring and pupillary reflexes"},{id:"other-apgar",section:"Other procedure skills (no target)",name:"Measuring of vital signs and APGAR score"},{id:"other-swab",section:"Other procedure skills (no target)",name:"Oropharyngeal (OP) and/or Middle Turbinate (MT) swab"},{id:"other-ppe",section:"Other procedure skills (no target)",name:"Personal Protective Equipment (gown, glove, mask)"}];function T(){const e={};for(const t of f)e[t.id]=Array.from({length:t.target},(s,o)=>({done:o<t.achieved,date:o<t.achieved?k:"",supervisor:o<t.achieved?`Logged (as of ${m})`:""}));for(const t of A)e[t.id]=[{done:!1,date:"",supervisor:""}];return e}const v=f.reduce((e,t)=>e+t.target,0),E=f.reduce((e,t)=>e+t.achieved,0),x=v-E,w="ward-skills-log-v1",C=[...f,...A.map(e=>({...e,target:0,achieved:0,other:!0}))];function u(){return{theme:"dark",attempts:T()}}function N(){try{const e=localStorage.getItem(w);if(!e)return u();const t=JSON.parse(e);if(!t||typeof t!="object"||!t.attempts)return u();const s=u();return{theme:t.theme==="light"?"light":"dark",attempts:{...s.attempts,...t.attempts}}}catch{return u()}}function h(e){localStorage.setItem(w,JSON.stringify(e))}function j(e,t){const s=e.attempts[t.id]||[];return t.other?s.filter(o=>o.done).length:s.filter(o=>o.done).length}function M(e){let t=0;for(const s of f){const o=e.attempts[s.id]||[];t+=o.filter(n=>n.done).length}return{done:t,total:v,left:v-t}}let r=N(),g="all",p="",y=null;function O(e){r.theme=e,document.documentElement.dataset.theme=e;const t=document.querySelector('meta[name="theme-color"]');t&&t.setAttribute("content",e==="dark"?"#0F1419":"#F4F1EB"),h(r)}function R(e,t){const s=p.trim().toLowerCase();if(s&&!e.name.toLowerCase().includes(s)&&!e.section.toLowerCase().includes(s))return!1;const o=t.done,n=!e.other&&o>=e.target;return g==="outstanding"?!e.other&&!n:g==="met"?n:g==="other"?!!e.other:!0}function d(){const e=document.getElementById("app"),t=M(r),s=Math.round(t.done/t.total*100),o=C.filter(a=>R(a,{done:j(r,a)})),n=B.map(a=>({section:a,skills:o.filter(c=>c.section===a)})).filter(a=>a.skills.length);e.innerHTML=`
    <header class="topbar">
      <div>
        <h1>Ward Skills Log</h1>
        <div class="sub">Status snapshot ${m} · ${E} of ${v} logged, ${x} left</div>
      </div>
      <button class="icon-btn" id="theme-btn" aria-label="Toggle dark mode" title="Toggle dark mode">${r.theme==="dark"?"☀":"☽"}</button>
    </header>

    <section class="summary" aria-live="polite">
      <div class="summary-row">
        <strong>Your progress</strong>
        <span class="sub">${s}% of target attempts</span>
      </div>
      <div class="kpis">
        <div class="kpi"><b data-testid="done-count">${t.done}</b><span>Done</span></div>
        <div class="kpi"><b data-testid="total-count">${t.total}</b><span>Target</span></div>
        <div class="kpi"><b data-testid="left-count">${t.left}</b><span>Left</span></div>
      </div>
      <div class="bar" aria-hidden="true"><i style="width:${s}%"></i></div>
    </section>

    <input class="search" id="search" type="search" placeholder="Search skills…" value="${S(p)}" />

    <div class="filters" role="tablist">
      ${[["all","All"],["outstanding","Outstanding"],["met","Met"],["other","Other"]].map(([a,c])=>`
        <button class="chip" data-filter="${a}" aria-pressed="${g===a}">${c}</button>
      `).join("")}
    </div>

    ${n.map(a=>`
      <h2 class="section-title">${$(a.section)}</h2>
      ${a.section.includes("Other")?`<p class="note">These have no set target. Tick when you log one. <strong>Other: ${L} already completed</strong> (as of ${m}) — those 3 are not listed individually.</p>`:""}
      ${a.skills.map(c=>P(c)).join("")}
    `).join("")||'<p class="empty">No skills match that filter.</p>'}

    <div class="actions">
      <button class="btn primary" id="export-btn">Export JSON</button>
      <button class="btn" id="import-btn">Import JSON</button>
      <button class="btn danger" id="reset-btn">Reset to ${m} snapshot</button>
    </div>
    <input id="import-file" type="file" accept="application/json,.json" hidden />
  `,document.getElementById("theme-btn").onclick=()=>{O(r.theme==="dark"?"light":"dark"),d()},document.getElementById("search").addEventListener("input",a=>{p=a.target.value,d(),document.getElementById("search").focus(),document.getElementById("search").setSelectionRange(p.length,p.length)}),document.querySelectorAll("[data-filter]").forEach(a=>{a.onclick=()=>{g=a.dataset.filter,d()}}),document.querySelectorAll("[data-toggle]").forEach(a=>{a.onclick=()=>{y=y===a.dataset.toggle?null:a.dataset.toggle,d()}}),document.querySelectorAll("[data-check]").forEach(a=>{a.onchange=()=>{const[c,b]=a.dataset.check.split("::"),l=r.attempts[c][Number(b)];l.done=a.checked,l.done&&!l.date&&(l.date=I()),h(r),d()}}),document.querySelectorAll("[data-field]").forEach(a=>{a.addEventListener("change",()=>{const[c,b,l]=a.dataset.field.split("::");r.attempts[c][Number(b)][l]=a.value,h(r)})}),document.getElementById("export-btn").onclick=_,document.getElementById("import-btn").onclick=()=>document.getElementById("import-file").click(),document.getElementById("import-file").onchange=q,document.getElementById("reset-btn").onclick=()=>{if(confirm(`Reset all ticks, dates and supervisors to the ${m} snapshot?`)){const a=r.theme;r=u(),r.theme=a,h(r),d()}}}function P(e){const t=r.attempts[e.id]||[],s=t.filter(a=>a.done).length,o=!e.other&&s>=e.target,n=y===e.id,i=e.other?`${s} logged`:`${s} / ${e.target} done`;return`
    <article class="card">
      <button class="card-head" data-toggle="${e.id}" aria-expanded="${n}">
        <h3>${$(e.name)}</h3>
        <div class="meta">
          <span class="count">${i}</span>
          ${o?'<span class="badge">Met</span>':e.other?"":`<span class="badge left">${e.target-s} left</span>`}
        </div>
      </button>
      ${n?`<div class="card-body">${t.map((a,c)=>D(e,a,c)).join("")}</div>`:""}
    </article>
  `}function D(e,t,s){const o=s+1,n=e.other?"":` of ${e.target}`;return`
    <div class="attempt ${t.done?"done":""}">
      <label class="check">
        <input type="checkbox" data-check="${e.id}::${s}" ${t.done?"checked":""} />
        Attempt ${o}${n}
      </label>
      <div class="fields">
        <label class="field"><span>Date</span><input type="date" data-field="${e.id}::${s}::date" value="${S(t.date||"")}" /></label>
        <label class="field"><span>Supervisor</span><input type="text" data-field="${e.id}::${s}::supervisor" value="${S(t.supervisor||"")}" placeholder="Name" /></label>
      </div>
    </div>
  `}function _(){const e=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...r},null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`ward-skills-log-${I()}.json`,t.click(),URL.revokeObjectURL(t.href)}function q(e){var o;const t=(o=e.target.files)==null?void 0:o[0];if(e.target.value="",!t)return;const s=new FileReader;s.onload=()=>{try{const n=JSON.parse(s.result);if(!(n!=null&&n.attempts))throw new Error("Missing attempts");const i=u();i.theme=n.theme==="light"?"light":r.theme,i.attempts={...i.attempts,...n.attempts},r=i,h(r),O(r.theme),d()}catch(n){alert("Could not import that file. Use a JSON export from this app."),console.error(n)}},s.readAsText(t)}function I(){const e=new Date,t=e.getTimezoneOffset()*6e4;return new Date(e-t).toISOString().slice(0,10)}function $(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function S(e){return $(e)}O(r.theme);d();
