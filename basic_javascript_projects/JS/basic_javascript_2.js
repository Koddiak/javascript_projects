function newFunction(x ,y) {
    var result = x.fontcolor("green");
    document.getElementById(y).innerHTML = result;
}

function concatenate() {
    var sentence = "I'm ";
    sentence += "being concatenated.";
    document.getElementById("concatenate").innerHTML = sentence;
}