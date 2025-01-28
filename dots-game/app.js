//build function that gets user input
let input = 4;

const gameboard = document.getElementById("gameboard");
createGameboard(input);

function createGameboard(num){
    for (let i = 1; i<=num+1; i++){
        createLine(num, i);
        if (i<=num){
            createRow(num, i);
        }
    }
}

function createLine(num, i){
    const lineCon = document.createElement('div');
    lineCon.className = "line-container";
    gameboard.appendChild(lineCon);

    for (let j = 1; j<=num+1; j++){
        const dot = document.createElement('div');
        dot.className = "dot";
        dot.id = `dot-${j}-line-${i}`;
        lineCon.appendChild(dot);
        if (j<=num){
            const line = document.createElement('div');
            line.className = "horizontal-line";
            line.id = `horizontal-${j}-line-${i}`;
            lineCon.appendChild(line);
        } 
    }   
}

function createRow(num, i){
    const rowCon = document.createElement('div');
    rowCon.className = "row-container";
    gameboard.appendChild(rowCon);

    for (let j = 1; j<=num+1; j++){
        const line = document.createElement('div');
        line.className = "vertical-line";
        line.id = `vertical-${j}-row-${i}`;
        rowCon.appendChild(line);
        if (j<=num){
            const fill = document.createElement('div');
            fill.className = "fill";
            fill.id = `fill-${j}-row-${i}`;
            rowCon.appendChild(fill);
        } 
    }   
}

const lineArray = document.querySelectorAll('[class*="-line"]'); 
let max = input*input;
let countRed = 0;
let countBlue = 0;
let turn = "blue";

let filled;

let displayTurn = document.querySelector('p');

lineArray.forEach(line =>{
    line.addEventListener("mouseenter", () =>{
        line.style.backgroundColor = "#ebebeb";
    });
    line.addEventListener("mouseleave", () =>{
        line.style.backgroundColor = "transparent";
    });

    line.addEventListener("click", () =>{

        if (!line.classList.contains("clicked")){
            line.classList.add("clicked");
            let dot1, dot2, num1, num2;

            filled = false;

            if (line.classList.contains("horizontal-line")){
                num1 = parseInt(line.id[11]); //elemenet's number within that line
                num2 = parseInt(line.id[18]); // the line ("row") the element is on
                dot1 = document.getElementById(`dot-${num1}-line-${num2}`);
                dot2 = document.getElementById(`dot-${num1+1}-line-${num2}`);
                
                //check to see if box on top is bordered, and if yes color the box
                if (num2>1){
                    line1 = document.getElementById(`vertical-${num1}-row-${num2-1}`); // check for left border of box on top
                    line2 = document.getElementById(`vertical-${num1+1}-row-${num2-1}`); // check for right border of box on top
                    line3 = document.getElementById(`horizontal-${num1}-line-${num2-1}`); // check for top border of box on top
                    if(line1.classList.contains("clicked")&&line2.classList.contains("clicked")&&line3.classList.contains("clicked")){
                        let fill = document.getElementById(`fill-${num1}-row-${num2-1}`);
                        fill.style.backgroundColor = color(turn);
                        filled = true;
                        addPoint();
                    }
                }

                //check to see if box on bottom is bordered, and if yes color the box
                if (num2<input+1){
                    line1 = document.getElementById(`vertical-${num1}-row-${num2}`); // check for left border of box on bottom
                    line2 = document.getElementById(`vertical-${num1+1}-row-${num2}`); // check for right border of box on bottom
                    line3 = document.getElementById(`horizontal-${num1}-line-${num2+1}`); // check for bottom border of box on bottom
                    if(line1.classList.contains("clicked")&&line2.classList.contains("clicked")&&line3.classList.contains("clicked")){
                        let fill = document.getElementById(`fill-${num1}-row-${num2}`);
                        fill.style.backgroundColor = color(turn);
                        filled = true;
                        addPoint();
                    }
                }
            }

            else { //if line.classList.contains("vertical-line")
                num1 = parseInt(line.id[9]); //element's number within that line
                num2 = parseInt(line.id[15]); // the line("row") the element is one
                dot1 = document.getElementById(`dot-${num1}-line-${num2}`);
                dot2 = document.getElementById(`dot-${num1}-line-${num2+1}`);

                //check to see if box on left is bordered, and if yes color the box
                if (num1>1){
                    line1 = document.getElementById(`vertical-${num1-1}-row-${num2}`); // check for left border of box on left
                    line2 = document.getElementById(`horizontal-${num1-1}-line-${num2}`); // check for top border of box on left
                    line3 = document.getElementById(`horizontal-${num1-1}-line-${num2+1}`); // check for bottom border of box on left
                    if(line1.classList.contains("clicked")&&line2.classList.contains("clicked")&&line3.classList.contains("clicked")){
                        let fill = document.getElementById(`fill-${num1-1}-row-${num2}`);
                        fill.style.backgroundColor = color(turn);
                        filled = true;
                        addPoint();
                    }
                }

                //check to see if box on right is bordered, and if yes color the box
                if (num1<input+1){
                    line1 = document.getElementById(`vertical-${num1+1}-row-${num2}`); // check for right border of box on right
                    line2 = document.getElementById(`horizontal-${num1}-line-${num2}`); // check for top border of box on right
                    line3 = document.getElementById(`horizontal-${num1}-line-${num2+1}`); // check for bottom border of box on right
                    if(line1.classList.contains("clicked")&&line2.classList.contains("clicked")&&line3.classList.contains("clicked")){
                        let fill = document.getElementById(`fill-${num1}-row-${num2}`);
                        fill.style.backgroundColor = color(turn);
                        filled = true;
                        addPoint();
                    }
                }  
            }
            dot1.style.borderRadius = "0px";
            dot2.style.borderRadius = "0px";
            
            if (filled===false){
                turn = switchTurn();
                displayTurn.textContent = turn;
                displayTurn.style.color = color(turn);
            }

            if (countBlue+countRed===max){
                setTimeout(()=>{
                    let winner
                    // if (!countBlue === countRed)
                    if (countBlue>countRed) winner = "blue";
                    else  winner = "red";
                    let winnerDisplay = document.getElementById('turn-display');
                    winnerDisplay.textContent = `${winner.charAt(0).toUpperCase()+winner.slice(1)} is the winner!`;
                    winnerDisplay.style.color = color(winner);
                    winnerDisplay.style.fontWeight = "500";
                    if (countBlue === countRed){
                        winnerDisplay.textContent = "Tie!"
                        winnerDisplay.style.fontWeight = "300";
                        winnerDisplay.style.color = "black";
                    } 
                     
                }, 100);
            }
        }
    });
});

function switchTurn(){
    if (turn === "blue") return "red";
    if (turn === "red") return "blue";
}

function addPoint(){
    if (turn === "blue") countBlue++;
    if (turn === "red") countRed++;
}

function color(turn){
    if (turn==="blue") return "rgb(131, 131, 218";
    if (turn==="red") return "rgb(218, 131, 131)";
}

let restart = document.getElementById("restart");
restart.addEventListener("click", ()=>{
    restart.style.backgroundColor = "rgb(166, 121, 192)";
    setTimeout(()=>{location.reload();}, 200);
});
     
