var a = "";
var b = "";
var i;
for (i = 0; i < 10; i++) {
    if (i == 6) { break; }
    a += "The number is " + i + "<br />";
}
for (i = 0; i < 10; i++) {
    if (i == 6) { continue; }
    b += "The number is " + i + "<br />";
}
document.getElementById("break").innerHTML = a;
document.getElementById("continue").innerHTML = b;