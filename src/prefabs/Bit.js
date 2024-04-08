class Bit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, grid, config) {
        super(scene, x, y, texture, frame)

        // set config with default values
        let defaults = {
            name: '',
            xCoord: 0,
            yCoord: 0,
            moveable: false
        }
        this.config = {...defaults, ...config}

        // NOTE: Coordinates start at 0
        this.xCoord = config.xCoord
        this.yCoord = config.yCoord

        this.grid = grid
        this.square = this.grid.matrix[this.yCoord][this.xCoord]    // since it starts from bottom left, row by row, x and y are flipped

        // place the Bit in the square
        this.x = this.square.x
        this.y = this.square.y
        this.moving = false

        // Spawn the Space
        this.sprite = scene.add.existing(this)
        // this.physics = scene.physics.add.existing(this)
        this.setOrigin(0.5, 0.5)
    }

    update() {
    }

    // direction is an array of 2 digits, being 1, 0, or -1
    // cardinal directions being:
    // up: [0, 1]
    // down: [0, -1]
    // left: [-1, 0]
    // right: [1, 0]
    move(direction) {
        if (!this.config.moveable) {
            console.log(`${this.config.name} move(): Object is not moveable`)
            return
        }

        // set the destination square
        let targetX = this.xCoord + direction[0]
        let targetY = this.yCoord + direction[1]

        // Check for out of bounds
        if (targetX < 0 || targetX >= this.grid.xCount || targetY < 0 || targetY >= this.grid.yCount) {
            console.log(`${this.config.name} move(): Target square out of bounds`)
            return
        }

        let targetSquare = this.grid.matrix[targetY][targetX]

        // if the spot is already taken, dont allow it
        // NOTE: WILL BE CHANGED DEPENDING ON NEEDS OF THE GAME
        if (targetSquare.bit != undefined) {
            console.log(`${this.config.name} move(): Target square full`)
            return
        }

        // Change the GridSpace holding this bit
        this.square.bit = undefined
        targetSquare.bit = this
        this.square = targetSquare

        // Make the movement
        let moveTween = this.scene.tweens.add({
            targets: this,
            duration: settings.moveDelay,
            paused: false,
            x: this.square.x,
            y: this.square.y,
            onStart: () => {
                this.moving = true
            },
            onStartScope: this,
            onComplete: () => {
                this.moving = false
            },
            onCompleteScope: this,
        })

        this.xCoord = this.square.xCoord
        this.yCoord = this.square.yCoord
    }
}