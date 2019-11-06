function playRound(userSel,compSel){
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
function displayOutcome(result, userSel, compSel){
  let winMessage = `${userSel} beats ${compSel}, You Win!`;
  let loseMessage = `${compSel} beats ${userSel}, You Loose. :(`;
  let tieMessage = `${compSel} ties ${userSel}, It's a tie`;
  if(result === 1){
    console.log(winMessage);
  }
  else if(result === 0){
    console.log(tieMessage);
  }
  else {
    console.log(loseMessage)
  }
}
function game() {
  let games = 0;
  let wins = 0;
  while(games < 5){
    let userSel;
    while(!validateuserSel(userSel)){
      if(userSel === null) return;
      userSel = prompt("Choose: rock, paper, or scissors");
    }
    userSel = userSel.toLowerCase();
    let compSel = computerSelection();
    let outcome = playRound(userSel,compSel);
    if (outcome === 1) wins++;
    displayOutcome(outcome, userSel, compSel);
    games++;
  }
  console.log(`You won ${wins} out of 5 games`);
}
function validateuserSel(userSel){
  try{
    userSel = userSel.toLowerCase();
  }catch(TypeError){ return false;}
  return userSel === "rock" ||  userSel === "scissors" || userSel === "paper";
}

function computerSelection() {
  let choices = ["rock","paper","scissors"];
  return choices[Math.floor(Math.random() * 3)];
}
/*         UI code                   */
var selectedWeapon = ''; //path to picture of selected weapon
function initializeWeaponUI(){
  let weaponBackGround = document.querySelector('#select-container');
  let thumbnails = document.querySelectorAll('.thumbnail');
  for(let i=0; i<3; i++){
    thumbnails[i].addEventListener('click',()=>{
      selectedWeapon = thumbnails[i].dataset.choice;
      weaponBackGround.style.backgroundImage = `url('images/${selectedWeapon}.jpg')`;
      //play game
    });
    thumbnails[i].addEventListener('mouseover',()=>{
      selectedWeapon = thumbnails[i].dataset.choice;
      weaponBackGround.style.backgroundImage = `url('images/${selectedWeapon}.jpg')`;
    });
  }

}
initializeWeaponUI();


/*         Event Handlers              */
document.querySelector('#play').addEventListener('click',initGame);

function initGame(){
  //hide and show the appropriate ui options after user hits play
  let chars = document.querySelectorAll('.hide');
  let play = document.querySelector('#play');
  play.classList.toggle('hide');
  for(let i = 0; i<chars.length; i++){
    chars[i].classList.toggle('hide');
  }
}