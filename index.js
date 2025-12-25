const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const info = document.getElementById("info");

// ================= IMÁGENES =================
const sprites = new Image();
sprites.src = "spritesheet.png";

const aquarium = new Image();
aquarium.src = "aquarium1.png";

// ============ COORDENADAS REALES ============
// Tilapia (según lo que enviaste)
const FISH_X = 111;
const FISH_Y = 143;
const FISH_W = 528;
const FISH_H = 228;

// Cantidad de frames horizontales
const FRAMES = 3;

// Termómetro (ajustable si luego lo mueves)
const THERMO_X = 0;
const THERMO_Y = 371;
const THERMO_W = 128;
const THERMO_H = 256;

// ============================================

// Estado del juego
let fish = [
  { x: 40,  y: 130, frame: 0 },
  { x: 180, y: 150, frame: 1 },
  { x: 320, y: 120, frame: 2 }
];

let food = 3;
let temp = 1; // 0 frío | 1 normal | 2 caliente

// ================= FUNCIONES =================

function feed() {
  food++;
}

function drawFish(f) {
  ctx.drawImage(
    sprites,
    FISH_X + f.frame * FISH_W, // frame correcto
    FISH_Y,
    FISH_W,
    FISH_H,
    f.x,
    f.y,
    FISH_W,
    FISH_H
  );
}

function drawThermometer() {
  ctx.drawImage(
    sprites,
    THERMO_X,
    THERMO_Y + temp * THERMO_H,
    THERMO_W,
    THERMO_H,
    440,
    30,
    64,
    128
  );
}

// ================= LOOP =================

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo
  ctx.drawImage(aquarium, 0, 0, canvas.width, canvas.height);

  // Peces
  fish.forEach(f => {
    drawFish(f);
    f.frame = (f.frame + 1) % FRAMES;
  });

  // Termómetro
  drawThermometer();

  info.textContent =
    `🐟 Peces: ${fish.length} | 🍞 Comida: ${food} | 🌡️ ${["Fría", "Normal", "Caliente"][temp]}`;
}

// Temperatura cambia sola
setInterval(() => {
  temp = Math.floor(Math.random() * 3);
}, 5000);

// Loop principal
setInterval(update, 260);
