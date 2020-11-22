let modInfo = {
	name: "The Static Tree",
	id: "static",
	author: "micro",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/microwave-pizza/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.10",
	name: "",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("p", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("p", 12)) {
		gain = gain.mul(upgradeEffect("p", 12))
	}
	if (hasUpgrade("p", 13)) {
		gain = gain.mul(upgradeEffect("p", 13))
	}
	if (hasUpgrade("m", 11)) {
		gain = gain.pow(upgradeEffect("m", 11))
		gain = gain.mul(5)
	}
	if (hasUpgrade("p", 31)) {
		gain = gain.pow(upgradeEffect("p", 31))
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}