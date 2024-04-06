// Class copied from professor Altice's PaddleParkourP3
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        // load graphics assets
        this.load.image('gridSpace', 'img/GridSpace.png')

        // menu bg
        // this.load.image('menuBG1', 'img/mainmenu/MainMenuBackground-1.png')

        // load sound assets
        // this.load.audio('stomp', [ 'wav/stomp.wav' ]);

        // load spritesheets
        // this.load.spritesheet('knight', 'img/KnightSprite.png', {
        //     frameWidth: 120,
        //     frameHeight: 105
        // }) 
    }

    create() {
        // animation configuration

        // IDLE
        // this.anims.create({
        //     key: 'idle-knight-right',
        //     frameRate: 4,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 1 }),
        // })

        // WALK
        // this.anims.create({
        //     key: 'walk-knight-right',
        //     frameRate: 16,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('knight', {
        //         frames: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        //     })
        // })

        // go to Title scene
        this.scene.start('titleScene');
    }
}