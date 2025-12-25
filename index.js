let fish = 1;
let food = 0;

const fishText = document.getElementById("fishCount");
const foodText = document.getElementById("foodCount");

function updateUI() {
  fishText.textContent = "Peces: " + fish;
  foodText.textContent = "Comida: " + food;
}

function addFood() {
  food++;
  updateUI();
}

function addFish() {
  if (food >= 2) {
    food -= 2;
    fish++;
  } else {
    alert("❌ No hay suficiente comida");
  }
  updateUI();
}

// reproducción automática
setInterval(() => {
  if (fish >= 2 && food >= 1) {
    food--;
    fish++;
  }
  updateUI();
}, 5000);

updateUI();
