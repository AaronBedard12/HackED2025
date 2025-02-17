var selectedValue;
let hasSelection = false;

function OnBegin() {
  // Hide the quickmenu initially
  document.getElementById("quickmenu").style.display = "none";

  // Try to load a stored value
  try {
    let date = new Date();
    const key = `selectedValue_${date.getDay()}${date.getMonth()}${date.getFullYear()}`;

    chrome.storage.local.get([key], function(result) {
      if (result[key]) {
        // If a value is found, update the UI
        selectedValue = result[key];
        hasSelection = true;

        // Update the radio button to reflect the stored value
        const selectedRadio = document.querySelector(`input[name="WellnessCheckOption"][value="${selectedValue}"]`);
        if (!selectedRadio) {
          selectedRadio.checked = true;
        }

        // Show the quickmenu and hide the popup
        document.getElementById("quickmenu").style.display = "block";
        document.getElementById("popup").style.display = "none";

        console.log("Loaded value:", selectedValue);
      } else {
        // If no value is found, keep the Wellness Check UI visible
        console.log("No stored value found. Showing Wellness Check UI.");
        document.getElementById("popup").style.display = "block";
      }
    });
  } catch (error) {
    console.error("Error loading stored value:", error);
    // If an error occurs, keep the Wellness Check UI visible
    document.getElementById("popup").style.display = "block";
  }
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
  // Get the selected value
  selectedValue = $('input[name="WellnessCheckOption"]:checked').val();
  console.log("Selected value:", selectedValue);

  // Update the UI
  document.getElementById("quickmenu").style.display = "block";
  document.getElementById("popup").style.display = "none";

  // Save the selected value
  SaveValue();
  hasSelection = true;
}

function SaveValue() {
  // Save the selected value in chrome.storage
  let date = new Date();
  const key = `selectedValue_${date.getDay()}${date.getMonth()}${date.getFullYear()}`; // Use Date.now() for a unique key
  console.log(key);
  chrome.storage.local.set({ [key]: selectedValue }, function() {
    console.log('Value saved:', selectedValue);
  });
}


window.addEventListener("load", OnBegin);
