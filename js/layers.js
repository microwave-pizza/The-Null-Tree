addLayer("zero", {
    name: "zero",
    startData() {return {
        unlocked: true,
        points: new Decimal(2)
    }},
    color: "#000000",
    row: 0,
    resource: "zeroes",
    layerShown() {return true},
    style: {"background-color": "#FFFFFF",},
    tabFormat: [
        [
            "display-text",
            function() { return 'You have <b style="font-size:25px;text-shadow:#000000 0px 0px 10px">' + format(player.zero.points) + "</b> zeroes" },
            {"color": "#000000"}
        ],
        "blank",
        [
            "display-text",
            function() { return 'You are gaining <b style="font-size:25px;text-shadow:#000000 0px 0px 10px">' + format(getResetGain("zero")) + "</b> zeroes per second" },
            {"color": "#000000"}
        ],
        "blank",
        "blank",
        "upgrades",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
        "blank",
    ],
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
        if (player.half.unlocked) {mult=mult.mul(tmp["half"].effect.effect1)}
        if (inChallenge("half", 11)) {mult = mult.div(2)}
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    doReset(layer) {
        player[this.layer].points = new Decimal(2)
        keep = []
        if (layers[layer].name == "half") {
            if (hasMilestone("half", 0)) {keep.push(11, 12, 13, 14)}
            player[this.layer].upgrades = keep
        }
    },
    update(diff) {
        let gain = getResetGain(this.layer)
        if (hasUpgrade("one", 11)) {player[this.layer].points = player[this.layer].points.add(gain.times(diff))}
    },
    symbol: "0",
    position: 0,
    branches: [["one", 1]],
    nodeStyle: {"color": "#FFFFFF"},
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
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
        },
        21: {
            title: "null",
            description: "Begin producing nulls. Both <b>null</b> upgrades are required.",
            cost: Decimal.pow(2, 23),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
        },
        34: {
            title: "½",
            description: "Unlocks a new layer. Both <b>½</b> upgrades are required.",
            cost: Decimal.pow(2, 44),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
    tabFormat: [
        [
            "display-text",
            function() { return 'You have <b style="font-size:25px;text-shadow:#ffffff 0px 0px 10px">' + format(player.one.points) + "</b> ones" },
            {"color": "#FFFFFF"}
        ],
        "blank",
        [
            "display-text",
            function() { return 'You are gaining <b style="font-size:25px;text-shadow:#ffffff 0px 0px 10px">' + format(getResetGain("one")) + "</b> ones per second" },
            {"color": "#FFFFFF"}
        ],
        "blank",
        "blank",
        "upgrades"
    ],
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
        if (player.half.unlocked) {mult=mult.mul(tmp["half"].effect.effect1)}
        if (inChallenge("half", 11)) {mult = mult.div(2)}
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    doReset(layer) {
        player[this.layer].points = new Decimal(2)
        keep = []
        if (layers[layer].name == "half") {
            if (hasMilestone("half", 0)) {keep.push(21, 22, 23, 24)}
            player[this.layer].upgrades = keep
        }
    },
    update(diff) {
        let gain = getResetGain(this.layer)
        if (hasUpgrade("one", 11)) {player[this.layer].points = player[this.layer].points.add(gain.times(diff))}
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
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
        },
        21: {
            title: "null",
            description: "Begin producing nulls. Both <b>null</b> upgrades are required.",
            cost: Decimal.pow(2, 23),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
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
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
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
            },
            style: {"background-color": "#FFFFFF", "color": "#000000"}
        },
        34: {
            title: "½",
            description: "Unlocks a new layer. Both <b>½</b> upgrades are required.",
            cost: Decimal.pow(2, 44),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            },
            style: {"background-color": "#000000", "color": "#FFFFFF"}
        }
    }
    }
)
addLayer("half", {
    name: "half",
    startData() {return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0)
    }},
    color: "#808080",
    row: 1,
    resource: "halves",
    effect() {
        let effect1base = new Decimal(2)
        if (hasChallenge(this.layer, 11)) {effect1base = effect1base.mul(2)}
        let effect1 = effect1base.pow(player[this.layer].best)
        let effect2 = player[this.layer].best.lt(4) ? 1 :player[this.layer].best.log(4)
        return {effect1, effect2}
    },
    layerShown() {return (hasUpgrade("zero", 34) && hasUpgrade("one", 34)) || player[this.layer].unlocked},
    tabFormat: [
        "main-display",
        "blank",
        [
            "display-text",
            function() { return 'Your halves are multiplying null, zero, and one gain by <b style="font-size:25px;color:#808080;text-shadow:#808080 0px 0px 10px">' + format(tmp["half"].effect.effect1) + "x</b>" }
        ],
        [
            "display-text",
            function() { return 'Your halves are raising half challenge rewards to <b style="font-size:25px;color:#808080;text-shadow:#808080 0px 0px 10px">^' + format(tmp["half"].effect.effect2) + "</b>" }
        ],
        "prestige-button",
        "milestones",
        "challenges"
    ],
    type: "static",
    baseResource: "nulls",
    baseAmount() {return player.points},
    requires: Decimal.pow(2, 50),
    exponent: 1,
    base: 32,
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    symbol: "½",
    position: 3,
    branches: [["zero", 1], ["one", 1]],
    milestones: {
        0: {
            requirementDescription: "2 halves",
            effectDescription: "Keep the first row of zero upgrades and the second row of one upgrades on half reset.",
            done() {return player[this.layer].points.gte(2)}
        }
    },
    challenges: {
        rows: 1,
        cols: 1,
        11: {
            name: "Halvening",
            challengeDescription: "Null, zero, and one production is divided by 2.",
            rewardDescription: "Halves' first effect's base is doubled.",
            goal: new Decimal(1e15),
            currencyDisplayName: "nulls"
        }
    }
    }
)