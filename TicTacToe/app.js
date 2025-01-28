
const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function winnerLine(gameboard){
    for (let i=0; i<3; i++){
        if (gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2] && gameboard[i][0] !== null) return `row ${i}`; //returns winning row index, for example "row 0"
        
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i] && gameboard[0][i] !== null) return `col ${i}`; //returns winning column index, for example "col 0"
    }
    if (gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2] && gameboard[1][1] !== null) return `dgnl 1`; //returns left-to-right diagonal
    if (gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0] && gameboard[1][1] !== null) return `dgnl 2`; //returns right-to-left diagonal
    return null;
}

function getWinner(gameboard, RCD){ //function receives as input gameboard and the winning row/column/diagonal from function winnerLine, for example "col 0"
    if (RCD.includes("row")===true) return gameboard[parseInt(RCD[4])][0]; //return value inside winning row, for example "X"
    if (RCD.includes("col")===true) return gameboard[0][parseInt(RCD[4])]; //return value inside winning column
    if(RCD.includes("dgnl")===true) return gameboard[1][1]; //returns value inside [1][1]
    return null;
}


const container = document.querySelector('.container');
const displayWinner = document.querySelector('.turn');


const span = document.querySelector('span');
let turn = "X";

    container.addEventListener('click', function(event) {
        if(event.target.tagName === 'DIV' && event.target.classList.contains('box') && gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1]===null && winnerLine(gameboard)===null ){
            switch(turn){
                case "X":
                    X = document.createElement('img');
                    X.src = "X.svg";
                    X.style.height = "70%";
                    X.style.width = "70%";
                    event.target.append(X);
                    gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1] ="X";
                    turn ="O";
                    span.textContent="O";
                    span.style.color="#fff4d3";
                    break;
                case "O":
                    O = document.createElement('img');
                    O.src = "O.svg";
                    O.style.height = "70%";
                    O.style.width = "70%";
                    event.target.append(O);
                    gameboard[parseInt(event.target.parentElement.id[3])-1][parseInt(event.target.className[4])-1] ="O";
                    turn="X";
                    span.textContent="X";
                    span.style.color="#eb7878";
                    break;           
            }
            
            winner = getWinner(gameboard, winnerLine(gameboard)); //winner will have the value of "X" or "O" 
            if (winner!==null) {
                setTimeout(function() {
                    line = winnerLine(gameboard); //returns row, col or dgnl with their number (0, 1, 2)
                    
                    if (line.includes("row")===true) strikethrough(container, parseInt(line[4])+1, "row");
                    else if (line.includes("col")===true) strikethrough(container, parseInt(line[4])+1, "column");
                    else strikethrough(container, parseInt(line[5])+1, "diagonal");

                    displayWinner.textContent = `Player ${winner} won!`;
                    if (winner === "X") displayWinner.style.color ="#eb7878";
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


function strikethrough(container, startingDiv, RCD) { //the function receives the container, the starting div number from which to do a strikethrough and the RCD input which is row/column/diagonal is to decide on the angle it will go at
    let strike = document.createElement('div');
    strike.style.backgroundColor = "black";
    strike.style.position = "absolute";

    if (RCD==="row") {
        strike.style.width = window.getComputedStyle(container).width;
        strike.style.height = "30px";
        const row = document.getElementById(`row${startingDiv}`);
        row.style.justifyContent = "center";
        row.append(strike);
    }

    if (RCD==="column"){
        strike.style.height = window.getComputedStyle(container).height;
        strike.style.width = "30px";
        const col = document.getElementById(`box ${startingDiv}`);
        col.style.alignItems = "center";
        col.append(strike);
    }
s
   if (RCD==="diagonal"){
        strike.style.width = window.getComputedStyle(container).height;
        strike.style.height = "30px";
        if (startingDiv=="1") strike.style.transform = "rotate(45deg)";
        else strike.style.transform ="rotate(-45deg)";
    }

}


