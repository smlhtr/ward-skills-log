export const SNAPSHOT_DATE = '2026-10-02'
export const SNAPSHOT_LABEL = '2 Oct 2026'
export const OTHER_COMPLETED = 3

export const SECTIONS = [
  'Bedside basics & monitoring',
  'Bloods & vascular access',
  'Injections & IV',
  'Airway & respiratory',
  'Catheters, drains & wounds',
  'Exams & assessments',
  'Ortho / procedural',
  'Other procedure skills (no target)',
]

export const TARGET_SKILLS = [
  { id: 'cbg', section: 'Bedside basics & monitoring', name: 'Capillary blood glucose', target: 4, achieved: 0 },
  { id: 'bp', section: 'Bedside basics & monitoring', name: 'Blood pressure (BP) (include postural BP)', target: 1, achieved: 0 },
  { id: 'ecg', section: 'Bedside basics & monitoring', name: 'Electrocardiogram (ECG)', target: 4, achieved: 2 },
  { id: 'doppler', section: 'Bedside basics & monitoring', name: 'Bedside arterial doppler', target: 1, achieved: 0 },
  { id: 'venepuncture', section: 'Bloods & vascular access', name: 'Venepuncture', target: 4, achieved: 1 },
  { id: 'blood-culture', section: 'Bloods & vascular access', name: 'Aseptic blood culture', target: 2, achieved: 1 },
  { id: 'abg', section: 'Bloods & vascular access', name: 'Arterial puncture for arterial blood gas', target: 2, achieved: 1 },
  { id: 'iv-cannulation', section: 'Bloods & vascular access', name: 'Intravenous (IV) cannulation', target: 4, achieved: 1 },
  { id: 'iv-drip', section: 'Injections & IV', name: 'Setup of IV drip', target: 3, achieved: 0 },
  { id: 'im', section: 'Injections & IV', name: 'Intramuscular (IM) injection', target: 2, achieved: 1 },
  { id: 'sc', section: 'Injections & IV', name: 'Subcutaneous (SC) injection / Calculation of dosage, administration of SC insulin', target: 4, achieved: 2 },
  { id: 'oxygen', section: 'Airway & respiratory', name: 'Initiation of supplemental oxygen (via nasal prong and/or facemask)', target: 4, achieved: 0 },
  { id: 'nebuliser', section: 'Airway & respiratory', name: 'Administration of nebulised treatment / Administration of inhaler treatment via MDI with spacer', target: 1, achieved: 0 },
  { id: 'airway', section: 'Airway & respiratory', name: 'Airway Assessment', target: 1, achieved: 0 },
  { id: 'bvm-assembly', section: 'Airway & respiratory', name: 'Assembly of Bag Valve Mask', target: 1, achieved: 0 },
  { id: 'bvm-vent', section: 'Airway & respiratory', name: 'Ventilation Using Bag And Mask', target: 1, achieved: 0 },
  { id: 'catheter-f', section: 'Catheters, drains & wounds', name: 'Urinary catheter insertion — female', target: 2, achieved: 1 },
  { id: 'catheter-m', section: 'Catheters, drains & wounds', name: 'Urinary catheter insertion — male', target: 2, achieved: 1 },
  { id: 'drains', section: 'Catheters, drains & wounds', name: 'Removal of surgical drains', target: 1, achieved: 0 },
  { id: 'wound', section: 'Catheters, drains & wounds', name: 'Wound care and dressing', target: 4, achieved: 1 },
  { id: 'catheter-removal', section: 'Catheters, drains & wounds', name: 'Removal of Urinary Catheter', target: 2, achieved: 2 },
  { id: 'amt', section: 'Exams & assessments', name: 'Abbreviated Mental Test (Singapore)', target: 1, achieved: 0 },
  { id: 'adl', section: 'Exams & assessments', name: 'Functional assessment (ADLs/IADLs)', target: 1, achieved: 0 },
  { id: 'fundoscopy', section: 'Exams & assessments', name: 'Fundoscopic Examination', target: 1, achieved: 0 },
  { id: 'otoscopy', section: 'Exams & assessments', name: 'Otoscopic Examination', target: 1, achieved: 0 },
  { id: 'backslab', section: 'Ortho / procedural', name: 'Application of backslab', target: 1, achieved: 0 },
  { id: 'suturing', section: 'Ortho / procedural', name: 'Basic suturing', target: 1, achieved: 0 },
]

export const OTHER_SKILLS = [
  { id: 'other-consciousness', section: 'Other procedure skills (no target)', name: 'Monitoring of consciousness level' },
  { id: 'other-sats', section: 'Other procedure skills (no target)', name: 'Oxygen saturation' },
  { id: 'other-skin-swab', section: 'Other procedure skills (no target)', name: 'Skin swab for pyogenic culture' },
  { id: 'other-urine', section: 'Other procedure skills (no target)', name: 'Urine specimen catch (bag & mid-stream urine)' },
  { id: 'other-mdi', section: 'Other procedure skills (no target)', name: 'Administration of inhaler treatment via MDI without spacer' },
  { id: 'other-gcs', section: 'Other procedure skills (no target)', name: 'Glasgow coma scale (GCS) scoring and pupillary reflexes' },
  { id: 'other-apgar', section: 'Other procedure skills (no target)', name: 'Measuring of vital signs and APGAR score' },
  { id: 'other-swab', section: 'Other procedure skills (no target)', name: 'Oropharyngeal (OP) and/or Middle Turbinate (MT) swab' },
  { id: 'other-ppe', section: 'Other procedure skills (no target)', name: 'Personal Protective Equipment (gown, glove, mask)' },
]

export function snapshotAttempts() {
  const attempts = {}
  for (const skill of TARGET_SKILLS) {
    attempts[skill.id] = Array.from({ length: skill.target }, (_, i) => ({
      done: i < skill.achieved,
      date: i < skill.achieved ? SNAPSHOT_DATE : '',
      supervisor: i < skill.achieved ? `Logged (as of ${SNAPSHOT_LABEL})` : '',
    }))
  }
  for (const skill of OTHER_SKILLS) {
    attempts[skill.id] = [{ done: false, date: '', supervisor: '' }]
  }
  return attempts
}

export const TARGET_TOTAL = TARGET_SKILLS.reduce((n, s) => n + s.target, 0)
export const SNAPSHOT_DONE = TARGET_SKILLS.reduce((n, s) => n + s.achieved, 0)
export const SNAPSHOT_LEFT = TARGET_TOTAL - SNAPSHOT_DONE
