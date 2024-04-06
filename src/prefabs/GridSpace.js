class GridSpace extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // Spawn the player
        this.sprite = scene.add.existing(this)
        
        this.setOrigin(0, 0)
    }

    update() {
    }
}