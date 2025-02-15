function SubmitAndQuit() {
  // Get the selected radio button value using jQuery
  var selectedValue = $('input[name="WellnessCheckOption"]:checked').val();
  $("#result").text("You selected: " + selectedValue);
}

function submit() {
  // Add functionality for the second button if needed
  $("#result").text("You selected: " + selectedValue);
}