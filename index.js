let 세로줄 = 6;
let 단어길이 = 5;

let row = 0; //현재줄
let col = 0; //현재 알파벳 위치

let gameOver = false;
let word = "SQUID"
let word2 = "";

const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&partOfSpeech=noun&limit=1&lettersMax=5';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e8e02106a1msh07f61b4bd959879p1f7335jsn79e1641b3775',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
};

// fetch(url, options)
//     .then(response => response.json())
//     .then(data => console.log(data.word))
//     .catch(error => console.error('Error:', error));
async function fetchData() {
  let 정답 = '';
  try {
      const response = await fetch(url, options);
      const data = await response.json();
      정답 = data.word;
      console.log(정답); 
  } catch (error) {
      console.error('Error:', error);
  }
  return 정답;
}

fetchData().then(정답 => {
  console.log("외부에서 사용:", 정답);
});



init()

function init(){
  for(let i=0;i<세로줄;i++){
    for(let j=0;j<단어길이;j++){
      let tile = document.createElement("span")
      tile.id = `t${i}_${j}`
      tile.classList.add("tile")
      tile.innerText = "";
      document.querySelector("#board").appendChild(tile)
    }
  }
}

document.addEventListener("keyup", e => {
  if(gameOver) return;
  if("KeyA" <= e.code && e.code <= "KeyZ"){
    let 현재타일 = document.querySelector(`#t${row}_${col}`)
    if(col < 단어길이){
      if(현재타일.innerText === ""){
        현재타일.innerText = e.code[3];
        현재타일.classList.add("inputEff")
        col++;
      }
    }
  } else if(e.code === "Backspace"){
    if(0 < col && col <= 단어길이) col--;
    let 현재타일 = document.querySelector(`#t${row}_${col}`)
    현재타일.innerText = ""
    현재타일.classList.remove("inputEff")
  } else if(e.code === "Enter" && col === 단어길이){
    update();
    row++;
    col = 0;
  } if(!gameOver && row === 세로줄){
    gameOver = true;
    document.querySelector("#answer").innerText = `The answer is ${word}`
  }
})

function update(){
  let correct = 0;
  for(let k=0;k<단어길이;k++){
    let 현재타일 = document.querySelector(`#t${row}_${k}`);
    let 현재문자 = 현재타일.innerText;
    if(word[k] == 현재문자){
      현재타일.classList.add("correct")
      correct++;
    } else if (word.includes(현재문자)){
      현재타일.classList.add("present")
    } else 현재타일.classList.add("absent");
    if (correct === 단어길이) gameOver=true;
  }
}