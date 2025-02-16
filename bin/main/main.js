var selectedValue;
let hasSelection = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded!");

  document.getElementById("open-side-panel").addEventListener("click", () => {
    console.log("Opening side panel...");
    chrome.windows.getCurrent((window) => {
      chrome.sidePanel.open({ windowId: window.id });
    });
    window.close(); // Close the current popup
  });
});

// Attach event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Attach event listener to the "Submit and Quit" button
  document.getElementById("submitAndQuit").addEventListener("click", SubmitAndQuit);

  // Attach event listener to the "Submit" button
  document.getElementById("submit").addEventListener("click", submit);
});


function submit() {
  selectedValue = $('input[name="WellnessCheckOption"]:checked').val();
  console.log("Selected value:", selectedValue);
  SaveValue();
  hasSelection = true;
}

