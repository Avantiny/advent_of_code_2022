import * as fs from 'fs'

const line = 2_000_000
const part2max = 4_000_000

const paths = fs
  .readFileSync('Day15.txt', 'utf8')
  .split('\n')
  .map((x) => x.split(':'))

const sensors = paths
  .flatMap((x) => [x[0]])
  .map((x) => x.split(',').map((y) => parseInt(y))) as [number, number][]

const beacons = paths
  .flatMap((x) => [x[1]])
  .map((x) => x.split(',').map((y) => parseInt(y))) as [number, number][]

const getDistance = (a: [number, number], b: [number, number]) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

const notBeacons = new Set()
const possibleBeacons = new Set()

//Part 1
const getBeacons = () => {
  for (let i = 0; i < sensors.length; i++) {
    if (beacons[i][1] === line) {
      possibleBeacons.add(beacons[i][1])
    }

    const lineDistance = Math.abs(sensors[i][1] - line)
    const sensorArea = getDistance(sensors[i], beacons[i])

    if (lineDistance <= sensorArea) {
      const sensorDistance = sensorArea - lineDistance
      for (
        let j = sensors[i][0] - sensorDistance;
        j <= sensors[i][0] + sensorDistance;
        j++
      ) {
        notBeacons.add(j)
      }
    }
  }
  return notBeacons.size - possibleBeacons.size
}

// Part 2
const getDistressSignal = () => {
  for (let i = 0; i < part2max; i++) {
    const ranges = [] as [number, number][]

    for (let j = 0; j < sensors.length; j++) {
      const lineDistance = Math.abs(sensors[j][1] - i)
      const sensorArea = getDistance(sensors[j], beacons[j])

      if (lineDistance <= sensorArea) {
        const sensorDistance = sensorArea - lineDistance

        ranges.push([
          sensors[j][0] - sensorDistance,
          sensors[j][0] + sensorDistance,
        ])
      }
    }

    ranges.sort((a, b) => a[0] - b[0])
    const res = []

    for (let j = 1; j < ranges.length; j++) {
      if (ranges[j - 1][1] >= ranges[j][0]) {
        ranges[j - 1][1] = Math.max(ranges[j - 1][1], ranges[j][1])
        ranges.splice(j, 1)
        j--
      }
    }

    for (const range of ranges) {
      if (range[0] > part2max || 0 > range[1]) {
        continue
      }
      res.push([Math.max(range[0], 0), Math.min(range[1], part2max)])
    }

    if (res.length > 1) {
      console.log(res)
      return (res[0][1] + 1) * part2max + i
    }
  }
}

//8025866000000 too low
//16000007019123 too high

console.log(getDistressSignal())
