// SidePanel Stuff
var level = 1;
var coins = 0;
var xp = 0;
var levelupXP = level * 1.5; 

function OnOpen() {
    document.getElementById("user-level").innerHTML = `Level: ${level} Coins: ${coins}`;
    document.getElementById("level-bar").style.width = `${xp/levelupXP}%`;

}

function levelUp() {
    level++;
    xp = 0;
    levelupXP = level*1.5;
    coins = coins + (level*25);
    OnOpen();
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

function openGoals(){
    document.getElementById("goals-ui").style.display = 'block';
}


// Remove individual <ul> items when clicked
function setupRemoveOnClick(containerClass) {
    const items = document.querySelectorAll(`.${containerClass} ul`);
    items.forEach(item => {
      item.addEventListener("click", () => {
        item.remove(); // Remove the clicked <ul> element
      });
    });
  }
  
  // Add new goals or rewards
  function setupAddNewItem(buttonSelector, inputSelector, listContainerClass) {
    const addButton = document.querySelector(buttonSelector);
    const inputField = document.querySelector(inputSelector);
  
    addButton.addEventListener("click", () => {
      const newItemText = inputField.value.trim();
      if (newItemText) {
        const newItem = document.createElement("ul");
        newItem.textContent = newItemText;
        newItem.addEventListener("click", () => {
          newItem.remove(); // Allow new items to be removed on click
        });
  
        const listContainer = document.querySelector(`.${listContainerClass}`);
        listContainer.appendChild(newItem);
  
        inputField.value = ""; // Clear the input field
      }
    });
  }
  
  // Initialize functionality
  setupRemoveOnClick("goal-list"); // Remove goals on click
  setupRemoveOnClick("reward-list"); // Remove rewards on click
  
  setupAddNewItem("#goals-ui button", "#goals-ui .new-goal", "goal-list"); // Add new goals
  setupAddNewItem("#rewards-ui button", "#rewards-ui .new-goal", "reward-list"); // Add new rewards
// Add event listener to the Goals button
document.getElementById("goals-button").addEventListener("click", goalUi);
document.getElementById("rewards-button").addEventListener("click", rewardsUi);

window.addEventListener("load", OnOpen);

