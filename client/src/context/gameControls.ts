import { CardType } from "../types/types"
import { GameActionType } from "./gameReducer"
import { useGame } from "./gameContext"

const ToggleStart = () => {
    const { state, dispatch } = useGame()
    const toggle = !state.gameStart
    dispatch({
        type: GameActionType.TOGGLE_START,
        payload: {
            gameStart: toggle
        }
    })
}

const GameOver = () => {
    const { dispatch } = useGame()
    dispatch({
        type: GameActionType.GAME_OVER,
        payload: {
            gameOver: true,
            gameStart: false
        }
    })
}

const LoadDeck = (cards: CardType[]) => {
    const { dispatch } = useGame()
    const filledDeck = cards
    dispatch({
        type: GameActionType.LOAD_DECK,
        payload: {
            deck: filledDeck
        }
    })
}

const SetBoard = () => {
    const { state, dispatch } = useGame()
    const newDeck = state.deck
    const updatedBoard = newDeck.splice(0, 12)
    dispatch({
        type: GameActionType.SET_BOARD,
        payload: {
            deck: newDeck,
            boardCards: updatedBoard,
            selectedCards: [] // need to clear selected
        }
    })
}

const ToggleSelectCard = (card: CardType, action: string) => {
    const { state, dispatch } = useGame()
    const selectedCopy = state.selectedCards
    let newSelected: CardType[] = []
    if (action === 'ADD') {
        newSelected = [...selectedCopy, card]
    }
    if (action === 'REMOVE') {
        newSelected = selectedCopy.filter(p => card._id !== p._id)
    }
    dispatch({
        type: GameActionType.SELECT_CARD,
        payload: {
            selectedCards: newSelected
        }
    })
}

const UpdateBoard = () => {
    const { state, dispatch } = useGame()
    const newSelected = state.selectedCards
    let newMessage = state.message
    const ogScore = state.score // to calc diff
    let newScore = state.score
    let newMessageColor = state.messageColor
    const failed = []
    // check for failed set properties
    if (SetTest(newSelected, 'number')) {
        failed.push(SetTest(newSelected, 'number'))
    }
    if (SetTest(newSelected, 'color')) {
        failed.push(SetTest(newSelected, 'color'))
    }
    if (SetTest(newSelected, 'fill')) {
        failed.push(SetTest(newSelected, 'fill'))
    }
    if (SetTest(newSelected, 'shape')) {
        failed.push(SetTest(newSelected, 'shape'))
    }
    if (failed.length === 0) {
        newScore++
        newMessage += `Great job! That's a set!`
        newMessageColor = true
    } else {
        newMessage += `CONDITIONS FAILED: ${failed}`
        newMessageColor = false
    }
    dispatch({
        type: GameActionType.CHECK_FOR_SET,
        payload: {
            score: newScore,
            message: newMessage,
            messageColor: newMessageColor
        }
    })
    // 1.5 second delay
    setTimeout(() => {
        let newBoard = state.boardCards
        let newDeck = state.deck
        if (ogScore !== newScore) {
            const boardCopy = newBoard
            let deckCopy = newDeck
            // newboard = remaining + top3 cards of deck
            const top3Cards = deckCopy.slice(0, 3)
            const remaining = boardCopy.filter(card => !newSelected.includes(card))
            newBoard = [...remaining, ...top3Cards]
            // remaining deck starts on card 4
            newDeck = deckCopy.slice(3)
        }
        dispatch({
            type: GameActionType.UPDATE_BOARD,
            payload: {
                deck: newDeck,
                selectedCards: [],
                boardCards: newBoard,
                message: '',
                messageColor: false
            }
        })
    }, 1500)
}

// returns a string of the prop(s) that dont pass the set test, returns false if passed
const SetTest = (cards: CardType[], prop: string) => {
    if (prop === 'number') {
        const propArr = cards.map(card => card.number)
        const numSum = propArr.reduce((runningSum, el) => runningSum + el, 0)
        // validator --> sets only have a numSum of 3, 6 or 9
        if (!(numSum === 3 || numSum === 6 || numSum === 9)) {
            return ` ${prop}`
        }
    }
    if (prop === 'color') {
        const propArr = cards.map(card => card.color)
        const propMap = new Map()
        for (const prop of propArr) {
            if (propMap.has(prop)) {
                let curr = propMap.get(prop)
                propMap.set(prop, curr + 1)
            } else {
                propMap.set(prop, 1)
            }
        }
        // validator --> sets only have 1 or 3 of the same props (keys in dict != 2)
        if (propMap.keys.length === 2) {
            return ` ${prop}`
        }
    }
    if (prop === 'fill') {
        const propArr = cards.map(card => card.fill)
        const propMap = new Map()
        for (const prop of propArr) {
            if (propMap.has(prop)) {
                let curr = propMap.get(prop)
                propMap.set(prop, curr + 1)
            } else {
                propMap.set(prop, 1)
            }
        }
        // validator --> sets only have 1 or 3 of the same props (keys in dict != 2)
        if (propMap.keys.length === 2) {
            return ` ${prop}`
        }
    }
    if (prop === 'shape') {
        const propArr = cards.map(card => card.shape)
        const propMap = new Map()
        for (const prop of propArr) {
            if (propMap.has(prop)) {
                let curr = propMap.get(prop)
                propMap.set(prop, curr + 1)
            } else {
                propMap.set(prop, 1)
            }
        }
        // validator --> sets only have 1 or 3 of the same props (keys in dict != 2)
        if (propMap.keys.length === 2) {
            return ` ${prop}`
        }
    }
    return 'Passed!'
}

// shuffle algorithm
const Shuffle = (array: CardType[]) => {
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

export { 
    ToggleStart,
    GameOver, 
    LoadDeck,
    SetBoard,
    ToggleSelectCard, 
    UpdateBoard, 
    Shuffle
}