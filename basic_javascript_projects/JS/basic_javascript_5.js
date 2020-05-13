document.write("Check for type of variable:&nbsp;" + typeof "hello");
document.write("<br>Use of the \">\" operator:&nbsp;" + (10 > 5));
document.write("<br>Use of the \"<\" operator:&nbsp;" + (10 < 5));
document.write("<br>Use of coercion:&nbsp;" + "20" + 10);
document.write("<br>Use of the \"==\" operator:&nbsp;" + (5 == 4));
document.write("<br>Use of the \"===\" operator:&nbsp;" + ("82" === "82") + "&nbsp;" + (82 === "22") + "&nbsp;" + (82 === "82") + "&nbsp;" + ("82" == "22"));
document.write("<br>Use of \"&&\" and \"||\" operators:&nbsp;" + (10 > 5 && 25 > 10) + "&nbsp;" + (10 > 5 && 10 > 25) + "&nbsp;" + (10 > 5 || 10 > 25) + "&nbsp;" + (5 > 10 || 10 > 25));
document.write("<br>Use of \"!\" operator:&nbsp;" + !(10 > 5) + "&nbsp;" + !(5 > 10));

console.log(10 + 10);
console.log(10 < 5);

function posInfi() {
    document.getElementById("pos-infi").innerHTML = 5/0;
}

function negInfi() {
    document.getElementById("neg-infi").innerHTML = -5/0;
}