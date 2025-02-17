var level = 0;
var coins = 0;
var xp = 0;
var levelupXP; 

importScripts('bin/main/main.js'); // Static import of dependencies
chrome.runtime.onStartup.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Wellness Check",
    message: "Click here to complete your daily wellness check.",
  });
});