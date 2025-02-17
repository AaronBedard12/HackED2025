var level = 0;
var coins = 0;
var xp = 0;
var levelupXP; 

chrome.runtime.onStartup.addListener(() => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Wellness Check",
      message: "Click here to complete your daily wellness check.",
    });
  });
  
  // Handle notification clicks
  chrome.notifications.onClicked.addListener(() => {
    chrome.action.openPopup();
  });

function OpenPopup(){
    chrome.tabs.create({ active: true, url: 'main/main.html' }, null);
}