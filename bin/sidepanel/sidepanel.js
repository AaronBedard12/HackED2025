// SidePanel Stuff
var level = 1;
var coins = 0;
var xp = 0;
var levelupXP = level * 1.5;

var goalNames = [];
var goalCompletions = [];
var goalCoinAmount = [];
var goalExpAmount = [];

// Track the currently selected coin value
let selectedCoinValue = null;

function OnOpen() {
    document.getElementById("user-level").innerHTML = `Level: ${level} Coins: ${coins}`;
    document.getElementById("level-bar").style.width = `${xp / levelupXP}%`;
}

function levelUp() {
   if (xp >= levelupXP) {
      coins = coins + level;
      level++;
      xp = 0;
      levelupXP = level * 1.5;
      console.log("Next Level: " + levelupXP);
      OnOpen();
    }
}

function goalUi() {
    const goalsUi = document.getElementById("goals-ui");
    goalsUi.classList.toggle("open");
    closeRewardsUi();
}

function closeGoalsUi() {
    const goalsUi = document.getElementById("goals-ui");
    goalsUi.classList.remove("open");
}

function rewardsUi() {
    closeGoalsUi();
    const button = document.getElementById("rewards-ui");
    button.classList.toggle("open");
}

function closeRewardsUi() {
    const button = document.getElementById("rewards-ui");
    button.classList.remove("open");
}

function openGoals() {
    document.getElementById("goals-ui").style.display = 'block';
}

// Remove individual <ul> items when clicked
function setupRemoveOnClick(containerClass) {
  const container = document.querySelector(`.${containerClass}`);
  container.addEventListener("click", (event) => {
      if (event.target.tagName === "UL") {
          const itemText = event.target.textContent;
          for (let i = 0; i < goalNames.length; i++) {
              if (goalNames[i] === itemText) {
                  coins += goalCoinAmount[i]; // Update coins
                  xp += goalExpAmount[i]; // Update XP
                  goalCompletions[i] = true;

                  levelUp(); // Check for level up
                  OnOpen(); // Update UI
              }
          }
          event.target.remove(); // Remove the clicked <ul> element
      }
  });
}


// Add new goals or rewards
function setupAddNewItem(buttonSelector, inputSelector, listContainerClass) {
    const addButton = document.querySelector(buttonSelector);
    const inputField = document.querySelector(inputSelector);

    addButton.addEventListener("click", () => {
        const newItemText = inputField.value.trim();
        if (newItemText && selectedCoinValue !== null) {
            goalNames.push(newItemText);
            goalCompletions.push(false);
            goalCoinAmount.push(parseInt(selectedCoinValue)); // Store the coin value
            goalExpAmount.push(parseInt(selectedCoinValue) * 1.5); // Calculate XP based on coin value

            const newItem = document.createElement("ul");
            newItem.textContent = newItemText;
            newItem.addEventListener("click", () => {
                newItem.remove(); // Allow new items to be removed on click
            });

            const listContainer = document.querySelector(`.${listContainerClass}`);
            listContainer.appendChild(newItem);

            inputField.value = ""; // Clear the input field
        } else {
            alert("Please select a coin value and enter a goal!");
        }
    });
}

// Function to handle coin value button clicks
function setupCoinValueButtons() {
    const coinButtons = document.querySelectorAll(".coin-value-button");

    coinButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Deselect the previously selected button
            if (selectedCoinValue !== null) {
                const prevButton = document.querySelector(`.coin-value-button[value="${selectedCoinValue}"]`);
                prevButton.classList.remove("selected");
            }

            // Select the clicked button
            button.classList.add("selected");
            selectedCoinValue = button.value; // Store the value of the selected button
        });
    });
}

// Initialize the coin value buttons
setupCoinValueButtons();

// Initialize functionality
setupRemoveOnClick("goal-list"); // Remove goals on click
setupRemoveOnClick("reward-list"); // Remove rewards on click

setupAddNewItem("#goals-ui button[id='AddGoalButton']", "#goals-ui .new-goal", "goal-list"); // Add new goals
setupAddNewItem("#rewards-ui button", "#rewards-ui .new-goal", "reward-list"); // Add new rewards

// Add event listener to the Goals button
document.getElementById("goals-button").addEventListener("click", goalUi);
document.getElementById("rewards-button").addEventListener("click", rewardsUi);

window.addEventListener("load", OnOpen);