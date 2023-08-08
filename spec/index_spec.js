const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = window;
global.document = document;
document.body.innerHTML = fs.readFileSync("html_files/fourbythree.html");
let {
  matchingCards,
  flippedCard,
  firstSelectedCard,
  secondSelectedCard,
  cards,
} = require("../src/index");

describe("flippedCard()", function () {
  it("should return true if card contains a class flip", function () {
    firstSelectedCard = cards[0];
    firstSelectedCard.addEventListener("click", flippedCard);
    firstSelectedCard.click();
    expect(firstSelectedCard.classList.contains("flip")).toBeTrue();
  });
});

describe("matchingCard()", function () {
  beforeEach(() => {
    firstSelectedCard = cards[0];
    secondSelectedCard = cards[0];
    firstSelectedCard.addEventListener("click", matchingCards);
    firstSelectedCard.click();
    secondSelectedCard.addEventListener("click", matchingCards);
    secondSelectedCard.click();
  });
  it("should return true if card contains  a class matched", function () {
    expect(firstSelectedCard.classList.contains("matched")).toBeTrue();
    expect(secondSelectedCard.classList.contains("matched")).toBeTrue();
  });
  it("should return false if flip class is removed", function () {
    expect(firstSelectedCard.classList.contains("flip")).toBeFalse();
    expect(secondSelectedCard.classList.contains("flip")).toBeFalse();
  });
});
