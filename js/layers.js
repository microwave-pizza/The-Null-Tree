addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "static",
    base: 1.1,
    exponent: 1,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    upgrades: {
        rows: 1,
        cols: 1,
        11: {
            title: "1:1",
            description: "Gain 1 point per second.",
            cost: new Decimal(1),
        }
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "p: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
