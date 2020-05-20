function validateForm() {
    var a = document.forms["form"]["name"].value;
    var b = document.forms["form"]["email"].value;
    var c = document.forms["form"]["message"].value;
    if (a == "" || b == "" || c == "") {
        alert("The name, email and message fields must be properly filled out.");
        return false;
    }
}