//top variables
var player;
var playerPos;
var randRow = 5;
var randCol = 5;
var patchArray = [];

//init
createPlayer();
startPos();
positionData();
radarArea();
playerPos.append(player)

//functions
function randPos() {
    randRow = randCor();
    randCol = randCor();
    positionData();
    playerPos = document.getElementById(randRow + `-` + randCol);
    playerPos.append(player);
    document.getElementById('position').innerHTML = `Row: ${randRow} Patch: ${randCol}`;
}

function randCor() {
    return Math.floor(Math.random() * 9) + 1;
}

function createPlayer() {
    player = document.createElement("img");
    player.setAttribute("id", "player");
    player.setAttribute("src", "assets/Player.png");
}

function startPos() {
    playerPos = document.getElementById('5-5');
}

function positionData() {
    player.setAttribute("data-row", randRow);
    player.setAttribute("data-col", randCol);
}

function radarArea() {
    removeArea();
    var getRow = +player.getAttribute("data-row");
    var getCol = +player.getAttribute("data-col");
    var maxLeft = Math.max(getCol - 4, 1);
    var maxRight = Math.min(getCol + 4, 9);
    var maxUp = Math.max(getRow - 4, 1);
    var maxDown = Math.min(getRow + 4, 9);
    console.log("maxLeft is " + maxLeft)
    console.log("maxRight is " + maxRight)
    console.log("maxUp is " + maxUp)
    console.log("maxDown is " + maxDown)
    console.log("Row is " + getRow + " Col is " + getCol);

    for (var i = maxUp; i <= maxDown; i++) {
        for (var ii = maxLeft; ii <= maxRight; ii++) {
            var getPatch = document.querySelectorAll(`#row-${i} div:nth-child(${ii})`)
            getPatch[0].querySelector("img").setAttribute("style", "filter: hue-rotate(65deg);")
            patchArray.push(getPatch[0])
        }
    }
    console.log(patchArray)
}

function removeArea() {
    var getGrass = document.querySelectorAll('.grass[style]');
    if (getGrass.length > 0) {
        for (var i = getGrass.length; i != 0; i--) {
            getGrass[i - 1].removeAttribute("style");
        }
    }
}