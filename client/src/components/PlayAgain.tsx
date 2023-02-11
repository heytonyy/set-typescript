import styles from "../style/endgame.module.css"

const playAgain = () => {
    window.location.reload();
}

const PlayAgain = () => {
    return (
        <div className={styles.boardFoot}>
            <button onClick={playAgain} className={styles.playAgainBtn}>Play Again?</button>
        </div>
    )
}

export default PlayAgain

