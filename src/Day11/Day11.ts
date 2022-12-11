import * as fs from 'fs';

type Monkey = {
    id: number,
    items: number[],
    operation: string[]
    divisible: number
    onTrue: number
    onFalse: number
    inspects: number
}

const lines = fs.readFileSync('Day11.txt', "utf8").split("\n")

const NUM_MONKEYS = 8

const monkeyArr = []

/**   
* Create subarrays with all information about one monkey
* @example
*  [
*    'Monkey 7:',
*    '  Starting items: 54, 97, 87, 70, 59, 82, 59',
*    '  Operation: new = old + 8',
*    '  Test: divisible by 17',
*    '    If true: throw to monkey 1',
*    '    If false: throw to monkey 3'
*  ]
*/
for (let i = 0; i < NUM_MONKEYS; i++) {
    monkeyArr[i] = lines.slice(i*7,(i*7)+7)
}

const numberRegex = /[0-9]/g;

const parseMonkey = (arr: string[]): Monkey => ({
    id: parseInt(arr[0].match(numberRegex)![0]),
    items: arr[1].trim().slice(15).split(",").map((x) => parseInt(x)),
    operation: arr[2].trim().slice(21).split(" "),
    divisible: parseInt(arr[3].match(numberRegex)!.join("")),
    onTrue: parseInt(arr[4].match(numberRegex)![0]),
    onFalse: parseInt(arr[5].match(numberRegex)![0]),
    inspects: 0,
})

let monkeys = monkeyArr.map((x) => parseMonkey(x))

let round = 0

while (round !== 10000) {
    monkeys.map((monkey, monkeyId) => {monkey.items.map((item, itemId) => {
        const op2 = monkey.operation[1] === 'old' ? item : parseInt(monkey.operation[1])
        let newValue = (monkey.operation[0] === '*' ? item * op2 : item + op2)

        // a+b is divisible by 5 if (a % 5) + b is divisible by 5, same operation with *
        // for divisors 5,6,7 we can use mod 5*6*7
        newValue = newValue % monkeys.map((monkey) => monkey.divisible).reduce((curr, acc) => acc * curr, 1)

        // Part 1
        //newValue = Math.floor(newValue / 3)

        const condition = newValue % monkey.divisible === 0

        condition ? monkeys[monkey.onTrue].items.push(newValue) : monkeys[monkey.onFalse].items.push(newValue)
        monkeys[monkeyId].inspects += 1
    })
    monkeys[monkeyId].items = []
    }
    )
    
    round += 1
}

const sorted = monkeys.sort((a, b) => b.inspects - a.inspects)

//console.log(sorted)
console.log(sorted[0].inspects * sorted[1].inspects)