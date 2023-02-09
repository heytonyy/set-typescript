import { useCallback } from "react"
import Card from "./Card"
import styles from "../style/game.module.css"
import { useGame } from "../context/gameContext"
import { CardType, GameActionType } from "../types/types"

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

const Board = () => {
    const { state, dispatch } = useGame()
    const { gameStart, boardCards, selectedCards, message, messageColor } = state

    const UpdateBoard = useCallback(() => {
        if (selectedCards.length === 3) {
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
    }, [selectedCards])

    // every time selectedCards changes, check for set if selectedCards is three
    // const checkForSet = useCallback(() => {
    //     if (selectedCards.length === 3) {
    //         UpdateBoard()
    //     }
    // }, [selectedCards])

    // useEffect(() => {
    //     if (selectedCards.length === 3) {
    //         UpdateBoard()
    //     }
    // }, [selectedCards])

    return (
        <>
            <div className={`${messageColor ? styles.success : styles.danger} ${styles.message}`}>
                {message}
            </div>
            <div className={styles.board}>
                <br />
                {
                    gameStart && boardCards.map((card, i) => <Card key={i} card={card} />)
                }
            </div>
        </>
    )
}

export default Board