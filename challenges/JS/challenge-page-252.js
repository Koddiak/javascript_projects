stringFunction = function() {
    return "This is a normal function that returns a string.";
}

arrowFunction = () => "This is an arrow function that returns a string.";

document.getElementById("regular").innerHTML = stringFunction();
document.getElementById("arrow").innerHTML = arrowFunction();