const readline = require('readline');
const JohnemonArena = require('./JohnemonArena')
const Johnemon = require('./Johnemon')
const johnemonMaster = require("./JohnemonMaster");
const saveGameState = require('./SaveGame');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


class JohnemonWorld {
    constructor() {
        this.day = 0
        this.log = ["A new adventure begins !"]
    }

    oneDayPasses(player, world) {
        this.day += 1
        console.log('====================================')
        console.log(`Day ${this.day}:`)
        this.addLog(`Day ${this.day}:`)

        this.newDay(player, world)
    }

    newDay(player, world) {

        console.log('------------------------------------')

        console.log(`1. Heal a Johnemon
2. Revive a Johnemon
3. Release a Johnemon
4. Rename a Johnemon
5. Nothing`)

        rl.question('What do you want to do ? ', (answer) => {
            switch (answer) {
                case "1":
                    console.log("")
                    player.showCollection()
                    this.healChoice(player, world)
                    break;
                case "2":
                    console.log("")
                    player.showCollection()
                    this.reviveChoice(player, world)
                    break;
                case "3":
                    console.log("")
                    player.showCollection()
                    this.releaseChoice(player, world)
                    break;
                case "4":
                    console.log("")
                    player.showCollection()
                    this.renameChoice(player, world)
                    break;
                case "5":
                    console.log("")
                    console.log("Skipping...")
                    this.randomEvent(player, world)
                    break;
                default:
                    console.log('')
                    console.log("Please type a correct answer")
                    return this.newDay(player, world)
            }
        })
    }

    healChoice(player, world) {
        rl.question("Which johnemon do you want to heal ? Type the index : ", (choice) => {
            if (typeof player.johnemonCollection[choice] !== "undefined") {
                let johnemon = player.johnemonCollection[choice]
                console.log('')
                console.log("You tried to heal " + player.johnemonCollection[choice].name)
                this.addLog("You tried to heal " + player.johnemonCollection[choice].name)
                player.healJohnemon(johnemon, player, world)
            } else {
                console.log('')
                console.log("This index does not exist.")
                return this.healChoice(player, world)
            }
        })
    }

    reviveChoice(player, world) {
        rl.question("Which johnemon do you want to revive ? Type the index : ", (choice) => {
            if (typeof player.johnemonCollection[choice] !== "undefined") {
                let johnemon = player.johnemonCollection[choice]
                console.log('')
                console.log("You tried to revive " + player.johnemonCollection[choice].name)
                this.addLog("You tried to revive " + player.johnemonCollection[choice].name)
                player.reviveJohnemon(johnemon, player, world)
            } else {
                console.log('')
                console.log("This index does not exist.")
                return this.reviveChoice(player, world)
            }
        })
    }

    releaseChoice(player, world) {
        rl.question("Which johnemon do you want to release ? Type the index : ", (choice) => {
            if (typeof player.johnemonCollection[choice] !== "undefined") {
                let johnemon = player.johnemonCollection[choice]
                console.log('')
                console.log("You tried to release " + player.johnemonCollection[choice].name)
                this.addLog("You tried to release " + player.johnemonCollection[choice].name)
                player.releaseJohnemon(johnemon, player, world)
            } else {
                console.log('')
                console.log("This index does not exist.")
                return this.releaseChoice(player, world)
            }
        })
    }

    renameChoice(player, world) {
        rl.question("Which johnemon do you want to rename ? Type the index : ", (choice) => {
            if (typeof player.johnemonCollection[choice] !== "undefined") {
                let johnemon = player.johnemonCollection[choice]
                console.log('')
                console.log("You tried to rename " + player.johnemonCollection[choice].name)
                this.addLog("You tried to rename " + player.johnemonCollection[choice].name)
                return player.renameJohnemon(johnemon, player, world)
            } else {
                console.log('')
                console.log("This index does not exist.")
                return this.renameChoice(player, world)
            }
        })
    }

    randomEvent(player, world) {
        console.log("Processing Day...")
        let result = Math.floor(Math.random() * 3)

        if (result > 0) {
            console.log("A wild johnemon appeared !")
            this.addLog("A wild johnemon appeared !")
            rl.question("Do you want to fight ? ", (answer) => {
                if (answer === "yes" || answer === "y" || answer === "oui") {
                    console.log("")
                    let battle = new JohnemonArena()
                    battle.startBattle(player, world)
                } else {
                    console.log("")
                    console.log("You sneaked past the wild johnemon...")
                    this.addLog("You sneaked past the wild johnemon...")
                    saveGameState(player, world)
                }
            })

        } else {
            console.log('')
            console.log("Nothing happened today.")
            this.addLog("Nothing happened today.")
            saveGameState(player, world)
        }

    }

    addLog(newLog) {
        this.log.push("-" + newLog)
    }

    showLog() {
        for (let i = 0; i < this.log.length; i++) {
            console.log(this.log[i])
        }
    }
}


module.exports = JohnemonWorld