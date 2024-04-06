class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // Spawn the player
        this.sprite = scene.add.existing(this)
        this.physics = scene.physics.add.existing(this)
        
        this.setOrigin(0.5, 1)
        this.body.setGravity(0, 100)
    }

    update() {
        this.PlayerFSM.step()
    }
}