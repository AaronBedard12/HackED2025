var selectedValue;
let hasSelection = false;

function OnBegin() {
  document.getElementById("quickmenu").style.display = "none";
}

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
  // Attach event listener to the "Submit" button
  document.getElementById("submit").addEventListener("click", submit);
});


function submit() {
  selectedValue = $('input[name="WellnessCheckOption"]:checked').val();
  console.log("Selected value:", selectedValue);
  document.getElementById("quickmenu").style.display = "block";
  document.getElementById("popup").style.display = "none";
  SaveValue();
  hasSelection = true;
}

function SaveValue() {
  // Save the selected value in chrome.storage
  const key = 'selectedValue_' + Date.now(); // Use Date.now() for a unique key
  chrome.storage.local.set({ [key]: selectedValue }, function() {
    console.log('Value saved:', selectedValue);
  });
}

window.addEventListener("load", OnBegin);