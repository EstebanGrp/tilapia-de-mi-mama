const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

// ================= IMÁGENES =================
const sprites = new Image();
sprites.src = "spritesheet.png";

const aquarium = new Image();
aquarium.src = "aquarium1.png";

// ================= CONFIG =================
const FISH_X = 111;
const FISH_Y = 143;
const FISH_W = 528;
const FISH_H = 228;
const FRAMES = 3;

const SCALE = 0.22;
const MAX_FISH = 12;

// ================= ESTADO =================
let fish = [];
let bubbles = [];
let food = 3;
let temp = 1; // 0 frío | 1 ok | 2 caliente

// ================= UTIL =================
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// ================= PECES =================
function spawnFish(x, y, mutated = false) {
  return {
    x,
    y,
    dir: Math.random() > 0.5 ? 1 : -1,
    speed: rand(0.3, 0.8),
    frame: Math.floor(Math.random() * FRAMES),
    alive: true,
    hunger: 100,
    mutated
  };
}

// ================= CARGA =================
function loadGame() {
  const data = localStorage.getItem("tilapia-save");
  if (data) {
    const parsed = JSON.parse(data);
    fish = parsed.fish;
    food = parsed.food;
  } else {
    fish = [
      spawnFish(60, 140),
      spawnFish(200, 120),
      spawnFish(340, 160)
    ];
  }
}

// ================= GUARDADO =================
function saveGame() {
  localStorage.setItem("tilapia-save", JSON.stringify({
    fish,
    food
  }));
}

// ================= COMIDA =================
function feed() {
  food += 1;
}

// ================= DIBUJO =================
function drawFish(f) {
  const w = FISH_W * SCALE;
  const h = FISH_H * SCALE;

  ctx.save();
  ctx.translate(f.x + w / 2, f.y + h / 2);
  ctx.scale(f.dir, 1);

  ctx.drawImage(
    sprites,
    FISH_X + f.frame * FISH_W,
    FISH_Y,
    FISH_W,
    FISH_H,
    -w / 2,
    -h / 2,
    w,
    h
  );

  // mutación visual
  if (f.mutated) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "lime";
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawThermometer() {
  ctx.drawImage(
    sprites,
    0,
    371 + temp * 256,
    128,
    256,
    440,
    30,
    48,
    96
  );
}

// ================= BURBUJAS =================
function spawnBubble() {
  bubbles.push({
    x: rand(20, canvas.width - 20),
    y: canvas.height + 10,
    r: rand(3, 6),
    speed: rand(0.5, 1.2)
  });
}

function drawBubbles() {
  ctx.fillStyle = "rgba(200,255,255,0.5)";
  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    b.y -= b.speed;
  });

  bubbles = bubbles.filter(b => b.y > -10);
}

// ================= IA =================
function updateFish(f) {
  if (!f.alive) return;

  f.hunger -= 0.03;

  // hambre mata
  if (f.hunger <= 0) f.alive = false;

  // temperatura mata
  if (temp === 2 && Math.random() < 0.002) {
    f.alive = false;
  }

  // movimiento
  f.x += f.speed * f.dir;

  // rebote
  if (f.x < 10 || f.x > canvas.width - 100) {
    f.dir *= -1;
  }

  // animación
  f.frame = (f.frame + 1) % FRAMES;

  // reproducción
  if (food > 0 && Math.random() < 0.0008 && fish.length < MAX_FISH) {
    food--;
    fish.push(
      spawnFish(f.x, f.y, Math.random() < 0.15)
    );
  }
}

// ================= LOOP =================
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(aquarium, 0, 0, canvas.width, canvas.height);

  fish.forEach(f => {
    updateFish(f);
    if (f.alive) drawFish(f);
  });

  if (Math.random() < 0.06) spawnBubble();
  drawBubbles();

  drawThermometer();

  info.textContent =
    `🐟 ${fish.filter(f => f.alive).length} vivos | 🍞 ${food} | 🌡️ ${["Fría", "Normal", "Caliente"][temp]}`;
}

// ================= TIEMPO =================
setInterval(() => {
  temp = Math.floor(Math.random() * 3);
  saveGame();
}, 6000);

setInterval(update, 90);

// iniciar
loadGame();
