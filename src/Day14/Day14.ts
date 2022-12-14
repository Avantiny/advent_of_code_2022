/* eslint-disable no-loop-func */
import * as fs from 'fs'

const paths = fs
  .readFileSync('Day14.txt', 'utf8')
  .split('\n')
  .map((x) => x.split(' -> ').map((y) => y.split(',').map((z) => parseInt(z))))

const pathArr = [[]] as number[][]

const arrayUnique = (arr: Array<any>): number[][] => {
  const uniques = []
  const itemsFound = {} as Record<string, unknown>
  for (let i = 0, l = arr.length; i < l; i++) {
    const stringified = JSON.stringify(arr[i])
    if (itemsFound[stringified]) {
      continue
    }
    uniques.push(arr[i])
    itemsFound[stringified] = true
  }
  return uniques
}

paths.map((path) => {
  for (let i = 1; i < path.length; i++) {
    const isHor = path[i][0] - path[i - 1][0] !== 0
    const dist = isHor
      ? path[i][0] - path[i - 1][0]
      : path[i][1] - path[i - 1][1]

    for (let j = 0; j < Math.abs(dist) + 1; j++) {
      let toPush
      if (dist < 0) {
        toPush = isHor
          ? [path[i - 1][0] - j, path[i - 1][1]]
          : [path[i - 1][0], path[i - 1][1] - j]
      } else {
        toPush = isHor
          ? [path[i - 1][0] + j, path[i - 1][1]]
          : [path[i - 1][0], path[i - 1][1] + j]
      }
      pathArr.push(toPush)
    }
  }
})

const bounds = arrayUnique(pathArr).filter((x) => x.length > 0)

const lowest = [...bounds].reduce(
  (highest, point) => Math.max(point[1], highest),
  -Infinity,
)

const full = bounds

//const end = false
let sandCounter = 0

let counter = [500, 0]

const pit = lowest + 2

// Part 1
// while (!end) {
//   console.log(counter)

//   if (counter[1] > lowest) {
//     console.log('done!')
//     console.log(sandCounter)
//     end = true
//     break
//   }

//   if (isArrayInArray(full, [counter[0], counter[1] + 1])) {
//     if (!isArrayInArray(full, [counter[0] - 1, counter[1] + 1])) {
//       counter = [counter[0] - 1, counter[1] + 1]
//       continue
//     } else if (!isArrayInArray(full, [counter[0] + 1, counter[1] + 1])) {
//       counter = [counter[0] + 1, counter[1] + 1]
//       continue
//     } else {
//       sandCounter += 1
//       full.push([counter[0], counter[1]])
//       counter = [500, 0]
//       continue
//     }
//   } else {
//     counter = [counter[0], counter[1] + 1]
//     continue
//   }
// }

// const jumpToCollision = (arr: number[][], point: [number, number]): number => {
//   const collX = arr.filter((x) => point[0] === x[0])
//   const collSorted = collX.sort((a, b) => a[1] - b[1])
//   const coll = collSorted[0][1]
//   console.log(coll)
//   // if (collX.length === 0) {
//   //   return pit - 1
//   // }
//   return coll - 1
// }

//console.time('while')
// eslint-disable-next-line no-constant-condition
while (true) {
  if (full[full.length - 1][0] === 500 && full[full.length - 1][1] === 0) {
    console.log('DONE!')
    break
  }

  if (counter[1] + 1 === pit) {
    sandCounter += 1
    full.push([counter[0], counter[1]])
    counter = [500, 0]
    continue
  }

  if (full.some((x) => counter[0] === x[0] && counter[1] + 1 === x[1])) {
    if (!full.some((x) => x[0] === counter[0] - 1 && x[1] === counter[1] + 1)) {
      counter = [counter[0] - 1, counter[1] + 1]
      continue
    } else if (
      !full.some((x) => x[0] === counter[0] + 1 && x[1] === counter[1] + 1)
    ) {
      counter = [counter[0] + 1, counter[1] + 1]
      continue
    } else {
      sandCounter += 1
      full.push([counter[0], counter[1]])
      counter = [500, 0]
      continue
    }
  } else {
    counter = [counter[0], counter[1] + 1]
    continue
  }
}

//console.timeEnd('while')

console.log(sandCounter)
