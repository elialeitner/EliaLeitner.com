
const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function gameOver(gameboard){
    for (let i=0; i<3; i++){
        if (gameboard[i][0]===gameboard[i][1] && gameboard[i][0]===gameboard[i][2] && gameboard[i][0]!==null) return gameboard[i][0]; //checks row
        if (gameboard[0][i]===gameboard[1][i] && gameboard[1][i]===gameboard[2][i] && gameboard[0][i]!==null) return gameboard[0][i]; //checks column
    }
    if (((gameboard[0][0]===gameboard[1][1] && gameboard[0][0]===gameboard[2][2])||(gameboard[0][2]===gameboard[1][1]&&gameboard[0][2]===gameboard[2][0])) && gameboard[1][1]!==null) return gameboard[1][1]; //checks diagonal
    return null;
}

function winnerLine(gameboard){
    for (let i=0; i<3; i++){
        if (gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2] && gameboard[i][0] !== null) return `row ${i+1}`; //returns winning row
        
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i] && gameboard[0][i] !== null) return `col ${i+1}`; //returns winning column
    }
    if (gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2] && gameboard[1][1] !== null) return `dgnl 1`; //returns winning diagonal
    if (gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0] && gameboard[1][1] !== null) return `dgnl 2`; //returns winning diagonal
    return null;
}

const container = document.querySelector('.container');
const board = document.querySelector('.board');
const displayWinner = document.querySelector('.turn');

const span = document.querySelector('span');
let turn = "X";

    container.addEventListener('click', function(event) {
        if(event.target.tagName === 'DIV' && event.target.classList.contains('box') && gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1]===null && gameOver(gameboard)===null ){
            switch(turn){
                case "X":
                    let X = document.createElement('img');
                    X.src = "X.svg";
                    X.style.eight = "70%";
                    X.style.width = "70%";
                    event.target.append(X);
                    gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1] ="X";
                    turn ="O";
                    span.textContent="O";
                    span.style.color="#fff4d3";
                    break;
                case "O":
                    let O = document.createElement('img');
                    O.src = "O.svg";
                    O.style.eight = "70%";
                    O.style.width = "70%";
                    event.target.append(O);
                    gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1] ="O";
                    turn="X";
                    span.textContent="X";
                    span.style.color="#eb7878";
                    break;           
            }
            
            winner = gameOver(gameboard);
            if (winner!==null) {
                setTimeout(function() {
                    displayWinner.textContent = `Player ${winner} won!`; 
                    let strike = document.createElement('div');
                    strike.style.zIndex = "1";
                    strike.style.position = "absolute";

                    if(winnerLine(gameboard).includes("row")===true){ //strike through row
                        let row = document.querySelector(`#row${winnerLine(gameboard)[4]}`);
                        strike.style.width = "0px";
                        strike.style.height = "13px";
                        row.appendChild(strike);
                    }
                    if(winnerLine(gameboard).includes("col")===true){ //strike through col
                        strike.style.width = "0px";
                        strike.style.height = "13px";
                        strike.style.transform = "rotate(90deg)";
                        document.querySelector(`#row2 [class="box ${winnerLine(gameboard)[4]}"]`).appendChild(strike);      
                    }
                    if(winnerLine(gameboard).includes("dgnl")===true){ //strike diagonally}
                        strike.style.width = "0px"; //supposed to be 450px;
                        strike.style.height = "13px";
                        if(winnerLine(gameboard)[5]=="1") strike.style.transform = "rotate(45deg)";
                        else strike.style.transform = "rotate(-45deg)";
                        document.querySelector('#middle').appendChild(strike);
                    }
                    
                    if (winner === "X") {
                        displayWinner.style.color ="#eb7878";
                        strike.style.backgroundColor="#eb7878";
                    }
                    
                    else {
                        displayWinner.style.color= "#fff4d3";
                        strike.style.backgroundColor="#fff4d3";
                    }
                    let width = 0; //Starting width
                    const widening = setInterval(function(){
                        width += 10;
                        strike.style.width = width + "px";

                        //Checks if winner is diagonal and if it is not, it stops widening when it reaches 320px
                        if (width>=320 && winnerLine(gameboard).includes("dgnl")!==true){
                            clearInterval(widening);
                        }
                        if (width >= 450) {
                            clearInterval(widening);
                        }
                    }, 10);


                }, 30) 
            }
            else {
                for(let row of gameboard){
                    for(let cell of row){
                        if (cell === null){
                            return false;
                        }
                    }
                }
                setTimeout(function() {
                    displayWinner.textContent ="It's a draw!";
                }, 30)
            }
        }
    });



