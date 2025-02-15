console.log("chrome object:", chrome); // Debugging
console.log("chrome.storage:", chrome.storage); // Debugging

var selectedValue;

// Attach event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Attach event listener to the "Submit and Quit" button
  document.getElementById("submitAndQuit").addEventListener("click", SubmitAndQuit);

  // Attach event listener to the "Submit" button
  document.getElementById("submit").addEventListener("click", submit);
});

function SubmitAndQuit() {
  // Get the selected radio button value using jQuery
  selectedValue = $('input[name="WellnessCheckOption"]:checked').val();
  console.log("Selected value:", selectedValue);
  SaveValue();
  window.close();
}

function submit() {
  // Add functionality for the second button if needed
  alert("Submit button clicked!");
}

function SaveValue() {
  // Save the selected value in chrome.storage
  const key = 'selectedValue_' + Date.now(); // Use Date.now() for a unique key
  chrome.storage.local.set({ [key]: selectedValue }, function() {
    console.log('Value saved:', selectedValue);
  });
}