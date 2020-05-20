function switchFunction() {
    var foodOutput;
    var foods = document.getElementById("switch-input").value;
    var foodString = " are delicious!";
    switch(foods) {
        case "Pizzas":
            foodOutput = "Pizzas" + foodString;
        break;
        case "Burgers":
            foodOutput = "Burgers" + foodString;
        break;
        case "Fries":
            foodOutput = "Fries" + foodString;
        break;
        case "Tacos":
            foodOutput = "Tacos" + foodString;
        break;
        case "Burritos":
            foodOutput = "Burritos" + foodString;
        break;
        default:
        foodOutput = "Please enter a food exactly as written on the above list."
    }
    document.getElementById("output").innerHTML = foodOutput;
}

function byClassFunction() {
    var a = document.getElementsByClassName("by-class");
    a[0].innerHTML = "Hi.";
}