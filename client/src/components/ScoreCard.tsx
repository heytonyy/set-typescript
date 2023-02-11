import { useState, useEffect } from "react"
import { useGame } from "../context/gameContext"
import ScoreForm from "./ScoreForm"
import styles from "../style/endgame.module.css"

interface IScoreCard {
    showForm: boolean
}

const ScoreCard = ({ showForm }: IScoreCard) => {
    const [hasNotSubmited, setHasNotSubmited] = useState<boolean>(true)
    const { state } = useGame()
    const { score } = state

    useEffect(() => {
        // re-render when form submitted
    }, [hasNotSubmited])

    return (
        <div className={styles.boardBody}>
            <div className={styles.card}>
                <div className={styles.score}>
                    Sets: {score}
                </div>
                {
                    (showForm && hasNotSubmited) && <ScoreForm setHasNotSubmited={setHasNotSubmited} />
                }
            </div>
        </div>
    )
}

export default ScoreCard
