var break = 25;
document.write(break);

function highSchoolStudent(firstName,lastName,year,idNumber) {
    this.studentFirstName = firstName;
    this.studentLastName = lastName;
    this.studentYear = year;
    this.studentIdNumber = idNumber;
}

var s1 = new highSchoolStudent("Thomas", "Wayne", "senior", "082");

function newStudent() {
    document.getElementById("high-school-student").innerHTML = 
    s1.studentFirstName + "&nbsp" + s1.studentLastName + " is a high school " + s1.studentYear + " and their ID number is " + s1.studentIdNumber
}