// Function that colors an entire segment - the middle (which we call seg) and the relevant borders of the corner-boxes that are touching the seg. 

function turnOnSeg(elementId, segNum) {

    // Make the elementId into a constant so that we can later style its segment
    const element = document.getElementById(elementId);

    let box1, box2;

    // Go through each number given in segNum (1-7), and turn on the item by coloring it red
    segNum.forEach(segNum => {
        const seg = element.querySelector(`#seg${segNum}`);
        seg.style.backgroundColor = 'red';

        if (segNum===1) {
            box1 = element.querySelector(`#b1`);
            box1.style.borderRightColor = 'red';
            box2 = element.querySelector(`#b2`);
            box2.style.borderLeftColor = 'red';
        }
        if (segNum===2) {
            box1 = element.querySelector(`#b1`);
            box1.style.borderBottomColor = 'red';
            box2 = element.querySelector(`#b3`);
            box2.style.borderTopColor = 'red';
        }
        if (segNum===3) {
            box1 = element.querySelector(`#b2`);
            box1.style.borderBottomColor = 'red';
            box2 = element.querySelector(`#b4`);
            box2.style.borderTopColor = 'red';
        }
        if (segNum===4) {
            box1 = element.querySelector(`#b3`);
            box1.style.borderRightColor = 'red';
            box2 = element.querySelector(`#b4`);
            box2.style.borderLeftColor = 'red';
        }
        if (segNum===5) {
            box1 = element.querySelector(`#b3`);
            box1.style.borderBottomColor = 'red';
            box2 = element.querySelector(`#b5`);
            box2.style.borderTopColor = 'red';
        }
        if (segNum===6) {
            box1 = element.querySelector(`#b4`);
            box1.style.borderBottomColor = 'red';
            box2 = element.querySelector(`#b6`);
            box2.style.borderTopColor = 'red';
        }
        if (segNum===7) {
            box1 = element.querySelector(`#b5`);
            box1.style.borderRightColor = 'red';
            box2 = element.querySelector(`#b6`);
            box2.style.borderLeftColor = 'red';
        }

    })
}

// A reset function that turns off all segments and corner-borders in a given elementId (first or second digit of hour or minutes)
function resetDigit(elementId) {

    // Make the elementId into a constant so that we can later style its segments and corner-boxes 
    const element = document.getElementById(elementId);

    // Go through each segment-box and turn it off
    
    for (let i = 1; i <= 7; i++) {
        const seg = element.querySelector(`#seg${i}`);
        seg.style.backgroundColor = 'rgba(255,0,0,0.15)';
    }

    // Turns off the border for each corner-box

    const b1 = element.querySelector('#b1');
    b1.style.borderRightColor = 'rgba(255,0,0,0.15)';
    b1.style.borderBottomColor = 'rgba(255,0,0,0.15)';

    const b2 = element.querySelector('#b2');
    b2.style.borderLeftColor = 'rgba(255,0,0,0.15)';
    b2.style.borderBottomColor = 'rgba(255,0,0,0.15)';

    const b3 = element.querySelector('#b3');
    b3.style.borderTopColor = 'rgba(255,0,0,0.15)';
    b3.style.borderRightColor = 'rgba(255,0,0,0.15)';
    b3.style.borderBottomColor = 'rgba(255,0,0,0.15)';

    const b4 = element.querySelector('#b4');
    b4.style.borderTopColor = 'rgba(255,0,0,0.15)';
    b4.style.borderLeftColor = 'rgba(255,0,0,0.15)';
    b4.style.borderBottomColor = 'rgba(255,0,0,0.15)';

    const b5 = element.querySelector('#b5');
    b5.style.borderRightColor = 'rgba(255,0,0,0.15)';
    b5.style.borderTopColor = 'rgba(255,0,0,0.15)';

    const b6 = element.querySelector('#b6');
    b6.style.borderLeftColor = 'rgba(255,0,0,0.15)';
    b6.style.borderTopColor = 'rgba(255,0,0,0.15)';
}

// Function that sets a digit in the clock after recieving elementId (first or second digit of hour or minutes) and the number it is supposed to set it to.
function setDigit(elementId, number) {

    // Reset the number
    resetDigit(elementId);

    //According to the number given, it will turn on relevant segments and relevant corner-boxes
    if (number === 0) { 
        turnOnSeg(elementId, [1, 2, 3, 5, 6, 7]);
    }
    if (number === 1) { 
        turnOnSeg(elementId, [3, 6]);
    }
    if (number === 2) { 
        turnOnSeg(elementId, [1, 3, 4, 5, 7]);
    }
    if (number === 3) { 
        turnOnSeg(elementId, [1, 3, 4, 6, 7]);
    }
    if (number === 4) { 
        turnOnSeg(elementId, [2, 3, 4, 6]);
    }
    if (number === 5) { 
        turnOnSeg(elementId, [1, 2, 4, 6, 7]);
    }
    if (number === 6) { 
        turnOnSeg(elementId, [1, 2, 4, 5, 6, 7]);
    }
    if (number === 7) { 
        turnOnSeg(elementId, [1, 3, 6]);
    }
    if (number === 8) { 
       turnOnSeg(elementId, [1, 2, 4, 5, 6, 7]);
   }
    if (number === 9) { 
        turnOnSeg(elementId, [1, 2, 3, 4, 6, 7]);
    }
        
}


// Now we will create a function that gets the time and updates the clock accordingly
function updateClock() {

    // Get the current time
    const now = new Date();
    // Get the hours and minutes
    const hour = now.getHours();
    const minutes = now.getMinutes();
    
    // Get the first and second digit of the hours
    const firstDigitHour = Math.floor(hour/10);
    const secondDigitHour = hour%10;
    // Get the first and second digit of minute
    const firstDigitMinutes = Math.floor(minutes/10);
    const secondDigitMinutes = minutes%10;

    // Run our function to update the clock accordingly
    // Update first and second digit of hour
    setDigit('hour-first-digit', firstDigitHour);
    setDigit('hour-second-digit', secondDigitHour);
    // Update the first and second digit of minute
    setDigit('minutes-first-digit', firstDigitMinutes);
    setDigit('minutes-second-digit', secondDigitMinutes);
}


// Activating the clock website

let isDotOn = true;
function updateColon() {
    // only run if secondCount passes three
    const colon = document.getElementsByClassName('colon-dot');
    colon[0].style.backgroundColor = isDotOn ? 'rgba(255,0,0,0.15)' : 'red';
    colon[1].style.backgroundColor = isDotOn ? 'rgba(255,0,0,0.15)' : 'red';
    isDotOn = !isDotOn;
    secondCount++;
}

updateClock();
setInterval(updateClock, 1000);
setInterval(updateColon, 1000);








// }
// Hershel's
// Change the border color of the left square
// function changeLeftBorder(rowElement, top = true) {
//     // Get the row position we want to change (row1, row2, row3)
//     const row = document.getElementsByClassName(rowElement);
//     // Get the left square
//     const element = row[0].document.getElementsByClassName('b1')[0];
//     // if top is true, change the top border, else change the bottom border
//     if (top) {
//         element.style.borderRightColor = 'red';
//     } else {
//         element.style.borderTopColor = 'red';
//     }
// }

// changeLeftBorder('row1', true);



// //Function that colors a corner border red after receiving elementID (first or second digit of hour or minutes), a box (one of the boxes - b1 to b6), and which border to turn on (top, bottom, right, or left)
// function turnOnBorder(elementClass, bNum, direction) {

//     //Make the elementId into a constant so that we can later style its corner-box border
//     const element = document.getElementsById(elementId);

//     //the relevant box that will be styled is according to what was given in the function, then changes the border on the top/bottom/right/left according to what was given in the function
//     const box = element.querySelector(bNum);
//     if (border==='top')
//         {
//          box.style.borderTop = 'red';
//         }
//     if (border==='right')
//         {
//          box.style.borderRight = 'red';
//         }
//     if (border==='left')
//         {
//          box.style.borderLeft = 'red';
//         }
//     else
//         {
//          box.style.borderBottom = 'red';
//         }
// }