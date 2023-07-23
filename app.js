const submit = document.querySelector("#submit");
const body = document.querySelector("#body");
var lives = document.querySelector("#lives");
// const answers = ["water", "flame", "works", "right", "house", "green", "write", "think"];
const items = document.querySelectorAll(".item");
// let rand = Math.floor(Math.random() * answers.length);
// let answer = answers[rand];
var flag = true;
const head = document.querySelector("#head");
const para = document.createElement("p");
para.innerText = "Congratulations!";
para.classList.add("is-size-1");
// var row = document.querySelectorAll(`.item-1`);
let answer = "";
var i = 1;
var j = 0;
async function getAnswer() {
  const config = {
    headers: {
      "X-RapidAPI-Key": "402bfb7210mshc67fa77bed9bf30p10be34jsn2b02c3d697a0",
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
    params: { count: 1, wordLength: 5 },
  };
  answerKey = await axios.get(
    "https://random-words5.p.rapidapi.com/getMultipleRandom",
    config
  );
  answer = await answerKey.data[0];
}
getAnswer();
function restartGame() {
  flag = false;
  const restart = document.createElement("button");
  submit.remove();
  restart.classList.add("button", "is-danger");
  restart.innerText = "Restart Game";
  restart.addEventListener("click", async function () {
    flag = true;
    para.remove();
    restart.remove();
    body.append(submit);
    await getAnswer();
    for (let item of items) {
      // rand = Math.floor(Math.random() * answers.length);
      // answer = answers[rand];

      item.innerText = "";
      i = 1;
      j = 0;
      lives.innerText = 5;
      item.classList.remove(
        "has-background-success-dark",
        "has-background-warning-dark",
        "has-background-danger-dark"
      );
    }
  });
  body.append(restart);
}
function checkAnswer() {
  let str = "";
  let row = document.querySelectorAll(`.item-${i}`);
  for (let k = 0; k < 5; k++) {
    str += row[k].innerText;
    if (str[k] == answer[k]) {
      row[k].classList.add("has-background-success-dark");
    } else if (answer.includes(str[k])) {
      row[k].classList.add("has-background-warning-dark");
    } else {
      row[k].classList.add("has-background-danger-dark");
    }
  }
  console.log(str);
  if (str == answer) {
    head.append(para);
    if (lives.innerText != 1) {
      restartGame();
    }
  }
}
body.addEventListener("keydown", function (e) {
  if (flag) {
    console.log(e.key);
    let row = document.querySelectorAll(`.item-${i}`);

    if (e.key >= "a" && e.key <= "z" && j < 5) {
      row[j].innerText = e.key;
      j++;
    } else if (e.key == "Backspace" && j > 0) {
      row[j - 1].innerText = "";
      j--;
    } else if (e.key == "Enter") {
      submit.click();
      // restart.click();
    }
  }
});
submit.addEventListener("click", () => {
  let row = document.querySelectorAll(`.item-${i}`);
  for (let part of row) {
    if (part.innerText == "") {
      return;
    }
  }
  checkAnswer();
  i++;
  j = 0;
  lives.innerText--;
  if (lives.innerText == 0) {
    restartGame();
  }
});
