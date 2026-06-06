document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Loading Overlay ---
  const loadingOverlay = document.getElementById('loadingOverlay');
  setTimeout(() => {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 500);
  }, 1000);

  // --- 2. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // --- 3. Scroll Reveal Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // --- 4. Counter Animations ---
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute('data-target'));
        const decimals = parseInt(entry.target.getAttribute('data-decimals')) || 0;
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50; // 50 frames
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = current.toFixed(decimals) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target.toFixed(decimals) + suffix;
          }
        };
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.counter').forEach(element => {
    counterObserver.observe(element);
  });

  // --- 5. Probability Bars Animation ---
  const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.probability-fill').forEach(element => {
    barObserver.observe(element);
  });

  // --- 6. Tab Switching ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- 7. Chart.js Initializations ---
  Chart.defaults.color = 'rgba(255, 255, 255, 0.6)';
  Chart.defaults.font.family = "'Inter', sans-serif";

  // Batting Charts
  const ctxTopBatsmen = document.getElementById('topBatsmenChart')?.getContext('2d');
  if (ctxTopBatsmen) {
    new Chart(ctxTopBatsmen, {
      type: 'bar',
      data: {
        labels: ['V Kohli', 'B Azam', 'R Sharma', 'M Rizwan', 'D Warner', 'J Buttler', 'S Yadav', 'KL Rahul', 'M Guptill', 'A Finch'],
        datasets: [{
          label: 'Total Runs',
          data: [4008, 3485, 3853, 2797, 2894, 2713, 1675, 2265, 3531, 3120],
          backgroundColor: '#00d4ff',
          borderRadius: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }

  const ctxStrikeRate = document.getElementById('strikeRateChart')?.getContext('2d');
  if (ctxStrikeRate) {
    new Chart(ctxStrikeRate, {
      type: 'line',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Avg Strike Rate',
          data: [122, 125, 128, 131, 135],
          borderColor: '#00ff88',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(0, 255, 136, 0.1)'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxBattingAvg = document.getElementById('battingAvgChart')?.getContext('2d');
  if (ctxBattingAvg) {
    new Chart(ctxBattingAvg, {
      type: 'doughnut',
      data: {
        labels: ['> 40', '30 - 40', '20 - 30', '< 20'],
        datasets: [{
          data: [15, 35, 40, 10],
          backgroundColor: ['#a855f7', '#00d4ff', '#00ff88', '#f97316'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '70%' }
    });
  }

  // Bowling Charts
  const ctxTopWickets = document.getElementById('topWicketTakersChart')?.getContext('2d');
  if (ctxTopWickets) {
    new Chart(ctxTopWickets, {
      type: 'bar',
      data: {
        labels: ['T Southee', 'S Al Hasan', 'R Khan', 'I Sodhi', 'L Malinga', 'S Afridi', 'M Santner', 'C Jordan', 'A Rashid', 'B Kumar'],
        datasets: [{
          label: 'Wickets',
          data: [134, 136, 129, 114, 107, 98, 91, 96, 93, 90],
          backgroundColor: '#00ff88',
          borderRadius: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }

  const ctxEconomy = document.getElementById('economyRateChart')?.getContext('2d');
  if (ctxEconomy) {
    new Chart(ctxEconomy, {
      type: 'bar',
      data: {
        labels: ['Powerplay', 'Middle', 'Death'],
        datasets: [{
          label: 'Spinners',
          data: [6.8, 7.2, 8.5],
          backgroundColor: '#a855f7'
        }, {
          label: 'Pacers',
          data: [7.1, 7.8, 9.2],
          backgroundColor: '#00d4ff'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxRadar = document.getElementById('bowlingRadarChart')?.getContext('2d');
  if (ctxRadar) {
    new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: ['Wickets', 'Economy', 'Strike Rate', 'Dots %', 'Average'],
        datasets: [{
          label: 'Top 10 Avg',
          data: [85, 90, 80, 75, 88],
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.2)'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false }, grid: { color: 'rgba(255,255,255,0.1)' } } } }
    });
  }

  // Fielding & Team Charts
  const ctxCatch = document.getElementById('catchDistChart')?.getContext('2d');
  if (ctxCatch) {
    new Chart(ctxCatch, {
      type: 'pie',
      data: {
        labels: ['Slips', 'Outfield', 'Inner Circle', 'WK'],
        datasets: [{
          data: [15, 45, 25, 15],
          backgroundColor: ['#00d4ff', '#00ff88', '#a855f7', '#f97316'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxRunOut = document.getElementById('runOutChart')?.getContext('2d');
  if (ctxRunOut) {
    new Chart(ctxRunOut, {
      type: 'doughnut',
      data: {
        labels: ['Direct Hit', 'Relay'],
        datasets: [{
          data: [65, 35],
          backgroundColor: ['#f97316', '#a855f7'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '75%' }
    });
  }

  const ctxFielding = document.getElementById('fieldingImpactChart')?.getContext('2d');
  if (ctxFielding) {
    new Chart(ctxFielding, {
      type: 'bar',
      data: {
        labels: ['India', 'England', 'Australia', 'Pakistan', 'South Africa'],
        datasets: [{
          label: 'Impact Score',
          data: [88, 85, 92, 80, 90],
          backgroundColor: '#00d4ff',
          borderRadius: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Probability Charts
  const ctxWin = document.getElementById('winContributionChart')?.getContext('2d');
  if (ctxWin) {
    new Chart(ctxWin, {
      type: 'polarArea',
      data: {
        labels: ['Top Order', 'Middle Order', 'Pace', 'Spin'],
        datasets: [{
          data: [35, 25, 25, 15],
          backgroundColor: ['rgba(0, 212, 255, 0.7)', 'rgba(0, 255, 136, 0.7)', 'rgba(168, 85, 247, 0.7)', 'rgba(249, 115, 22, 0.7)'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false } } } }
    });
  }

  const ctxPlayer = document.getElementById('playerImpactChart')?.getContext('2d');
  if (ctxPlayer) {
    new Chart(ctxPlayer, {
      type: 'line',
      data: {
        labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
        datasets: [{
          label: 'Impact Trend',
          data: [65, 70, 68, 85, 92],
          borderColor: '#a855f7',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(168, 85, 247, 0.1)'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const ctxTeam = document.getElementById('teamStrengthChart')?.getContext('2d');
  if (ctxTeam) {
    new Chart(ctxTeam, {
      type: 'bar',
      data: {
        labels: ['Batting', 'Bowling', 'Fielding', 'Experience'],
        datasets: [{
          label: 'Team A',
          data: [85, 90, 80, 88],
          backgroundColor: '#00d4ff'
        }, {
          label: 'Team B',
          data: [80, 85, 92, 75],
          backgroundColor: '#00ff88'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

});
