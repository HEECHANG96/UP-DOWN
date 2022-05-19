// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누른다.
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호이면, down!!
// 랜덤번호 > 유저번호이면, up!!
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. -> 더이상 추측 불가, 버튼이 disable
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.


let computerNum = 0;
//document : 웹페이지 그 자체 getElementById("play-button") Id가 play-button이라는 element를 가져온다.
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 10;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];
let resultAreaImg = document.querySelector(".main-img");
//playButton에 클릭이벤트가 발생하면 play라는 함수를 실행시켜라!
// 함수를 매개변수로 넘김 -> play() X
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

//userInput에서 잠깐 쓰고 끝날 함수라서 익명의 함수로 선언함.
userInput.addEventListener("focus", function() {userInput.value="";})


function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100) {
        resultAreaImg.src=
        "https://user-images.githubusercontent.com/41671001/109101871-ec527e00-776a-11eb-908c-4fbdbd8c1706.jpg";
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요.";
        return;
    }
    
    if(history.includes(userValue)) {
        resultAreaImg.src=
        "https://user-images.githubusercontent.com/41671001/109101871-ec527e00-776a-11eb-908c-4fbdbd8c1706.jpg";
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
        return;
    }
    
    
    chances --;
    chanceArea.textContent = `남은기회:${chances}번`;
    console.log("chance", chances);

    if(userValue < computerNum){
        resultAreaImg.src=
        "https://opgg-com-image.akamaized.net/attach/images/20200609122054.1236423.gif";
        resultArea.textContent = "UP!!!";
    } else if(userValue > computerNum) {
        resultAreaImg.src=
        "https://opgg-com-image.akamaized.net/attach/images/20200609122054.1236423.gif";
        resultArea.textContent = "DOWN!!!";
    } else {
        resultAreaImg.src=
        "https://img.insight.co.kr/static/2019/12/21/700/ijy1vg4f3nq28iwu4151.jpg";
        resultArea.textContent = "정답!!! 굳굳";
        gameOver=true;
    }

    history.push(userValue);
    console.log("history", history);

    if(chances < 1) {
        resultAreaImg.src=
        "https://bunny.jjalbot.com/2016/10/B1xbu6UC/90_55169bee98ec9_2743.jpg";
        chanceArea.textContent="진실의 방으로...";
        gameOver = true;
    }

    if(gameOver == true) {
        playButton.disabled = true;
    }

}

function reset() {
    // user input창이 깨끗하게 정리되고
    userInput.value="";
    // 새로운 번호가 생성
    pickRandomNum();
    resultAreaImg.src=
    "https://golden-goblin.com/content-thief/wp-content/uploads/sites/5/kboard_attached/1/202006/5edca8bd168789195391.gif";
    resultArea.textContent="맞출 수 있으면 맞춰봐라~~";
    gameOver=false;
    playButton.disabled=false;
    chances=10;
    chanceArea.textContent = `남은기회:${chances}번`;
    history=[];
}

pickRandomNum();