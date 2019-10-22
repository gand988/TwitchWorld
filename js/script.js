var eventList = [];
var grid = [];
var grid = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "0", "0", ".", "."],
  [".", ".", ".", "2", ".", ".", ".", ".", "1", "."],
  [".", ".", ".", ".", ".", ".", "0", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "0", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", "0", ".", ".", "1", ".", ".", ".", "."],
  ["1", ".", ".", ".", ".", ".", "0", ".", ".", "."],
  [".", ".", ".", ".", "0", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
]
var pX = null;
var pY = null;

let cols = 10; // i 
let rows = 10; // j 
/*
abbiamo il player
  - level
  - hp
  - atk/damage
  - def

quando troviamo un tesoro dobbiamo aumentare atk o def
*/
let player = {
  id: 0,
  level: 1,
  hp: 6,
  atk: 2,
  def: 0,
  speed: 1
};

let enemies = {
  id: 1,
  level: '?',
  hp: player.hp,
  atk: 2,
  def: 0,
  speed: 1
};

function setup() {
  createCanvas(200, 200);

  // create_bidimensional(grid);
  // random_populate(grid);
  // draSqu(grid);


  playerPosition(grid);
  // find_the_near_event(grid); 
  // console.log(grid);

}

function draw() {
  draSqu(grid);

  fill(255, 0, 0);
  square(pX, pY, 20);
  borders();
}

/**
 * ############ 1 create_bidimensional
 */
function create_bidimensional(grid) {
  // let cols = 10; // i 
  // let rows = 10; // j 
  for (let i = 0; i < cols; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i].push([]);
      grid[i][j] = "."
      // grid[i][j] = i; 
    }
  }
  // console.log(grid);
}
/**
 * ############ 2 random_populate
 */

function random_populate(grid) {
  let events = 10;
  for (let i = 0; i < events; i++) {
    let values = check(grid)
    let y = values[0];
    let x = values[1];
    // random event between fight and treasure 
    let ft = Math.floor(Math.random() * 100);
    if (i <= 6) {
      // fight
      grid[x][y] = "0";
    } else {
      // treasure
      grid[x][y] = "1";
    }

  }
  console.log(grid);
}
/**
 * generate a random position and check if there are events.
 * if is empty ".", will return the coordinates
 */
function check(grid) {
  let i = rand();
  let j = rand();
  while (grid[i][j] == "0" || grid[i][j] == "1") {
    i = rand();
    j = rand();
  }
  return [i, j];
}
/**
 * positionRed 
 * we will move the value "2" === player position, in the grid
 * when we enter a cell with another value, check the value.
 */
function positionRed() {
  // posizione di partenza e la posizione attuale
  // console.log(oX, oY)
  let tempX = pX / 20;
  let tempY = pY / 20;
  
  switch (grid[tempY][tempX]){
    case "0" : 
      console.log('fight'); 
      event_fight(player, enemies)
      showStats(player); 

      break; 
    case "1" : 
      event_treasure(player); 
      showStats(player); 

      // console.log('treasure'); 
      break;
  }
  grid[tempY][tempX] = "2"; 
  // console.log(`old X ${oX} || old Y ${oY} || tempX ${tempX} || tempY ${tempY}`);
}





function borders() {
  if (pX <= 0) { pX = 0; }
  if (pX >= 200 - 20) { pX = 200 - 20; }
  if (pY <= 0) { pY = 0; }
  if (pY >= 200 - 20) { pY = 200 - 20; }
}

function draSqu(grid) {
  // design the grid + fill the square
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // white square
      square(j * 20, i * 20, 20);
      // this will be remove to leave only one color 
      // ! dev stuff
      if (grid[i][j] == "0") {
        fill(120);
        rect(j * 20, i * 20, 20, 20);
      } else if (grid[i][j] == "1") {
        fill(0, 120, 0);
        rect(j * 20, i * 20, 20, 20);
      }
      fill(255);
    }
  }
}


function playerPosition(grid) {
  // let value = check(grid);
  // let x = value[0];
  // let y = value[1];
  // grid[x][y] = '2';
  // pY = x * 20;
  // pX = y * 20;
  pY = 2 * 20;
  pX = 3 * 20;
}

let rand = () => {
  return Math.floor(Math.random() * 10);
}

function event_fight(player, enemies){
  console.log("############################")
  // for who start the fight (first position)
  let rand_value = Math.floor(Math.random() * 100);
  let combat_turn = [];
  let max_turns = 50;

  // temp var 
  let hp_player = player.hp;
  let hp_enemies = enemies.hp;

  // generate the fight turn
  if (rand_value > 50) {
    // player 0 , enemies 1
    for (let i = 0; i < max_turns; i++) {
      if (i % 2 == 0) {
        combat_turn[i] = player;
      } else {
        combat_turn[i] = enemies;
      }
    }
  } else {
    // enemies 0, player 1 
    for (let i = 0; i < max_turns; i++) {
      if (i % 2 == 1) {
        combat_turn[i] = player
      } else {
        combat_turn[i] = enemies
      }
    }
  }
  let jj = 0;
  let temp_atk = 0; 
  do {
    // miss attack || chance to miss the attack 
    rand_value = Math.floor(Math.random() * 100);
    if (combat_turn[jj].atk == 0){alert("trie"); debugger}
    if (rand_value >= 25) {
      // there are no change in the attack value
      // console.log('hit');
      temp_atk = combat_turn[jj].atk; 
    } else if(rand_value <=10){
      // console.log('miss');
      // debugger;
      temp_atk = 0;
    }
    // check 
    // 0 == hero 
    // 1 == enemy
    if (combat_turn[jj].id == 0) {
      hp_enemies -= temp_atk;
    } else {
      hp_player -= temp_atk;
    }
    // console.log(`turn ${jj} || attacker ${combat_turn[jj].id} \n player : ${hp_player} || mob : ${hp_enemies} || damage : ${combat_turn[jj].atk}`);
    console.log(`turn ${jj} || id ${combat_turn[jj].id} || atk ${temp_atk} ||`)
    
    jj++;
  } while (hp_player > 0 && hp_enemies > 0);
  console.log('here', jj)
  // console.log('end fight')
  if(hp_player > 0){
    console.log("you won")

    levelUp(); 
  }else{
    // generate a new fight in the map.
    let values = check(grid)
    let y = values[0];
    let x = values[1];
    grid[x][y] = "0";
    console.log("you loose")
  }
  // console.log("prepare to fight"); 
}

function event_treasure(player){
  let atkBonus = 0.1; 
  let defBonus = 0.15; 

  let foo = Math.floor(Math.random()*100); 
  if(foo > 70){
    player.def += defBonus; 
    // Math.round(player.def);
  }else{
    player.atk += atkBonus; 
    // Math.round(player.atk);
  }
  console.log("you have found a treasure"); 
  /**
   * + atk
   *    buff that will improve the attack damange by random() 
   * + def
   *    buff that will improve the defence by random()
   */
}


/**
 * player stats 
 * level 1
 * hp 6/6
 * atk 2
 * def 0
 * ------ level up 
 * every 5 levels hp +1
 * atk +0.5 ? 
 * def 0.25
 */

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      pY -= 20;
      break;
    case DOWN_ARROW:
      pY += 20;
      break;
    case LEFT_ARROW:
      pX -= 20;
      break;
    case RIGHT_ARROW:
      pX += 20;
      break;
  }
  positionRed();
  // console.log(grid);
}
// #########################################
// * Level UP 
// #########################################
const btnRun = document.querySelector('#run');
var divs = document.querySelectorAll('[data-free="true"]');

// circle will be show on the top of the square
var i = 0;
var x = 0;
var old = 0;
var levelArray = [];
var indexes = [];
const solutions = [
  // horizontal solutions
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  // vertical solutions
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  // diagonally solutions
  ["0", "4", "8"],
  ["2", "4", "6"]
];
function levelUp(){
  // /* let foo =  */document.getElementsByClassName('modal').style.display = "block"; 
  /* let foo =  */
  document.querySelector('.modal').style.display = 'inline-block'; 

  myVar(); 

}
// let myVar = ()=>setInterval(levelUp, 300); 
let myVar = () => {
  let animLevel = setInterval(() => {
    if (i == 10) {
      clearInterval(animLevel);
      // myStopFunction();

      old = 0;
      i = 0;
      divs[x].setAttribute("data-free", "false");
      // add the element that go black in the array 
      indexes.push(divs[x].getAttribute('data-index'));
      console.log(indexes);
      // will be a good solution to use a Case switch? 
      divs = document.querySelectorAll('[data-free="true"]');

      /**
       * check with the solutions 
       * m : loop be the solutions
       * n : loop the value inside the solution
       * point : add point when indexes[indexCount] == solutions[m][n]
       */

      for (let m = 0; m < solutions.length; m++) {
        let point = 0;
        for (let n = 0; n < solutions[m].length; n++) {
          let indexCount = 0;
          // console.log(m, n, solutions.length, solutions[m].length);
          do {
            if (indexes[indexCount] == solutions[m][n]) {
              point++;
              if (point == "3") {
                // alert('level up');
                return player.level += 1; 
                break; 
              }
            }
            indexCount++;
          } while (indexCount < indexes.length);
          // console.log("points:", point, "indexCount", indexCount); 
        }
        document.querySelector('.modal').style.display = "none";
      }



    } else {

      /**
       * check until the random is different from the last one 
       */
      old = x;
      do {
        x = Math.floor(Math.random() * divs.length);
      } while (x == old);

      divs[x].classList.add('cls_black');

      i++;
      /**
       * save the last value in the array 
       */


      // remove the black class [OK YOU WORK]
      if (i != 10) {
        setTimeout(() => {
          divs[x].classList.remove('cls_black');
        }, 200);
      }
    }
    // console.log(`i: ${i} || x: ${x}`);
    // this
    // document.querySelector('.modal').style.display = "none";
  }, 300);
};

// #########################################
// * DOM 
// #########################################

function showStats(player){
  let player_stats_dom = document.querySelectorAll('span'); 

  player_stats_dom[0].textContent = player.level; 
  player_stats_dom[1].textContent = player.hp; 
  player_stats_dom[2].textContent = player.atk; 
  player_stats_dom[3].textContent = player.def; 
  // console.log(player_stats_dom); 
}

showStats(player); 

