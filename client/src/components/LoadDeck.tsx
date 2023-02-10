import { useEffect } from "react"
import axios from "axios"
import { CardType, GameActionType } from "../types/types"
import { useGame } from "../context/gameContext"
import { Shuffle } from "../context/gameControls"


const FetchDeck = () => {
    const { state, dispatch } = useGame()
    const { deck, gameStart } = state

    const LoadDeck = (cards: CardType[]) => {
        const filledDeck = cards
        dispatch({
            type: GameActionType.LOAD_DECK,
            payload: {
                deck: filledDeck
            }
        })
    }

    useEffect(() => {
        if (deck.length === 0 && !gameStart) {
            const base_url = process.env.REACT_APP_BASE_URL
            axios.get(`/api/cards/`)
                .then(res => {
                    const deckData = Shuffle(res.data)
                    LoadDeck(deckData)
                })
                .catch(err => console.log(err))
        }
    })

    return (
        <></>
    )
}

export default FetchDeck