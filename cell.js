function Cell(i, j, w) {
    this.i = i
    this.j = j
    this.x = i * w
    this.y = j * w
    this.w = w
    this.totalBomb = 0
    if (random(1) < 0.2) {
        this.bomb = true
    } else {
        this.bomb = false
    }
    this.revealed = false
}

Cell.prototype.show = function () {
    stroke(0)
    noFill()
    rect(this.x, this.y, this.w, this.w)
    if (this.revealed) {
        if (this.bomb) {
            fill(127)
            ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.5)
        } else {
            fill(200)
            rect(this.x, this.y, this.w, this.w)
            if (this.totalBomb > 0) {
                textAlign(CENTER)
                fill(0)
                text(this.totalBomb, this.x + this.w / 2, this.y + this.w / 2)
            }
        }
    }
}

Cell.prototype.neighborBomb = function () {
    if (this.bomb) return -1

    let total = 0

    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff
            let j = this.j + yoff
            if (i > -1 && i < cols &
                j > -1 && j < rows) {
                let neighbor = grid[i][j]
                if (neighbor.bomb) total++
            }

        }
    }
    this.totalBomb = total

}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w &&
        y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function (x, y) {
    this.revealed = true
    if (this.totalBomb === 0 && !this.bomb) this.floodFill()
}

Cell.prototype.floodFill = function () {
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff
            let j = this.j + yoff
            if (i > -1 && i < cols && j > -1 && j < rows) {
                let neighbor = grid[i][j]
                if (!neighbor.bee && !neighbor.revealed) neighbor.reveal()

            }
        }
    }
}