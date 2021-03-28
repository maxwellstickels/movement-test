const ACCEL = 0.1;
const OUTER_BOUND = 95;
const BOUNCE_FRIC = -0.6;
const SLIDE_FRIC = 0.95;

var speedH = 0;
var speedV = 0;
var playerX = 47.5;
var playerY = 47.5;
var playerHue = 0;

var containerEl = document.getElementById("container");
function changeSpeed(event) {
    
    if (event.code == "KeyA") {
        speedH -= ACCEL;
    }
    else if (event.code == "KeyD") {
        speedH += ACCEL;
    }
    else if (event.code == "KeyS") {
        speedV += ACCEL;
    }
    else if (event.code == "KeyW") {
        speedV -= ACCEL;
    }
    else if (event.code == "Space") {
        speedH = 0;
        speedV = 0;
    }
}

var timeInterval = setInterval(function () {
    playerHue = (playerHue + 1) % 360;
    var newX = playerX + speedH;
    var newY = playerY + speedV;
    if (newX < 0) {
        playerX = 0;
        speedH *= BOUNCE_FRIC;
        speedV *= SLIDE_FRIC;
    }
    else if (newX > OUTER_BOUND) {
        playerX = OUTER_BOUND;
        speedH *= BOUNCE_FRIC;
        speedV *= SLIDE_FRIC;
    }
    else {
        playerX = newX;
    }
    if (newY < 0) {
        playerY = 0;
        speedV *= BOUNCE_FRIC;
        speedH *= SLIDE_FRIC;
    }
    else if (newY > 100 - (5 * window.innerWidth / window.innerHeight)) {
        playerY = 100 - (5 * window.innerWidth / window.innerHeight);
        speedV *= BOUNCE_FRIC;
        speedH *= SLIDE_FRIC;
    }
    else {
        playerY = newY;
    }
    containerEl.innerHTML = "<div id=\"player\" style=\"background-color: hsl(" + playerHue + ", 100%, 50%); position: fixed; top: " + playerY + "%; left:" + playerX + "%\"></div>"
  }, 33);

document.addEventListener("keydown", changeSpeed);