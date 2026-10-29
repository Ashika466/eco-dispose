/**
 * EcoDispose - Disposal Awareness Guide & Material Impact Calculator
 * Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management
 */

const EcoAwareness = {
  // Common hazardous chemicals in appliances and their toxicological profiles
  toxicSubstances: [
    {
      substance: "Lead (Pb)",
      sources: "Cathode Ray Tubes (up to 2.5kg per CRT TV), Printed Circuit Board soldering, lead-acid inverter batteries.",
      healthRisk: "Severe damage to central and peripheral nervous systems, cognitive impairment in children, acute kidney injury.",
      environmentalImpact: "Persistent soil contaminant. Enters food chain through agricultural bio-accumulation; highly toxic to aquatic fauna."
    },
    {
      substance: "Mercury (Hg)",
      sources: "Fluorescent and cold-cathode lamps (CCFLs) backlighting older flat screens, printed circuit tilt switches, medical equipment.",
      healthRisk: "Chronic neurotoxicity, Minamata neurological symptoms, sensory impairment, tremors, reproductive toxicity.",
      environmentalImpact: "Methylation in wetlands transforms inorganic mercury into toxic methylmercury, bio-magnifying in fish and aquatic food webs."
    },
    {
      substance: "Cadmium (Cd)",
      sources: "Rechargeable Ni-Cd batteries, chip resistors, infrared detectors, older semiconductor coatings.",
      healthRisk: "Itai-Itai bone softening disease, irreversible renal tubular damage, classified as Group 1 human carcinogen.",
      environmentalImpact: "Extremely mobile in acidic soils; taken up by cereal crops and leafy vegetables, contaminating drinking water aquifers."
    },
    {
      substance: "Refrigerant Gases (CFCs / HCFCs / HFCs)",
      sources: "Cooling circuits of older refrigerators, deep freezers, air conditioners, heat-pump dehumidifiers.",
      healthRisk: "Inhalation causes cardiac arrhythmia, central nervous system depression, asphyxiation in confined spaces.",
      environmentalImpact: "Potent Ozone Depleting Substances (ODS) and greenhouse gases with Global Warming Potential (GWP) up to 10,000x CO2."
    },
    {
      substance: "Brominated Flame Retardants (BFRs / PBDEs)",
      sources: "Plastic casings of televisions, microwave panels, printed circuit boards, cables.",
      healthRisk: "Endocrine disruption, thyroid hormone interference, neuro-developmental delays, immune suppression.",
      environmentalImpact: "When burned in informal scrap yards, releases highly carcinogenic Polybrominated Dibenzo-p-Dioxins and Furans (PBDD/Fs)."
    }
  ],

  // Step-by-step preparation procedures
  prepGuides: [
    {
      category: "Refrigerators & Freezers",
      steps: [
        "Empty all food contents 24 to 48 hours prior to handover.",
        "Unplug from AC mains and prop doors slightly open to prevent mold and mildew odors.",
        "Crucial: Never puncture, cut, or crimp the copper tubing behind the unit to avoid releasing pressurized refrigerants.",
        "Secure the rear compressor unit and tape doors closed during transportation."
      ]
    },
    {
      category: "Washing Machines & Dishwashers",
      steps: [
        "Turn off water inlet valves and completely unscrew supply hoses.",
        "Drain residual water from the bottom drain filter pump into a shallow tray.",
        "If available, insert manufacturer transit shipping bolts to immobilize the heavy suspended drum.",
        "Bundle and tape the 16A power cord neatly to the rear chassis."
      ]
    },
    {
      category: "Laptops, Desktops & Hard Drives",
      steps: [
        "Backup critical personal and academic files to secure cloud or external media.",
        "Sign out of all identity accounts (Google Account, Apple ID, Microsoft Account) to remove Activation Lock.",
        "Perform cryptographic sanitization following NIST SP 800-88 standards (or DBAN / Windows Reset with full drive wipe).",
        "Physically remove SIM cards and microSD expansion cards."
      ]
    },
    {
      category: "Smartphones & Tablets",
      steps: [
        "Unlink biometric authentications and multi-factor authenticator apps.",
        "Execute 'Factory Data Reset' with internal storage encryption enabled.",
        "Inspect device casing for lithium battery bloating or bulging.",
        "Clean exterior with a dry cloth; remove phone covers for separate plastic recycling."
      ]
    },
    {
      category: "Damaged / Swollen Batteries",
      steps: [
        "Caution: Never puncture, compress, bend, or throw a bloated lithium pouch battery.",
        "Cover all exposed electrical terminals with non-conductive vinyl electrical tape.",
        "Place individual batteries in non-flammable containers (sand or vermiculite bucket).",
        "Keep strictly away from water, flammable solvents, or heat sources."
      ]
    }
  ],

  /**
   * Data Sanitization Protocol according to NIST Special Publication 800-88
   */
  nistProtocol: {
    title: "NIST SP 800-88 Guidelines for Media Sanitization",
    levels: [
      {
        level: "Clear",
        technique: "Logical Overwrite",
        description: "Applies standard read/write commands over all accessible storage locations (single-pass zero/random overwrite). Protects against simple non-invasive recovery tools.",
        bestFor: "Personal laptops, household desktop drives being donated or refurbished."
      },
      {
        level: "Purge",
        technique: "Cryptographic Erase / Secure Erase Firmware Command",
        description: "Executes onboard controller firmware sanitize commands (ATA Secure Erase / NVMe Format) and destroys cryptographic decryption keys, rendering data completely unrecoverable even in lab environments.",
        bestFor: "Enterprise servers, smartphones, and workstations handling sensitive data."
      },
      {
        level: "Destroy",
        technique: "Physical Shredding & Demagnetization (Degaussing)",
        description: "Mechanical cross-cut shredding of platters down to <2mm particle size. Performed at authorized KSPCB de-manufacturing plants.",
        bestFor: "Severely damaged, unreadable, or classified storage platters."
      }
    ]
  },

  /**
   * Comparative evaluation: Formal Authorized Recyclers vs Informal Kabadiwala / E-Waste Burning
   */
  formalVsInformal: [
    {
      parameter: "Material Recovery Rate",
      formal: "90% - 98% (High-tech shredding, optical sorting, and hydrometallurgical refining)",
      informal: "< 25% (Crude open-acid leaching extracts only visible copper/gold; rest is dumped)"
    },
    {
      parameter: "Air & Toxic Emissions",
      formal: "Zero fugitive emissions; enclosed baghouse filters, wet scrubbers for acid fumes",
      informal: "Uncontrolled open-pit burning produces dense toxic black smoke laden with dioxins"
    },
    {
      parameter: "Worker Safety & PPE",
      formal: "Industrial PPE, dust respirators, automated robotic handling, medical surveillance",
      informal: "Child labor, bare-hand acid dipping, zero ventilation, severe occupational toxicity"
    },
    {
      parameter: "Chain of Custody & Legal Manifest",
      formal: "Issue formal Green Recycling Certificates, CPCB EPR credit tokens, and Form-6 manifests",
      informal: "No records, illegal fly-tipping into urban storm drains and lake beds"
    }
  ],

  /**
   * Initialize Awareness Guide UI
   */
  init() {
    this.renderToxicGrid();
    this.renderPrepAccordions();
    this.renderNistTable();
    this.renderComparisonTable();
    this.setupCalculator();
  },

  renderToxicGrid() {
    const container = document.getElementById('toxic-substances-grid');
    if (!container) return;

    container.innerHTML = this.toxicSubstances.map(t => `
      <div class="toxic-card">
        <div class="toxic-header">
          <span class="hazard-icon">⚠️</span>
          <h4>${t.substance}</h4>
        </div>
        <p class="toxic-source"><strong>Common Sources:</strong> ${t.sources}</p>
        <p class="toxic-health"><strong>Health Impact:</strong> ${t.healthRisk}</p>
        <p class="toxic-env"><strong>Environmental Fate:</strong> ${t.environmentalImpact}</p>
      </div>
    `).join('');
  },

  renderPrepGuides() {
    this.renderPrepAccordions();
  },

  renderPrepAccordions() {
    const container = document.getElementById('prep-guides-container');
    if (!container) return;

    container.innerHTML = this.prepGuides.map((guide, idx) => `
      <div class="prep-guide-box">
        <h4 class="prep-category-title">
          <span>📦</span> ${guide.category}
        </h4>
        <ul class="prep-step-list">
          ${guide.steps.map(step => `
            <li>
              <span class="step-check">✓</span>
              <span>${step}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  },

  renderNistTable() {
    const container = document.getElementById('nist-guide-container');
    if (!container) return;

    container.innerHTML = `
      <div class="nist-cards-grid">
        ${this.nistProtocol.levels.map(lvl => `
          <div class="nist-card">
            <div class="nist-badge">${lvl.level} Sanitization</div>
            <h4 class="nist-tech">${lvl.technique}</h4>
            <p class="nist-desc">${lvl.description}</p>
            <div class="nist-target"><strong>Recommended For:</strong> ${lvl.bestFor}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderComparisonTable() {
    const tbody = document.getElementById('formal-vs-informal-body');
    if (!tbody) return;

    tbody.innerHTML = this.formalVsInformal.map(row => `
      <tr>
        <td class="font-semibold text-gray-800">${row.parameter}</td>
        <td class="text-emerald-700 bg-emerald-50/50">${row.formal}</td>
        <td class="text-rose-700 bg-rose-50/50">${row.informal}</td>
      </tr>
    `).join('');
  },

  /**
   * Interactive Environmental Footprint & Material Recovery Estimator
   */
  setupCalculator() {
    const select = document.getElementById('calc-appliance-select');
    const qtyInput = document.getElementById('calc-qty-input');
    const resultBox = document.getElementById('calc-results');

    if (!select || !qtyInput || !resultBox) return;

    const calculate = () => {
      const type = select.value;
      const qty = parseInt(qtyInput.value, 10) || 1;

      // Factors per unit
      const metrics = {
        'fridge': { co2Kg: 280, steelKg: 35, copperKg: 3.2, leadPreventedG: 80, name: 'Refrigerators' },
        'laptop': { co2Kg: 120, steelKg: 0.8, copperKg: 0.4, goldMg: 220, leadPreventedG: 12, name: 'Laptops' },
        'smartphone': { co2Kg: 35, copperKg: 0.08, goldMg: 35, silverMg: 350, leadPreventedG: 3, name: 'Smartphones' },
        'tv': { co2Kg: 190, steelKg: 8.5, copperKg: 1.8, leadPreventedG: 1200, name: 'Televisions' },
        'washingmachine': { co2Kg: 240, steelKg: 42, copperKg: 2.8, leadPreventedG: 45, name: 'Washing Machines' }
      };

      const m = metrics[type] || metrics['fridge'];

      const totalCo2 = (m.co2Kg * qty).toFixed(0);
      const totalCopper = (m.copperKg * qty).toFixed(1);
      const totalLead = (m.leadPreventedG * qty).toFixed(0);

      let preciousHtml = '';
      if (m.goldMg) {
        preciousHtml = `<div class="calc-metric-pill"><span>🪙 Recoverable Gold:</span> <strong>${(m.goldMg * qty).toLocaleString()} mg</strong></div>`;
      }

      resultBox.innerHTML = `
        <div class="calc-output-card">
          <h4>Estimated Ecological Savings for ${qty}x ${m.name}</h4>
          <p class="text-xs text-gray-500 mb-3">Academic projection based on Central Pollution Control Board lifecycle material recovery models.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="calc-metric-pill">
              <span>🌱 GHG Emissions Prevented:</span>
              <strong>${totalCo2} kg CO₂ eq</strong>
            </div>
            <div class="calc-metric-pill">
              <span>⚡ High-Purity Copper Saved:</span>
              <strong>${totalCopper} kg</strong>
            </div>
            <div class="calc-metric-pill">
              <span>🛡️ Toxic Lead Kept Out of Soil:</span>
              <strong>${totalLead} grams</strong>
            </div>
          </div>
          ${preciousHtml}
          <div class="calc-disclaimer">
            * Note: These values represent expected recovery potentials through authorized hydrometallurgical recycling, not guaranteed individual yields.
          </div>
        </div>
      `;
    };

    select.addEventListener('change', calculate);
    qtyInput.addEventListener('input', calculate);
    calculate();
  }
};

window.EcoAwareness = EcoAwareness;
