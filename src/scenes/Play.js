class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.square = new GridSpace(this, w/2, h/2, 'gridSpace', 0)
        this.square.setOrigin(0.5, 0.5)
    }

    update(time, delta) {
    }
}