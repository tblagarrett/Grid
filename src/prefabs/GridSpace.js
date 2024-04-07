class GridSpace extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, xCoord, yCoord) {
        super(scene, x, y, texture, frame)

        // NOTE: Coordinates start at 0
        this.xCoord = xCoord
        this.yCoord = yCoord

        // Spawn the Space
        this.sprite = scene.add.existing(this)
        // this.physics = scene.physics.add.existing(this)
        this.setOrigin(0, 1)
    }

    update() {
    }
}