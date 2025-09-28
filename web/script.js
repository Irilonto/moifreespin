const wheel = document.getElementById("wheel");
const resultDiv = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");
const confetti = document.getElementById("confetti");
const spinsTodayEl = document.getElementById("spinsToday");
const prizesWonEl = document.getElementById("prizesWon");

const prizes = [
  "🎁 Стикер Telegram",
  "💎 10 монет",
  "🔥 VIP на 1 день",
  "🍀 Удача на весь день!",
  "🎉 1 дополнительный спин",
  "⭐ Секретный сюрприз"
];

let spinning = false;
let spinsToday = 0;
let prizesWon = 0;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  loadStats();
});

function loadStats() {
  const savedSpins = localStorage.getItem('wheelSpinsToday');
  const savedPrizes = localStorage.getItem('wheelPrizesWon');
  const lastReset = localStorage.getItem('wheelLastReset');
  const today = new Date().toDateString();
  
  if (lastReset !== today) {
    spinsToday = 0;
    prizesWon = 0;
    localStorage.setItem('wheelLastReset', today);
  } else {
    spinsToday = parseInt(savedSpins) || 0;
    prizesWon = parseInt(savedPrizes) || 0;
  }
  
  updateStats();
}

function updateStats() {
  spinsTodayEl.textContent = spinsToday;
  prizesWonEl.textContent = prizesWon;
  localStorage.setItem('wheelSpinsToday', spinsToday);
  localStorage.setItem('wheelPrizesWon', prizesWon);
}

function spin() {
  if (spinning) return;
  
  spinning = true;
  spinBtn.disabled = true;
  resultDiv.textContent = "Крутим... 🎰";
  resultDiv.classList.remove("win");
  
  const sectorAngle = 360 / prizes.length;
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const extraSpins = 5;
  const stopAngle = 360 * extraSpins + (randomIndex * sectorAngle);
  
  wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
  wheel.style.transform = `rotate(${stopAngle}deg)`;
  
  setTimeout(() => {
    const prize = prizes[randomIndex];
    
    // Обновляем статистику
    spinsToday++;
    prizesWon++;
    updateStats();
    
    // Показываем результат
    resultDiv.textContent = `🎉 Поздравляем! Вы выиграли: ${prize}`;
    resultDiv.classList.add("win");
    
    // Создаем конфетти
    createConfetti();
    
    // Отправляем данные в Telegram
    if (window.Telegram && Telegram.WebApp) {
      Telegram.WebApp.sendData(prize);
    }
    
    spinning = false;
    spinBtn.disabled = false;
    
  }, 4000);
}

function createConfetti() {
  confetti.innerHTML = '';
  confetti.style.opacity = '1';
  
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
  
  for (let i = 0; i < 50; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: -20px;
      left: ${Math.random() * 100}%;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      animation: confettiFall ${1 + Math.random() * 2}s linear forwards;
    `;
    
    confetti.appendChild(confettiPiece);
  }
  
  setTimeout(() => {
    confetti.style.opacity = '0';
    setTimeout(() => {
      confetti.innerHTML = '';
    }, 2000);
  }, 3000);
}

// Добавляем стили для анимации конфетти
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);