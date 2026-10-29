/**
 * EcoDispose - Recycling Centre Locator & Leaflet Map Controller
 * Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management
 */

const EcoMap = {
  mapInstance: null,
  markersLayer: null,
  centres: [],
  activeCategoryFilter: 'ALL',
  searchQuery: '',

  /**
   * Initialize map and UI components
   */
  init() {
    this.centres = EcoStorage.getCentres();
    this.renderCentreCards(this.centres);

    // Initialize Leaflet Map if container exists
    const mapContainer = document.getElementById('map-view');
    if (!mapContainer) return;

    if (typeof L === 'undefined') {
      console.warn('Leaflet library not loaded. Falling back to card list.');
      this.showMapFallback('Interactive map engine could not be loaded from CDN. Showing verified centre directory below.');
      return;
    }

    try {
      // Default center: Bengaluru / Karnataka
      this.mapInstance = L.map('map-view', {
        scrollWheelZoom: false,
        attributionControl: true
      }).setView([12.9716, 77.5946], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | EcoDispose BCS508',
        maxZoom: 18
      }).addTo(this.mapInstance);

      this.markersLayer = L.layerGroup().addTo(this.mapInstance);
      this.populateMarkers(this.centres);

      // Fix Leaflet sizing when displayed in dynamic layouts
      setTimeout(() => {
        if (this.mapInstance) this.mapInstance.invalidateSize();
      }, 400);

    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
      this.showMapFallback('Unable to load map tiles in current environment. Comprehensive facility details are available below.');
    }

    this.bindEvents();
  },

  /**
   * Bind search and filter events
   */
  bindEvents() {
    const searchInput = document.getElementById('centre-search-input');
    const categorySelect = document.getElementById('centre-category-filter');
    const typeSelect = document.getElementById('centre-type-filter');
    const resetBtn = document.getElementById('centre-reset-filter');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.applyFilters();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.activeCategoryFilter = e.target.value;
        this.applyFilters();
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', () => {
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (categorySelect) categorySelect.value = 'ALL';
        if (typeSelect) typeSelect.value = 'ALL';
        this.searchQuery = '';
        this.activeCategoryFilter = 'ALL';
        this.applyFilters();
      });
    }
  },

  /**
   * Apply search and dropdown filters
   */
  applyFilters() {
    const typeFilter = document.getElementById('centre-type-filter')?.value || 'ALL';

    const filtered = this.centres.filter(centre => {
      // Search query check (name, address, area, pincode, registration)
      const matchesSearch = !this.searchQuery ||
        centre.name.toLowerCase().includes(this.searchQuery) ||
        centre.area.toLowerCase().includes(this.searchQuery) ||
        centre.pincode.includes(this.searchQuery) ||
        centre.address.toLowerCase().includes(this.searchQuery) ||
        centre.registrationNo.toLowerCase().includes(this.searchQuery);

      // Category check
      const matchesCategory = this.activeCategoryFilter === 'ALL' ||
        centre.acceptedCategories.includes(this.activeCategoryFilter);

      // Type check
      const matchesType = typeFilter === 'ALL' ||
        centre.type.toLowerCase().includes(typeFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesType;
    });

    this.populateMarkers(filtered);
    this.renderCentreCards(filtered);

    // Update result count indicator
    const countBadge = document.getElementById('centre-result-count');
    if (countBadge) {
      countBadge.textContent = `${filtered.length} Facilities Found`;
    }
  },

  /**
   * Add markers to Leaflet map
   */
  populateMarkers(centresList) {
    if (!this.mapInstance || !this.markersLayer) return;

    this.markersLayer.clearLayers();

    if (centresList.length === 0) return;

    const bounds = [];

    centresList.forEach(centre => {
      // Custom green SVG eco pin icon
      const customIcon = L.divIcon({
        className: 'eco-map-marker',
        html: `
          <div style="background-color: #047857; color: white; border: 2px solid #ffffff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.25); font-size: 16px; cursor: pointer;">
            ♻️
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
      });

      const popupHtml = `
        <div class="map-popup-card">
          <div class="popup-badge">${centre.verificationSource}</div>
          <h4 style="margin: 6px 0 4px; color: #064e3b; font-size: 15px; font-weight: 700;">${centre.name}</h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: #6b7280;">Reg: <strong>${centre.registrationNo}</strong></p>
          <p style="margin: 0 0 6px; font-size: 12px; color: #374151;">📍 ${centre.address} (PIN: ${centre.pincode})</p>
          <p style="margin: 0 0 6px; font-size: 12px; color: #374151;">📞 <strong>${centre.phone}</strong> | ✉️ ${centre.email}</p>
          <p style="margin: 0 0 8px; font-size: 11px; color: #047857;">⏱ ${centre.hours}</p>
          <div style="margin-bottom: 8px;">
            <strong style="font-size: 11px; color: #111827;">Accepted Categories:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
              ${centre.acceptedCategories.map(c => `<span style="font-size: 10px; background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 4px; border: 1px solid #a7f3d0;">${c}</span>`).join('')}
            </div>
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}" target="_blank" rel="noopener noreferrer" class="btn-popup-directions">
            🚗 Get Driving Directions
          </a>
        </div>
      `;

      const marker = L.marker([centre.lat, centre.lng], { icon: customIcon })
        .bindPopup(popupHtml, { maxWidth: 320 });

      this.markersLayer.addLayer(marker);
      bounds.push([centre.lat, centre.lng]);
    });

    if (bounds.length > 0 && this.mapInstance) {
      this.mapInstance.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  },

  /**
   * Pan to a specific centre on map
   */
  focusCentre(centreId) {
    const centre = this.centres.find(c => c.id === centreId);
    if (!centre || !this.mapInstance) return;

    this.mapInstance.setView([centre.lat, centre.lng], 14, { animate: true });

    // Open popup
    if (this.markersLayer) {
      this.markersLayer.eachLayer(layer => {
        const latLng = layer.getLatLng();
        if (Math.abs(latLng.lat - centre.lat) < 0.0001 && Math.abs(latLng.lng - centre.lng) < 0.0001) {
          layer.openPopup();
        }
      });
    }

    // Scroll map into view gently
    const mapEl = document.getElementById('map-view');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  /**
   * Render recycling centre card list
   */
  renderCentreCards(centresList) {
    const container = document.getElementById('centre-cards-grid');
    if (!container) return;

    if (centresList.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card col-span-full">
          <div class="empty-icon">🔍</div>
          <h3>No Facilities Found Matching Your Search</h3>
          <p>Try searching with a broader keyword (e.g. "Peenya", "Bengaluru", "Whitefield") or reset your filters.</p>
          <button class="btn btn-secondary mt-3" onclick="document.getElementById('centre-reset-filter').click()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = centresList.map(c => `
      <div class="centre-card">
        <div class="centre-card-header">
          <div>
            <span class="centre-type-badge">${c.type}</span>
            <h3 class="centre-name">${c.name}</h3>
            <span class="centre-reg">Reg No: <strong>${c.registrationNo}</strong></span>
          </div>
          <span class="verified-pill" title="${c.verificationSource}">✓ KSPCB/CPCB Registered</span>
        </div>

        <div class="centre-card-body">
          <p class="centre-address">
            <span class="icon">📍</span>
            <span>${c.address} <strong class="text-emerald-700">(${c.pincode})</strong></span>
          </p>
          <div class="centre-contact-grid">
            <p><span>📞</span> <a href="tel:${c.phone.replace(/\\s+/g, '')}">${c.phone}</a></p>
            <p><span>✉️</span> <a href="mailto:${c.email}">${c.email}</a></p>
          </div>
          <p class="centre-hours"><span>⏱</span> ${c.hours}</p>

          <div class="centre-categories">
            <div class="categories-title">Accepted Materials:</div>
            <div class="pill-cloud">
              ${c.acceptedCategories.map(cat => `<span class="cat-pill">${cat}</span>`).join('')}
            </div>
          </div>

          <div class="centre-notes">
            <strong>Facility Note:</strong> ${c.notes}
          </div>
        </div>

        <div class="centre-card-footer">
          <button class="btn btn-outline-sm" onclick="EcoMap.focusCentre('${c.id}')">
            🎯 View on Map
          </button>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-sm">
            🚗 Directions
          </a>
        </div>
      </div>
    `).join('');
  },

  /**
   * Display graceful fallback message if Leaflet map fails
   */
  showMapFallback(message) {
    const container = document.getElementById('map-view');
    if (!container) return;
    container.innerHTML = `
      <div class="map-fallback-banner">
        <div class="text-3xl mb-2">🗺️</div>
        <h4 style="font-weight: 700; color: #065f46;">Interactive Map Fallback Mode</h4>
        <p style="color: #4b5563; font-size: 13px; max-width: 500px; margin: 4px auto 12px;">${message}</p>
        <p style="font-size: 12px; color: #047857; font-weight: 600;">You can still search, filter, and inspect all ${this.centres.length} authorized Karnataka facilities below.</p>
      </div>
    `;
  }
};

window.EcoMap = EcoMap;
