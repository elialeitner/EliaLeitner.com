// Turn off segment
function turnOffSeg(elementId, segNum) {
    // Get segment div
    const element = document.getElementById(elementId);
    // Go through each number given in segNum, and turn off the segment
    segNum.forEach(segNum => {
        const seg = element.querySelector(`#seg${segNum}`);
        seg.style.backgroundColor = 'rgba(255,0,0,0.15)';
    })
}

// Create a reset function to turn on all segments
function resetSeg(elementId) {
    // Get segment div
    const element = document.getElementById(elementId);
    // Go through each segment and turn it on
    for (let i = 1; i <= 7; i++) {
        const seg = element.querySelector(`#seg${i}`);
        seg.style.backgroundColor = 'red';
    }
}

function setNumber(elementId, number) {
    // Reset the number
    resetSeg(elementId);
    if (number === 0) { 
        turnOffSeg(elementId, [4]);
    }
    if (number === 1) { 
        turnOffSeg(elementId, [1, 2, 4, 5, 7]);
    }
    if (number === 2) { 
        turnOffSeg(elementId, [2, 6]);
    }
    if (number === 3) { 
        turnOffSeg(elementId, [2, 5]);
    }
    if (number === 4) { 
        turnOffSeg(elementId, [1, 5, 7]);
    }
    if (number === 5) { 
        turnOffSeg(elementId, [3,5]);
    }
    if (number === 6) { 
        turnOffSeg(elementId, [3]);
    }
    if (number === 7) { 
        turnOffSeg(elementId, [2, 4, 5, 7]);
    }
    //if (number === 8) { 
     //   turnOffSeg(elementId, [1, 2, 4, 5, 7]);
   // }
    if (number === 9) { 
        turnOffSeg(elementId, [5]);
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
    setNumber('hour-first-digit', firstDigitHour);
    setNumber('hour-second-digit', secondDigitHour);
    // Update the first and second digit of minute
    setNumber('minutes-first-digit', firstDigitMinutes);
    setNumber('minutes-second-digit', secondDigitMinutes);
}

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

