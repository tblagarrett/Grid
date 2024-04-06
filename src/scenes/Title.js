class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        // Title Screen text
        this.add.text (w/2, h/2 + 150, 'Press space to play').setScale(2).setOrigin(0.5, 0.5)
        this.add.text (w/2, h/2 + 200, 'Press shift for credits').setScale(2).setOrigin(0.5, 0.5)
    
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start('playScene')
        }
        if (this.cursors.shift.isDown) {
            this.scene.start('creditsScene')
        }
    }
}