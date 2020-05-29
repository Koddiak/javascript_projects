/*===================================================================================
This function will get fired once the DOM is loaded. Disable the stop button since it
is not needed until game start.
===================================================================================*/
window.onload = function() {watch()};
function watch() {
    var btn = document.getElementById("btn-stop");
    btnDisabled(btn); /* Disable the stop button since the game has not started. */
}

/*===================================================================================
This function will roll for random number twice, one for each player and determine
which player won the roll.
===================================================================================*/
function rollForTurn() {
    var xArray= [];
    var ranNum = "";
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        /* Random whole number between 1 and 10. */
        ranNum = Math.floor(Math.random() * (maximum - minimum) + minimum);
        xArray.push(ranNum);
    }
    diceRoll(); /* Play dice sounds during the game roll for turn. */
    /* Build the string to show which player rolled what die roll. */
    for (i = 0; i < xArray.length; i++) {
        var result = i + 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne == pTwo) { /* Rigging roll on tie to avoid bug in code. Need to address this later... */
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled [" + pOne + "]<br />";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled ["+pTwo+"]<br /><br />";
        setTimeout(function() {writeMsg(txt1);}, 1000); /* Time delay for dramatic affect. */
    }
    /* Determine and concatenate string showing which player won the roll. */
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function() {txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function() {txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    /* Pass which player won the roll. */
    return first;
}

/*===================================================================================
Initiate the game, roll for turn and determine the active player.
===================================================================================*/
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") { /* If it was a tie, then reroll. */
        activePlayer = rollForTurn();
    }
    setTimeout(function() {hideGameMsg();}, 4000);

    /* Assign proper state of the control buttons. */
    var btn = document.getElementById("btn-start");
    btnDisabled(btn); /* Disable the start button since the game is now afoot. */
    var btn = document.getElementById("btn-stop");
    stopEnabled(btn); /* Enable the stop button since the game is now afoot. */

    /* Assign the Active Player to the console. */
    var showPlayer = document.getElementById("show-player");
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "green";
}

/* This function styles the game buttons while they are disabled. */
function btnDisabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(153, 153, 102)";
    btn.style.backgroundColor = "rgb(214, 214, 194)";
    btn.disabled = true;
}

/* This function styles the game buttons while they are disabled. */
function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(204, 0, 0)";
    btn.style.backgroundColor = "rgb(255, 51, 51)";
    btn.disabled = false;
}

/* This function styles the game buttons while they are disabled. */
function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0, 153, 0)";
    btn.style.backgroundColor = "rgb(57, 230, 0)";
    btn.disabled = false;
}

/* When the user indicates, stop the current game and reset game. */
function stopGame() {
    hideGameMsg(); /* Clear the text and hide message box. */
    var btn = document.getElementById("btn-start");
    startEnabled(btn); /* Enable the start button since the game is now stopped. */
    var btn = document.getElementById("btn-stop");
    btnDisabled(btn); /* Disable the stop button since the game is now stopped. */
    var showPlayer = document.getElementById("show-player");
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = "red";

    /* Reset all squares to their starting empty state. */
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i = 0; i < arrayO.length; i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i = 0; i < arrayX.length; i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }
    /* This clears the running log of all game moves. */
    document.getElementById("board-state").innerHTML = "";
}

/* This function will show the message console and any text it may have. */
function showGameMsg() {
    document.getElementById("game-msg-box").style.display = "block";
}

/* This function will conceal the message console from view. */
function hideGameMsg() {
    clearMsg(); /* Clear the text from the message console. */
    document.getElementById("game-msg-box").style.display = "none"; /* Hide the div. */
}

/* This function will write text to the game message console. */
function writeMsg(txt) {
    showGameMsg();
    document.getElementById("game-msg").innerHTML = txt;
}

/* This function will clear the text from the message console. */
function clearMsg() {
    document.getElementById("game-msg").innerHTML = "";
}

/* This function is for the player configuration panel and checks the proposed
 avatar assignments and prevents them from being the same. */
 function saveSettings() {
     var p1Index = document.getElementById("player-1").selectedIndex;
     var p1Selected = document.getElementById("player-1").options;
     var p2Index = document.getElementById("player-2").selectedIndex;
     var p2Selected = document.getElementById("player-2").options;
     if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
         alert("Error - Player 1 and Player 2 cannot both be assigned as: " + p1Selected[p1Index].text);
     }
     else {
        document.getElementById("p1-display").innerHTML = p1Selected[p1Index].text;
		document.getElementById("p2-display").innerHTML = p2Selected[p2Index].text;
     }
 }

 /* This function return's the currently assigned avatar for each player. */
 function getAvatars() {
	var p1Avatar = document.getElementById("p1-display").innerHTML;
    var p2Avatar = document.getElementById("p2-display").innerHTML;
	var avatarArray = [p1Avatar, p2Avatar];
	return avatarArray;
}

 /* This function will return the active player's avatar. */
 function determineAvatar() {
     /* Determine the correct avatar to paint for the active player. */
     var avatarArray = getAvatars(); /* Returns an array of both player's assigned avatars. */
     var active = document.getElementById("show-player").innerHTML; /* Retrieve the active player. */
     p1Avatar = avatarArray[0];
     p2Avatar = avatarArray[1];
     if (active == "Player 1") { /* Check which player is active and their corresponding avatar. */
        var paintAvatar = p1Avatar;
     }
     else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
     }
     return paintAvatar; /* Returned back the correct avatar. */
 }

 /* This function changes which player is currently the active player. */
 function avatarPlaced() {
    var parseText = document.getElementById("game-msg").innerHTML;
    var showPlayer = document.getElementById("show-player"); /* Select the current element to memory. */
    /* Check if there is already a winner and if there is then don't continue the game. */
    if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = "red";
    }
    activePlayer = showPlayer.innerHTML; /* Retrieve the current player from the element. */
    if (activePlayer == "Player 1") { /* Once the active player selects a square change the active player. */
        showPlayer.innerHTML = "Player 2";
    }
    else {
        showPlayer.innerHTML = "Player 1";
    }
    checkForDraw(); /* Call this function to inquire if there was a cat's game. */
 }

 /* This function will get the array of the current board and check whether the proposed
  move is valid. */
 function check(info, square) {
     for (var i in info) {
         var tempInfo = info[i].charAt(0); /* Comparing the indexes of square and info. */
         if (tempInfo == square) {
             return tempInfo;
         }
     }
 }

 /* As squares are selected they check in with this function to see if that particular
  square has already been assigned and avatar and if it hasn't been, the function assigns
   the proposed avatar to the square. */
 function recordMoves(square) {
     var proposedMove = square;
     var boardState = document.getElementById("board-state").innerHTML; /* Retrieve the board-state array. */
     var info = boardState.split(","); /* Separate the string by commas to create an array. */
     verdict = check(info, square); /* Call the check() function to check whether or not the proposed square is occupied by an avatar already. */
     return verdict;
 }

 /* This function will retrieve the list of previous moves and then concatenate the current
  move to it. */
 function recordMove(currentMove) {
     var target = document.getElementById("board-state");
     var previousMoves = target.innerHTML;
     target.innerHTML = previousMoves + currentMove;
 }

 function checkForWinCon() {
     var squareArray = [];
     var target = document.getElementById("board-state");
     var info = target.innerHTML; /* Raw array with squares and avatars. */
     info = info.substring(1); /* Remove the leading comma. */
     info = info.split(","); /* Separate the string by commas into an array. */
     info.sort(); /* Sort the square array in order despite the actual gameplay sequence. */
     for (var i in info) {
         squareArray.push(info[i].charAt(0)); /* New array with only squares and not avatars. */
     }
     /* Call this following array of functions to check for any of the possible win conditions. */
     checkWinCon1(info,squareArray);
     checkWinCon2(info,squareArray);
     checkWinCon3(info,squareArray);
     checkWinCon4(info,squareArray);
     checkWinCon5(info,squareArray);
     checkWinCon6(info,squareArray);
     checkWinCon7(info,squareArray);
     checkWinCon8(info,squareArray);
     /* console.log("New CHECK: " + document.getElementById("game-msg").innerHTML); */
     checkForDraw();
 }

 function checkForDraw() {
     var boardState = document.getElementById("board-state").innerHTML;
     boardState = boardState.substring(1); /* Remove the leading comma. */
     boardState = boardState.split(","); /* Separate the string by commas into an array. */
     var check = document.getElementById("game-msg").innerHTML;
     if (boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!") {
         var txt1 = "Oh no! Nobody wins, it was a draw!";
         writeMsg(txt1);
         setTimeout(function() {stopGame();}, 1000);
     }
 }

 /* Whenever a win is detected the corresponding function will call this function to produce the following winning process for the game. */
 function winner(winDetected, winCon) {
     if (winDetected == "win") {
         var showme = winDetected;
         var activePlayer = document.getElementById("show-player").innerHTML;
         var txt2 = "That's three in a row, " + activePlayer + " wins!";
         writeMsg(txt2);
         var btn = document.getElementById("btn-start");
         startEnabled(btn); /* Enable the start button since the game is now stopped. */
         var btn = document.getElementById("btn-stop");
         btnDisabled(btn); /* Disable the stop button since the game is now stopped. */
         document.getElementById("show-player").innerHTML = "Game Stopped";
         glowBoard(winCon); /* Call function to make the gameboard pulse with colors. */
     }
 }

/* This function will make the winning squares light up in celebration. */
function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName("square");
    for (var i = 0;i < squares.length; i++) {
        if (i == index0) {
            var bg1 =squares[i];
            blink();
            winSound();
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 179, 66)";}, 100);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 238, 66)";}, 200);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(197, 244, 66)";}, 300);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(122, 244, 66)";}, 400);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(66, 244, 235)";}, 500);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 179, 66)";}, 600);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(244, 238, 66)";}, 700);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(197, 244, 66)";}, 800);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(122, 244, 66)";}, 900);
            setTimeout(function() {bg1.style.backgroundColor = "rgb(66, 244, 235)";}, 1000);
            setTimeout(function() {bg1.style.backgroundColor = "#d7f3f7";}, 1100);
        }
        else if (i == index1) {
            var bg2 =squares[i];
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 179, 66)";}, 100);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 238, 66)";}, 200);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(197, 244, 66)";}, 300);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(122, 244, 66)";}, 400);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66, 244, 235)";}, 500);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 179, 66)";}, 600);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(244, 238, 66)";}, 700);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(197, 244, 66)";}, 800);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(122, 244, 66)";}, 900);
            setTimeout(function() {bg2.style.backgroundColor = "rgb(66, 244, 235)";}, 1000);
            setTimeout(function() {bg2.style.backgroundColor = "#d7f3f7";}, 1100);
        }
        else if (i == index2) {
            var bg3 =squares[i];
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 179, 66)";}, 100);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 238, 66)";}, 200);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(197, 244, 66)";}, 300);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(122, 244, 66)";}, 400);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(66, 244, 235)";}, 500);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 179, 66)";}, 600);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(244, 238, 66)";}, 700);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(197, 244, 66)";}, 800);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(122, 244, 66)";}, 900);
            setTimeout(function() {bg3.style.backgroundColor = "rgb(66, 244, 235)";}, 1000);
            setTimeout(function() {bg3.style.backgroundColor = "#d7f3f7";}, 1100);
        }
    }
    setTimeout(function() {stopGame();}, 1200);
}

/* These functions will produce game sounds depending on the occasion. */
function squareSound() {
    var sound = document.getElementById("place-avatar");
    sound.play();
    setTimeout(function() {sound.pause();}, 400); /* Add delay to these to keep sound short. */
    setTimeout(function() {sound.currentTime = 0;}, 500);
}

function tieSound() {
    var sound = document.getElementById("tie-game");
    var check = document.getElementById("game-msg").innerHTML;
    setTimeout(function() {sound.play();}, 500);
}

function winSound() {
    var sound = document.getElementById("win-game");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700); /* add delay to these to keep sound short. */
    setTimeout(function() {sound.currentTime = 0;}, 2800);
}

function diceRoll() {
    var sound = document.getElementById("dice-roll");
    sound.play();
}

/* Call this function to make entire background color flash for a few seconds for a win animation. */
function blink() {
    var body = document.getElementById("body");
    setTimeout(function() {body.style.backgroundColor = "#94f7ed";}, 100);
    setTimeout(function() {body.style.backgroundColor = "#94cef7";}, 200);
    setTimeout(function() {body.style.backgroundColor = "#94a6f7";}, 300);
    setTimeout(function() {body.style.backgroundColor = "#b094f7";}, 400);
    setTimeout(function() {body.style.backgroundColor = "#cc94f7";}, 500);
    setTimeout(function() {body.style.backgroundColor = "#e894f7";}, 600);
    setTimeout(function() {body.style.backgroundColor = "#f794d9";}, 700);
    setTimeout(function() {body.style.backgroundColor = "#f73581";}, 800);
    setTimeout(function() {body.style.backgroundColor = "#c6034e";}, 900);
    setTimeout(function() {body.style.backgroundColor = "#e00202";}, 1000);
    setTimeout(function() {body.style.backgroundColor = "#ffffff";}, 1100);
}

/*===================================================================================
These functions are the algorithms to find all win conditions.
===================================================================================*/
/* Checking for win condition squares 0-1-2. */
function checkWinCon1 (info, squareArray) {
    var winDetected = "on";
    var winCon1 = [0, 1, 2];
    /* Iterate through the growing array during game time searching for the existence of
     index 0, index 1 and index 2 and once they do appear in the array, record their avatars
      and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 0, index 1 and index 2. */
    if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
        if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
            winner(winDetected, winCon1);
            return;
        }
    }
    winner(winDetected, winCon1); /* winCon1 is the array of win combo. */
}

/* Checking for win condition squares 3-4-5. */
function checkWinCon2 (info, squareArray) {
    var winDetected = "on";
    var winCon2 = [3, 4, 5];
    /* Iterate through the growing array during game time searching for the existence of
     index 3, index 4 and index 5 and once they do appear in the array, record their avatars
      and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 3, index 4 and index 5. */
    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) {
        if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
        }
    }
    winner(winDetected, winCon2); /* winCon2 is the array of win combo. */
}

/* Checking for win condition squares 6-7-8. */
function checkWinCon3 (info, squareArray) {
    var winDetected = "on";
    var winCon3 = [6, 7, 8];
    /* Iterate through the growing array during game time searching for the existence of index 6, index 7 and index 8
     and once they do appear in the array, record their avatars and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 6, index 7 and index 8. */
    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {
        if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
        }
    }
    winner(winDetected, winCon3); /* winCon3 is the array of win combo. */
}

/* Checking for win condition squares 0-3-6. */
function checkWinCon4 (info, squareArray) {
    var winDetected = "on";
    var winCon4 = [0, 3, 6];
    /* Iterate through the growing array during game time searching for the existence of index 0, index 3 and index 6
     and once they do appear in the array, record their avatars and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 0, index 3 and index 6. */
    if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {
        if (match0Avatar == match3Avatar && match0Avatar == match6Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
        }
    }
    winner(winDetected, winCon4); /* winCon4 is the array of win combo. */
}

/* Checking for win condition squares 1-4-7. */
function checkWinCon5 (info, squareArray) {
    var winDetected = "on";
    var winCon5 = [1, 4, 7];
    /* Iterate through the growing array during game time searching for the existence of index 1, index 4 and index 7
     and once they do appear in the array, record their avatars and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 1, index 4 and index 7. */
    if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) {
        if (match1Avatar == match4Avatar && match1Avatar == match7Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
        }
    }
    winner(winDetected, winCon5); /* winCon5 is the array of win combo. */
}

/* Checking for win condition squares 2-5-8. */
function checkWinCon6 (info, squareArray) {
    var winDetected = "on";
    var winCon6 = [2, 5, 8];
    /* Iterate through the growing array during game time searching for the existence of index 2, index 5 and index 8
     and once they do appear in the array, record their avatars and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 2, index 5 and index 8. */
    if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) {
        if (match2Avatar == match5Avatar && match2Avatar == match8Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
        }
    }
    winner(winDetected, winCon6); /* winCon6 is the array of win combo. */
}

/* Checking for wincon squares 6-4-2. */
function checkWinCon7(info,squareArray) {
	var winCon7 = [6,4,2];
    var winDetected = "on";
    /* Iterate through the growing array during game time searching for the existence of index 6, index 4 and index 2
     and once they do appear in the array, record their avatars and compare all 3 for win conditions. */
	for (var i in info) {
		if (info[i].charAt(0) == "6") {
			var match6Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
		}
		if (info[i].charAt(0) == "4") {
			var match4Avatar = info[i].charAt(1);
		}
		if (info[i].charAt(0) == "2") {
			var match2Avatar = info[i].charAt(1);
		}
    }
    /* This will trigger ONLY if there was a match for index 6, index 4 and index 2. */
	if (match6Avatar != undefined && match4Avatar != undefined && match2Avatar != undefined) {
		if (match6Avatar == match4Avatar && match6Avatar == match2Avatar) {
			winDetected = "win"; /* This flag will pass when a win has been detected. */
		}
	}
	winner(winDetected,winCon7); /* winCon7 is the array of win combo. */
}

/* Checking for win condition squares 0-4-8. */
function checkWinCon8 (info, squareArray) {
    var winDetected = "on";
    var winCon8 = [0, 4, 8];
    /* Iterate through the growing array during game time searching for the existence of index 0, index 4 and index 8
     and once they do appear in the array, record their avatars and compare all 3 for win conditions. */
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); /* Only interested in recording the avatar. */
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    /* This will trigger ONLY if there was a match for index 0, index 4 and index 8. */
    if (match0Avatar != undefined && match4Avatar != undefined && match8Avatar != undefined) {
        if (match0Avatar == match4Avatar && match0Avatar == match8Avatar) {
            winDetected = "win"; /* This flag will pass when a win has been detected. */
        }
    }
    winner(winDetected, winCon8); /* winCon8 is the array of win combo. */
}

/*===================================================================================
This block of functions are for each click event of their corresponding square element.
===================================================================================*/
function square0Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "0"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[0]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square1Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "1"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[1]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square2Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "2"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[2]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square3Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "3"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[3]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square4Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "4"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[4]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square5Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "5"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[5]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square6Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "6"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[6]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square7Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "7"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[7]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

function square8Animate() {
    var activePlayer = document.getElementById("show-player").innerHTML;
    if (activePlayer != "Game Stopped") { /*If the game has not yet started prevent avatar placement. */
        var square = "8"; /* Identify the square selected. */
        /* Check if the proposed square is valid. */
        var verdict = recordMoves(square);
        if (verdict == undefined) { /* If the verdict variable is empty than the square variable is unoccupied. */
            var paintAvatar = determineAvatar(); /* Get the correct avatar to paint for the active player. */
            var selected = document.getElementsByClassName(paintAvatar)[8]; /* Paint the avatar. */
            if (paintAvatar == "O") { /* Change these all to ternary statements instead. */
                animateO(selected); /* Call the function to animate an O. */
            }
            else if (paintAvatar == "X") {
                animateX(selected); /* Call the function to animate an X. */
            }
            /* Build a new array, adding the newly selected square and the assigned avatar. */
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); /* Call the checkForWinCon() function to check if the current move achieves a win condition. */
            avatarPlaced(square, paintAvatar); /* End the current turn and swap active players. */
            squareSound(); /* Play a game sound effect when the avatar is placed. */
        }
    }
}

/* This function will perform the animation for the O avatar. */
function animateO(selected) {
	selected.style.transform = (selected.style.transform == "translateY(0%)" || null) ? "translateY(0%)" : "translateY(0%)";
}

/* This function will perform the animation for the X avatar. */
function animateX(selected) {
	selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0%)" : "translateY(-100%)";
}