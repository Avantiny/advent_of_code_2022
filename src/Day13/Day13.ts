import * as fs from 'fs'

const lines = fs.readFileSync('Day13.txt', 'utf8').split('\n')

//uncomment for part 1
lines.push('')
lines.push('[[2]]')
lines.push('[[6]]')

const results = [] as [number, boolean, any, any][]

const compare = (a: any, b: any): number => {
  if (!Array.isArray(a) && !Array.isArray(b)) return a - b
  else {
    if (!Array.isArray(a)) a = [a]
    if (!Array.isArray(b)) b = [b]

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const res = compare(a[i], b[i])
      if (res !== 0) return res
    }

    return a.length - b.length
  }
}

let counter = 1

for (let i = 0; i < lines.length; i = i + 3) {
  const fst = JSON.parse(lines[i])
  const snd = JSON.parse(lines[i + 1])

  results.push([counter, compare(fst, snd) < 0, fst, snd])
  counter += 1
}

//5400 too high
//5260 too low

//part 1
console.log(
  results
    .filter((x) => x[1] === true)
    .reduce((prev, curr) => prev + curr[0], 0),
)

const linesF = lines.filter((x) => x !== '')
const sorted = linesF.sort((a, b) => compare(JSON.parse(a), JSON.parse(b)))

//part 2 - comment for part 1
console.log((sorted.indexOf('[[2]]') + 1) * (sorted.indexOf('[[6]]') + 1))
