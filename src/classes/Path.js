class Path {
    constructor(matrix, from = undefined, to = undefined) {
        // private fields
        this.matrix = matrix
        // this.path will contain each square on the way to the destination, including origin
        this.path = []

        // public fields
        this.origin = from
        this.destination = to
        this.length = this.path.length
    }

    *[Symbol.iterator]() {
        yield* this.path;
    }

    set(index, value) {
        this.path
    }

    // returns a Path from one Space to Another, or undefined if there is an issue
    static findPath(from, to) {
        if (from.grid !== to.grid) {
            console.log(`Path: findPath, objects are not on same grid`)
            return undefined
        }

        // Our final Path that will be returned
        let path = new Path(from.grid.matrix)
        path.origin = from
        path.destination = to
        path.push(from)

        // set up variables to be used later
        let matrix = from.grid.matrix
        let toCoords = [to.yCoord, to.xCoord]
        let current = from
        let currentCoords = [current.yCoord, current.xCoord]

        // Determine which direction to go first for the path
        let first = 1
        let second = 0

        // Find all the squares necessary to get aligned on the first axis
        while (currentCoords[first] != toCoords[first]) {
            let nextCoords = [undefined, undefined]
            // move one step in the right direction
            nextCoords[first] = currentCoords[first] + (currentCoords[first] > toCoords[first] ? -1 : 1)
            nextCoords[second] = currentCoords[second]      // other axis stays the same

            // add the new square to the path
            current = matrix[nextCoords[0]][nextCoords[1]]
            currentCoords = [current.yCoord, current.xCoord]
            path.push(current)
        }

        // Find all the squares necessary to get aligned on the second axis
        while (currentCoords[second] != toCoords[second]) {
            let nextCoords = [undefined, undefined]
            // move one step in the right direction
            nextCoords[second] = currentCoords[second] + (currentCoords[second] > toCoords[second] ? -1 : 1)
            nextCoords[first] = currentCoords[first]      // other axis stays the same

            current = matrix[nextCoords[0]][nextCoords[1]]
            currentCoords = [current.yCoord, current.xCoord]
            path.push(current)
        }

        return path
    }

    static collideOnStep(p1, p2, step) {

    }

    push(square) {
        if (this.length == 0) {
            this.origin = square
        }

        this.path.push(square)
        this.destination = square
        this.length = this.path.length
    }

    pop() {
        let square = this.path.pop()
        this.length = this.path.length
        
        if (this.length == 0) {
            this.destination = undefined
        } else {
            this.destination = this.path[this.length-1]
        }
        

        return square
    }

    append(otherPath) {
        for (let i = 0; i < otherPath.length; i++) {
            this.push(otherPath.path[i])
        }
    }

    clear() {
        this.path = []
        this.origin = undefined
        this.destination = undefined
        this.length = this.path.length
    }

    print() {
        let output = ""
        for (let i = 0; i < this.length; i++) {
            if (i != 0) {
                output += " -> "
            }
            output += `[${this.path[i].xCoord}, ${this.path[i].yCoord}]`
        }

        console.log(output)
    }
}