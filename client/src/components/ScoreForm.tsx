import axios from "axios"
import { useState, useEffect, SyntheticEvent, useCallback } from "react"
import { useGame } from "../context/gameContext"
import styles from "../style/endgame.module.css"

interface IScoreForm {
    setHasNotSubmited: (hasNotSubmited: boolean) => void
}

const ScoreForm = ({ setHasNotSubmited }: IScoreForm) => {
    const [initials, setInitials] = useState<string>("")
    const [validateMsg, setValidateMsg] = useState<string>("")
    const [disabled, setDisabled] = useState<boolean>(true)

    const { state } = useGame()
    const { score } = state

    const formSubmitHandler = useCallback((e: SyntheticEvent) => {
        e.preventDefault()
        let body = {
            "initials": initials,
            "score": score
        }
        // axios post to add score to leaderboard
        const BASE_URL = process.env.REACT_APP_BASE_URL
        axios.post(`${BASE_URL}/api/leaderboard/new`, body)
            .then(res => {
                setInitials('')
                setHasNotSubmited(false)
            })
            .catch(err => console.log(err))
    }, [initials, score, setHasNotSubmited])

    const initialsValidate = useCallback(() => {
        if (initials.length === 2 || initials.length === 3) {
            setValidateMsg("")
            setDisabled(false)
        } else if (initials.length < 2) {
            setValidateMsg("Initials must be more than 1 characters.")
            setDisabled(true)
        } else if (initials.length > 3) {
            setValidateMsg("Initials must be less than 3 characters.")
            setDisabled(true)
        }
    }, [initials])

    useEffect(() => {
        // refresh for validation
        initialsValidate()
    }, [initials, initialsValidate])

    return (
        <>
            <div className={styles.cardTitle}>
                You made it to the leaderbord!
            </div>
            <div className={styles.validateMsg}>
                {
                    validateMsg
                }
            </div>
            <form onSubmit={formSubmitHandler}>
                <input onChange={(e) => setInitials(e.target.value)} value={initials} type="text" id="initials" placeholder="Initials"></input>
                <button type="submit" disabled={disabled}>Add</button>
            </form>
        </>
    )
}

export default ScoreForm