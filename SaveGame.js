const fs = require('fs');

//Un problème de dépendances circulaires m'a forcé de déplacer la function de sauvegarde dans son propre fichier.

module.exports = function saveGameState(player, world) {
    let save = {saved_on: new Date().toISOString()};
    save.player = player
    save.world = world

    fs.writeFile('save.json', JSON.stringify(save), 'utf-8', (error) => {
        if (error) {
            console.error("Error while writing JSON tasks to file", error)
            console.log("-------------------------------")
            return error
        } else {
            console.log('')
            console.log(`${player.name}'s data has been successfully saved !`)
            world.addLog(`${player.name}'s data has been successfully saved !`)
            console.log('------------------------------------')
            setTimeout(() => {
                return world.oneDayPasses(player, world)
            }, 1000)

        }
    })
};
