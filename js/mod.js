let modInfo = {
	name: "The Null Tree",
	id: "nulls",
	author: "micro",
	pointsName: "nulls",
	discordName: "",
	discordLink: "",
	changelogLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.0",
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
	return hasUpgrade("zero", 21) && hasUpgrade("one", 21)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) {
		return new Decimal(0)
	}
	gain = new Decimal(1)
	if (hasUpgrade("zero", 24)) {gain = gain.mul(upgradeEffect("zero", 24))}
	if (hasUpgrade("one", 24)) {gain = gain.mul(upgradeEffect("one", 24))}
	if (hasUpgrade("zero", 31)) {gain = gain.mul(upgradeEffect("zero", 31))}
	if (hasUpgrade("one", 31)) {gain = gain.mul(upgradeEffect("one", 31))}
	if (hasUpgrade("zero", 32)) {gain = gain.mul(upgradeEffect("zero", 32))}
	if (hasUpgrade("one", 32)) {gain = gain.mul(upgradeEffect("one", 32))}
	if (hasUpgrade("zero", 33)) {gain = gain.mul(upgradeEffect("zero", 33))}
	if (hasUpgrade("one", 33)) {gain = gain.mul(upgradeEffect("one", 33))}
	if (player.half.unlocked) {gain = gain.mul(tmp["half"].effect.effect1)}
	if (hasUpgrade("half", 21)) {gain = gain.mul(upgradeEffect("half", 21))}
	if (player.rational.unlocked) {gain = gain.mul(tmp["rational"].effect)}
	if (player.irrational.unlocked) {gain = gain.mul(tmp["irrational"].effect)}
	if (player.rational.unlocked) {gain = gain.pow(buyableEffect("rational", 11))}
	if (player.irrational.unlocked) {gain = gain.pow(buyableEffect("irrational", 11))}
	if (inChallenge("half", 11)) {gain = gain.div(2)}
	if (inChallenge("half", 12)) {gain = gain.pow(0.5)}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		return "End of content is the fifth ½ upgrade"
	}
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
