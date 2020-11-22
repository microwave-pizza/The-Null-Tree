addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "static",
    base: 2,
    exponent: 1,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("p", 21)) {
            mult = mult.div(upgradeEffect("p", 21))
        }
        if (hasUpgrade("p", 22)) {
            mult = mult.div(upgradeEffect("p", 22))
        }
        if (hasUpgrade("m", 12)) {
            mult = mult.pow(upgradeEffect("m", 12))
        }
        if (hasUpgrade("p", 32)) {
            mult = mult.pow(upgradeEffect("p", 32))
        }
        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        if (hasUpgrade("m", 13)) {
            exp = exp.mul(upgradeEffect("m", 13))
        }
        return exp
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "P1:1",
            description: "Gain 1 point per second.",
            cost: new Decimal(1),
        },
        12: {
            title: "P1:2",
            description: "Prestige points boost point gain.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.lt(1) ? 1 : player.p.points
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 12)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "P1:3",
            description: "Points boost point gain.",
            cost: new Decimal(3),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 13)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        21: {
            title: "P2:1",
            description: "Prestige points divide prestige point cost.",
            cost: new Decimal(9),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return "/" + format(upgradeEffect(this.layer, 21))
            },
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        22: {
            title: "P2:2",
            description: "Points divide prestige point cost.",
            cost: new Decimal(10),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return "/" + format(upgradeEffect(this.layer, 22))
            },
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "P2:3",
            description: "Unlock a new layer.",
            cost: new Decimal(13),
            unlocked() {
                return hasUpgrade(this.layer, 22)
            }
        },
        31: {
            title: "P3:1",
            description: "Prestige points raises point gain to a power.",
            cost: new Decimal(250),
            effect() {
                return player[this.layer].points.lt(10) ? 1 : player[this.layer].points.log(10).div(10).add(1)
            },
            effectDisplay() {
                return "^" + format(upgradeEffect(this.layer, 31))
            },
            unlocked() {
                return hasUpgrade("m", 15)
            }
        },
        32: {
            title: "P3:2",
            description: "Points raises prestige point gain to a power.",
            cost: new Decimal(310),
            effect() {
                return player.points.lt(100) ? 1 : player.points.log(100).div(10).add(1)
            },
            effectDisplay() {
                return "^" + format(upgradeEffect(this.layer, 32))
            },
            unlocked() {
                return hasUpgrade("p", 31)
            }
        }
    },
    canBuyMax() {
        return false
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "p: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(layer) {
        if (layer == "m") {
            let keep = []
            if (hasMilestone("m", 0)) {
                keep.push("upgrades")
            }
            layerDataReset(this.layer, keep)
        }
    }
})

addLayer("m", {
    name: "meta",
    symbol: "M",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#CD441F",
    branches: [["p", 1]],
    requires: new Decimal(10000),
    resource: "meta points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "static",
    base: 10,
    exponent: 2,
    effect() {
        let exp = new Decimal(0.1)
        if (hasUpgrade("m", 14)) {
            exp = exp.add(upgradeEffect("m", 14))
        }
        if (hasUpgrade("m", 15)) {
            exp = exp.add(upgradeEffect("m", 15))
        }
        if (exp.gt(1.5)) {
            exp = exp.sqrt().mul(Decimal.pow(1.5, 0.5))
        }
        let base = player[this.layer].points
        if (base.gte(10)) {
            base = base.pow(0.1)
            exp = exp.log(10).log(10)
        }
        return base.lt(1) ? 1 : base.pow(exp)
    },
    effectDescription() {
        return "which are multiplying meta point exponent by " + format(this.effect())
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        exp = exp.mul(this.effect())
        return exp
    },
    milestones: {
        0: {
            requirementDescription: "2 meta points",
            effectDescription: "Always keep prestige upgrades.",
            done() {
                return player[this.layer].points.gte(2)
                }
        }
    },
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            title: "M1:1",
            description: "Best meta points raise point gain to a power and point gain is multiplied by 5.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(10).add(player[this.layer].best).div(10)
            },
            effectDisplay() {
                return "^" + format(upgradeEffect(this.layer, 11))
            }
        },
        12: {
            title: "M1:2",
            description: "Best meta points raise prestige point gain to a power.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].best.div(10).add(1)
            },
            effectDisplay() {
                return "^" + format(upgradeEffect(this.layer, 12))
            },
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "M1:3",
            description: "Best meta points multiply prestige point exponent.",
            cost: new Decimal(2),
            effect() {
                return new Decimal(1.2).pow(player[this.layer].best)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 13)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "M1:4",
            description: "Prestige points boost meta point boost's exponent.",
            cost: new Decimal(2),
            effect() {
                return player.p.points.div(50)
            },
            effectDisplay() {
                return "0.1 => " + format(upgradeEffect(this.layer, 14).add(0.1))
            },
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        15: {
            title: "M1:5",
            description: "Best meta points boost meta point boost.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].best.div(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 14).add(0.1)) + " => " + format(upgradeEffect(this.layer, 15).add(upgradeEffect(this.layer, 14).add(0.1)))
            },
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        }
    },
    canBuyMax() {
        return false
    },
    row: 1,
    hotkeys: [
        {key: "m", description: "m: Reset for meta points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("p", 23) || player[this.layer].unlocked}
})