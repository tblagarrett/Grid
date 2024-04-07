// NOTE: Coordinates start at 0, 0

class Grid extends Phaser.GameObjects.Group {
    constructor(scene, children, config) {
        super(scene, children)

        scene.add.existing(this)

        // set config with default values
        let defaults = {
            x: 0,
            y: w,
            xCount: 10,
            yCount: 10,
            squareXSize: 16 * 4,
            squareYSize: 16 * 4,
            squareImage: 'gridSpace',
        }
        this.config = {...defaults, ...config}
        this.x = config.x
        this.y = config.y

        // This matrix will hold all of the children, for reference
        this.matrix = []

        // From bottom left, adding 1 row of squares at a time
        for (let i = 0; i < config.yCount; i++) {
            let row = []
            for (let j = 0; j < config.xCount; j++) {
                let square = new GridSpace(scene, 
                    this.x + (config.squareXSize * (j % config.xCount)), 
                    this.y - (config.squareYSize * (i % config.yCount)),
                    config.squareImage,
                    0,
                    j,  // x - coord
                    i   // y - coord
                )

                row.push(square)        // add square to the row
                this.add(square, true)  // add all of the spaces to this container
            }
            this.matrix.push(row)   // add row to the matrix
        }

        console.log(this.matrix)
    }

    update() {
    }
}