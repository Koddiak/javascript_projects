var x = 25;

function sub() {
    var y = 15;
    document.getElementById("sub").innerHTML = x - y;
}

function mul() {
    var z = 2;
    console.log(y * z);
}

function ifMorning() {
    if (new Date().getHours() < 12) {
        document.getElementById("if-morning").innerHTML = "Good morning!";
    }
    else {
        document.getElementById("if-morning").innerHTML = "It's not morning.";
    }
}

function checkHeight() {
    var height = document.getElementById("height").value;
    var check;
    if (height >= 52) {
        check = "You are tall enough!"
    }
    else {
        check = "You aren't tall enough..."
    }
    document.getElementById("check-height").innerHTML = check;
}

function timeFunction() {
    var time = new Date().getHours();
    var reply;
    if (time < 12 == time > 0) {
        reply = "It's morning!";
    }
    else if (time > 12 == time < 18) {
        reply = "It's the afternoon.";
    }
    else {
        reply = "It's the evening.";
    }
    document.getElementById("time-of-day").innerHTML = reply;
}