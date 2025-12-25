const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const info = document.getElementById("info");

// imágenes
const sprites = new Image();
sprites.src = "spritesheet.png";

const aquarium = new Image();
aquarium.src = "aquarium1.png";

// configuración sprites
const FISH_W = 64;
const FISH_H = 64;
const FRAMES = 3;

// estado del juego
let fish = [
  { x: 60, y: 150, frame: 0 },
  { x: 150, y: 120, frame: 1 },
  { x: 240, y: 170, frame: 2 }
];

let food = 3;
let temp = 1; // 0 frío | 1 ok | 2 caliente

function feed() {
  food++;
}

// dibuja peces
function drawFish(f) {
  ctx.drawImage(
    sprites,
    f.frame * FISH_W, 0,
    FISH_W, FISH_H,
    f.x, f.y,
    FISH_W, FISH_H
  );
}

// termómetro
function drawThermometer() {
  ctx.drawImage(
    sprites,
    3 * FISH_W, 64 + temp * 96,
    32, 96,
    440, 40,
    32, 96
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // fondo (pecera)
  ctx.drawImage(aquarium, 0, 0, canvas.width, canvas.height);

  // peces
  fish.forEach(f => {
    drawFish(f);
    f.frame = (f.frame + 1) % FRAMES;
  });

  drawThermometer();

  info.textContent =
    `🐟 Peces: ${fish.length} | 🍞 Comida: ${food} | 🌡️ ${["Fría","OK","Caliente"][temp]}`;
}

// temperatura cambia sola
setInterval(() => {
  temp = Math.floor(Math.random() * 3);
}, 5000);

// loop principal
setInterval(update, 300);
