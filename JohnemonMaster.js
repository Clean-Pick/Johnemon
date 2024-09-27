const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class JohnemonMaster {
    constructor(name) {
        this.name = name;
        this.johnemonCollection = [];
        this.healingItems = 5;
        this.reviveItems = 3;
        this.JOHNEBALLS = 10;
    }

    renameJohnemon(johnemon, player, world) {
        console.log("Type 'Cancel' to abort")
        console.log('')
        rl.question("Type the new Johnemon's name : ", (answer) => {
            if (answer !== "Cancel" || answer !== "cancel") {
                let pastName = johnemon.name
                johnemon.name = answer;
                console.log('')
                console.log(pastName + " has been renamed " + johnemon.name)
                world.addLog(pastName + " has been renamed " + johnemon.name)
                setTimeout(() => {
                    world.randomEvent(player, world)
                }, 0)
            } else if (answer === "Cancel" || answer === "cancel") {
                console.log("Cancelling...")
                world.addLog("Cancelling...")
            }

        })

    }


    healJohnemon(johnemon, player, world) {
        if (this.healingItems !== 0 && johnemon.currentHealth < johnemon.maxHealth) {
            this.healingItems -= 1
            johnemon.currentHealth = johnemon.maxHealth;
            console.log(`${johnemon.name} has been  healed.
Potions remaining : ${this.healingItems}`);
            world.addLog(`${johnemon.name} has been  healed.
Potions remaining : ${this.healingItems}`)

        } else if (johnemon.currentHealth >= johnemon.maxHealth) {
            console.log(johnemon.name + " is totally fine.");
            world.addLog(johnemon.name + " is totally fine.")
            return world.newDay(player, world)
        } else if (this.healingItems <= 0) {
            console.log(this.name + " is out of potions, " + johnemon.name + " cannot be healed.");
            world.addLog(this.name + " is out of potions, " + johnemon.name + " cannot be healed.")
        }
        setTimeout(() => {
            world.randomEvent(player, world)
        }, 0)
    }

    reviveJohnemon(johnemon, player, world) {
        if (this.reviveItems !== 0 && johnemon.currentHealth <= 0) {
            johnemon.currentHealth = (johnemon.maxHealth / 2);
            this.reviveItems -= 1;
            console.log(`${johnemon.name} has been revived !
${this.name} has ${this.reviveItems} resurrect(s) left`);
            world.addLog(`${johnemon.name} has been revived !
${this.name} has ${this.reviveItems} resurrect(s) left`)
        } else if (johnemon.currentHealth > 0) {
            console.log(`${johnemon.name} is alive, you cannot revive them.`);
            world.addLog(`${johnemon.name} is alive, you cannot revive them.`)
            return world.newDay(player, world)
        } else if (this.reviveItems === 0) {
            console.log(`Unfortunately, you dont have any revive item left and cannot revive ${johnemon.name}.`);
            world.addLog(`Unfortunately, you dont have any revive item left and cannot revive ${johnemon.name}.`)
        }
        setTimeout(() => {
            world.randomEvent(player, world)
        }, 0)
    }

    catchJohnemon(johnemon, world) {

        if (this.JOHNEBALLS > 0 && johnemon.currentHealth > 0) {
            let chances = (johnemon.currentHealth / johnemon.maxHealth)
            this.JOHNEBALLS -= 1;
            if ((Math.random()) >= chances) {
                this.johnemonCollection.push(johnemon)
                console.log(`${johnemon.name} has been caught !`)
                world.addLog(`${johnemon.name} has been caught !`)

                this.showCollection()

                world.addLog("Johneballs remaining : " + this.JOHNEBALLS)
                console.log("Johneballs remaining : " + this.JOHNEBALLS)


            } else {
                console.log("You failed to catch " + johnemon.name)
                world.addLog("You failed to catch " + johnemon.name)
                world.addLog("Johneballs remaining : " + this.JOHNEBALLS)
                console.log("Johneballs remaining : " + this.JOHNEBALLS)

            }
        } else if (this.JOHNEBALLS === 0) {
            console.log("You dont have any Johneball")
            world.addLog("You dont have any Johneball")

        }
    }


    releaseJohnemon(johnemon, player, world) {
        rl.question(`Do you really want to free ${johnemon.name} ?`, (answer) => {
            if (answer !== "yes" || answer !== "y") {
                console.log('')
                console.log(`${johnemon.name} has been released !`)
                world.addLog(`${johnemon.name} has been released !`)
                this.johnemonCollection.splice(johnemon, 1);
                console.log(this.johnemonCollection)

            } else {
                console.log('')
                console.log("Cancelling...")
                world.addLog("Cancelling...")
            }
            setTimeout(() => {
                world.randomEvent(player, world)
            }, 0)
        })

    }

    showCollection() {
        console.table(this.johnemonCollection, ["name", "level", "attack", "defense", "currentHealth", "maxHealth"])
    }

}

module.exports = JohnemonMaster
