
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
        
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i] && gameboard[0][i] !== null) return `column ${i+1}`; //returns winning column
    }
    if (gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2] && gameboard[1][1] !== null) return "diagonal 1"; //returns winning diagonal
    if (gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0] && gameboard[1][1] !== null) return "diagonal 2"; //returns winning diagonal
    return null;
}





const container = document.querySelector('.container');
const displayWinner = document.querySelector('.turn');

//let winner = null;

const span = document.querySelector('span');
let turn = "X";

    container.addEventListener('click', function(event) {
        if(event.target.tagName === 'DIV' && event.target.classList.contains('box') && gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1]===null && gameOver(gameboard)===null ){
            switch(turn){
                case "X":
                    let X= document.createElement('img');
                    X.src = "X.svg";
                    X.style.eight = "70%";
                    X.style.width = "70%";
                    event.target.append(X);
                    // let X = document.createElement('img');
                    // X.src = "X.png";
                    // event.target.append(X);
                    // X.style.width = "70%";
                    // X.style.height = "70%";
                    gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1] ="X";
                    turn ="O";
                    span.textContent="O";
                    span.style.color="#fff4d3";
                    break;
                case "O":
                    let Osvg = document.createElement('img');
                    Osvg.src = "O.svg";
                    Osvg.style.eight = "70%";
                    Osvg.style.width = "70%";
                    event.target.append(Osvg);
                    // let O = document.createElement('img');
                    // O.src = "O.png";
                    // event.target.append(O);
                    // O.style.width = "70%";
                    // O.style.height = "70%";
                    gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1] ="O";
                    turn="X";
                    span.textContent="X";
                    span.style.color="#eb7878";
                    break;           
            }
            
            winner = gameOver(gameboard);
            if (winner!==null) {
                setTimeout(function() {
                    displayWinner.textContent = `Player ${winner} won!`
                    if (winner === "X") displayWinner.style.color ="#eb7878"
                    else displayWinner.style.color= "#fff4d3"; 
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


function horizontalLine(rowNum) {

}


