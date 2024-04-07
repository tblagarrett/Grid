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

        this.snowman = new Bit(this, 0, 0, 'snowman', 0, this.grid, {
            name: 'snowman',
            xCoord: 3,
            yCoord: 5,
            moveable: true
        })

        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        // Create key objects for WASD keys
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.snowman.move([0, 1])
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.snowman.move([0, -1])
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.keyA)) {
            this.snowman.move([-1, 0])
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.snowman.move([1, 0])
        }
    }
}