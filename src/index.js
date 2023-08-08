const cards = document.querySelectorAll(".cards .card");
const timer = document.getElementById("timer");
const board = document.getElementById("board");
document.getElementById("message").style.display = "none";
let firstSelectedCard, secondSelectedCard;
let timeInterval;
let second, minute, hour;
let matchedCards = 0;
let time;
let count = 0;
let moves = 0;

startTimer = () => {
  clearInterval(timeInterval);
  firstClick();
  (second = 0), (minute = 0), (hour = 0);
  timeInterval = setInterval(function () {
    time =
      (hour ? hour + ":" : "") +
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
    timer.classList.toggle("odd");
    timer.innerHTML = time;
  }, 1000);
  return timer.innerHTML.split(":");
};

function shuffleCards() {
  cards.forEach((card) => {
    let randomCards = Math.floor(Math.random() * cards.length);
    card.style.order = randomCards;
  });
}
shuffleCards();

function matchingCards() {
  cards.forEach((card) => {
    card.removeEventListener("click", flippedCard);
  });
  const correctCards = document.querySelectorAll(
    ".card[emoji='" + firstSelectedCard + "']"
  );
  if (firstSelectedCard === secondSelectedCard) {
   
    matchedCards++;
    correctCards[0].classList.add("matched");
    correctCards[0].classList.remove("flip");
    correctCards[1].classList.add("matched");
    correctCards[1].classList.remove("flip");
    cards.forEach((card) => {
      card.addEventListener("click", flippedCard);
    });
    if(correctCards[0].classList.contains("matched")&&correctCards[1].classList.contains("matched")){
      cards.forEach((card) => {
       if(card.classList.contains("flip")||card.classList.contains("matched"))
        {card.removeEventListener("click", flippedCard)};
      });
    }
    
  } else {
    const incorrectCard = document.querySelectorAll(".card.flip");

    setTimeout(() => {
      incorrectCard[0].classList.remove("flip");
      incorrectCard[1].classList.remove("flip");
      cards.forEach((card) => {
        card.addEventListener("click", flippedCard);
      });
    }, 2000);
  }
  if (matchedCards === cards.length / 2) {
    document.getElementById("message").style.display = "flex";
    document.getElementById(
      "message"
    ).innerHTML = ` Well done!... You finished the game in ${
      startTimer()[0]
    } minute, ${startTimer()[1]} seconds with ${moves} moves`;
    cards.forEach((card) => {
      console.log('removed')
      card.removeEventListener("click", flippedCard);
    });
  }
  resetTime();
}

function resetTime() {
  if (matchedCards === cards.length / 2) {
    clearInterval(timeInterval);
    (second = 0), (minute = 0), (hour = 0);
  }
}

function firstClick() {
  board.removeEventListener("click", startTimer);
}

function addBoardEventListener() {
  board.addEventListener("click", startTimer);
}
addBoardEventListener();

function flippedCard() {
  this.classList.add("flip");
  moves++;
  document.getElementById("moves").innerHTML = "Moves: " + moves;
  if (count === 0) {
    firstSelectedCard = this.getAttribute("emoji");
    count++;
  } else {
    secondSelectedCard = this.getAttribute("emoji");
    count = 0;
    matchingCards();
  }
}

cards.forEach((card) => {
  card.addEventListener("click", flippedCard);
});

module.exports = {
  matchingCards,
  flippedCard,
  firstSelectedCard,
  secondSelectedCard,
  cards,
};
