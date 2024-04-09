class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        // Grid Setup
        this.grid = new Grid(this, undefined, {
            x: settings.squareXSize / 2,
            y: h - h/6 + settings.squareYSize/2,
            xCount: settings.gridSizeX,
            yCount: settings.gridSizeY,
            squareXSize: settings.squareXSize,
            squareYSize: settings.squareYSize,
            squareImage: 'gridSpace',
        })

        this.player = new Bit(this, 0, 0, 'snowman', 0, this.grid, {
            name: 'snowman',
            xCoord: 3,
            yCoord: 5,
            moveable: true
        })

        this.clearButton = this.add.image(10, 10, 'clearButton').setOrigin(0,0).setInteractive()
        this.clearButton.on('pointerdown', this.clearSelection, this)

        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        // Create key objects for WASD keys
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // set up listeners for space highlighting and selecting
        this.distanceLeft = settings.moveDistance
        this.highlightOrigin = this.player.square
        this.highlightPath = undefined
        this.highlightTint = 0xFACADE
        this.input.on('gameobjectover', this.highlight, this)
        this.input.on('gameobjectout', this.unhighlight, this)
        this.input.on('gameobjectdown', this.select, this)

        // set up the starting selected path
        this.selectedPath = new Path(this.grid.matrix)
        this.selectedTint = 0x3b3030
        this.selectedPath.push(this.player.square)
    }

    update(time, delta) {
        // Snowman movement handling
        this.handleMovement(this.player)
    }

    handleMovement(bit) {
        if (bit.moving) {return}    

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keyW)) {
            bit.move([0, 1])
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.keyS)) {
            bit.move([0, -1])
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.keyA)) {
            bit.move([-1, 0])
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.keyD)) {
            bit.move([1, 0])
        }
    }

    highlight(pointer, target) {
        if (target.constructor.name != "GridSpace") {
            return
        }

        // if the highlight origin isnt on the player, then the first square will be selected, not highlighted
        let highlightStart = this.highlightOrigin === this.player.square ? 0 : 1

        this.highlightPath = Path.findPath(this.highlightOrigin, target)
        for (let i = highlightStart; i < this.highlightPath.length; i++) {
            if (i > this.distanceLeft || this.highlightPath.path[i].isTinted) { break }
            this.highlightPath.path[i].setTint(0xFACADE)
        }
    }

    unhighlight(pointer, target) {
        if (target.constructor.name != "GridSpace") {
            return
        }

        if (this.highlightPath == undefined) {
            return
        }

        for (let i = 0; i < this.highlightPath.length; i++) {
            if (this.highlightPath.path[i].tintTopLeft == this.highlightTint) {
                this.highlightPath.path[i].clearTint()
            }
        }
        this.highlightPath = undefined
    }

    select(pointer, target) {
        if (target.constructor.name != "GridSpace") {
            return
        }

        if (this.highlightPath == undefined || this.highlightPath.length <= 1) {
            return
        }

        // scan through the highlighted path in reverse, choosing the selected path once we hit a highlighted square
        for (let i = this.highlightPath.length - 1; i > 0; i--) {
            let currentSquare = this.highlightPath.path[i]
            if (currentSquare.owner == undefined && currentSquare.tintTopLeft == this.highlightTint) {
                // choose [1] so that we do not have duplicate points
                this.selectedPath.append(Path.findPath(this.highlightPath.path[1], currentSquare))
                break
            }
        }


        this.highlightOrigin = this.selectedPath.destination
        // set tint for selected pieces
        for (let i = 0; i < this.selectedPath.length; i++) {
            this.selectedPath.path[i].setTint(this.selectedTint)
        }

        this.distanceLeft = settings.moveDistance - (this.selectedPath.length - 1)
    }

    clearSelection() {
        // clear tint for selected pieces
        for (let i = 0; i < this.selectedPath.length; i++) {
            this.selectedPath.path[i].clearTint()
        }

        this.selectedPath.clear()
        this.selectedPath.push(this.player.square)
        this.highlightOrigin = this.player.square
        this.distanceLeft = settings.moveDistance
    }
}