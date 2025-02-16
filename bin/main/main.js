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