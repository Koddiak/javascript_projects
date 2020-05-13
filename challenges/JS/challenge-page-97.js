function notANumber() {
    document.getElementById("NaN").innerHTML = 0/0;
}

function checkNaN(x) {
    if (isNaN(x) == true) {
        document.write(true);
    }
    else {
        document.write(false);
    }
}