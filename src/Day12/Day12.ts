import * as fs from 'fs'

const lines = fs.readFileSync('Day12.txt', 'utf8').split('\n')
const linesArr = lines.map((x) => x.split(''))

// Solution
const start = [20, 0]
const end = [20, 148]

// Example
// const start = [0, 0]
// const end = [2, 5]

const numArr = linesArr.map((x) => x.map((y) => y.charCodeAt(0) - 97))

const transposed = numArr[0].map((_, colIndex) =>
  numArr.map((row) => row[colIndex]),
)

// Solution
numArr[20][0] = 0
numArr[20][148] = 25

// Example
// numArr[0][0] = 0
// numArr[2][5] = 25

const determineNeighbors = (i: number, j: number) => {
  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  return moves.map((n) => {
    const ii = i + n[0]
    const jj = j + n[1]

    if (
      !(
        0 <= ii &&
        ii < transposed[0].length &&
        0 <= jj &&
        jj < numArr[0].length
      )
    ) {
      //out of bounds
      return
    }
    // Part 1
    else if (numArr[ii][jj] <= numArr[i][j] + 1) {
      //else if (numArr[ii][jj] >= numArr[i][j] - 1) {
      return [ii, jj]
    }
  })
}

const visited = numArr.map((x) => x.map((y) => false))

// Keep track of steps and position

//Part 1
const heap = [[0, start[0], start[1]]]

// Part 2
//const heap = [[0, end[0], end[1]]]

// Djikstra's algorithm
// eslint-disable-next-line no-constant-condition
while (true) {
  const popped = heap.shift()

  const steps = popped![0]
  const i = popped![1]
  const j = popped![2]

  if (visited[i][j]) {
    continue
  }

  visited[i][j] = true

  // Part 1
  if (i === end[0] && j === end[1]) {
    console.log(steps)
    break
  }

  // Part 2
  // if (numArr[i][j] === 0) {
  //   console.log(steps)
  //   break
  // }

  const neighbors = determineNeighbors(i, j).filter((x) => x !== undefined)
  neighbors.map((x) => heap.push([steps + 1, x![0], x![1]]))
}
