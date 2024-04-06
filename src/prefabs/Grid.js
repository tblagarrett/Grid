class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        // Spawn the player
        this.sprite = scene.add.existing(this)
        
        this.setOrigin(0, 0)
    }

    update() {
    }
}