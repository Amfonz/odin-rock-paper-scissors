/*
todo: workout post round dialogs
figure out issue with scoring after reset
*/


var selectedWeapon = ''; 
var playerWins = 0;
var compWins = 0;


var roundEnd = document.querySelector('#round-end-container');
var gameEnd = document.querySelector('#game-end-container');
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
function showOutcome(result, userSel, compSel){
  let roundWinMessage = `${userSel} beats ${compSel}, You Win!`;
  let roundLoseMessage = `${compSel} beats ${userSel}, You Loose. :(`;
  let roundTieMessage = `${compSel} ties ${userSel}, It's a tie`;
  // set scores and message
  let gameLoseMessage = "You lost. How unfortunate."
  let gameWinMessage = "Victory! Congratulations."
  // score boxes
  let playerScore = document.querySelector('#p1-score');
  let compScore = document.querySelector('#comp-score');

  if(playerWins === 5){
    //end of game display end of round and end of game message
    //display game-end-container
    playerScore.textContent = playerWins;
    let message = document.querySelector('#game-end-message');
    message.textContent =  gameWinMessage;
    gameEnd.style.display = 'block';
  }
  else if(compWins === 5){
    compScore.textContent = compWins;
    let message = document.querySelector('#game-end-message');
    message.textContent = gameLoseMessage;
    gameEnd.style.display = 'block';

  }
  else{// no winner just a regular round or tie
    let message = document.querySelector('#round-end-message');
    if(result === 1){//player win
      message.textContent = roundWinMessage;
      playerScore.textContent = playerWins;
    }
    else if(result === 0){//tie
      message.textContent = roundTieMessage;
    }
    else {
      message.textContent = roundLoseMessage;
      compScore.textContent = compWins;
    }
    roundEnd.style.display = 'block';
  }

}

function wipeGame(){
  //clear game and reset back to initial state
  playerWins = 0;
  compWins = 0;
  document.querySelector("#p1-score").textContent='';
  document.querySelector("#comp-score").textContent='';
  //hide weapon ui
  document.querySelector("#select-container").style.display = 'none';
  //hide overlay screens
  gameEnd.style.display = 'none';
  roundEnd.style.display = 'none';
  //bring play back
  document.querySelector("#play").style.display = 'block';
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
  let weaponBackGround = document.querySelector('#select-container');
  let thumbnails = document.querySelectorAll('.thumbnail');
  for(let i=0; i<3; i++){
    thumbnails[i].onclick = playRound;
    thumbnails[i].addEventListener('mouseover',()=>{
      selectedWeapon = thumbnails[i].dataset.choice;
      weaponBackGround.style.backgroundImage = `url('images/${selectedWeapon}.jpg')`;
    });
  }

}


/*         Event Handlers              */
document.querySelector('#play').addEventListener('click',initGame);
[...document.querySelectorAll('.exit')].forEach(element => {
  element.addEventListener('click',wipeGame);
});
document.querySelector('#next-round').addEventListener('click',()=>{
  document.querySelector("#round-end-container").style.display = 'none';
});

function initGame(){
  //hide and show the appropriate ui options after user hits play
  let play = document.querySelector('#play');
  play.style.display = 'none';
  document.querySelector('#select-container').style.display = 'block';
  initializeWeaponUI();

}