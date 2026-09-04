// 1. MODO CLARO / OSCURO AUTOMÁTICO SEGÚN LA HORA DEL DÍA
function checkAutoTheme() {
  const currentHour = new Date().getHours();
  // Modo oscuro de 20:00 a 07:00, modo claro el resto del día
  const isNight = currentHour >= 20 || currentHour < 7;
  const theme = isNight ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', theme);
  const iconBtn = document.getElementById('theme-indicator');
  if (iconBtn) {
    iconBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  }
}

// 2. ESTADO GLOBAL Y PERSISTENCIA
let habits = JSON.parse(localStorage.getItem('aether_habits')) || [
  { id: '1', name: 'Meditación Mañanera', color: '#8b5cf6', records: {} },
  { id: '2', name: 'Ejercicio Físico', color: '#ef4444', records: {} }
];

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  checkAutoTheme();
  renderMatrix();
});

function saveState() {
  localStorage.setItem('aether_habits', JSON.stringify(habits));
}

// 3. RENDERIZADO DE LA MATRIZ DE HÁBITOS
function renderMatrix() {
  const container = document.getElementById('habit-matrix');
  container.innerHTML = '';

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  habits.forEach(habit => {
    let rowHTML = `<div class="grid-row"><div class="habit-cell">${habit.name}</div>`;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month}-${day}`;
      const isCompleted = habit.records[dateKey] === 'completed';
      
      rowHTML += `
        <div class="day-cell" onclick="toggleDay('${habit.id}', '${dateKey}')">
          <div class="status-box ${isCompleted ? 'completed' : ''}"></div>
        </div>
      `;
    }
    rowHTML += `</div>`;
    container.innerHTML += rowHTML;
  });
}

function toggleDay(habitId, dateKey) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  if (habit.records[dateKey] === 'completed') {
    delete habit.records[dateKey];
  } else {
    habit.records[dateKey] = 'completed';
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
  }

  saveState();
  renderMatrix();
}

function addSampleHabit() {
  const name = prompt("Nombre del nuevo hábito:");
  if (name) {
    habits.push({ id: Date.now().toString(), name, records: {} });
    saveState();
    renderMatrix();
  }
}

// 4. NAVEGACIÓN Y TEMA
function switchTab(tabId, element) {
  document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  element.classList.add('active');
  document.getElementById('view-title').innerText = tabId === 'dashboard' ? 'Panel Principal' : 'Widget iOS / Mac';
}

function toggleThemeManually() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('theme-indicator').innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}
