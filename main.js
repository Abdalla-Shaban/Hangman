let letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

let draw = document.querySelector(".draw");

lettersArray.forEach((letter) => {
  // Create Span And Text Inside Span
  let span = document.createElement("span");
  let spanText = document.createTextNode(letter);
  // Apend Text To Span
  span.appendChild(spanText);
  // Add Class To Span
  span.className = "letter-box";
  // Apend Span To Letters Container
  lettersContainer.appendChild(span);
});

// Get Data From Json File
fetch("category.json")
  .then((myData) => {
    // Convert Data To Object
    let data = myData.json();
    return data;
  })
  .then((object) => {
    // Get Keys Of Object Data
    let objectKeys = Object.keys(object);
    // Get Values Of Object Data
    let objectValue = Object.values(object);
    // Get Limit Random Number
    let randomPropNumber = Math.floor(Math.random() * objectKeys.length);
    let randomObjectKey = objectKeys[randomPropNumber];
    let randomValueNumber = Math.floor(Math.random() * objectValue.length);
    let randomObjectValue = objectValue[randomPropNumber];
    let value = randomObjectValue[randomValueNumber];
    // Create Span And Append Word Section On Span
    let span = document.querySelector(".category span");
    span.innerHTML = randomObjectKey;
    let guessLetters = document.querySelector(".guess-letters");
    // Convert Word Value To Array
    let word = Array.from(value);
    // Loop To Create Guess Span
    for (let i = 0; i < word.length; i++) {
      let gusseSpan = document.createElement("span");
      guessLetters.appendChild(gusseSpan);
      if (word[i] == " ") {
        gusseSpan.className = "space";
      }
    }
    // Create Wrong And Correct Number
    let wrongNum = 0;
    let corectNum = 0;
    // Add Click Event
    document.addEventListener("click", (e) => {
      // Make Status False
      let status = false;
      if (e.target.className == "letter-box") {
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();
        // let word = Array.from(value.toLowerCase());
        let guessSpan = document.querySelectorAll(".guess-letters span");
        word.forEach((word, wordIndex) => {
          if (clickedLetter == word) {
            status = true;
            guessSpan.forEach((span, spanIndex) => {
              if (wordIndex == spanIndex) {
                span.innerHTML = word;
              }
            });
          }
        });
        if (status !== true) {
          wrongNum++;
          let draw = document.querySelector(".draw");
          draw.classList.add(`wrong-${wrongNum}`);
          document.getElementById("fail").play();
          if (wrongNum === 11) {
            lettersContainer.classList.add("end");
            gameOVer();
          }
        } else {
          corectNum++;
          document.getElementById("success").play();
          if (corectNum === word.length) {
            lettersContainer.classList.add("end");
            congratulation();
          }
        }
      }
    });
    function gameOVer() {
      let popup = document.createElement("div");
      popup.className = "lose";
      popup.textContent = `Game Over, The Word Is ${value}`;
      document.body.appendChild(popup);
    }
    function congratulation() {
      let popup = document.createElement("div");
      popup.className = "win";
      popup.textContent = `Congratulations `;
      document.body.appendChild(popup);
    }
  });

// console.log();

// {
//   "Programming": [
//     "php",
//     "javascript",
//     "r",
//     "scala",
//     "fortran",
//     "go",
//     "mysql",
//     "python"
//   ],
//   "Movies": [
//     "prestige",
//     "inception",
//     "parasite",
//     "interstellar",
//     "whiplash",
//     "memento",
//     "coco",
//     "up",
//     "Super Man",
//     "Bat Man",
//     "Dr String",
//     "Spider Man",
//     "Xmen",
//     "Jhon Wick"
//   ],
//   "Characters": ["Albert Einstein", "Hitchock", "Alexander", "Mahat Ghandi"],
//   "Countries": [
//     "Egypt",
//     "Syria",
//     "Plastine",
//     "Yemen",
//     "Iraq",
//     "Bahrain",
//     "Qatar",
//     "Morco"
//   ]
// }
