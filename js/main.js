// top variables
var key;
var player;
var playerPos;
var isMoving = false;
var moveStep = 1;
var freezeChar = false;
var randRow = 5;
var randCol = 5;
var ring4 = [];
var ring3 = [];
var ring2 = [];
var ring1 = [];
var inRing;
var radarState = false;
var radarUses = 0;
var chainBreak = 0;
var lastChain = 0;
var highChain = 0;
var totPatch = 0;
var nPatch = 0;
var sPatch = 0;
var haPatch = 0;
var shaPatch = 0;
var chainNums = [];
var f1IV = 0;
var f2IV = 0;
var f3IV = 0;
var f5IV = 0;
var r0IV = 0;
var r1IV = 0;
var r2IV = 0;
var r3IV = 0;
var r4IV = 0;
var r5IV = 0;
var r6IV = 0;
var shinyOdds0 = ['4096', '3855', '3640', '3449', '3277', '3121', '2979', '2849', '2731', '2621', '2521', '2427', '2341', '2259', '2185', '2114', '2048', '1986', '1927', '1872', '1820', '1771', '1724', '1680', '1638', '1598', '1560', '1524', '1489', '1456', '1310', '1285', '1260', '1236', '1213', '1192', '993', '799', '400', '200', '99'];
var shinyOdds1 = ['8192', '7282', '7282', '7282', '7282', '6554', '6554', '6554', '6554', '5958', '5958', '5958', '5461', '5461', '5041', '5041', '4681', '4681', '4369', '4369', '4096', '3855', '3641', '3449', '3277', '3121', '2979', '2731', '2521', '2341', '2185', '1986', '1771', '1598', '1394', '1192', '993', '799', '596', '400', '200'];

// init
var gameVersion;
var captureMethod;
var customChain;
var radarChain;
var chainAttempts;
var chainTarget;
var autoDelay;
var chainMethod;
var isInfinite;
storageSystem();
createArea();
createPlayer();
startPos();
positionData();
playerPos.append(player)
//radarArea();
useRadar();

function createArea() {
    var fragment = document.createDocumentFragment();
    var getContain = document.getElementById('container');
    for (var i = 1; i <= 9; i++) {
        var row = document.createElement("div");
        row.setAttribute("id", `row-` + i);
        row.classList.add("rows");
        for (var ii = 1; ii <= 9; ii++) {
            var tile = document.createElement("div");
            tile.setAttribute("id", i + `-` + ii);
            row.append(tile);
            var terrain = document.createElement("img");
            // var genTerrain = generateInt(10);
            // if (genTerrain <= 9 || (i == 5 && ii == 5)) {
            terrain.setAttribute("src", "assets/Grass.png");
            terrain.classList.add("grass");
            // } else {
            //     terrain.setAttribute("src", "assets/Rock.png");
            //     terrain.classList.add("rock");
            // }
            tile.append(terrain);
        }
        fragment.append(row);
    }
    getContain.append(fragment);
}

document.addEventListener('keydown', function (event) {
    key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
            event.preventDefault();
            movePos();
    }
    switch (event.key) {
        case "ArrowLeft":
            break;
        case "ArrowRight":
            break;
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
    }
});


// functions
function movePos() {
    if (!isMoving && !freezeChar) {
        if (key == "ArrowLeft") {
            if (randCol != 1 && !aheadTile(key)) {
                randCol = Math.max(1, randCol - 1);
                player.classList.add("move-left");
                movePlayer();
            } else {
                player.setAttribute("src", "assets/player/Player_L_Side.png");
            }
        } else if (key == "ArrowRight") {
            if (randCol != 9 && !aheadTile(key)) {
                randCol = Math.min(9, randCol + 1);
                player.classList.add("move-right");
                movePlayer();
            } else {
                player.setAttribute("src", "assets/player/Player_R_Side.png");
            }
        } else if (key == "ArrowUp") {
            if (randRow != 1 && !aheadTile(key)) {
                randRow = Math.max(1, randRow - 1);
                player.classList.add("move-up");
                movePlayer();
            } else {
                player.setAttribute("src", "assets/player/Player_Back.png");
            }
        } else {
            if (randRow != 9 && !aheadTile(key)) {
                randRow = Math.min(9, randRow + 1);
                player.classList.add("move-down");
                movePlayer();
            } else {
                player.setAttribute("src", "assets/player/Player_Front.png");
            }
        }
        if (isMoving == true) {
            setTimeout(function () {
                positionData();
                if (radarState == true) {
                    checkPatch();
                }
            }, 150);
        }
    }
}

function aheadTile(key) {
    var compRow = randRow;
    var compCol = randCol;
    switch (key) {
        case "ArrowLeft":
            compCol = randCol - 1;
            break;
        case "ArrowRight":
            compCol = randCol + 1;
            break;
        case "ArrowUp":
            compRow = randRow - 1;
            break;
        case "ArrowDown":
            compRow = randRow + 1;
            break;
    }
    try {
        return document.getElementById(compRow + `-` + compCol).querySelector('img').classList[0] == "rock";
    }
    catch (err) {
        return true;
    }
}

function movePlayer() {
    isMoving = true;
    var moveFrame;
    var idleFrame;
    switch (key) {
        case "ArrowLeft":
            moveFrame = "_Left_";
            idleFrame = "_L_Side";
            break;
        case "ArrowRight":
            moveFrame = "_Right_";
            idleFrame = "_R_Side";
            break;
        case "ArrowUp":
            moveFrame = "_Up_";
            idleFrame = "_Back";
            break;
        case "ArrowDown":
            moveFrame = "_Down_";
            idleFrame = "_Front";
            break;
    }
    player.setAttribute("src", `assets/player/Player${moveFrame}${moveStep}.png`);
    setTimeout(function () {
        player.setAttribute("src", `assets/player/Player${idleFrame}.png`);
        moveAnim();
    }, 150);
}

function moveAnim() {
    if (moveStep == 1) {
        moveStep++;
    } else {
        moveStep--;
    }
}

function checkPatch() {
    for (var i = 1; i <= 4; i++) {
        if (window[`ring${i}`][0].querySelector('#player') != null) {
            inRing = i;
            //console.log(window[`ring${i}`][0])
            checkChain();
        }
    }
}

function checkChain() {
    var advChain = 0;
    var verDiff = 0;
    var verInc;
    verInc = (10 * (1 + gameVersion));
    if (gameVersion == 1) {
        verDiff = 25;
    }
    switch (inRing) {
        case 4:
            advChain += verInc;
        case 3:
            advChain += verInc;
        case 2:
            advChain += verInc;
        case 1:
            advChain += (53 - verDiff);
    }
    //console.log(advChain + captureMethod)
    var contChain = generateInt(100);
    var genIVs = [];
    var flawIV = 0;
    switch (radarChain) {
        case 100:
            genIVs.push(31, 31);
            flawIV = flawIV + 2;
        case 40:
            genIVs.push(31);
            flawIV++;
        case 30:
            genIVs.push(31);
            flawIV++;
        case 20:
            genIVs.push(31);
            flawIV++;
    }
    //console.log(`guaranteed flawless IVs is ${flawIV}`)
    if (flawIV > 0) {
        window[`f${flawIV}IV`]++;
    }
    var genLength = (6 - genIVs.length);
    for (var iv = 0; iv < genLength; iv++) {
        var randIV = (generateInt(32) - 1);
        genIVs.push(randIV);
    }
    //console.log(genIVs)
    var countIVs = genIVs.reduce(function(n, val) {
        return n + (val === 31);
    }, 0);
    window[`r${countIVs}IV`]++;
    //console.log(countIVs)
    if (contChain <= advChain + captureMethod) {
        radarChain++;
    } else {
        chainBreak++;
        lastChain = radarChain;
        chainNums.push(lastChain);
        radarChain = Math.max(0, customChain);
    }
    //document.getElementById('chain-counter').innerHTML = `Chain: ${radarChain}`
    useRadar();
    //console.log(inRing)
}

function randPos() {
    randRow = randCor();
    randCol = randCor();
    positionData();
}

function randCor() {
    return Math.floor(Math.random() * 9) + 1;
}

function positionData() {
    player.setAttribute("data-row", randRow);
    player.setAttribute("data-col", randCol);
    playerPos = document.getElementById(randRow + `-` + randCol);
    player.removeAttribute("class");
    playerPos.append(player);
    player.style.animationFillMode = "forwards";
    document.getElementById('position').innerHTML = `Row: ${randRow} Patch: ${randCol}`;
    isMoving = false;
}

function storageSystem() {
    var storeNames = ["gameVersion", "captureMethod", "customChain", "chainAttempts", "chainTarget", "autoDelay", "chainMethod"]
    var storeDefaults = ["0", "0", "0", "0", "0", "0", "0"]
    for (var ls = 0; ls < storeNames.length; ls++) {
        if (localStorage.getItem(storeNames[ls]) == null) {
            localStorage.setItem(storeNames[ls], "init");
        }
    }
    for (var ld = 0; ld < storeNames.length; ld++) {
        if (localStorage.getItem(storeNames[ld]) == "init") {
            localStorage.setItem(storeNames[ld], storeDefaults[ld]);
        }
    }
    for (var sv = 0; sv < storeNames.length; sv++) {
        window[storeNames[sv]] = +localStorage.getItem(storeNames[sv]);
    }
    radarChain = customChain;
    //
    document.getElementById("game-version").selectedIndex = gameVersion;
    document.getElementById("chain-method").selectedIndex = chainMethod;
    document.getElementById("chain-set").value = customChain.toLocaleString();
    document.getElementById("chain-attempt").value = chainAttempts.toLocaleString();
    document.getElementById("chain-target").value = chainTarget.toLocaleString();
    document.getElementById("auto-delay").value = autoDelay.toLocaleString();
    if (captureMethod == 10) {
        document.getElementById('catching').checked = true;
    }
    //
    document.getElementById('game-version').addEventListener('change', event => { catchToggle(event.target) });
    document.getElementById('catching').addEventListener('click', event => { catchToggle(event.target) });
    document.querySelector('#chain-set').addEventListener('input', event => { chainCustom(event.target) });
    document.querySelector('#chain-attempt').addEventListener('keydown', event => { infFunc(event.target) });
    document.querySelector('#chain-attempt').addEventListener('input', event => { autoFunc(event.target) });
    document.querySelector('#chain-target').addEventListener('input', event => { autoFunc(event.target) });
    document.querySelector('#auto-delay').addEventListener('input', event => { autoFunc(event.target) });
    document.querySelector('#chain-method').addEventListener('input', event => { autoFunc(event.target) });
}

function catchToggle(ele) {
    var saveName;
    var saveVal;
    var grabID = ele.id;
    if (grabID == "game-version") {
        gameVersion = +ele.value;
        saveName = "gameVersion"
        saveVal = gameVersion;
    }
    if (grabID == "catching") {
        if (ele.checked == true) {
            captureMethod = 10;
        } else {
            captureMethod = 0;
        }
        saveName = "captureMethod"
        saveVal = captureMethod;
    }
    console.log(saveName)
    console.log(saveVal)
    localStorage.setItem(saveName, saveVal);
}

function chainCustom() {
    customChain = +event.target.value.replace(/[A-Za-z!@#$%^&*()]/g, '').replace(/[,]/g, "");
    localStorage.setItem("customChain", customChain);
    radarChain = customChain;
    event.target.value = customChain.toLocaleString();
}

function infFunc() {
    if (event.key == "i") {
        isInfinite = true;
    } else {
        isInfinite = false;
    }
}

function autoFunc() {
    var eleID = event.target.id;
    var autoVal;
    if (isInfinite == true) {
        autoVal = Infinity;
    } else {
        autoVal = +event.target.value.replace(/[A-Za-z!@#$%^&*()]/g, '').replace(/[,]/g, "");
    }
    var autoEl;
    if (eleID == "chain-attempt") {
        chainAttempts = autoVal;
        autoEl = "chainAttempts";
    }
    if (eleID == "chain-target") {
        chainTarget = autoVal;
        autoEl = "chainTarget";
    }
    if (eleID == "auto-delay") {
        autoDelay = autoVal;
        autoEl = "autoDelay";
    }
    if (eleID == "chain-method") {
        chainMethod = autoVal;
        autoEl = "chainMethod";
    }
    localStorage.setItem(autoEl, autoVal);
    event.target.value = autoVal.toLocaleString();
}

function createPlayer() {
    player = document.createElement("img");
    player.setAttribute("id", "player");
    player.setAttribute("src", "assets/player/Player_Front.png");
}

function startPos() {
    playerPos = document.getElementById('5-5');
}

function radarArea() {
    removeArea();
    // var getRow = +player.getAttribute("data-row");
    // var getCol = +player.getAttribute("data-col");
    var maxLeft = Math.max(randCol - 4, 1);
    var maxRight = Math.min(randCol + 4, 9);
    var maxUp = Math.max(randRow - 4, 1);
    var maxDown = Math.min(randRow + 4, 9);
    //console.log("maxLeft is " + maxLeft)
    //console.log("maxRight is " + maxRight)
    //console.log("maxUp is " + maxUp)
    //console.log("maxDown is " + maxDown)
    //console.log("Row is " + randRow + " Col is " + randCol);

    for (var i = maxUp; i <= maxDown; i++) {
        for (var ii = maxLeft; ii <= maxRight; ii++) {
            var getTile = document.querySelectorAll(`#row-${i} div:nth-child(${ii})`)
            if (getTile[0].querySelector('#player') == null) {
                for (var iii = 4; iii != 0; iii--) {
                    if (i + iii == randRow || i - iii == randRow || ii + iii == randCol || ii - iii == randCol) {
                        if (getTile[0].querySelector('img').classList[0] != "rock") {
                            //getTile[0].querySelector("img").setAttribute("style", `filter: hue-rotate(` + 65 * iii + `deg);`);
                            window[`ring${iii}`].push(getTile[0]);
                            //console.log(getTile[0].querySelector('img').classList[0])
                            iii = 1;
                        }
                    }
                }
            }
        }
    }
    //console.log(ring4)
    //console.log(ring3)
    //console.log(ring2)
    //console.log(ring1)
    //console.log(patchArray)
}

function removeArea() {
    var getGrass = document.querySelectorAll('.grass[style]');
    if (getGrass.length > 0) {
        for (var i = getGrass.length; i != 0; i--) {
            getGrass[i - 1].removeAttribute("style");
        }
    }
    for (var ii = 1; ii <= 4; ii++) {
        if (window[`ring${ii}`].includes("shiny")) {
            window[`ring${ii}`][0].querySelector("img").setAttribute("src", "assets/Grass.png")
        }
    }
    clearRings();
}

function clearRings() {
    //patchArray = [];
    ring4 = [];
    ring3 = [];
    ring2 = [];
    ring1 = [];
}

function useRadar() {
    radarState = true;
    radarArea();
    var genPatch = [];
    // while (genPatch.length < 4) {
    //     var r = Math.floor(Math.random() * patchArray.length);
    //     if (genPatch.indexOf(r) === -1) genPatch.push(r);
    // }
    for (var i = 4; i != 0; i--) {
        var tempGen = [];
        var r = Math.floor(Math.random() * window[`ring${i}`].length);
        tempGen.push(r)
        genPatch = tempGen.concat(genPatch)
    }
    //console.log(genPatch);
    for (var ii = 4; ii != 0; ii--) {
        var selPatch = window[`ring${ii}`][genPatch[ii - 1]];
        window[`ring${ii}`] = [];
        window[`ring${ii}`].push(selPatch);
        for (var s = 0; s <= Math.min(40, radarChain); s++) {
            var isHA;
            if (s == Math.min(40, radarChain)) {
                selPatch.querySelector("img").setAttribute("style", `filter: hue-rotate(50deg);`);
            }
            if (s == Math.min(40, radarChain) && generateInt(128) == 1) {
                selPatch.querySelector("img").setAttribute("style", `filter: hue-rotate(100deg);`);
                window[`ring${ii}`].push("ability");
                isHA = true;
            }
            if (s == Math.min(40, radarChain) && generateInt(window[`shinyOdds${gameVersion}`][Math.min(40, radarChain)]) == 1) {
                selPatch.querySelector("img").setAttribute("src", "assets/Grass_Shiny.png");
                if (isHA == true) {
                    selPatch.querySelector("img").setAttribute("style", `filter: hue-rotate(200deg);`);
                } else {
                    selPatch.querySelector("img").setAttribute("style", `filter: hue-rotate(300deg);`);
                }
                window[`ring${ii}`].push("shiny");
                s = 41;
            }
            document.getElementById('shiny-chance').innerHTML = `✨ 1 in ${window[`shinyOdds${gameVersion}`][Math.min(40, s)]} ✨`
        }
    }
    document.getElementById('chain-counter').innerHTML = `Chain: ${radarChain}`
    collectData();
}

function collectData() {
    var shaEle = document.getElementById('shiny-ha-patch');
    var sEle = document.getElementById('shiny-patch');
    var haEle = document.getElementById('ability-patch');
    var nEle = document.getElementById('normal-patch');
    for (var i = 1; i <= 4; i++) {
        totPatch++;
        if (window[`ring${i}`].length == 3) {
            shaPatch++;
        } else if (window[`ring${i}`].length == 2) {
            if (window[`ring${i}`].includes("shiny")) {
                sPatch++;
            } else {
                haPatch++;
            }
        } else {
            nPatch++;
        }
    }
    radarUses++;
    document.getElementById('radar-uses').innerHTML = `Radar Uses: ${radarUses.toLocaleString()}`
    document.getElementById('chain-break').innerHTML = `Chain Breaks: ${chainBreak.toLocaleString()}`
    highChain = Math.max(highChain, lastChain, radarChain);
    document.getElementById('chain-high').innerHTML = `Highest Chain: ${highChain.toLocaleString()}`
    shaEle.innerHTML = `Shiny HA Patches: ${shaPatch.toLocaleString()} ${getPercent(shaPatch)}`
    sEle.innerHTML = `Shiny Patches: ${sPatch.toLocaleString()} ${getPercent(sPatch)}`
    haEle.innerHTML = `HA Patches: ${haPatch.toLocaleString()} ${getPercent(haPatch)}`
    nEle.innerHTML = `Normal Patches: ${nPatch.toLocaleString()} ${getPercent(nPatch)}`
    document.getElementById('flaw-1IV').innerHTML = `Flawless 1 IV: ${f1IV.toLocaleString()}`
    document.getElementById('flaw-2IV').innerHTML = `Flawless 2 IV: ${f2IV.toLocaleString()}`
    document.getElementById('flaw-3IV').innerHTML = `Flawless 3 IV: ${f3IV.toLocaleString()}`
    document.getElementById('flaw-5IV').innerHTML = `Flawless 5 IV: ${f5IV.toLocaleString()}`
    document.getElementById('0IV').innerHTML = `Total 0 IV: ${r0IV.toLocaleString()}`
    document.getElementById('1IV').innerHTML = `Total 1 IV: ${r1IV.toLocaleString()}`
    document.getElementById('2IV').innerHTML = `Total 2 IV: ${r2IV.toLocaleString()}`
    document.getElementById('3IV').innerHTML = `Total 3 IV: ${r3IV.toLocaleString()}`
    document.getElementById('4IV').innerHTML = `Total 4 IV: ${r4IV.toLocaleString()}`
    document.getElementById('5IV').innerHTML = `Total 5 IV: ${r5IV.toLocaleString()}`
    document.getElementById('6IV').innerHTML = `Total 6 IV: ${r6IV.toLocaleString()}`
    var avgChain = 0;
    for (var i = 1; i < chainNums.length; i++) {
        avgChain += chainNums[i];
    }
    if (avgChain != 0) {
        avgChain = (avgChain / chainNums.length).toFixed(2);
    }
    document.getElementById('chain-average').innerHTML = `Average Chain: ${avgChain.toLocaleString()}`
}


// misc functions
function generateInt(odds) {
    return Math.floor(Math.random() * odds) + 1;
}

function getPercent(type) {
    return `(${((type / totPatch) * 100).toFixed(2)}%)`
}

function startAutomate() {
    if (freezeChar == true) {
        clearInterval(isAutomate)
        freezeChar = false;
        document.getElementById('automate').innerHTML = "Automate"
        return true;
    }
    freezeChar = true;
    document.getElementById('automate').innerHTML = "End Automate"
    isAutomate = setInterval(function () {
        if (chainBreak < chainAttempts) {
            if (chainTarget <= radarChain) {
                if (window[`ring${4}`].includes("shiny")) {
                    randRow = +ring4[0].id.match(/^[0-9]/g);
                    randCol = +ring4[0].id.match(/[0-9]$/g);
                    positionData();
                    checkPatch();
                } else {
                    useRadar();
                }
            } else {
                randRow = +window[`ring${chainMethod + 1}`][0].id.match(/^[0-9]/g);
                randCol = +window[`ring${chainMethod + 1}`][0].id.match(/[0-9]$/g);
                positionData();
                checkPatch();
            }
        } else {
            clearInterval(isAutomate);
            startAutomate();
        }
        // for (var i = 1; i <= 4; i++) {
        //     if (window[`ring${i}`].length == 3) {
        //         clearInterval(test)
        //         i = 5;
        //     }
        // }
    }, autoDelay);
}

var keepOpen;
var test;
document.getElementById('options').addEventListener('mouseenter', event => { test = 0; details(event.target) });
document.getElementById('automater').addEventListener('mouseenter', event => { test = 1; details(event.target) });
document.getElementById('statistics').addEventListener('mouseenter', event => { test = 2; details(event.target) });
function details() {
    keepOpen = setInterval(function () {
        var element = document.querySelectorAll('details')[test];
        if (element.matches(':hover')) {
            element.open = true;
        } else {
            element.open = false;
            clearInterval(keepOpen);
        }
    }, 0);
}

document.getElementById("statistics").querySelector('.tools').addEventListener('click', event => { copyStats(); });
function copyStats() {
    var statCopy = document.getElementById("statistics").innerHTML.replace(/<(.*?)>|</g, "").trim().replace(/^\s(.*?)\s\b/gm, "");
    navigator.clipboard.writeText(statCopy);
}