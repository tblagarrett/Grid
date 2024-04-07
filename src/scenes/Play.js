class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.grid = new Grid(this, undefined, {
            x: 6,
            y: h - settings.squareYSize / 4,
            xCount: settings.gridSizeX,
            yCount: settings.gridSizeY,
            squareXSize: settings.squareXSize,
            squareYSize: settings.squareYSize,
            squareImage: 'gridSpace',
        })
    }

    update(time, delta) {
    }
}