
const GAMES = 5;
var selectedWeapon = ""; 
var playerWins = 0;
var compWins = 0;


var roundEnd = document.querySelector("#round-end-container");
var gameEnd = document.querySelector("#game-end-container");
function evalRound(userSel,compSel){
  //return 1 for player win, 0 for tie, -1 for loss 
  if (userSel === "rock"){
    if(compSel === "rock"){
      return 0;
    }
    else if (compSel === "scissors"){
      return 1;
    }
    else{return -1;}
  }
  else if(userSel === "scissors"){
    if(compSel === "rock"){
      return -1;
    }
    else if (compSel === "scissors"){
      return 0;
    }
    else{return 1;}
  }
  else { //user select paper
    if(compSel === "rock"){
      return 1;
    }
    else if (compSel === "scissors"){
      return -1;
    }
    else{return 0;}
  }
}
function capitalizeFirst(str){
  return str.slice(0,1).toUpperCase() + str.slice(1);
}
function displayGameEnd(message){
  document.querySelector("#game-end-message").textContent = message;
  gameEnd.style.height =  "100%";
}
function displayRoundEnd(message){
  document.querySelector("#round-end-message").textContent = message;
  roundEnd.style.height = "100%";
}
function showOutcome(result, userSel, compSel){
  userSel = capitalizeFirst(userSel);
  compSel = capitalizeFirst(compSel);

  let roundWinMessage = `${userSel} beats ${compSel}, You Win!`;
  let roundLoseMessage = `${compSel} beats ${userSel}, You Loose. :(`;
  let roundTieMessage = `${compSel} ties ${userSel}, It's a tie`;
  // set scores and message
  let gameLoseMessage = "You lost. How unfortunate."
  let gameWinMessage = "Victory! Congratulations."
  // score boxes
  let playerScore = document.querySelector("#p1-score");
  let compScore = document.querySelector("#comp-score");

  if(playerWins === GAMES){
    //end of game display end of round and end of game message
    //display game-end-container
    playerScore.textContent = playerWins;
    displayGameEnd(gameWinMessage);
  }
  else if(compWins === GAMES){
    compScore.textContent = compWins;
    displayGameEnd(gameLoseMessage);
  }
  else{// no winner just a regular round or tie
    if(result === 1){//player win
      playerScore.textContent = playerWins;
      displayRoundEnd(roundWinMessage);
    }
    else if(result === 0){//tie
      displayRoundEnd(roundTieMessage);
    }
    else {
      displayRoundEnd(roundLoseMessage);
      compScore.textContent = compWins;
    }
  }

}

function wipeGame(){
  //clear game and reset back to initial state
  playerWins = 0;
  compWins = 0;
  document.querySelector("#p1-score").textContent="";
  document.querySelector("#comp-score").textContent="";
  //hide weapon ui
  document.querySelector("h2").style.display = "none";
  document.querySelector("#select-container").style.display = "none";
  //hide overlay screens
  gameEnd.style.height = 0;
  roundEnd.style.height = 0;
  //reset rounds
  document.querySelector("#round-num-container").firstChild.textContent = "";
  document.querySelector("#round-num").textContent = "";
  //bring play back
  document.querySelector("#play").style.display = "block";
}

function computerSelection() {
  let choices = ["rock","paper","scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function playRound() {
  let compSel = computerSelection();
  let outcome = evalRound(selectedWeapon,compSel);
  if (outcome === 1){
      //increment score
      playerWins++;
  }else if(outcome === -1){
      //increase comp score
      compWins++;
  }
  showOutcome(outcome, selectedWeapon, compSel);
}

/*         UI code                   */
function initializeWeaponUI(){
  let weaponBackGround = document.querySelector("#select-container");
  let thumbnails = document.querySelectorAll(".thumbnail");
  for(let i=0; i<3; i++){
    thumbnails[i].onclick = playRound;
    thumbnails[i].onmouseover = ()=>{
      selectedWeapon = thumbnails[i].dataset.choice;
      weaponBackGround.style.backgroundImage = `url("images/${selectedWeapon}.jpg")`;
    };
  }

}


/*         Event Handlers              */
document.querySelector("#play").addEventListener("click",initGame);
[...document.querySelectorAll(".exit")].forEach(element => {
  element.addEventListener("click",wipeGame);
});
document.querySelector("#next-round").addEventListener("click",()=>{
  roundEnd.style.height = 0;
  if(GAMES - playerWins === 1 && GAMES - compWins === 1){
    document.querySelector("#round-num-container").firstChild.textContent = "Final Round !";
    document.querySelector("#round-num").textContent = "";
  }else{
    let round = document.querySelector("#round-num");
    round.textContent = +round.textContent + 1;
  }
});

function initGame(){
  //hide and show the appropriate ui options after user hits play
  document.querySelector("#play").style.display = "none";
  document.querySelector("h2").style.display = "block";
  document.querySelector("#select-container").style.display = "block";
  document.querySelector("#p1-score").textContent = "0";
  document.querySelector("#comp-score").textContent = "0";
  document.querySelector("#round-num-container").firstChild.textContent = "Round: ";
  document.querySelector("#round-num").textContent = "1";

  initializeWeaponUI();

}