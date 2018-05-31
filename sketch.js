var grid
const width = 401
const height = 401
const w = 80
const cols = Math.floor(width / w)
const rows = Math.floor(height / w)


function make2DArray(cols, rows) {
    var arr = new Array(cols)
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}

function setup() {
    createCanvas(width, height)
    grid = make2DArray(cols, rows)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w)
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].neighborBomb()
        }
    }
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal()
                if (grid[i][j].bomb) gameOver()
            }
        }
    }
}

function draw() {
    background(255)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show()
        }
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = true
        }
    }
}