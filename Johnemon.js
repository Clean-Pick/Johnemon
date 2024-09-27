const readline = require('readline');
const fs = require('fs');
const getNames = fs.readFileSync("./names.txt").toString('utf-8');
const names = getNames.split("\n")


class Johnemon {
    constructor() {
        this.name = this.#randomName();
        this.level = 1;
        this.exp = 0;
        this.attack = Math.floor(Math.random() * (9 - 1) + 1);
        this.defense = Math.floor(Math.random() * (4 - 1) + 1);
        this.maxHealth = Math.floor(Math.random() * (31 - 10) + 10);
        this.currentHealth = this.maxHealth;
        this.catchPhrase = "Tu vas en bouffer de la terre promise !"
    }

    attackEnemy(johnemon, world) {
        let damages = Math.floor(Math.random() * (this.attack * this.level) + johnemon.defense);
        if (damages <= 0) {
            console.log("Attack missed !")
            world.addLog("Attack missed !")
        } else {
            johnemon.currentHealth -= damages
            console.log(`${this.name} dealt ${damages} damages to ${johnemon.name} !`);
            world.addLog(`${this.name} dealt ${damages} damages to ${johnemon.name} !`)
        }

        console.log(`${this.name} Health : ${this.currentHealth}/${this.maxHealth}
${johnemon.name} Health : ${johnemon.currentHealth}/${johnemon.maxHealth}`)
    }


    expGain(johnemon, player, world) {
        let expGain = johnemon.level * Math.floor(Math.random() * (6 - 1) + 1);
        this.exp += expGain;
        console.log(`${this.name} gained ${expGain} exp !`);
        world.addLog(`${this.name} gained ${expGain} exp !`)

        if (this.exp >= (this.level * 100)) {
            console.log("Wait, " + this.name + " is evolving !!!")
            world.addLog("Wait, " + this.name + " is evolving !!!")
            return this.#evolve(player, world)
        }
    }


    // TODO: Find API to generate random catchPhrases
    catchPhrase() {
        console.log(this.catchPhrase);
    }

    #evolve(player, world) {
        let attackGained = Math.floor(Math.random() * (5 - 1) + 1);
        let defenseGained = Math.floor(Math.random() * (5 - 1) + 1);
        let healthGained = Math.floor(Math.random() * (5 - 1) + 1);

        this.level += 1;
        this.attack += attackGained
        this.defense += defenseGained
        this.maxHealth += healthGained
        this.currentHealth = this.maxHealth


        console.log(`${this.name} evolved !
${this.name} gained ${attackGained} Attack !
${this.name} gained ${defenseGained} Defense !
${this.name} gained ${healthGained} Max Health !`);

        world.addLog(`${this.name} evolved !
${this.name} gained ${attackGained} Attack !
${this.name} gained ${defenseGained} Defense !
${this.name} gained ${healthGained} Max Health !`)
    }

    #txtManip() {
        let halves = []
        for (let name in names) {

            let currentName = (names[name].slice(0, name.length - 3))
            currentName = currentName.replace(/['",]+/g, '')
            currentName = currentName.trim()
            currentName = currentName.toLowerCase()

            halves.push(currentName.substring(0, (currentName.length / 2) + 1))
            halves.push(currentName.substring(((currentName.length / 2) + 1)))

        }

        halves.shift()
        halves.pop()
        halves.shift()
        halves.pop()

        return halves
    }

    #randomName() {
        let halves = this.#txtManip()
        let randomHalf = halves[Math.floor(Math.random() * halves.length)]
        let randomHalf2 = halves[Math.floor(Math.random() * halves.length)]

        randomHalf = randomHalf.charAt(0).toUpperCase()
            + randomHalf.slice(1)

        return this.name = `${randomHalf}${randomHalf2}`
    }
}


module.exports = Johnemon
