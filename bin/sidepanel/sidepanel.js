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
}

function openGoals(){
    document.getElementById("goals-ui").style.display = 'block';
}


window.addEventListener("load", OnOpen);
