function dict() {
    var vehicle = {
        model:"Focus",
        make:"Ford",
        type:"Hatchback",
        year:2007,
        color:"Silver"
    };
    delete vehicle.type;
    document.getElementById("dict").innerHTML = vehicle.type;
}