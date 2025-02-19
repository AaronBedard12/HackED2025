// SidePanel Stuff
var level = 1;
var coins = 0;
var xp = 0;
var levelupXP = level * 1.5;

var goalNames = [];
var goalCompletions = [];
var goalCoinAmount = [];
var goalExpAmount = [];

var rewardNames = [];
var rewardCompletions = [];
var rewardCoinAmount = [];

// Track the currently selected coin value
let selectedCoinValue = null;
let selectedRewardCoinValue = null;

function OnOpen() {
    document.getElementById("user-level").innerHTML = `Level: ${level} Coins: ${coins}`;
    document.getElementById("level-bar").style.width = `${(xp / levelupXP) * 100}%`;
}

// Function to check and handle level up
function levelUp() {
    if (xp >= levelupXP) {
        coins += level;
        level++;
        xp = 0;
        levelupXP = level * 1.5;
        console.log("Next Level: " + levelupXP);
        OnOpen();
    }
}

// Goal and reward UI functions
function goalUi() {
    document.getElementById("goals-ui").classList.toggle("open");
    closeRewardsUi();
}

function closeGoalsUi() {
    document.getElementById("goals-ui").classList.remove("open");
}

function rewardsUi() {
    closeGoalsUi();
    document.getElementById("rewards-ui").classList.toggle("open");
}

function closeRewardsUi() {
    document.getElementById("rewards-ui").classList.remove("open");
}

// Remove items when clicked
function setupRemoveOnClick(containerClass) {
    const container = document.querySelector(`.${containerClass}`);
    container.addEventListener("click", (event) => {
        if (event.target.tagName === "UL") {
            const itemText = event.target.textContent;
            for (let i = 0; i < goalNames.length; i++) {
                if (goalNames[i] === itemText) {
                    coins += goalCoinAmount[i];
                    xp += goalExpAmount[i];
                    goalCompletions[i] = true;
                } else if (rewardNames[i] === itemText) {
                    coins -= rewardCoinAmount[i];
                    rewardCompletions[i] = true;
                }
            }
            levelUp();
            OnOpen();
            event.target.remove();
        }
    });
}

// Add new goals or rewards
function setupAddNewItem(buttonSelector, inputSelector, listContainerClass, isReward = false) {
    const addButton = document.querySelector(buttonSelector);
    const inputField = document.querySelector(inputSelector);

    addButton.addEventListener("click", () => {
        const newItemText = inputField.value.trim();
        const coinValue = isReward ? selectedRewardCoinValue : selectedCoinValue;
        if (newItemText && coinValue !== null) {
            if (isReward) {
                rewardNames.push(newItemText);
                rewardCompletions.push(false);
                rewardCoinAmount.push(parseInt(coinValue));
            } else {
                goalNames.push(newItemText);
                goalCompletions.push(false);
                goalCoinAmount.push(parseInt(coinValue));
                goalExpAmount.push(parseInt(coinValue) * 1.5);
            }

            const newItem = document.createElement("ul");
            newItem.textContent = newItemText;
            newItem.addEventListener("click", () => newItem.remove());

            document.querySelector(`.${listContainerClass}`).appendChild(newItem);
            inputField.value = "";
        } else {
            alert("Please select a coin value and enter a " + (isReward ? "reward" : "goal") + "!");
        }
    });
}

// Handle coin value selection
function setupCoinValueButtons() {
    document.querySelectorAll(".coin-value-button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".coin-value-button.selected").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            if (button.id === "coinValueButton") selectedCoinValue = button.value;
            else if (button.id === "rewardCoinValueButton") selectedRewardCoinValue = button.value;
        });
    });
}

// Function to save data
function Save() {
    console.log("Saving data...");

    const saveData = {
        level, coins, xp, levelupXP,
        goalNames, goalCompletions, goalCoinAmount, goalExpAmount,
        rewardNames, rewardCompletions, rewardCoinAmount
    };

    if (chrome.storage?.local) {
        chrome.storage.local.set(saveData, () => {
            if (chrome.runtime.lastError) console.error("Error saving data:", chrome.runtime.lastError);
            else console.log("Data saved successfully!");
        });
    } else {
        localStorage.setItem("gameData", JSON.stringify(saveData));
        console.log("Data saved in localStorage!");
    }
}

// Function to load data
function Load() {
    if (chrome.storage?.local) {
        chrome.storage.local.get([
            "level", "coins", "xp", "levelupXP",
            "goalNames", "goalCompletions", "goalCoinAmount", "goalExpAmount",
            "rewardNames", "rewardCompletions", "rewardCoinAmount"
        ], (data) => {
            if (chrome.runtime.lastError) {
                console.error("Error loading data:", chrome.runtime.lastError);
                return;
            }
            Object.assign(window, data);
            console.log("Data loaded successfully!", data);
            OnOpen();
        });
    } else {
        const data = JSON.parse(localStorage.getItem("gameData"));
        if (data) {
            Object.assign(window, data);
            console.log("Data loaded from localStorage:", data);
            OnOpen();
        }
    }
}

// Monitor side panel visibility
async function checkSidePanelState(tabId) {
    const options = await chrome.sidePanel.getOptions({ tabId });
    return options.enabled;
}

let previousSidePanelState = false;

async function monitorSidePanelVisibility(tabId) {
    const isSidePanelOpen = await checkSidePanelState(tabId);
    if (isSidePanelOpen !== previousSidePanelState) {
        previousSidePanelState = isSidePanelOpen;
        if (!isSidePanelOpen) Save();
    }
}

// Listen for tab updates and window focus changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    if (changeInfo.status === 'complete') await monitorSidePanelVisibility(tabId);
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) Save();
    else {
        const tabs = await chrome.tabs.query({ active: true, windowId });
        if (tabs.length > 0) await monitorSidePanelVisibility(tabs[0].id);
    }
});

// Initialize the app
window.addEventListener("load", () => {
    Load();
    setupCoinValueButtons();
    setupRemoveOnClick("goal-list");
    setupRemoveOnClick("reward-list");
    setupAddNewItem("#goals-ui button[id='AddGoalButton']", "#goals-ui .goalInputField", "goal-list");
    setupAddNewItem("#rewards-ui button[id='AddRewardButton']", "#rewards-ui .rewardInputField", "reward-list", true);
    document.getElementById("goals-button").addEventListener("click", goalUi);
    document.getElementById("rewards-button").addEventListener("click", rewardsUi);
    OnOpen();
});
