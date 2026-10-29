/**
 * EcoDispose - LocalStorage Engine & Waste Analytics
 * Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management
 */

const STORAGE_KEY = 'eco_dispose_requests_bcs508_v1';
const CENTRES_KEY = 'eco_dispose_centres_bcs508_v1';

const EcoStorage = {
  /**
   * Initialize LocalStorage with seed data if not already present
   */
  init() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing || JSON.parse(existing).length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(window.ECO_DATA.seedRequests));
      }

      const existingCentres = localStorage.getItem(CENTRES_KEY);
      if (!existingCentres) {
        localStorage.setItem(CENTRES_KEY, JSON.stringify(window.ECO_DATA.recyclingCentres));
      }
    } catch (e) {
      console.warn('LocalStorage error or private browsing limitation:', e);
    }
  },

  /**
   * Retrieve all disposal requests from LocalStorage
   * @returns {Array} Array of request objects
   */
  getAllRequests() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [...window.ECO_DATA.seedRequests];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse requests from LocalStorage:', e);
      return [...window.ECO_DATA.seedRequests];
    }
  },

  /**
   * Find a specific request by its unique ID
   * @param {string} id - The request ID (e.g. ECO-2026-1042)
   */
  getRequestById(id) {
    const requests = this.getAllRequests();
    return requests.find(r => r.id.toUpperCase() === id.trim().toUpperCase());
  },

  /**
   * Save a newly submitted appliance disposal request
   * @param {Object} formData
   * @returns {Object} Newly created request object
   */
  createRequest(formData) {
    const requests = this.getAllRequests();

    // Generate unique ID: ECO-2026-XXXX
    let randomNum;
    let newId;
    do {
      randomNum = Math.floor(1000 + Math.random() * 9000);
      newId = `ECO-2026-${randomNum}`;
    } while (requests.some(r => r.id === newId));

    const timestamp = new Date().toISOString();

    const newRequest = {
      id: newId,
      date: timestamp,
      category: formData.category,
      description: formData.description.trim(),
      brand: formData.brand ? formData.brand.trim() : 'Unspecified',
      quantity: parseInt(formData.quantity, 10) || 1,
      weightKg: parseFloat(formData.weightKg) || 1.0,
      condition: formData.condition,
      disposalPreference: formData.disposalPreference,
      pickupOption: formData.pickupOption,
      area: formData.area.trim(),
      pincode: formData.pincode.trim(),
      contactName: formData.contactName ? formData.contactName.trim() : 'Anonymous Demonstrator',
      contactPhone: formData.contactPhone ? formData.contactPhone.trim() : '+91 90000 00000',
      notes: formData.notes ? formData.notes.trim() : 'No additional notes provided.',
      status: 'Submitted',
      timeline: [
        {
          status: 'Submitted',
          timestamp: timestamp,
          note: 'Request logged through the EcoDispose Academic Portal.'
        }
      ]
    };

    // Prepend to array (newest first)
    requests.unshift(newRequest);
    this._persist(requests);

    return newRequest;
  },

  /**
   * Update request status (for demo lifecycle simulation)
   * @param {string} id
   * @param {string} newStatus
   * @param {string} note
   */
  updateStatus(id, newStatus, note = '') {
    const requests = this.getAllRequests();
    const index = requests.findIndex(r => r.id.toUpperCase() === id.trim().toUpperCase());
    if (index === -1) return null;

    const req = requests[index];
    req.status = newStatus;
    if (!req.timeline) req.timeline = [];

    const defaultNotes = {
      'Submitted': 'Request recorded in prototype database.',
      'Verification Pending': 'Appliance details screened by e-waste classification team.',
      'Scheduled for Pickup': 'Pickup logistics scheduled with authorized collection vehicle.',
      'Received at Centre': 'Appliance safely received and logged at authorized collection/dismantling facility.',
      'Recycled': 'Material de-manufacturing completed; hazardous fractions neutralized and recyclables segregated.'
    };

    req.timeline.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: note || defaultNotes[newStatus] || `Status updated to ${newStatus}`
    });

    requests[index] = req;
    this._persist(requests);
    return req;
  },

  /**
   * Delete a request
   * @param {string} id
   */
  deleteRequest(id) {
    let requests = this.getAllRequests();
    requests = requests.filter(r => r.id.toUpperCase() !== id.trim().toUpperCase());
    this._persist(requests);
    return true;
  },

  /**
   * Reset database back to default demonstration records
   */
  resetToDefault() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.ECO_DATA.seedRequests));
    return this.getAllRequests();
  },

  /**
   * Clear all records
   */
  clearAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  },

  /**
   * Persist array to LocalStorage
   */
  _persist(requests) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
      // Dispatch custom event for real-time reactive UI updates
      window.dispatchEvent(new CustomEvent('ecodispose:datachanged', { detail: { count: requests.length } }));
    } catch (e) {
      console.error('Failed to write to LocalStorage:', e);
    }
  },

  /**
   * Retrieve all recycling centres
   */
  getCentres() {
    try {
      const data = localStorage.getItem(CENTRES_KEY);
      if (!data) return [...window.ECO_DATA.recyclingCentres];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...window.ECO_DATA.recyclingCentres];
    } catch (e) {
      return [...window.ECO_DATA.recyclingCentres];
    }
  },

  /**
   * Calculate detailed analytical statistics from current records
   * Strict adherence to BCS508 requirement:
   * "Distinguish reported, collected, and verified recycled waste. Never claim that reported waste has already been recycled."
   */
  getAnalytics() {
    const requests = this.getAllRequests();

    const totalRequests = requests.length;
    let totalAppliances = 0;
    let totalReportedWeightKg = 0;

    // Category distribution
    const categoryMap = {};
    window.ECO_DATA.categories.forEach(c => {
      categoryMap[c.name] = { count: 0, weight: 0 };
    });

    // Condition distribution
    const conditionMap = {
      'Working': 0,
      'Repairable': 0,
      'Damaged': 0,
      'Non-functional': 0
    };

    // Disposal preference distribution
    const preferenceMap = {
      'Reuse': 0,
      'Repair': 0,
      'Authorized Collection': 0,
      'Recycling': 0
    };

    // Status breakdown
    const statusMap = {
      'Submitted': 0,
      'Verification Pending': 0,
      'Scheduled for Pickup': 0,
      'Received at Centre': 0,
      'Recycled': 0
    };

    // Rigorous accounting of waste states:
    let reportedOnlyWeightKg = 0;   // In Submitted or Verification Pending
    let scheduledInTransitWeightKg = 0; // In Scheduled for Pickup
    let collectedAtHubWeightKg = 0; // Received at Centre
    let verifiedRecycledWeightKg = 0; // Recycled / Dismantled

    requests.forEach(req => {
      const qty = parseInt(req.quantity, 10) || 1;
      const weight = parseFloat(req.weightKg) || 0;

      totalAppliances += qty;
      totalReportedWeightKg += weight;

      // Category
      if (categoryMap[req.category]) {
        categoryMap[req.category].count += qty;
        categoryMap[req.category].weight += weight;
      } else {
        categoryMap[req.category] = { count: qty, weight: weight };
      }

      // Condition
      if (conditionMap[req.condition] !== undefined) {
        conditionMap[req.condition] += qty;
      } else {
        conditionMap[req.condition] = qty;
      }

      // Preference
      if (preferenceMap[req.disposalPreference] !== undefined) {
        preferenceMap[req.disposalPreference] += qty;
      } else {
        preferenceMap[req.disposalPreference] = qty;
      }

      // Status
      if (statusMap[req.status] !== undefined) {
        statusMap[req.status]++;
      } else {
        statusMap[req.status] = 1;
      }

      // Physical waste state tracking
      if (req.status === 'Submitted' || req.status === 'Verification Pending') {
        reportedOnlyWeightKg += weight;
      } else if (req.status === 'Scheduled for Pickup') {
        scheduledInTransitWeightKg += weight;
      } else if (req.status === 'Received at Centre') {
        collectedAtHubWeightKg += weight;
      } else if (req.status === 'Recycled') {
        verifiedRecycledWeightKg += weight;
      }
    });

    return {
      totalRequests,
      totalAppliances,
      totalReportedWeightKg: Math.round(totalReportedWeightKg * 10) / 10,
      totalReportedWeightTonnes: Math.round((totalReportedWeightKg / 1000) * 1000) / 1000,
      averageWeightPerAppliance: totalAppliances > 0 ? (totalReportedWeightKg / totalAppliances).toFixed(1) : 0,

      // Statuses
      statusMap,

      // Rigorous Stage Separation
      reportedOnlyWeightKg: Math.round(reportedOnlyWeightKg * 10) / 10,
      scheduledInTransitWeightKg: Math.round(scheduledInTransitWeightKg * 10) / 10,
      collectedAtHubWeightKg: Math.round(collectedAtHubWeightKg * 10) / 10,
      verifiedRecycledWeightKg: Math.round(verifiedRecycledWeightKg * 10) / 10,

      // Distributions
      categoryMap,
      conditionMap,
      preferenceMap,

      // Centre count
      totalCentres: this.getCentres().length
    };
  }
};

// Initialize on script load
EcoStorage.init();

// Export to window
window.EcoStorage = EcoStorage;
