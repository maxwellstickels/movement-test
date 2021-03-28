var speedH = 0;
var speedV = 0;
var playerX = 200;
var playerY = 200;
var playerHue = 0;

var containerEl = document.getElementById("container");
function changeSpeed(event) {
    if (event.code == "KeyA") {
        speedH -= 0.5;
    }
    else if (event.code == "KeyD") {
        speedH += 0.5;
    }
    else if (event.code == "KeyS") {
        speedV += 0.5;
    }
    else if (event.code == "KeyW") {
        speedV -= 0.5;
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
        speedH *= -0.6;
    }
    else if (newX > 600) {
        playerX = 600;
        speedH *= -0.6;
    }
    else {
        playerX = newX;
    }
    if (newY < 0) {
        playerY = 0;
        speedV *= -0.6;
    }
    else if (newY > 400) {
        playerY = 400;
        speedV *= -0.6;
    }
    else {
        playerY = newY;
    }
    containerEl.innerHTML = "<div id=\"player\" style=\"background-color: hsl(" + playerHue + ", 100%, 50%); position: fixed; top: " + playerY + "px; left:" + playerX + "px\"></div>"
  }, 33);

document.addEventListener("keydown", changeSpeed);