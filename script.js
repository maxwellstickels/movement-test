const ACCEL = 0.1;
const OUTER_BOUND = 95;
const BOUNCE_FRIC = -0.6;
const SLIDE_FRIC = 0.95;
// 2.5% horizontal/vertical offset of playerX or playerY gives the player's center.
const OFFSET = 2.5;

// Tracks the speed of player at any given moment.
var speedH = 0;
var speedV = 0;

// Player is centered horizontally, but actually not vertically.
// (5% as wide as the screen, keeps square shape regardless so not always 5% as tall as the screen.)
var playerX = 47.5;
var playerY = 47.5;

// Constantly gets shifted.
var playerHue = 0;

var containerEl = document.getElementById("container");

// Responds only to key presses. Clicks / screen touches use different movement method
function changeSpeed(event) {
    // Standard WASD movement:
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
    // To stop the player, press SPACE:
    else if (event.code == "Space") {
        speedH = 0;
        speedV = 0;
    }
}

//
function changeSpeedClick(event) {
    // Stops proprogation so click event doesn't apply to anything else
    event.stopPropagation();

    // Converts click coordinates to game coordinates (%)
    var clickX = event.clientX / window.innerWidth * 100;
    var clickY = event.clientY / window.innerHeight * 100;
    // Pythagoras stay winnin. Using these for the sin, cos, tangent aspect, ya feel?
    var clickDistX = clickX - playerX - OFFSET;
    var clickDistY = clickY - playerY - OFFSET;
    var clickHypotenuse = clickDistX * clickDistX + clickDistY * clickDistY;

    console.log("Click coords: (" + clickX + ", " + clickY + "); Player top left: (" + playerX + "," + playerY + "); Distance: " + clickDistX + "^2 + " + clickDistY + "^2 = " + clickHypotenuse + "^2.");

    speedH += 0.1 * Math.sin(clickDistX/clickHypotenuse) * (clickHypotenuse / 10);;
    speedV += 0.1 * Math.sin(clickDistY/clickHypotenuse) * (clickHypotenuse / 10);

    console.log("H = " + 0.1 * Math.cos(clickDistX/clickHypotenuse) + ", V = " + Math.sin(clickDistY/clickHypotenuse) + "")
}

// This function is an interval and happens every frame.
var timeInterval = setInterval(function () {
    playerHue = (playerHue + 1) % 360;
    var newX = playerX + speedH;
    var newY = playerY + speedV;
    containerEl.setAttribute("style", "height: " + window.innerHeight + "px; width: " + window.innerWidth + "px");
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
    containerEl.innerHTML = "<div id=\"player\" style=\"background-color: hsl(" + playerHue + ", 100%, 50%); position: fixed; top: " + playerY + "%; left: " + playerX + "%\"></div>"
  }, 33);

document.addEventListener("keydown", changeSpeed);
containerEl.addEventListener("click", changeSpeedClick);
