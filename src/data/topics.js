/*
 * MedPocket content.
 *
 * Educational reference material only, summarised from widely published
 * public guidance (WHO, American Heart Association, American Red Cross,
 * NHS, CDC, ADA, MedlinePlus). Reference ranges vary between laboratories
 * and populations. Review this content yourself before publishing and keep
 * the in-app disclaimer.
 *
 * Section types understood by TopicScreen:
 *   { type: 'alert',   body }                      red call-out box
 *   { type: 'text',    heading?, body }            paragraph
 *   { type: 'bullets', heading?, items: [] }       bullet list
 *   { type: 'steps',   heading?, items: [] }       numbered list
 *   { type: 'table',   heading?, columns: [a, b], rows: [[a, b], ...], note? }
 */

const CALL = 'Call your local emergency number (for example 911, 112, 999 or 1122).';

export const TOPICS = [
  // ───────────────────────────── FIRST AID ─────────────────────────────
  {
    id: 'cpr-adult',
    categoryId: 'first-aid',
    title: 'CPR (Adult)',
    summary: 'Hands-only chest compressions for an adult who is unresponsive and not breathing normally.',
    keywords: 'cardiac arrest resuscitation compressions heart not breathing unconscious',
    sections: [
      { type: 'alert', body: `${CALL} Ask someone to bring an AED (defibrillator) if one is available.` },
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Check the scene is safe, then tap the person and shout to check if they respond.',
          'If they do not respond and are not breathing normally (or only gasping), call for emergency help.',
          'Place the heel of one hand in the centre of the chest (lower half of the breastbone), the other hand on top.',
          'Push hard and fast: about 5–6 cm (2–2.4 in) deep at 100–120 compressions per minute.',
          'Let the chest fully rise between compressions. Minimise pauses.',
          'If trained and willing, give 2 rescue breaths after every 30 compressions. Otherwise continue hands-only CPR.',
          'Switch on the AED as soon as it arrives and follow its voice prompts.',
          'Continue until help takes over, the person starts breathing normally, or you are too exhausted to continue.',
        ],
      },
      { type: 'text', heading: 'Tip', body: 'Compression rhythm is roughly the beat of the song “Stayin’ Alive”. A certified CPR course is strongly recommended.' },
    ],
    sources: ['American Heart Association – CPR & ECC Guidelines', 'American Red Cross – CPR Steps'],
  },
  {
    id: 'choking-adult',
    categoryId: 'first-aid',
    title: 'Choking (Adult & Child over 1)',
    summary: 'How to help someone who cannot cough, speak or breathe because of a blocked airway.',
    keywords: 'airway obstruction heimlich abdominal thrusts back blows food stuck',
    sections: [
      { type: 'text', heading: 'Mild choking', body: 'If the person can cough or speak, encourage them to keep coughing. Stay with them.' },
      {
        type: 'steps',
        heading: 'Severe choking (cannot cough, speak or breathe)',
        items: [
          'Stand behind them and lean them forward.',
          'Give up to 5 firm back blows between the shoulder blades with the heel of your hand.',
          'If still blocked, give up to 5 abdominal thrusts: fist just above the navel, pull sharply inwards and upwards.',
          'Alternate 5 back blows and 5 abdominal thrusts until the object comes out.',
          'If the person becomes unresponsive, call emergency services and begin CPR.',
        ],
      },
      { type: 'alert', body: 'Anyone who received abdominal thrusts should be checked by a doctor afterwards. Infants under 1 year need a different technique — learn it in a first-aid course.' },
    ],
    sources: ['American Red Cross – Choking', 'NHS – Choking'],
  },
  {
    id: 'severe-bleeding',
    categoryId: 'first-aid',
    title: 'Severe Bleeding',
    summary: 'Control heavy bleeding from a wound with direct pressure.',
    keywords: 'blood wound cut haemorrhage hemorrhage pressure tourniquet',
    sections: [
      { type: 'alert', body: CALL },
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Protect yourself with gloves if available.',
          'Apply firm, direct pressure to the wound with a clean cloth or dressing.',
          'Keep pressing. If blood soaks through, add more material on top — do not remove the first layer.',
          'Help the person lie down and keep them warm.',
          'For life-threatening limb bleeding, a trained person may apply a tourniquet above the wound.',
          'Keep monitoring breathing and responsiveness until help arrives.',
        ],
      },
      { type: 'text', heading: 'Do not', body: 'Do not remove large embedded objects — pad around them instead.' },
    ],
    sources: ['American College of Surgeons – Stop the Bleed', 'American Red Cross'],
  },
  {
    id: 'burns',
    categoryId: 'first-aid',
    title: 'Burns & Scalds',
    summary: 'Cool the burn quickly and protect it from infection.',
    keywords: 'scald fire hot water heat skin blister',
    sections: [
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Stop the burning: move away from the heat source.',
          'Cool the burn under cool or lukewarm running water for 20 minutes.',
          'Remove rings, watches or clothing near the burn unless stuck to the skin.',
          'Cover loosely with cling film or a clean, non-fluffy dressing.',
          'Keep the person warm to avoid hypothermia.',
        ],
      },
      { type: 'bullets', heading: 'Do not', items: ['Use ice, butter, toothpaste or creams.', 'Burst blisters.', 'Remove clothing stuck to the burn.'] },
      { type: 'alert', body: 'Get urgent medical help for burns that are large, deep, on the face, hands, feet or genitals, chemical/electrical burns, or any burn in a young child or elderly person.' },
    ],
    sources: ['NHS – Burns and scalds', 'WHO – Burns fact sheet'],
  },
  {
    id: 'stroke',
    categoryId: 'first-aid',
    title: 'Stroke – BE FAST',
    summary: 'Recognise the warning signs of a stroke and act immediately.',
    keywords: 'brain attack face drooping arm weakness speech slurred',
    sections: [
      {
        type: 'table',
        heading: 'BE FAST signs',
        columns: ['Letter', 'Check'],
        rows: [
          ['B – Balance', 'Sudden loss of balance or coordination'],
          ['E – Eyes', 'Sudden blurred, double or lost vision'],
          ['F – Face', 'One side of the face drooping'],
          ['A – Arms', 'Weakness or numbness in one arm'],
          ['S – Speech', 'Slurred or strange speech'],
          ['T – Time', 'Call emergency services immediately'],
        ],
      },
      { type: 'alert', body: `${CALL} Note the time symptoms started — this guides treatment.` },
      { type: 'bullets', heading: 'While waiting', items: ['Do not give food, drink or medicine.', 'Keep the person comfortable and monitor breathing.'] },
    ],
    sources: ['American Stroke Association', 'NHS – Stroke'],
  },
  {
    id: 'heart-attack',
    categoryId: 'first-aid',
    title: 'Heart Attack Signs',
    summary: 'Warning signs that may indicate a heart attack.',
    keywords: 'chest pain myocardial infarction cardiac angina',
    sections: [
      {
        type: 'bullets',
        heading: 'Common signs',
        items: [
          'Chest pain, pressure, squeezing or tightness',
          'Pain spreading to the arm, neck, jaw, back or stomach',
          'Shortness of breath',
          'Cold sweat, nausea or light-headedness',
          'Women, older adults and people with diabetes may have less typical symptoms',
        ],
      },
      { type: 'alert', body: `${CALL} Do not drive yourself to hospital.` },
      { type: 'text', heading: 'While waiting', body: 'Help the person sit and rest. If they become unresponsive and stop breathing normally, start CPR.' },
    ],
    sources: ['American Heart Association – Warning Signs of a Heart Attack'],
  },
  {
    id: 'anaphylaxis',
    categoryId: 'first-aid',
    title: 'Severe Allergic Reaction',
    summary: 'Anaphylaxis is a life-threatening allergic reaction that needs emergency treatment.',
    keywords: 'anaphylaxis allergy epinephrine adrenaline swelling hives bee sting peanut',
    sections: [
      { type: 'bullets', heading: 'Signs', items: ['Swelling of the throat, tongue or lips', 'Difficulty breathing or wheezing', 'Widespread hives or itchy rash', 'Dizziness, fainting or confusion'] },
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Call emergency services.',
          'If the person has a prescribed adrenaline (epinephrine) auto-injector, help them use it as instructed on the device.',
          'Have them lie down with legs raised, or sit up if breathing is difficult.',
          'A second dose may be needed if there is no improvement — follow the device instructions.',
          'Start CPR if they become unresponsive and stop breathing normally.',
        ],
      },
    ],
    sources: ['NHS – Anaphylaxis', 'American Red Cross'],
  },
  {
    id: 'fainting',
    categoryId: 'first-aid',
    title: 'Fainting',
    summary: 'A brief loss of consciousness due to reduced blood flow to the brain.',
    keywords: 'faint syncope passed out collapse dizzy',
    sections: [
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Lay the person on their back.',
          'Raise their legs about 30 cm (12 in) if there is no injury.',
          'Loosen tight clothing and ensure fresh air.',
          'Once recovered, have them sit up slowly.',
        ],
      },
      { type: 'alert', body: 'Seek urgent help if they do not wake within a minute or two, are injured, pregnant, have chest pain, or have a known heart condition.' },
    ],
    sources: ['NHS – Fainting', 'MedlinePlus – Fainting'],
  },
  {
    id: 'seizure',
    categoryId: 'first-aid',
    title: 'Seizure',
    summary: 'Keep the person safe during a seizure.',
    keywords: 'fit epilepsy convulsion shaking',
    sections: [
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Stay calm and note the time the seizure started.',
          'Move hard or sharp objects away. Cushion the head.',
          'Do not hold them down and do not put anything in their mouth.',
          'When the shaking stops, roll them onto their side (recovery position).',
          'Stay with them until fully aware.',
        ],
      },
      { type: 'alert', body: 'Call emergency services if the seizure lasts more than 5 minutes, is their first seizure, another follows quickly, they are injured, pregnant, or have trouble breathing.' },
    ],
    sources: ['CDC – Seizure First Aid', 'Epilepsy Foundation'],
  },
  {
    id: 'heat-stroke',
    categoryId: 'first-aid',
    title: 'Heat Exhaustion & Heat Stroke',
    summary: 'Recognise and treat dangerous overheating.',
    keywords: 'heat illness hyperthermia hot weather sun dehydration',
    sections: [
      {
        type: 'table',
        heading: 'Know the difference',
        columns: ['Heat exhaustion', 'Heat stroke (emergency)'],
        rows: [
          ['Heavy sweating', 'Hot skin; may stop sweating'],
          ['Cool, clammy skin', 'Confusion or slurred speech'],
          ['Weakness, headache, nausea', 'Seizure or loss of consciousness'],
        ],
      },
      { type: 'steps', heading: 'What to do', items: ['Move to a cool, shaded place.', 'Remove excess clothing.', 'Cool with water, wet cloths and fanning.', 'Give sips of water if fully alert.'] },
      { type: 'alert', body: `Heat stroke is life-threatening. ${CALL}` },
    ],
    sources: ['CDC – Heat-Related Illnesses', 'NHS – Heat exhaustion and heatstroke'],
  },
  {
    id: 'low-blood-sugar',
    categoryId: 'first-aid',
    title: 'Low Blood Sugar',
    summary: 'Hypoglycaemia in a person with diabetes who is awake and able to swallow.',
    keywords: 'hypoglycemia hypoglycaemia diabetes sugar shaky sweating insulin',
    sections: [
      { type: 'bullets', heading: 'Signs', items: ['Shaking, sweating, fast heartbeat', 'Hunger, irritability or confusion', 'Pale skin, dizziness'] },
      {
        type: 'steps',
        heading: 'The “15-15 rule” (conscious person)',
        items: [
          'Give 15 g of fast-acting sugar (e.g. glucose tablets, ½ cup juice or regular soda).',
          'Recheck blood sugar after 15 minutes if a meter is available.',
          'Repeat if still below 70 mg/dL (3.9 mmol/L) or symptoms continue.',
          'Once recovered, have a snack or meal.',
        ],
      },
      { type: 'alert', body: `Never give food or drink to someone who is drowsy, unresponsive or cannot swallow. ${CALL}` },
    ],
    sources: ['American Diabetes Association – Hypoglycemia', 'CDC – Diabetes'],
  },
  {
    id: 'nosebleed',
    categoryId: 'first-aid',
    title: 'Nosebleed',
    summary: 'Simple steps to stop most nosebleeds.',
    keywords: 'epistaxis nose bleeding',
    sections: [
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Sit up and lean slightly forward (not back).',
          'Pinch the soft part of the nose just above the nostrils.',
          'Hold firmly for 10–15 minutes, breathing through the mouth.',
          'Avoid blowing the nose or heavy lifting for 24 hours.',
        ],
      },
      { type: 'alert', body: 'Get medical help if bleeding lasts more than 20 minutes, follows a head injury, is very heavy, or the person takes blood thinners.' },
    ],
    sources: ['NHS – Nosebleed', 'MedlinePlus – Nosebleed'],
  },
  {
    id: 'sprains',
    categoryId: 'first-aid',
    title: 'Sprains & Suspected Fractures',
    summary: 'Initial care for injured joints and limbs.',
    keywords: 'fracture broken bone sprain strain rice ankle wrist',
    sections: [
      {
        type: 'table',
        heading: 'RICE for minor sprains',
        columns: ['Step', 'How'],
        rows: [
          ['Rest', 'Avoid using the injured part'],
          ['Ice', 'Cold pack wrapped in cloth, up to 20 min at a time'],
          ['Compression', 'Light elastic bandage, not too tight'],
          ['Elevation', 'Raise above heart level when possible'],
        ],
      },
      { type: 'alert', body: 'Suspect a fracture if there is deformity, severe pain, swelling or inability to bear weight. Keep the limb still and seek medical care.' },
    ],
    sources: ['NHS – Sprains and strains', 'American Red Cross'],
  },
  {
    id: 'poisoning',
    categoryId: 'first-aid',
    title: 'Poisoning',
    summary: 'What to do if someone has swallowed or been exposed to a harmful substance.',
    keywords: 'poison overdose swallowed chemical toxic',
    sections: [
      {
        type: 'steps',
        heading: 'What to do',
        items: [
          'Call your local poison control centre or emergency services.',
          'Keep the container or label to show responders.',
          'Do not make the person vomit unless told to by a professional.',
          'If they are unresponsive and not breathing normally, start CPR.',
        ],
      },
    ],
    sources: ['WHO – Poisoning prevention and management', 'Poison Control (US)'],
  },

  // ───────────────────────────── VITAL SIGNS ─────────────────────────────
  {
    id: 'vitals-adult',
    categoryId: 'vitals',
    title: 'Adult Vital Signs',
    summary: 'Typical resting values for healthy adults.',
    keywords: 'heart rate pulse respiratory rate temperature oxygen saturation spo2 normal',
    sections: [
      {
        type: 'table',
        columns: ['Measure', 'Typical range'],
        rows: [
          ['Heart rate', '60–100 beats/min'],
          ['Respiratory rate', '12–20 breaths/min'],
          ['Temperature', '36.1–37.2 °C (97–99 °F)'],
          ['Fever', '38.0 °C (100.4 °F) or higher'],
          ['Oxygen saturation (SpO₂)', '95–100 %'],
          ['Blood pressure', 'Below 120/80 mmHg'],
        ],
        note: 'Trained athletes may have resting heart rates below 60. Values vary with age, activity and health conditions.',
      },
    ],
    sources: ['MedlinePlus – Vital signs', 'American Heart Association'],
  },
  {
    id: 'blood-pressure',
    categoryId: 'vitals',
    title: 'Blood Pressure Categories',
    summary: 'Adult blood pressure categories (mmHg).',
    keywords: 'hypertension bp systolic diastolic high blood pressure',
    sections: [
      {
        type: 'table',
        columns: ['Category', 'Systolic / Diastolic'],
        rows: [
          ['Normal', '< 120 and < 80'],
          ['Elevated', '120–129 and < 80'],
          ['High – Stage 1', '130–139 or 80–89'],
          ['High – Stage 2', '≥ 140 or ≥ 90'],
          ['Severe (seek care)', '> 180 and/or > 120'],
        ],
        note: 'Diagnosis is based on repeated readings taken correctly — not a single measurement.',
      },
      { type: 'alert', body: 'A reading above 180/120 with chest pain, shortness of breath, weakness, vision change or difficulty speaking is an emergency.' },
    ],
    sources: ['American Heart Association – Understanding Blood Pressure Readings'],
  },
  {
    id: 'vitals-children',
    categoryId: 'vitals',
    title: 'Children’s Vital Signs',
    summary: 'Approximate resting heart and breathing rates by age.',
    keywords: 'pediatric paediatric child infant baby heart rate breathing',
    sections: [
      {
        type: 'table',
        columns: ['Age', 'Heart rate / Breathing rate'],
        rows: [
          ['Newborn – 1 yr', '100–160 / 30–60'],
          ['1–3 yrs', '90–150 / 24–40'],
          ['3–5 yrs', '80–140 / 22–34'],
          ['6–12 yrs', '70–120 / 18–30'],
          ['13–18 yrs', '60–100 / 12–20'],
        ],
        note: 'Approximate awake resting values; published ranges differ slightly between sources.',
      },
    ],
    sources: ['MedlinePlus – Vital signs', 'Pediatric Advanced Life Support references'],
  },

  // ───────────────────────────── LAB VALUES ─────────────────────────────
  {
    id: 'cbc',
    categoryId: 'labs',
    title: 'Complete Blood Count',
    summary: 'Typical adult reference ranges for a CBC.',
    keywords: 'cbc hemoglobin haemoglobin wbc platelets white cells red cells blood test',
    sections: [
      {
        type: 'table',
        columns: ['Test', 'Typical adult range'],
        rows: [
          ['Haemoglobin (men)', '13.5–17.5 g/dL'],
          ['Haemoglobin (women)', '12.0–15.5 g/dL'],
          ['White blood cells', '4.5–11.0 × 10⁹/L'],
          ['Platelets', '150–450 × 10⁹/L'],
          ['Haematocrit (men)', '41–50 %'],
          ['Haematocrit (women)', '36–44 %'],
        ],
        note: 'Ranges differ between laboratories. Always use the range printed on your own report.',
      },
    ],
    sources: ['MedlinePlus – Complete Blood Count'],
  },
  {
    id: 'glucose',
    categoryId: 'labs',
    title: 'Blood Sugar & HbA1c',
    summary: 'Adult diabetes screening thresholds.',
    keywords: 'glucose sugar fasting a1c hba1c diabetes prediabetes',
    sections: [
      {
        type: 'table',
        heading: 'Fasting plasma glucose',
        columns: ['Result', 'mg/dL (mmol/L)'],
        rows: [
          ['Normal', '< 100 (< 5.6)'],
          ['Prediabetes', '100–125 (5.6–6.9)'],
          ['Diabetes', '≥ 126 (≥ 7.0)'],
        ],
      },
      {
        type: 'table',
        heading: 'HbA1c',
        columns: ['Result', 'Percent'],
        rows: [
          ['Normal', '< 5.7 %'],
          ['Prediabetes', '5.7–6.4 %'],
          ['Diabetes', '≥ 6.5 %'],
        ],
        note: 'A diagnosis requires confirmation by a healthcare professional.',
      },
    ],
    sources: ['American Diabetes Association – Diagnosis', 'CDC – Diabetes Tests'],
  },
  {
    id: 'electrolytes-kidney',
    categoryId: 'labs',
    title: 'Electrolytes & Kidney',
    summary: 'Common basic metabolic panel values.',
    keywords: 'sodium potassium creatinine urea bun electrolytes kidney renal bmp',
    sections: [
      {
        type: 'table',
        columns: ['Test', 'Typical adult range'],
        rows: [
          ['Sodium', '135–145 mmol/L'],
          ['Potassium', '3.5–5.0 mmol/L'],
          ['Chloride', '96–106 mmol/L'],
          ['Bicarbonate (CO₂)', '22–29 mmol/L'],
          ['Urea nitrogen (BUN)', '7–20 mg/dL'],
          ['Creatinine (men)', '0.7–1.3 mg/dL'],
          ['Creatinine (women)', '0.6–1.1 mg/dL'],
        ],
        note: 'Ranges differ between laboratories.',
      },
    ],
    sources: ['MedlinePlus – Basic Metabolic Panel'],
  },
  {
    id: 'lipids',
    categoryId: 'labs',
    title: 'Cholesterol (Lipid Panel)',
    summary: 'Desirable adult lipid levels.',
    keywords: 'cholesterol ldl hdl triglycerides lipid',
    sections: [
      {
        type: 'table',
        columns: ['Test', 'Desirable (mg/dL)'],
        rows: [
          ['Total cholesterol', '< 200'],
          ['LDL cholesterol', '< 100'],
          ['HDL cholesterol (men)', '≥ 40'],
          ['HDL cholesterol (women)', '≥ 50'],
          ['Triglycerides', '< 150'],
        ],
        note: 'Personal targets depend on overall heart risk and are set by your doctor.',
      },
    ],
    sources: ['MedlinePlus – Cholesterol Levels', 'CDC – Cholesterol'],
  },
  {
    id: 'thyroid',
    categoryId: 'labs',
    title: 'Thyroid (TSH)',
    summary: 'Thyroid-stimulating hormone reference range.',
    keywords: 'tsh thyroid hypothyroidism hyperthyroidism t4',
    sections: [
      {
        type: 'table',
        columns: ['Test', 'Typical adult range'],
        rows: [
          ['TSH', 'about 0.4–4.0 mIU/L'],
          ['Free T4', 'about 0.9–1.7 ng/dL'],
        ],
        note: 'Ranges differ between laboratories and in pregnancy.',
      },
    ],
    sources: ['MedlinePlus – TSH Test'],
  },

  // ───────────────────────────── CONDITIONS ─────────────────────────────
  {
    id: 'hypertension',
    categoryId: 'conditions',
    title: 'High Blood Pressure',
    summary: 'A common condition that often has no symptoms.',
    keywords: 'hypertension bp blood pressure',
    sections: [
      { type: 'text', heading: 'Overview', body: 'High blood pressure raises the risk of heart attack, stroke and kidney disease. Many people feel completely well, so regular checks are the only way to know.' },
      { type: 'bullets', heading: 'Lifestyle measures', items: ['Reduce salt intake', 'Stay physically active', 'Maintain a healthy weight', 'Limit alcohol and avoid tobacco', 'Take prescribed medicines as directed'] },
      { type: 'alert', body: 'See a doctor if repeated home readings are 130/80 or higher.' },
    ],
    sources: ['WHO – Hypertension fact sheet', 'American Heart Association'],
  },
  {
    id: 'diabetes-t2',
    categoryId: 'conditions',
    title: 'Type 2 Diabetes',
    summary: 'Long-term high blood sugar caused by insulin resistance.',
    keywords: 'diabetes sugar insulin type 2',
    sections: [
      { type: 'bullets', heading: 'Possible symptoms', items: ['Increased thirst and urination', 'Tiredness', 'Blurred vision', 'Slow-healing wounds', 'Many people have no symptoms at first'] },
      { type: 'text', heading: 'When to see a doctor', body: 'Get tested if you have symptoms, a family history, are overweight, or are over 35. Early diagnosis helps prevent complications.' },
    ],
    sources: ['WHO – Diabetes fact sheet', 'American Diabetes Association'],
  },
  {
    id: 'asthma',
    categoryId: 'conditions',
    title: 'Asthma',
    summary: 'A long-term condition that narrows the airways.',
    keywords: 'asthma wheeze inhaler breathing attack',
    sections: [
      { type: 'bullets', heading: 'Symptoms', items: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing, especially at night'] },
      { type: 'steps', heading: 'During an attack', items: ['Sit upright and stay calm.', 'Use the reliever inhaler exactly as prescribed in the person’s asthma action plan.', 'If no improvement or symptoms worsen, call emergency services.'] },
    ],
    sources: ['WHO – Asthma fact sheet', 'NHS – Asthma attack'],
  },
  {
    id: 'dehydration',
    categoryId: 'conditions',
    title: 'Dehydration',
    summary: 'When the body loses more fluid than it takes in.',
    keywords: 'dehydration fluids diarrhea diarrhoea vomiting ors thirst',
    sections: [
      { type: 'bullets', heading: 'Signs', items: ['Thirst and dry mouth', 'Dark yellow urine or passing little urine', 'Dizziness or tiredness', 'In babies: sunken soft spot, few wet nappies'] },
      { type: 'text', heading: 'What helps', body: 'Drink small, frequent sips of water. Oral rehydration solution (ORS) is recommended for diarrhoea and vomiting.' },
      { type: 'alert', body: 'Seek urgent care for confusion, no urine for 8+ hours, fainting, or dehydration in infants and the elderly.' },
    ],
    sources: ['WHO – Diarrhoeal disease', 'NHS – Dehydration'],
  },
  {
    id: 'fever',
    categoryId: 'conditions',
    title: 'Fever',
    summary: 'A raised body temperature, usually a sign of infection.',
    keywords: 'fever temperature high pyrexia',
    sections: [
      { type: 'text', heading: 'Definition', body: 'A temperature of 38.0 °C (100.4 °F) or higher is generally considered a fever.' },
      { type: 'bullets', heading: 'Self-care', items: ['Rest and drink plenty of fluids', 'Wear light clothing', 'Use fever medicine only as directed on the label'] },
      { type: 'alert', body: 'Get medical advice for any fever in a baby under 3 months, fever over 39.4 °C (103 °F), stiff neck, rash, confusion, difficulty breathing, or fever lasting more than 3 days.' },
    ],
    sources: ['MedlinePlus – Fever', 'NHS – Fever in children'],
  },

  // ───────────────────────────── WELLNESS ─────────────────────────────
  {
    id: 'hand-hygiene',
    categoryId: 'wellness',
    title: 'Hand Washing',
    summary: 'One of the most effective ways to prevent infection.',
    keywords: 'hand washing hygiene germs infection soap',
    sections: [
      { type: 'steps', items: ['Wet hands with clean running water.', 'Apply soap and lather backs, palms, between fingers and under nails.', 'Scrub for at least 20 seconds.', 'Rinse well under running water.', 'Dry with a clean towel or air dry.'] },
    ],
    sources: ['CDC – Clean Hands', 'WHO – Hand Hygiene'],
  },
  {
    id: 'physical-activity',
    categoryId: 'wellness',
    title: 'Physical Activity',
    summary: 'WHO recommendations for adults aged 18–64.',
    keywords: 'exercise activity fitness walking',
    sections: [
      { type: 'bullets', items: ['150–300 minutes of moderate activity per week, or 75–150 minutes of vigorous activity', 'Muscle-strengthening activities on 2 or more days a week', 'Limit time spent sitting', 'Some activity is better than none'] },
    ],
    sources: ['WHO – Physical activity guidelines'],
  },
  {
    id: 'sleep',
    categoryId: 'wellness',
    title: 'Healthy Sleep',
    summary: 'Recommended sleep and good sleep habits.',
    keywords: 'sleep insomnia rest',
    sections: [
      { type: 'text', body: 'Most adults need 7 or more hours of sleep per night.' },
      { type: 'bullets', heading: 'Good habits', items: ['Keep a regular sleep schedule', 'Keep the bedroom dark, quiet and cool', 'Avoid caffeine late in the day', 'Limit screens before bed'] },
    ],
    sources: ['CDC – Sleep', 'American Academy of Sleep Medicine'],
  },
  {
    id: 'healthy-eating',
    categoryId: 'wellness',
    title: 'Healthy Eating',
    summary: 'Simple principles for a balanced diet.',
    keywords: 'diet nutrition food fruit vegetables salt sugar',
    sections: [
      { type: 'bullets', items: ['Eat at least 5 portions (400 g) of fruit and vegetables a day', 'Choose whole grains', 'Limit salt to less than 5 g (about 1 teaspoon) a day', 'Limit free sugars and processed foods', 'Drink water regularly'] },
    ],
    sources: ['WHO – Healthy diet fact sheet'],
  },
];

export const getTopic = (id) => TOPICS.find((t) => t.id === id);
export const getTopicsByCategory = (categoryId) => TOPICS.filter((t) => t.categoryId === categoryId);

export function searchTopics(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return TOPICS.filter((t) => {
    const hay = `${t.title} ${t.summary} ${t.keywords || ''}`.toLowerCase();
    return terms.every((term) => hay.includes(term));
  });
}
