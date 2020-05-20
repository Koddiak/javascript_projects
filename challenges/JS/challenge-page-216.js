/* The createLinearGradient() method creates a linear gradient object.
The gradient can be used to fill rectangles, circles, lines, text, etc. */

var c = document.getElementById("gradient-canvas");
var ctx = c.getContext("2d");

var grd = ctx.createLinearGradient(0, 0, 170, 0);
grd.addColorStop(0, "blue");
grd.addColorStop(1, "orange");

ctx.fillStyle = grd;
ctx.fillRect(20, 20, 150, 100);