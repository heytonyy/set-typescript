import { useEffect } from "react"
import Card from "./Card"
import styles from "../style/game.module.css"
import { useGame } from "../context/gameContext"
import { GameActionType } from "../types/types"
import { SetTest } from "../context/gameControls"


const Board = () => {
    const { state, dispatch } = useGame()
    const { gameStart, boardCards, selectedCards, message, messageColor } = state

    useEffect(() => {
        if (selectedCards.length === 3) {
            const newSelected = [...state.selectedCards]
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
                newMessage += `CONDITION(S) FAILED: ${failed}`
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