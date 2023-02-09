import React, { useState, useEffect, SyntheticEvent } from "react"
import styles from "../style/endgame.module.css"
import {useGame} from "../context/gameContext"
import axios from "axios"

interface ScoreFormProps {
    setHasNotSubmited: (hasNotSubmited: boolean) => void
}

const ScoreForm = ({ setHasNotSubmited }: ScoreFormProps) => {
    const { state } = useGame()
    const { score } = state

    const [initials, setInitials] = useState("")
    const [validateMsg, setValidateMsg] = useState("")
    const [disabled, setDisabled] = useState(true)

    const formSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        let body = {
            "initials": initials,
            "score": score
        }
        // axios post to add score to leaderboard
        axios.post("http://localhost:8000/api/leaderboard/new", body)
            .then(res => {
                setInitials('')
                setHasNotSubmited(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // refresh for validation
        initialsValidate()
    }, [initials])
    

    const initialsValidate = () => {
        if (initials.length === 2 || initials.length === 3) {
            setValidateMsg("")
            setDisabled(false)
        } else if (initials.length < 2 ) {
            setValidateMsg("Initials must be more than 1 characters.")
            setDisabled(true)
        } else if (initials.length > 3) {
            setValidateMsg("Initials must be less than 3 characters.")
            setDisabled(true)
        }
    }

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
            <form onSubmit={formSubmit}>
                <input onChange={(e) => setInitials(e.target.value)} value={initials} type="text" id="initials" placeholder="Initials"></input>
                <button type="submit" disabled={disabled}>Add</button>
            </form>
        </>
    )
}

export default ScoreForm