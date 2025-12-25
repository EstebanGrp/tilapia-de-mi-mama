let fish = 0;
let food = 0;

const stats = document.getElementById("stats");
const tank = document.getElementById("fishContainer");

function updateStats() {
  stats.textContent = `Peces: ${fish} | Comida: ${food}`;
}

function createFish() {
  const f = document.createElement("div");
  f.className = "fish";
  f.textContent = Math.random() > 0.5 ? "🐟" : "🐠";
  f.style.top = Math.random() * 200 + "px";
  f.style.animationDuration = (4 + Math.random() * 4) + "s";
  tank.appendChild(f);
}

function addFish() {
  if (food >= 2) {
    food -= 2;
    fish++;
    createFish();
  } else {
    alert("❌ Necesitas 2 de comida");
  }
  updateStats();
}

function addFood() {
  food++;
  updateStats();
}

// reproducción automática
setInterval(() => {
  if (fish >= 2 && food >= 1) {
    food--;
    fish++;
    createFish();
  }
  updateStats();
}, 6000);

updateStats();
