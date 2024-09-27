const readline = require('readline');
const fs = require('fs');
const JohnemonMaster = require('./JohnemonMaster'); // Replace 'your_classes_filename' with the actual filename
const Johnemon = require('./Johnemon')
const JohnemonWorld = require('./JohnemonWorld')
const JohnemonArena = require("./JohnemonArena");
const saveGameState = require('./SaveGame');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let world
let player
let savedGame




function findSavedGame() {
    console.log("Searching savefile...")
    try {
        savedGame = require('./save.json')
    } catch (error) {
        console.log('No savefile found, creating a new adventure...')
    }
}

function importSave() {
    player = new JohnemonMaster(savedGame.player.name);

    player.johnemonCollection = savedGame.player.johnemonCollection.map((johnemonData) => {
        const johnemon = new Johnemon();
        for (const key in johnemonData) {
            if (typeof johnemonData[key] !== 'function') {
                johnemon[key] = johnemonData[key];
            }
        }
        return johnemon;
    });

    player.healingItems = savedGame.player.healingItems;
    player.reviveItems = savedGame.player.reviveItems;
    player.JOHNEBALLS = savedGame.player.JOHNEBALLS;
    world = new JohnemonWorld();
    world.day = savedGame.world.day;
    world.log = savedGame.world.log;
}


function proposeFirstJohnemon() {

    let starters = []
    for (let i = 0; i < 3; i++) {
        starters.push(new Johnemon());
    }
    question()

    function question() {
        console.table(starters, ['name', 'attack', 'defense', 'maxHealth'])
        rl.question("Type the index of the Johnemon you want to take with you in your adventure : ", (answer) => {
            if (answer === "1" || answer === "2" || answer === "0") {
                parseInt(answer)
                console.log('------------------------------------')
                console.log(`You chose ${starters[answer].name}`);
                world.addLog(`You chose ${starters[answer].name}`)
                player.johnemonCollection.push(starters[answer]);
                setTimeout(() => {
                    saveGameState(player, world);
                }, 1000)


            } else {
                console.log(`Please type a correct value`);
                return question();
            }
        })
    }
}

function newGame() {
    world = new JohnemonWorld();
    console.log('------------------------------------')
    rl.question('What is your name? ', (answer) => {
        player = new JohnemonMaster(answer);
        console.log('------------------------------------')
        console.log("Welcome, " + player.name);
        setTimeout(() => {
            console.log("Generating starters....")

        }, 500)
        setTimeout(() => {
            console.log('------------------------------------')
            proposeFirstJohnemon();
        }, 2000)

    })
}


function startGame() {

    findSavedGame()

    if (typeof savedGame === 'undefined') {
        newGame()
    } else {
        rl.question('Savefile found.  Do you want to load it ? ', (answer) => {
            if (answer === "yes" || answer === "y" || answer === "oui") {
                console.log('------------------------------------')
                importSave()
                console.log(`Importing ${player.name}'s data...`)
                setTimeout(() => {
                    console.log('------------------------------------')
                    console.log(`${player.name} :`)
                    console.table(player)
                }, 1000)
                setTimeout(() => {
                    console.log('------------------------------------')
                    console.log(`${player.name}'s Johnemons :`)
                    player.showCollection()
                }, 2000)

                // world.showLog()
                setTimeout(() => {
                    console.log('------------------------------------')
                    world.oneDayPasses(player, world)
                }, 3000)

            } else {
                console.log(`Deleting Save...`);
                setTimeout(() =>{
                    fs.unlink('save.json', err => {
                        if (err) {
                            throw err;
                        } else {
                            newGame()
                        }
                })

                }, 1000);

            }
        })
    }
}


startGame()




