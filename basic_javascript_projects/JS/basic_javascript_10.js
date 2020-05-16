var instruments = ["Clarinet", "Cello", "Mandolin", "Pipe Organ", "Cymbal", "Maracas", "Tuba"];
var content = "";
var x;

var a = 25;
document.write(a);
{
    let a = 50;
    document.write("<br />" + a)
}
document.write("<br />" + a);

function callLoop() {
    var digit ="";
    var x = 10;
    while (x > 0) {
        digit += "<br>" + x;
        x--;
    }
    document.getElementById("loop").innerHTML = digit;
}

function forLoop() {
    for (x = 0; x < instruments.length; x++) {
        content += instruments[x] + "<br />";
    }
    document.getElementById("list-of-instruments").innerHTML = content;
}

function arrayFunction() {
    var verb = [];
    verb[0] = "running";
    verb[1] = "dancing";
    verb[2] = "smiling";
    verb[3] = "drawing";
    document.getElementById("array").innerHTML = "Tom is " + verb[2] + ".";
}

function constantFunction() {
    const vehicle = {make:"Ford", model:"Focus", year:"2007", color:"black"};
    vehicle.color = "silver";
    vehicle.type = "hatchback";
    document.getElementById("constant").innerHTML = "My " + vehicle.year + 
    " " + vehicle.make + " " + vehicle.model + " is " + vehicle.color +
     " and a " + vehicle.type + ".";
}

let dog = {
    breed: "Akita",
    size: "large",
    coat: "puffy double",
    energy: "average",
    shedding: "average",
    description: function() {
        return this.breed + "'s are a " + this.size + " dog breed with a " +
         this.coat + " coat and " + this.energy + " energy levels with " + 
         this.shedding + " levels of shedding."
    }
};
document.getElementById("dog-object").innerHTML = dog.description();