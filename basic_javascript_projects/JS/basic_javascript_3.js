function add(x, y) {
    var result = x + y;
    document.getElementById("math").innerHTML = x + " + " + y + " = " + result;
}

function sub(x, y) {
    var result = x - y;
    document.getElementById("sub").innerHTML = x + " - " + y + " = " + result;
}

function mul(x, y) {
    var result = x * y;
    document.getElementById("mul").innerHTML = x + " * " + y + " = " + result;
}

function div(x, y) {
    var result = x / y;
    document.getElementById("div").innerHTML = x + " / " + y + " = " + result;
}

function mod(x, y) {
    var result = x % y;
    document.getElementById("mod").innerHTML = x + " % " + y + " = " + result;
}

function neg(x) {
    document.getElementById("neg").innerHTML = x + " = " + -x;
}

function inc(x) {
    var a = x;
    x++;
    document.getElementById("inc").innerHTML = a + " = " + x;
}

function dec(x) {
    var a = x;
    x--;
    document.getElementById("dec").innerHTML = a + " = " + x;
}

function multiple(x, y, z, a, b) {
    var result = (x + y) * z / a - b;
    document.getElementById("multiple").innerHTML = "(" + x + " + " + y + ") * " + z + " / " + a + " - " + b + " = " + result;
}

function sqrt(x) {
    var result = Math.sqrt(x);
    document.getElementById("sqrt").innerHTML = "The square root of " + x + " is " + result;
}

/* Retrieves a random number between 0 and x. */
function rand(x) {
    document.getElementById("rand").innerHTML = "Here is a random number between 0 and " + x + " : " + Math.random() * x;
}