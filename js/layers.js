addLayer("zero", {
    name: "zero",
    startData() {return {
        unlocked: true,
        points: new Decimal(2)
    }},
    color: "#888888",
    row: 0,
    resource: "zeroes",
    layerShown() {return true},
    type: "normal",
    baseResource: "ones",
    baseAmount() {return player.one.points},
    requires: new Decimal(1),
    exponent: 0.25,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 12)) {mult = mult.mul(upgradeEffect(this.layer, 12))}
        if (hasUpgrade("one", 13)) {mult = mult.mul(upgradeEffect("one", 13))}
        if (hasUpgrade(this.layer, 14)) {mult = mult.mul(upgradeEffect(this.layer, 14))}
        if (hasUpgrade(this.layer, 22)) {mult = mult.mul(upgradeEffect(this.layer, 22))}
        if (hasUpgrade("one", 23)) {mult = mult.mul(upgradeEffect("one", 23))}
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    update(diff) {
        if (hasUpgrade("one", 11)) generatePoints("zero", diff)
    },
    symbol: "0",
    position: 0,
    branches: [["one", 1]],
    componentStyles: {
        "prestige-button"() {return {"display": "none"}}
    },
    upgrades: {
        rows: 3,
        cols: 4,
        11: {
            title: "0",
            description: "Zeroes produce ones.",
            cost: Decimal.pow(2, 0),
            effectDisplay() {
                return player.one.points.pow(0.25).round()
            }
        },
        12: {
            title: "00",
            description: "Zeroes boost zero gain.",
            cost: Decimal.pow(2, 4),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 12)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "01",
            description: "Zeroes boost one gain.",
            cost: Decimal.pow(2, 10),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 13)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "10",
            description: "Ones boost zero gain.",
            cost: Decimal.pow(2, 15),
            effect() {
                return player.one.points.lt(2) ? 1 : player.one.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 14)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        21: {
            title: "null",
            description: "Begin producing nulls. Both <b>null</b> upgrades are required.",
            cost: Decimal.pow(2, 23),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        },
        22: {
            title: "null0",
            description: "Nulls boost zero gain.",
            cost: Decimal.pow(2, 24),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 22)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "null1",
            description: "Nulls boost one gain.",
            cost: Decimal.pow(2, 27),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 23)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 22)
            }
        },
        24: {
            title: "nullnull",
            description: "Nulls boost null gain.",
            cost: Decimal.pow(2, 31),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 24)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 23)
            }
        },
        31: {
            title: "0null",
            description: "Zeroes boost null gain.",
            cost: Decimal.pow(2, 35),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 31)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
        32: {
            title: "1null",
            description: "Ones boost null gain.",
            cost: Decimal.pow(2, 37),
            effect() {
                return player.one.points.lt(2) ? 1 : player.one.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 32)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 31)
            }
        },
        33: {
            title: "nullnull",
            description: "Nulls boost null gain.",
            cost: Decimal.pow(2, 40),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 33)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 32)
            }
        },
        34: {
            title: "½",
            description: "Unlocks a new layer. Both <b>½</b> upgrades are required. (doesnt actually exist yet lmao)",
            cost: Decimal.pow(2, 1000),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            }
        }
    }
    }
)
addLayer("one", {
    name: "one",
    startData() {return {
        unlocked: true,
        points: new Decimal(2)
    }},
    color: "#FFFFFF",
    row: 0,
    resource: "ones",
    layerShown() {return true},
    type: "normal",
    baseResource: "zeroes",
    baseAmount() {return player.zero.points},
    requires: new Decimal(1),
    exponent: 0.25,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 12)) {mult = mult.mul(upgradeEffect(this.layer, 12))}
        if (hasUpgrade("zero", 13)) {mult = mult.mul(upgradeEffect("zero", 13))}
        if (hasUpgrade(this.layer, 14)) {mult = mult.mul(upgradeEffect(this.layer, 14))}
        if (hasUpgrade(this.layer, 22)) {mult = mult.mul(upgradeEffect(this.layer, 22))}
        if (hasUpgrade("zero", 23)) {mult = mult.mul(upgradeEffect("zero", 23))}
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    update(diff) {
        if (hasUpgrade("zero", 11)) generatePoints("one", diff)
    },
    symbol: "1",
    position: 1,
    branches: [["zero", 1]],
    componentStyles: {
        "prestige-button"() {return {"display": "none"}}
    },
    upgrades: {
        rows: 3,
        cols: 4,
        11: {
            title: "1",
            description: "Ones produce zeroes.",
            cost: Decimal.pow(2, 0),
            effectDisplay() {
                return player.zero.points.pow(0.25).round()
            }
        },
        12: {
            title: "11",
            description: "Ones boost one gain.",
            cost: Decimal.pow(2, 4),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 12)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "10",
            description: "Ones boost zero gain.",
            cost: Decimal.pow(2, 10),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 13)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "01",
            description: "Zeroes boost one gain.",
            cost: Decimal.pow(2, 15),
            effect() {
                return player.zero.points.lt(2) ? 1 : player.zero.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 14)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        21: {
            title: "null",
            description: "Begin producing nulls. Both <b>null</b> upgrades are required.",
            cost: Decimal.pow(2, 23),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        },
        22: {
            title: "null1",
            description: "Nulls boost one gain.",
            cost: Decimal.pow(2, 24),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 22)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "null0",
            description: "Nulls boost zero gain.",
            cost: Decimal.pow(2, 27),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 23)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 22)
            }
        },
        24: {
            title: "nullnull",
            description: "Nulls boost null gain.",
            cost: Decimal.pow(2, 31),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 24)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 23)
            }
        },
        31: {
            title: "1null",
            description: "Ones boost null gain.",
            cost: Decimal.pow(2, 35),
            effect() {
                return player[this.layer].points.lt(2) ? 1 : player[this.layer].points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 31)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
        32: {
            title: "0null",
            description: "Zeroes boost null gain.",
            cost: Decimal.pow(2, 37),
            effect() {
                return player.zero.points.lt(2) ? 1 : player.zero.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 32)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 31)
            }
        },
        33: {
            title: "nullnull",
            description: "Nulls boost null gain.",
            cost: Decimal.pow(2, 40),
            effect() {
                return player.points.lt(2) ? 1 : player.points.log(2)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, 33)) + "x"
            },
            unlocked() {
                return hasUpgrade(this.layer, 32)
            }
        },
        34: {
            title: "½",
            description: "Unlocks a new layer. Both <b>½</b> upgrades are required. (doesnt actually exist yet lmao)",
            cost: Decimal.pow(2, 1000),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            }
        }
    }
    }
)