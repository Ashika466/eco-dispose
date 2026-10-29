/**
 * EcoDispose - Main Application Controller & View Router
 * Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management
 */

const EcoApp = {
  currentView: 'home',

  init() {
    this.setupNavigation();
    this.setupForm();
    this.setupHistory();
    this.setupModals();
    this.setupQuickLinks();

    // Initialize dependent modules
    EcoMap.init();
    EcoCharts.init();
    EcoAwareness.init();

    // Route based on URL hash if provided
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'dispose', 'centres', 'guide', 'analytics', 'history', 'bcs508'].includes(hash)) {
      this.switchView(hash);
    } else {
      this.switchView('home');
    }

    // Refresh history view initially
    this.renderHistoryTable();
  },

  /**
   * SPA View Navigation
   */
  setupNavigation() {
    const navLinks = document.querySelectorAll('[data-view-target]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view-target');
        this.switchView(targetView);
      });
    });

    // Mobile Hamburger Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-nav-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Close menu when clicking a link
      mobileMenu.querySelectorAll('[data-view-target]').forEach(item => {
        item.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== this.currentView) {
        this.switchView(hash, false);
      }
    });
  },

  /**
   * Switch visible section
   */
  switchView(viewName, updateHash = true) {
    const validViews = ['home', 'dispose', 'centres', 'guide', 'analytics', 'history', 'bcs508'];
    if (!validViews.includes(viewName)) viewName = 'home';

    this.currentView = viewName;

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    // Show active view
    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) {
      activeSection.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav links
    document.querySelectorAll('[data-view-target]').forEach(link => {
      if (link.getAttribute('data-view-target') === viewName) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });

    if (updateHash) {
      window.location.hash = viewName;
    }

    // Module-specific refreshes
    if (viewName === 'centres' && EcoMap.mapInstance) {
      setTimeout(() => {
        EcoMap.mapInstance.invalidateSize();
      }, 250);
    } else if (viewName === 'analytics') {
      setTimeout(() => {
        EcoCharts.renderCharts();
      }, 150);
    } else if (viewName === 'history') {
      this.renderHistoryTable();
    }
  },

  /**
   * Setup Quick Links & CTA Buttons
   */
  setupQuickLinks() {
    document.querySelectorAll('.btn-cta-dispose').forEach(b => {
      b.addEventListener('click', () => this.switchView('dispose'));
    });
    document.querySelectorAll('.btn-cta-centres').forEach(b => {
      b.addEventListener('click', () => this.switchView('centres'));
    });
    document.querySelectorAll('.btn-cta-guide').forEach(b => {
      b.addEventListener('click', () => this.switchView('guide'));
    });
  },

  /**
   * Setup Appliance Disposal Form with Validation & Smart Hints
   */
  setupForm() {
    const form = document.getElementById('appliance-disposal-form');
    const categorySelect = document.getElementById('form-category');
    const weightHint = document.getElementById('weight-suggestion-hint');
    const weightInput = document.getElementById('form-weight');

    if (!form) return;

    // Suggest default approximate weight on category selection
    if (categorySelect && weightHint && weightInput) {
      categorySelect.addEventListener('change', () => {
        const catName = categorySelect.value;
        const catMeta = window.ECO_DATA.categories.find(c => c.name === catName);
        if (catMeta) {
          weightHint.innerHTML = `💡 Typical estimated weight: <strong>~${catMeta.typicalWeightKg} kg</strong>. <em>(${catMeta.examples})</em>`;
          if (!weightInput.value || weightInput.value === '0') {
            weightInput.value = catMeta.typicalWeightKg;
          }
        } else {
          weightHint.textContent = '';
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form validation
      const category = document.getElementById('form-category')?.value;
      const description = document.getElementById('form-description')?.value;
      const brand = document.getElementById('form-brand')?.value;
      const quantity = parseInt(document.getElementById('form-quantity')?.value, 10);
      const weightKg = parseFloat(document.getElementById('form-weight')?.value);
      const condition = document.getElementById('form-condition')?.value;
      const disposalPreference = document.getElementById('form-preference')?.value;
      const pickupOption = document.querySelector('input[name="pickupOption"]:checked')?.value || 'Doorstep Pickup';
      const area = document.getElementById('form-area')?.value;
      const pincode = document.getElementById('form-pincode')?.value;
      const contactName = document.getElementById('form-name')?.value;
      const contactPhone = document.getElementById('form-phone')?.value;
      const notes = document.getElementById('form-notes')?.value;

      // Validation checks
      if (!category) {
        this.showToast('Please select an appliance category.', 'error');
        return;
      }
      if (!description || description.trim().length < 3) {
        this.showToast('Please provide a specific appliance description (e.g. Model, Type).', 'error');
        return;
      }
      if (!quantity || quantity < 1) {
        this.showToast('Quantity must be at least 1.', 'error');
        return;
      }
      if (!weightKg || weightKg <= 0) {
        this.showToast('Please enter a valid approximate weight in kilograms.', 'error');
        return;
      }
      if (!condition) {
        this.showToast('Please select the current working condition of the appliance.', 'error');
        return;
      }
      if (!disposalPreference) {
        this.showToast('Please select your preferred disposal channel.', 'error');
        return;
      }
      if (!area || area.trim().length < 2) {
        this.showToast('Please enter your area or locality name.', 'error');
        return;
      }
      if (!pincode || !/^\d{6}$/.test(pincode.trim())) {
        this.showToast('Please enter a valid 6-digit PIN code (e.g., 560001).', 'error');
        return;
      }

      // Save to LocalStorage
      const createdRecord = EcoStorage.createRequest({
        category,
        description,
        brand,
        quantity,
        weightKg,
        condition,
        disposalPreference,
        pickupOption,
        area,
        pincode,
        contactName,
        contactPhone,
        notes
      });

      // Reset form
      form.reset();
      if (weightHint) weightHint.textContent = '';

      // Open Success Modal with generated Request ID
      this.showConfirmationModal(createdRecord);
    });
  },

  /**
   * Confirmation Modal Dialog
   */
  showConfirmationModal(record) {
    const modal = document.getElementById('confirmation-modal');
    const idEl = document.getElementById('confirm-modal-req-id');
    const detailsEl = document.getElementById('confirm-modal-details');

    if (!modal) return;

    if (idEl) idEl.textContent = record.id;
    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="confirm-summary-box">
          <p><strong>Appliance:</strong> ${record.description} (${record.quantity} unit${record.quantity > 1 ? 's' : ''}, ~${record.weightKg} kg)</p>
          <p><strong>Category:</strong> ${record.category}</p>
          <p><strong>Condition:</strong> ${record.condition} | <strong>Preferred:</strong> ${record.disposalPreference}</p>
          <p><strong>Location:</strong> ${record.area}, PIN: ${record.pincode} (${record.pickupOption})</p>
          <div class="confirm-academic-alert">
            ℹ️ <strong>Academic Prototype Note:</strong> This demonstration request has been saved to your browser's LocalStorage and will not dispatch real collection vehicles. You can track, update, or inspect it under the Request History tab.
          </div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  },

  /**
   * Setup Request History Table, Search, and Live Filtering
   */
  setupHistory() {
    const searchInput = document.getElementById('history-search-input');
    const categoryFilter = document.getElementById('history-category-filter');
    const statusFilter = document.getElementById('history-status-filter');
    const resetDataBtn = document.getElementById('history-reset-demo-btn');

    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderHistoryTable());
    }
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => this.renderHistoryTable());
    }
    if (statusFilter) {
      statusFilter.addEventListener('change', () => this.renderHistoryTable());
    }

    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Reset database back to default demonstration records? Any user-created demo requests will be replaced with clean sample records.')) {
          EcoStorage.resetToDefault();
          this.renderHistoryTable();
          this.showToast('Database reset to original BCS508 academic demonstration state.', 'success');
        }
      });
    }

    // Export history to CSV button
    const exportBtn = document.getElementById('history-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportHistoryCSV());
    }
  },

  /**
   * Render Request History Table
   */
  renderHistoryTable() {
    const tbody = document.getElementById('history-table-body');
    const emptyMsg = document.getElementById('history-empty-state');
    const countBadge = document.getElementById('history-count-badge');

    if (!tbody) return;

    const query = document.getElementById('history-search-input')?.value.toLowerCase().trim() || '';
    const cat = document.getElementById('history-category-filter')?.value || 'ALL';
    const status = document.getElementById('history-status-filter')?.value || 'ALL';

    const allRequests = EcoStorage.getAllRequests();

    const filtered = allRequests.filter(req => {
      const matchSearch = !query ||
        req.id.toLowerCase().includes(query) ||
        req.description.toLowerCase().includes(query) ||
        req.area.toLowerCase().includes(query) ||
        req.pincode.includes(query) ||
        (req.contactName && req.contactName.toLowerCase().includes(query));

      const matchCat = cat === 'ALL' || req.category === cat;
      const matchStatus = status === 'ALL' || req.status === status;

      return matchSearch && matchCat && matchStatus;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Requests`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
      return;
    }

    if (emptyMsg) emptyMsg.classList.add('hidden');

    tbody.innerHTML = filtered.map(req => {
      const dateFormatted = new Date(req.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const statusBadges = {
        'Submitted': 'status-badge-submitted',
        'Verification Pending': 'status-badge-pending',
        'Scheduled for Pickup': 'status-badge-scheduled',
        'Received at Centre': 'status-badge-received',
        'Recycled': 'status-badge-recycled'
      };

      const badgeClass = statusBadges[req.status] || 'status-badge-submitted';

      return `
        <tr>
          <td class="font-mono text-xs font-bold text-emerald-800">
            ${req.id}
          </td>
          <td class="text-xs text-gray-500 whitespace-nowrap">
            ${dateFormatted}
          </td>
          <td>
            <div class="font-medium text-gray-900">${req.description}</div>
            <div class="text-xs text-gray-500">${req.category} (${req.brand || 'Assorted'})</div>
          </td>
          <td class="text-xs text-gray-700">
            ${req.quantity} unit${req.quantity > 1 ? 's' : ''} / <span class="font-semibold">${req.weightKg} kg</span>
          </td>
          <td class="text-xs text-gray-700">
            <div>${req.area}</div>
            <span class="text-gray-400 font-mono">${req.pincode}</span>
          </td>
          <td>
            <span class="status-badge ${badgeClass}">${req.status}</span>
          </td>
          <td class="text-right whitespace-nowrap">
            <button class="btn-action-view" onclick="EcoApp.viewRequestDetails('${req.id}')" title="View Details and Audit Timeline">
              🔍 Inspect
            </button>
            <button class="btn-action-advance" onclick="EcoApp.promptAdvanceStatus('${req.id}', '${req.status}')" title="Advance Stage (Simulate Lifecycle)">
              ⚙️ Advance
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  /**
   * View full request details modal with timeline
   */
  viewRequestDetails(id) {
    const req = EcoStorage.getRequestById(id);
    if (!req) return;

    const modal = document.getElementById('details-modal');
    const content = document.getElementById('details-modal-content');
    if (!modal || !content) return;

    const dateFormatted = new Date(req.date).toLocaleString('en-IN');

    const timelineHtml = (req.timeline || []).map((t, idx) => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="flex items-center justify-between">
            <span class="timeline-status">${t.status}</span>
            <span class="timeline-date">${new Date(t.timestamp).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <p class="timeline-note">${t.note}</p>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="modal-req-header">
        <div>
          <span class="font-mono text-emerald-800 font-bold text-lg">${req.id}</span>
          <p class="text-xs text-gray-500">Submitted: ${dateFormatted}</p>
        </div>
        <span class="status-badge status-badge-recycled">${req.status}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 bg-gray-50 p-4 rounded-lg text-sm">
        <div>
          <p class="mb-1"><strong>Appliance:</strong> ${req.description}</p>
          <p class="mb-1"><strong>Category:</strong> ${req.category}</p>
          <p class="mb-1"><strong>Brand:</strong> ${req.brand}</p>
          <p class="mb-1"><strong>Quantity:</strong> ${req.quantity} unit(s)</p>
          <p><strong>Reported Weight:</strong> ${req.weightKg} kg</p>
        </div>
        <div>
          <p class="mb-1"><strong>Physical Condition:</strong> ${req.condition}</p>
          <p class="mb-1"><strong>Disposal Preference:</strong> ${req.disposalPreference}</p>
          <p class="mb-1"><strong>Logistics Channel:</strong> ${req.pickupOption}</p>
          <p class="mb-1"><strong>Area & PIN:</strong> ${req.area}, ${req.pincode}</p>
          <p><strong>Contact Person:</strong> ${req.contactName} (${req.contactPhone})</p>
        </div>
      </div>

      <div class="mb-4">
        <strong class="text-sm text-gray-700">Special Handling Instructions / Notes:</strong>
        <p class="text-xs text-gray-600 bg-white border border-gray-200 p-2 rounded mt-1">${req.notes || 'None'}</p>
      </div>

      <div class="mb-4">
        <strong class="text-sm text-gray-700">Audit & Custody Timeline:</strong>
        <div class="timeline-container mt-2">
          ${timelineHtml}
        </div>
      </div>

      <div class="modal-footer-actions">
        <button class="btn btn-secondary-sm" onclick="EcoApp.printDisposalSlip('${req.id}')">
          🖨️ Print Disposal Slip
        </button>
        <button class="btn btn-outline-sm" onclick="EcoApp.promptAdvanceStatus('${req.id}', '${req.status}')">
          ⚙️ Update Stage
        </button>
        <button class="btn btn-primary-sm" onclick="document.getElementById('details-modal').classList.add('hidden')">
          Close
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
  },

  /**
   * Interactive status advancement dialog for faculty demonstration
   */
  promptAdvanceStatus(id, currentStatus) {
    const stages = [
      'Submitted',
      'Verification Pending',
      'Scheduled for Pickup',
      'Received at Centre',
      'Recycled'
    ];

    const currentIndex = stages.indexOf(currentStatus);
    const nextStage = currentIndex < stages.length - 1 ? stages[currentIndex + 1] : stages[0];

    const chosen = prompt(
      `Advance lifecycle status for ${id}:\n\n` +
      `Current: "${currentStatus}"\n\n` +
      `Enter new status:\n` +
      `1. Submitted\n` +
      `2. Verification Pending\n` +
      `3. Scheduled for Pickup\n` +
      `4. Received at Centre\n` +
      `5. Recycled\n\n` +
      `(Or type the status name):`,
      nextStage
    );

    if (!chosen) return;

    let targetStatus = chosen.trim();
    if (chosen === '1') targetStatus = 'Submitted';
    else if (chosen === '2') targetStatus = 'Verification Pending';
    else if (chosen === '3') targetStatus = 'Scheduled for Pickup';
    else if (chosen === '4') targetStatus = 'Received at Centre';
    else if (chosen === '5') targetStatus = 'Recycled';

    if (!stages.includes(targetStatus)) {
      alert('Invalid status selection. Please select one of the 5 standard stages.');
      return;
    }

    const note = prompt(`Enter optional audit note for this transition:`, `Demonstration milestone transition to ${targetStatus}`);

    EcoStorage.updateStatus(id, targetStatus, note || undefined);
    this.renderHistoryTable();
    this.showToast(`Request ${id} transitioned to "${targetStatus}".`, 'success');

    // If details modal is open, refresh it
    const detailsModal = document.getElementById('details-modal');
    if (detailsModal && !detailsModal.classList.contains('hidden')) {
      this.viewRequestDetails(id);
    }
  },

  /**
   * Print or save disposal slip
   */
  printDisposalSlip(id) {
    const req = EcoStorage.getRequestById(id);
    if (!req) return;

    const printWin = window.open('', '_blank', 'width=750,height=800');
    if (!printWin) {
      alert('Please allow popups to generate the printable disposal slip.');
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>EcoDispose Receipt - ${req.id}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1f2937; line-height: 1.5; }
          .header { border-bottom: 2px solid #047857; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
          .brand { font-size: 22px; font-weight: bold; color: #047857; }
          .tagline { font-size: 11px; color: #6b7280; }
          .req-id { font-size: 18px; font-weight: bold; font-family: monospace; color: #064e3b; background: #ecfdf5; padding: 4px 10px; border-radius: 4px; border: 1px solid #a7f3d0; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; font-size: 13px; }
          .box { background: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
          .box h4 { margin: 0 0 8px; color: #047857; font-size: 14px; }
          .box p { margin: 4px 0; }
          .qr-placeholder { text-align: center; border: 1px dashed #9ca3af; padding: 15px; border-radius: 6px; font-size: 12px; color: #4b5563; }
          .footer { margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 12px; font-size: 11px; color: #6b7280; text-align: center; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 15px; text-align: right;">
          <button onclick="window.print()" style="background: #047857; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 600;">Print Receipt / Save as PDF</button>
        </div>
        <div class="header">
          <div>
            <div class="brand">♻️ EcoDispose Platform</div>
            <div class="tagline">Dispose Responsibly. Recycle Sustainably. | BCS508 Academic Project</div>
          </div>
          <div class="req-id">${req.id}</div>
        </div>

        <div class="grid">
          <div class="box">
            <h4>Appliance Details</h4>
            <p><strong>Item:</strong> ${req.description}</p>
            <p><strong>Category:</strong> ${req.category}</p>
            <p><strong>Brand / Model:</strong> ${req.brand}</p>
            <p><strong>Quantity:</strong> ${req.quantity} unit(s)</p>
            <p><strong>Approx Weight:</strong> ${req.weightKg} kg</p>
            <p><strong>Condition:</strong> ${req.condition}</p>
          </div>
          <div class="box">
            <h4>Disposal Logistics & Route</h4>
            <p><strong>Preference:</strong> ${req.disposalPreference}</p>
            <p><strong>Pickup Channel:</strong> ${req.pickupOption}</p>
            <p><strong>Area:</strong> ${req.area}, PIN: ${req.pincode}</p>
            <p><strong>Contact:</strong> ${req.contactName} (${req.contactPhone})</p>
            <p><strong>Current Status:</strong> ${req.status}</p>
            <p><strong>Logged On:</strong> ${new Date(req.date).toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div class="box" style="margin-bottom: 20px;">
          <h4>Handling & De-manufacturing Notice</h4>
          <p style="font-size: 12px; color: #374151;">${req.notes}</p>
          <p style="font-size: 11px; color: #6b7280; margin-top: 6px;">Consignment to be handed over exclusively to KSPCB/CPCB registered authorized dismantlers and collection centers.</p>
        </div>

        <div class="qr-placeholder">
          [ SIMULATED SECURE QR TRACKING MANIFEST CODE: ${req.id} | BCS508-KSPCB-VERIFIED ]
        </div>

        <div class="footer">
          Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management Assignment<br>
          This document is generated by the EcoDispose demonstration prototype.
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
  },

  /**
   * Export all history records as CSV
   */
  exportHistoryCSV() {
    const requests = EcoStorage.getAllRequests();
    if (requests.length === 0) {
      alert('No requests to export.');
      return;
    }

    const headers = ['Request ID', 'Date', 'Category', 'Description', 'Brand', 'Quantity', 'Weight (kg)', 'Condition', 'Disposal Preference', 'Logistics', 'Area', 'PIN', 'Status', 'Contact Name'];
    const rows = requests.map(r => [
      `"${r.id}"`,
      `"${new Date(r.date).toISOString()}"`,
      `"${r.category}"`,
      `"${r.description.replace(/"/g, '""')}"`,
      `"${r.brand}"`,
      r.quantity,
      r.weightKg,
      `"${r.condition}"`,
      `"${r.disposalPreference}"`,
      `"${r.pickupOption}"`,
      `"${r.area}"`,
      `"${r.pincode}"`,
      `"${r.status}"`,
      `"${r.contactName}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecodispose_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Setup modal close event listeners
   */
  setupModals() {
    // Confirmation modal close
    document.querySelectorAll('.close-confirm-modal').forEach(b => {
      b.addEventListener('click', () => {
        document.getElementById('confirmation-modal')?.classList.add('hidden');
      });
    });

    // View history from confirmation modal
    document.getElementById('confirm-modal-view-history')?.addEventListener('click', () => {
      document.getElementById('confirmation-modal')?.classList.add('hidden');
      this.switchView('history');
    });

    // Details modal close
    document.querySelectorAll('.close-details-modal').forEach(b => {
      b.addEventListener('click', () => {
        document.getElementById('details-modal')?.classList.add('hidden');
      });
    });
  },

  /**
   * Lightweight toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `eco-toast eco-toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Global startup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  EcoApp.init();
});

window.EcoApp = EcoApp;
