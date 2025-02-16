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
  selectedValue = $('input[name="WellnessCheckOption"]:checked').val();
  console.log("Selected value:", selectedValue);
  SaveValue();
  LoadMainPage();
}

function SaveValue() {
  // Save the selected value in chrome.storage
  const key = 'selectedValue_' + Date.now(); // Use Date.now() for a unique key
  chrome.storage.local.set({ [key]: selectedValue }, function() {
    console.log('Value saved:', selectedValue);
  });
}

function LoadMainPage() {
  // Generate a valid URL for main.html
  const mainPageUrl = chrome.runtime.getURL("main/main.html");

  // Fetch and load main.html into the current popup
  fetch(mainPageUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      document.body.innerHTML = doc.body.innerHTML;
    })
    .catch(error => console.error("Error loading main.html:", error));
}
