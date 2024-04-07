class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.grid = new Grid(this, undefined, {
            x: settings.squareXSize / 2 + settings.squareXSize / 16,
            y: h - settings.squareYSize / 2 - settings.squareYSize / 6,
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