
const gameboard = document.getElementById('gameboard');

let width = 400;
const SIZE = Math.sqrt(width);
gameboard.style.width = `${SIZE*20}px`;

//a function that creates the cells in the gameboard, according to the width
for (let i=1; i<=SIZE; i++)
{
    for (let j=1; j<=SIZE; j++) {
        const box = document.createElement('div');
        gameboard.appendChild(box);
        box.id = `row${i} col${j}`;
        box.style.height = `20px`; 
        box.style.width = `20px`;
        // if (j%2!==0 && i%2===0) box.style.backgroundColor = "#c1cf9d";
        // if (j%2===0 && i%2!==0) box.style.backgroundColor = "#c1cf9d";

    }
}

const p = document.getElementById('instructions');
p.style.fontSize = `${0.1*width}px`;
let beginGame = false;
let row = SIZE/2; //the row of the snake head
let col = SIZE/2; //the column of the snake head

let head = document.getElementById(`row${row} col${col}`);
let snake = [head]; // the array stores the divs of the snake
// let formerColors = [head.style.backgroundColor];
let isMoving = true;

let direction = "Right";

let showScore = document.getElementById("score");
let score = 0;



document.addEventListener('keyup', startGame);

function startGame(event){
    if (event.code === 'Space') {
        p.innerText = "";
        apple = placeApple();
        head.style.backgroundColor = "black"; //creates the snake head by coloring it black
        document.removeEventListener('keyup', startGame); // once space is pressed, pressing it again won't do anything
        gameLoop = setInterval(moveSnake, 175);
        document.addEventListener('keydown', function(event){ // everytime an arrow key is pressed, the direction changes
            if (!isMoving && ((event.code === "ArrowLeft" && direction!=="Right") ||
                (event.code === "ArrowRight" && direction!=="Left") ||
                (event.code === "ArrowDown" && direction!=="Up") ||
                (event.code === "ArrowUp" && direction!=="Down"))) {
                    direction = event.code.slice(5);
                    isMoving = true;
                }
                //direction will change only if the arrow key pressed isnt reverse of current direction
        }); 
    }
}


function moveSnake(event) {


    if (direction === "Right") {
        col++;
    }
    if (direction === "Left") {
        col--;
    }
    if (direction === "Down") {
        row++;
    }
    if (direction === "Up") {
        row--;
    }
    if (row===0 || row===SIZE+1 || col===0 || col===SIZE+1) {
        gameOver();
        
    } 
    
        head = document.getElementById(`row${row} col${col}`); // updates new head to where the direction pointed
        if (snake.includes(head)) {
            gameOver();
        }

        // formerColors.push(head.style.backgroundColor);
        snake.push(head); //adds head to end of array
        head.style.backgroundColor = "black"; 
        head.style.borderRadius = "0";
    if (head.id == apple.id) { //everytime the snake passes over the apple, the score updates and a new apple is formed, as well as the snake body expanding
        //update score
        score++; 
        if (score<10) showScore.innerText = "00"+`${score}`;
        else if (score<100) showScore.innerText = "0"+`${score}`;
        else showScore.innerText = `${score}`;
        
        //regenerate apple
        apple = placeApple(); 


    }
    else { // if head doesn't meet apple, the tail gets deleted 
        if (p.innerText !== "Game Over") {

            tail = snake.shift();
            // let color = formerColors.shift();
            tail.style.backgroundColor = "transparent"
        }
    }
    isMoving = false;              
}

function placeApple(){
    let row = Math.floor(Math.random()*SIZE)+1;
    let col = Math.floor(Math.random()*SIZE)+1;
    let apple = document.getElementById(`row${row} col${col}`);
    
    while (snake.includes(apple)) { // if apple lands inside snake body, try again 
        row = Math.floor(Math.random()*SIZE)+1;
        col = Math.floor(Math.random()*SIZE)+1;
        apple = document.getElementById(`row${row} col${col}`);
    }

    apple.style.backgroundColor = "red";
    apple.style.borderRadius = "50%";
    return apple;
        
}


function gameOver(){
    clearInterval(gameLoop);
    p.innerText = "Game Over";
    p.style.color = "white";
    p.style.fontSize = "60px";

    let button = document.createElement('button');
    button.id = "restart";
    button.innerText = "Restart";

    p.append(button);

    button.addEventListener('click', function(){
        location.reload()
    });
}