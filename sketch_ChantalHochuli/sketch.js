//Data

"use strict";

var joinedText;
var charSet;
var counters = [];
var drawLetters = [];

var posX;
var posY;

var drawColoredLines = true;
var drawText = true;

//setup

function preload() {
  joinedText = loadStrings("text_interactivedesign.txt");
}

function setup() {
  createCanvas(800, 650);
  colorMode(RGB, 255);

  textFont("monospace", 14);
  fill(0);

  joinedText = joinedText.join(" ");
  charSet = getUniqCharacters();
  for (var i = 0; i < charSet.length; i++) {
    counters[i] = 0;
    drawLetters[i] = true;
  }

  countCharacters();

  var indexPosX = 50;
  var indexPosY = 30;
  for (var i = 0; i < charSet.length; i++) {
    var letter = charSet.charAt(i);
    var letterWidth = textWidth(letter);
    if (indexPosX + letterWidth > width - 50) {
      indexPosX = 50;
      indexPosY += 20;
    }
    text(letter, indexPosX, indexPosY);
    indexPosX += letterWidth + 5;
  }
}


//drawing
function draw() {
  background(255);

  translate(50, 0);

  noStroke();

  posX = 0;
  posY = 55;
  var oldX = 0;
  var oldY = 0;
  var sortPositionsX = [];
  var oldPositionsX = [];
  var oldPositionsY = [];
  for (var i = 0; i < joinedText.length; i++) {
    sortPositionsX[i] = 0;
    oldPositionsX[i] = 0;
    oldPositionsY[i] = 0;
  }

  textAlign(LEFT); // align the text on the left

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = charSet.indexOf(upperCaseChar);
    if (index < 0) continue;

    
    
    
    var m = map(mouseX, 30, width - 50, 0, 1);
    m = constrain(m, 0, 1);

    var sortX = sortPositionsX[index];
    var interX = lerp(posX, sortX, m);

    var sortY = index * 20 + 30;
    var interY = lerp(posY, sortY, m);

    if (drawLetters[index]) {
      if (drawColoredLines) {
        if (oldPositionsX[index] != 0 && oldPositionsY[index] != 0) {
          stroke(index * 50, 20, 100, 30);
          line(oldPositionsX[index], oldPositionsY[index], interX, interY);
        }
        oldPositionsX[index] = interX;
        oldPositionsY[index] = interY;
      }

      if (drawText) {
        // remove spaces between words
        if (upperCaseChar !== " ") {
          text(joinedText.charAt(i), interX, interY);
        }
        // go to a new line if only 1 or 2 words are after the punctuation
        if (upperCaseChar === "." || upperCaseChar === "?" || upperCaseChar === "!") {
          var wordsAfterPunctuation = joinedText.slice(i+1).split(" ");
          if (wordsAfterPunctuation.length <= 2) {
            posY += 30;
            posX = 0;
          }
        }
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    sortPositionsX[index] += textWidth(joinedText.charAt(i));
    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == " ") {
      posY +=28;
      posX = 0;
    }
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split("");
  var uniqCharsArray = charsArray
    .filter(function (char, index) {
      return charsArray.indexOf(char) == index;
    })
   
    .sort();
  return uniqCharsArray.join("");
}

function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // get one character from the text and turn it to uppercase
  }
}

function keyPressed() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");

  if (key == "1") drawColoredLines = !drawColoredLines;
  if (key == "2") drawText = !drawText;
  if (key == "3") {
    for (var i = 0; i < charSet.length; i++) {
      drawLetters[i] = false;
    }
  }
  if (key == "4") {
    for (var i = 0; i < charSet.length; i++) {
      drawLetters[i] = true;
    }
  }
   //toggling the visibility of specific characters in the text when their corresponding keys are pressed
  var index = charSet.indexOf(key.toUpperCase());
  if (index >= 0) {
    drawLetters[index] = !drawLetters[index];
    select("#letter").html(key.toUpperCase());
  }
  
  if (joinedText.length == 0) {
background(255, 0, 0);
}
  if (key == "0") {
    saveCanvas("myCanvas", "png");
  
  }}