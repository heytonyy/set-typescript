import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import styles from "../style/endgame.module.css"
import { useGame } from "../context/gameContext"
import { LeaderboardType } from "../types/types"

interface ILeaderboard {
    setWinnerInput: (bool: boolean) => void
}

const Leaderboard = ({ setWinnerInput }: ILeaderboard) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([])
    const { state } = useGame()

    const getLeaderboard = useCallback(() => {
        const BASE_URL = process.env.REACT_APP_BASE_URL
        axios.get(`${BASE_URL}/api/leaderboard/`)
            .then(res => {
                setLeaderboard(res.data)
                if (state.score > leaderboard[leaderboard.length - 1].score) {
                    setWinnerInput(true)
                } else {
                    setWinnerInput(false)
                }
            })
            .catch(err => console.log(err))
    }, [leaderboard, state.score, setWinnerInput])

    useEffect(() => {
        getLeaderboard()
    }, [getLeaderboard])

    return (
        <div className={styles.boardHead}>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Initials</th>
                        <th>Sets</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderboard && leaderboard.map((winner, index) => {
                            const { createdAt, initials, score } = winner
                            const date = new Date(createdAt)
                            const smolDate = date.toLocaleDateString()
                            return (
                                <tr key={index}>
                                    <td>{initials.toUpperCase()}</td>
                                    <td>{score}</td>
                                    <td>{smolDate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard