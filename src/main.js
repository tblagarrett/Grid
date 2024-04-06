/*
Names: Garrett Blake, James Milestone
Game Title: The Tale of Zelmore: The Golden Lake
Time Spent: Infinity
*/

// The base size from the Zelmore screenshot is 153 by 93, so the pixelart is made according to that
let config = {
    type: Phaser.AUTO,
    width: 153 * 5,
    height: 93 * 5,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Title, Play, Credits ]
}

let game = new Phaser.Game(config)
// Put any config that the other scenes may need
settings = {
    gridSizeX: 10,
    gridSizeY: 10
}

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;