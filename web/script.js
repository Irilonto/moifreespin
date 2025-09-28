const wheel = document.getElementById("wheel");
const resultDiv = document.getElementById("result");

const prizes = [
  "🎁 Стикер Telegram",
  "💎 10 монет",
  "🔥 VIP на 1 день",
  "🍀 Ничего :)",
  "🎉 1 дополнительный спин",
  "⭐ Сюрприз"
];

let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;

  const sectorAngle = 360 / prizes.length;
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const stopAngle = 360 * 5 + (randomIndex * sectorAngle) + sectorAngle / 2;

  wheel.style.transition = "transform 5s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
  wheel.style.transform = `rotate(${stopAngle}deg)`;

  setTimeout(() => {
    const prize = prizes[randomIndex];
    resultDiv.innerText = "Выпало: " + prize;
    Telegram.WebApp.sendData(prize);
    spinning = false;
  }, 5000);
}
