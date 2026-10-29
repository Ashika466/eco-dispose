/**
 * EcoDispose - Analytics & Chart.js Visualizations
 * Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management
 */

const EcoCharts = {
  categoryChartInstance: null,
  conditionChartInstance: null,
  preferenceChartInstance: null,
  statusChartInstance: null,

  /**
   * Initialize or update all analytical charts and metric cards
   */
  init() {
    this.updateMetrics();
    this.renderCharts();

    // Re-render when data changes
    window.addEventListener('ecodispose:datachanged', () => {
      this.updateMetrics();
      this.renderCharts();
    });
  },

  /**
   * Update all numeric metric cards on both Home and Analytics pages
   */
  updateMetrics() {
    const stats = EcoStorage.getAnalytics();

    // Home Dashboard Cards
    const elHomeRequests = document.getElementById('stat-home-requests');
    const elHomeAppliances = document.getElementById('stat-home-appliances');
    const elHomeWeight = document.getElementById('stat-home-weight');
    const elHomeCentres = document.getElementById('stat-home-centres');

    if (elHomeRequests) elHomeRequests.textContent = stats.totalRequests;
    if (elHomeAppliances) elHomeAppliances.textContent = stats.totalAppliances;
    if (elHomeWeight) elHomeWeight.textContent = `${stats.totalReportedWeightKg.toLocaleString()} kg`;
    if (elHomeCentres) elHomeCentres.textContent = stats.totalCentres;

    // Analytics Dashboard Key Counters
    const elAnaRequests = document.getElementById('stat-ana-requests');
    const elAnaAppliances = document.getElementById('stat-ana-appliances');
    const elAnaWeightKg = document.getElementById('stat-ana-weight-kg');
    const elAnaWeightTonnes = document.getElementById('stat-ana-weight-tonnes');
    const elAnaAvgWeight = document.getElementById('stat-ana-avg-weight');

    if (elAnaRequests) elAnaRequests.textContent = stats.totalRequests;
    if (elAnaAppliances) elAnaAppliances.textContent = stats.totalAppliances;
    if (elAnaWeightKg) elAnaWeightKg.textContent = `${stats.totalReportedWeightKg.toLocaleString()} kg`;
    if (elAnaWeightTonnes) elAnaWeightTonnes.textContent = `${stats.totalReportedWeightTonnes} MT`;
    if (elAnaAvgWeight) elAnaAvgWeight.textContent = `${stats.averageWeightPerAppliance} kg`;

    // Transparency Audit Pipeline Breakdown
    // Strictly adheres to: "Distinguish reported, collected, and verified recycled waste. Never claim that reported waste has already been recycled."
    const elStageReported = document.getElementById('audit-stage-reported');
    const elStageTransit = document.getElementById('audit-stage-transit');
    const elStageCollected = document.getElementById('audit-stage-collected');
    const elStageRecycled = document.getElementById('audit-stage-recycled');

    if (elStageReported) elStageReported.textContent = `${stats.reportedOnlyWeightKg} kg`;
    if (elStageTransit) elStageTransit.textContent = `${stats.scheduledInTransitWeightKg} kg`;
    if (elStageCollected) elStageCollected.textContent = `${stats.collectedAtHubWeightKg} kg`;
    if (elStageRecycled) elStageRecycled.textContent = `${stats.verifiedRecycledWeightKg} kg`;
  },

  /**
   * Render Chart.js graphs
   */
  renderCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js library is not available. Charts will display textual tables.');
      return;
    }

    const stats = EcoStorage.getAnalytics();

    // 1. Category Distribution Chart (Doughnut)
    this.renderCategoryChart(stats);

    // 2. Appliance Condition Distribution Chart (Pie)
    this.renderConditionChart(stats);

    // 3. Preferred Disposal Channel Chart (Bar)
    this.renderPreferenceChart(stats);

    // 4. Request Status Pipeline Funnel (Horizontal Bar)
    this.renderStatusChart(stats);
  },

  renderCategoryChart(stats) {
    const ctx = document.getElementById('chart-categories')?.getContext('2d');
    if (!ctx) return;

    if (this.categoryChartInstance) {
      this.categoryChartInstance.destroy();
    }

    const labels = Object.keys(stats.categoryMap);
    const dataValues = labels.map(k => stats.categoryMap[k].count);
    const weightValues = labels.map(k => stats.categoryMap[k].weight);

    this.categoryChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Appliances Count',
          data: dataValues,
          backgroundColor: [
            '#059669', // Emerald
            '#10B981', // Green
            '#34D399', // Mint
            '#0284C7', // Sky
            '#F59E0B', // Amber
            '#8B5CF6'  // Purple
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { size: 11, family: 'Inter, system-ui, sans-serif' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const index = context.dataIndex;
                const count = dataValues[index];
                const weight = weightValues[index];
                return ` ${context.label}: ${count} units (${weight} kg)`;
              }
            }
          }
        },
        cutout: '62%'
      }
    });
  },

  renderConditionChart(stats) {
    const ctx = document.getElementById('chart-conditions')?.getContext('2d');
    if (!ctx) return;

    if (this.conditionChartInstance) {
      this.conditionChartInstance.destroy();
    }

    const labels = ['Working', 'Repairable', 'Damaged', 'Non-functional'];
    const dataValues = labels.map(l => stats.conditionMap[l] || 0);

    this.conditionChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: [
            '#10B981', // Working (green)
            '#3B82F6', // Repairable (blue)
            '#F59E0B', // Damaged (amber)
            '#EF4444'  // Non-functional (red)
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { size: 11, family: 'Inter, system-ui, sans-serif' }
            }
          }
        }
      }
    });
  },

  renderPreferenceChart(stats) {
    const ctx = document.getElementById('chart-preferences')?.getContext('2d');
    if (!ctx) return;

    if (this.preferenceChartInstance) {
      this.preferenceChartInstance.destroy();
    }

    const labels = ['Reuse', 'Repair', 'Authorized Collection', 'Recycling'];
    const dataValues = labels.map(l => stats.preferenceMap[l] || 0);

    this.preferenceChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Requests by Preferred Channel',
          data: dataValues,
          backgroundColor: '#047857',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0, font: { size: 11 } },
            grid: { color: '#f3f4f6' }
          },
          x: {
            ticks: { font: { size: 11 } },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  },

  renderStatusChart(stats) {
    const ctx = document.getElementById('chart-statuses')?.getContext('2d');
    if (!ctx) return;

    if (this.statusChartInstance) {
      this.statusChartInstance.destroy();
    }

    const labels = [
      'Submitted',
      'Verification Pending',
      'Scheduled for Pickup',
      'Received at Centre',
      'Recycled'
    ];
    const dataValues = labels.map(l => stats.statusMap[l] || 0);

    this.statusChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Active Demonstration Requests',
          data: dataValues,
          backgroundColor: [
            '#9CA3AF', // Submitted (Gray)
            '#FBBF24', // Verification Pending (Yellow)
            '#60A5FA', // Scheduled (Blue)
            '#34D399', // Received (Light Green)
            '#059669'  // Recycled (Deep Green)
          ],
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: { precision: 0, font: { size: 11 } },
            grid: { color: '#f3f4f6' }
          },
          y: {
            ticks: { font: { size: 10, weight: '500' } },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
};

window.EcoCharts = EcoCharts;
