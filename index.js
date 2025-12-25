const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Usa la ruta directa dentro del repo
const img = new Image();
img.src = "spritesheet.png";

let frame = 0;
let food = 3;
let temp = 1; // 0 frío, 1 normal, 2 caliente

const info = document.getElementById("info");

// Configs basadas en tu spritesheet
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64;
const TILAPIA_Y = 0; // fila 0: tilapias
const THERMO_Y = 64; // fila 1: termómetro
const THERMO_WIDTH = 32;
const THERMO_HEIGHT = 96;

function feed() {
  food++;
}

function drawTilapia(x, y) {
  // ciclo animación 0,1,2
  ctx.drawImage(
    img,
    frame * SPRITE_WIDTH, TILAPIA_Y,
    SPRITE_WIDTH, SPRITE_HEIGHT,
    x, y,
    SPRITE_WIDTH, SPRITE_HEIGHT
  );
}

function drawThermometer() {
  // 3 marcos hacia abajo según temp
  ctx.drawImage(
    img,
    3 * SPRITE_WIDTH, THERMO_Y + temp * THERMO_HEIGHT,
    THERMO_WIDTH, THERMO_HEIGHT,
    420, 30,
    THERMO_WIDTH, THERMO_HEIGHT
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dibuja 1 tilapia de ejemplo
  drawTilapia(100, 150);

  drawThermometer();

  frame = (frame + 1) % 3; // 3 animaciones de tilapia

  info.textContent = `🍞 Comida: ${food} | 🌡️ Temperatura: ${["Fría","OK","Caliente"][temp]}`;
}

// cambia temp cada 5s
setInterval(() => {
  temp = Math.floor(Math.random() * 3);
}, 5000);

setInterval(update, 300);
