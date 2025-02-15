document.getElementById("open-side-panel").addEventListener("click", () => {
  // Use the Chrome API to open the side panel
  chrome.windows.getCurrent((window) => {
    chrome.sidePanel.open({ windowId: window.id });
  });
  window.close(); // Close the current popup
});