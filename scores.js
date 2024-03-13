"use strict";

//Coding two arrays, one to score values and second for strings that shows the names and scores of the students’.
// Array to store the student scores
const arrScores = [];

// Array to store strings showing the student names and scores
const arrStrings = [];

// Function for calculating the Average score
const calAverage = (scores) => {
  if (scores.length === 0) {
    return 0;
  }

  const sum = scores.reduce((total, score) => total + parseInt(score), 0);
  return (sum / scores.length).toFixed(2);
};

// Function to show scores
const showScores = () => {
  // To calculate Average Score
  const avgScore = calAverage(arrScores);

  // To show average score in the label using id "avr_score"
  $("#avr_score").text(`Average Score: ${avgScore}`);

  // To get the student name and scores from the arrStrings array
  const stdData = arrStrings.join("\n");

  // To show the student name and score in the text area using id "scores"
  $("#scores").val(stdData);
};

$(document).ready(() => {
  // Add student score button click event handler
  $("#add_button").click(() => {
    const firstName = $("#first_name").val().trim();
    const lastName = $("#last_name").val().trim();
    const score = $("#score").val().trim();

    if (firstName === "" || lastName === "" || score === "") {
      alert("Please enter all fields.");
    } else {
      // Function to create a new score object
      const newScore = {
        firstName: firstName,
        lastName: lastName,
        score: score,
      };

      // Adding new score value to the arrScores
      arrScores.push(score);

      // Adding new score string to the arrStrings
      const scrString = `${firstName}, ${lastName}: ${score}`;
      arrStrings.push(scrString);

      // to clear add form and set focus on the first field
      $("#first_name").val("");
      $("#last_name").val("");
      $("#score").val("");
      $("#first_name").focus();

      // Calling showScores function
      showScores();
    }
  }); // end click()

  $("#clear_button").click(() => {
    arrScores.length = 0; // Clearing the arrScores
    arrStrings.length = 0; // Clearing the arrStrings

    // To clear the display area and set focus on the first name field
    $("#avr_score").val("");
    $("#scores").val("");
    $("#first_name").focus();
  }); // end click()

  $("#sort_button").click(() => {
    // Function to sort the arrStrings by last name
    arrStrings.sort((a, b) => {
      const lastNameA = a.split(":")[0].split(" ")[1].trim();
      const lastNameB = b.split(":")[0].split(" ")[1].trim();
      return lastNameA.localeCompare(lastNameB);
    });

    // Call showScores function to re-display the sorted data
    showScores();
  });

  $("#first_name").focus();
});
