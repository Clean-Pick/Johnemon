const readline = require('readline');
const Johnemon = require('./Johnemon')
const johnemonMaster = require("./JohnemonMaster");
const saveGameState = require('./SaveGame');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


class JohnemonArena {
  constructor(choice, johnemon) {
    this.choice = new Johnemon();
    this.johnemon = new Johnemon();
    this.choiceIndex
  }



  startBattle(player, world) {

    console.log(`A wild ${this.johnemon.name} lvl ${this.johnemon.level} appears, it has ${this.johnemon.maxHealth} health.`)
    world.addLog(`A wild ${this.johnemon.name} lvl ${this.johnemon.level} appears, it has ${this.johnemon.maxHealth} health.`)
    this.chooseJohnemon(player, world)
  }

  chooseJohnemon(player , world) {
    console.log("Choose a Johnemon !")
    world.addLog("Choose a Johnemon !")
    player.showCollection()
    rl.question("Type the index of your choice : ", (answer) => {
      if (typeof player.johnemonCollection[answer] === "undefined") {
        console.log('')
        console.log("Not a valid answer.")
        return this.chooseJohnemon(player, world)
      } else {
        console.log('')
        this.choiceIndex = parseInt(answer)
            rl.question(player.johnemonCollection[answer].name + " is you choice ? ", (confirm) => {
          if(confirm === "yes" || confirm === "y" || confirm === "oui") {
            this.choice = player.johnemonCollection[answer]
            console.log('')
            console.log(`You have chosen ${this.choice.name} !`)
            world.addLog(`You have chosen ${this.choice.name} !`)

            return this.startRound(player, world)
          } else {
            return this.chooseJohnemon(player, world)
          }
        })
      }
    })
  	
  }

  startRound(player, world) {
    console.log(`1. Attack ${this.johnemon.name}.
2. Attempt to catch ${this.johnemon.name}.
3. Run away.`)
    rl.question("What do you want to do ? ", (answer) => {
    switch (answer) {
      case "1":
        console.log('')
        console.log(`${this.choice.name} attacks ${this.johnemon.name} !`)
        world.addLog(`${this.choice.name} attacks ${this.johnemon.name} !`)
        this.choice.attackEnemy(this.johnemon, world)
        this.attack(player, world)
        this.startNewRound(player, world)
        break;
      case "2":
        this.tryToCatch(player, world)
        break;
      case "3":
        console.log(`you ran waway from ${this.johnemon.name}`)
        world.addLog(`you ran waway from ${this.johnemon.name}`)
        this.attack(player, world)
        this.endBattle(player, world)
        break;
      default :
        console.log("Please choose a correct option.")
          return this.startRound(player, world)
        break;
    }
    })

  }

  startNewRound(player, world) {
    if (this.johnemon.currentHealth <= 0) {
      this.johnemon.currentHealth = 0
      console.log(`${this.johnemon.name} has fainted !`);
      world.addLog(`${this.johnemon.name} has fainted !`)
      return this.endBattle(player, world)

    } else if (this.choice.currentHealth <= 0) {
      console.log(`${this.choice.name} has fainted !`);
      world.addLog(`${this.choice.name} has fainted !`)

    } else {
      return this.startRound(player, world)
    }
  }


  playerAction(johnemon) {
  	
  }

  attack(player, world) {
    this.johnemon.attackEnemy(this.choice, world)
  }

  tryToCatch(player, world) {
    console.log('')
    console.log(`You throw a Johneball at ${this.johnemon.name}`)
    world.addLog(`You throw a Johneball at ${this.johnemon.name}`)
    player.catchJohnemon(this.johnemon, world)
    setTimeout(() => {
      if(player.johnemonCollection.indexOf(this.johnemon) !== -1) {
        player.showCollection()
        return this.endBattle(player, world)
      } else {
        this.attack(player, world)
        this.startNewRound(player, world)
      }
    }, 0)

  }

  calculateDamage(attack, defense) {
    
  }

  wildJohnemonAction() {
    
  }

  checkBattleStatus() {
    
  }




  endBattle(player, world) {
    if(this.johnemon.currentHealth !== 0) {
      player.johnemonCollection[this.choiceIndex] = this.choice
      saveGameState(player, world)
      setTimeout(() => {
        return world.oneDayPasses(player, world)
      },1000)
    } else {
      this.choice.expGain(this.johnemon, player, world)
      player.johnemonCollection[this.choiceIndex] = this.choice
      saveGameState(player, world)
      setTimeout(() => {
        return world.oneDayPasses(player, world)
      },1000)

    }

  }


}



module.exports = JohnemonArena