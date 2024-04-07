class Bit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, grid, config) {
        super(scene, x, y, texture, frame)

        // set config with default values
        let defaults = {
            xCoord: 0,
            yCoord: 0,
        }
        this.config = {...defaults, ...config}

        // NOTE: Coordinates start at 0
        this.xCoord = config.xCoord
        this.yCoord = config.yCoord

        this.grid = grid
        this.square = this.grid.matrix[this.xCoord][this.yCoord]

        // Spawn the Space
        this.sprite = scene.add.existing(this)
        // this.physics = scene.physics.add.existing(this)
        this.setOrigin(0.5, 0.5)
    }

    update() {
    }
}