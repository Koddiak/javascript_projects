function ageCheck() {
    var age, canVote;
    age = document.getElementById("age").value;
    canVote = (age < 18) ? "You are too young":"You are old enough";
    document.getElementById("vote").innerHTML = canVote + " to vote.";
}