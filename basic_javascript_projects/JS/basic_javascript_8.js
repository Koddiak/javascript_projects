var a = 100;
var b = 18.23490579009743;

document.write(typeof a.toString() + "<br/><br/>");
document.write(b.toPrecision(3) + "<br/><br/>");

function concatenate() {
    var p1 = "This is ";
    var p2 = "a concatenated ";
    var p3 = "sentence."
    var concatenatedSentence = p1.concat(p2, p3);
    document.getElementById("concatenate").innerHTML = concatenatedSentence;
}

function slice() {
    var sentence = "This is a sliced sentence."
    var slice = sentence.slice(10,26);
    document.getElementById("slice").innerHTML = slice;
}