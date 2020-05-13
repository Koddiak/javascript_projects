function heightCheck() {
    var height, canRide;
    height = document.getElementById("height").value;
    canRide = (height < 52) ? "You are too short":"You are tall enough";
    document.getElementById("ride").innerHTML = canRide + " to ride.";
}

function vehicle(make, model, year, color) {
    this.vehicleMake = make;
    this.vehicleModel = model;
    this.vehicleYear = year;
    this.vehicleColor = color;
}

var Jack = new vehicle("Dodge", "Viper", 2020, "red");
var Emily = new vehicle("Jeep", "Trail Hawk", 2019, "white and black");
var Erik = new vehicle("Ford", "Pinto", 1971, "mustard");

function myFunction() {
    document.getElementById("keywords-and-constructors").innerHTML =
    "Erik drives a " + Erik.vehicleColor + " colored " + Erik.vehicleMake + "&nbsp" + Erik.vehicleModel +
    " manufactured in " + Erik.vehicleYear
}

function dog(size, coat, energy, shedding) {
    this.dogSize = size;
    this.dogCoat = coat;
    this.dogEnergy = energy;
    this.dogShedding = shedding;
}

var akita = new dog("large", "puffy double coat", "average", "some");

function newThis() {
    document.getElementById("new-and-this").innerHTML =
    "The Akita dog breed is " + akita.dogSize + " with a " + akita.dogCoat + ". They have an " + akita.dogEnergy + " energy level for a dog and have " + akita.dogShedding + " shedding."
}

function increment(x) {
    function plusOne(y) {
        y += 1; 
        return y;
    }
    document.getElementById("nested-function").innerHTML = plusOne(x);
}