import { CardType } from "../types/types"

type IColor = {
    red: number,
    green: number,
    purple: number
}

type IFill = {
    solid: number,
    striped: number,
    open: number
}

type IShape = {
    diamond: number,
    squiggle: number,
    oval: number
}

// returns a string of the prop(s) that dont pass the set test, returns false if passed
export const SetTest = (cards: CardType[], prop: string) => {
    if (prop === 'number') {
        const propArr = cards.map(card => card.number)
        const numSum = propArr.reduce((runningSum, el) => runningSum + el, 0)
        // validator --> sets only have a numSum of 3, 6 or 9
        if (!(numSum === 3 || numSum === 6 || numSum === 9)) {
            return ` ${prop}`
        }
    } else if (prop === 'color') {
        const propArr = cards.map(card => card.color)
        const probObj = {red: 0, green: 0, purple: 0} as IColor
        for (const prop of propArr) {
            if (prop === 'red') {
                probObj.red++
            } else if (prop === 'green') {
                probObj.green++
            } else if (prop === 'purple') {
                probObj.purple++
            }
        }
        let color: keyof IColor;
        for (color in probObj) {
            // validator --> sets only have 1 color or 3 colors
            if (probObj[color] === 2) {
                return ` ${prop}`
            }
        }
    } else if (prop === 'fill') {
        const propArr = cards.map(card => card.fill)
        const probObj = {solid: 0, striped: 0, open: 0} as IFill
        for (const prop of propArr) {
            if (prop === 'solid') {
                probObj.solid++
            } else if (prop === 'striped') {
                probObj.striped++
            } else if (prop === 'open') {
                probObj.open++
            }
        }
        let fill: keyof IFill;
        for (fill in probObj) {
            // validator --> sets only have 1 fill or 3 fills
            if (probObj[fill] === 2) {
                return ` ${prop}`
            }
        }
    } else if (prop === 'shape') {
        const propArr = cards.map(card => card.shape)
        const probObj = {diamond: 0, squiggle: 0, oval: 0} as IShape
        for (const prop of propArr) {
            if (prop === 'diamond') {
                probObj.diamond++
            } else if (prop === 'squiggle') {
                probObj.squiggle++
            } else if (prop === 'oval') {
                probObj.oval++
            }
        }
        let shape: keyof IShape;
        for (shape in probObj) {
            // validator --> sets only have 1 shape or 3 shapes
            if (probObj[shape] === 2) {
                return ` ${prop}`
            }
        }
    } else {
        // passed all tests
        return false
    }
}

// shuffle algorithm
export const Shuffle = (array: CardType[]) => {
    let currentIndex = array.length, randomIndex
    // while there remain elements to shuffle.
    while (currentIndex !== 0) {
        // pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        // swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}