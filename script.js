const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// TODO: Implement this function!
let first, second;
let noClicking = false;
let score = 0;
function handleCardClick(event) {
  let currentCard = event.target
  if(noClicking) return;
  if(currentCard.classList.contains('flipped')) return;
  currentCard.style.backgroundColor = currentCard.classList[0]

  if(!first || !second) {
    currentCard.classList.add('flipped');
    first = first || currentCard;
    second = currentCard === first ? null : currentCard;
  }
  if(first && second) {
    noClicking = true;

    let class1 = first.className;
    let class2 = second.className;

    if(class1 === class2) {
      score += 2;
      first.removeEventListener("click", handleCardClick);
      second.removeEventListener("click", handleCardClick);
      first = 0
      second = 0
      noClicking = false;
    } else {
      setTimeout(function() {
        first.style.backgroundColor = '';
        second.style.backgroundColor = '';
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first = 0
        second = 0
        noClicking = false;
      }, 1500);
    }
  }

  if (score === COLORS.length) alert("game over!");
}
createDivsForColors(shuffledColors);
