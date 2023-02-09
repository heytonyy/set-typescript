import { useEffect } from "react"
import Card from "./Card"
import styles from "../style/game.module.css"
import { useGame } from "../context/gameContext"
import { UpdateBoard } from "../context/gameControls"

const Board = () => {
    const { state } = useGame()
    const { gameStart, boardCards, selectedCards, message, messageColor } = state

    // every time selectedCards changes, check for set if selectedCards is three
    useEffect(() => {
        if (selectedCards.length === 3) {
            UpdateBoard()
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