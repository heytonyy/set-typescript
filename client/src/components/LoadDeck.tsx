import axios from "axios"
import { useEffect, useCallback } from "react"
import { CardType, GameActionType } from "../types/types"
import { useGame } from "../context/gameContext"
import { Shuffle } from "../context/gameControls"


const FetchDeck = () => {
    const { state, dispatch } = useGame()
    const { deck, gameStart } = state

    const LoadDeck = useCallback((cards: CardType[]) => {
        const filledDeck = cards
        dispatch({
            type: GameActionType.LOAD_DECK,
            payload: {
                deck: filledDeck
            }
        })
    }, [dispatch])

    const GetDeck = useCallback(() => {
        const BASE_URL = process.env.REACT_APP_BASE_URL
        axios.get(`${BASE_URL}/api/cards`)
            .then(res => {
                const shuffledDeck = Shuffle(res.data)
                LoadDeck(shuffledDeck)
            })
            .catch(err => console.log(err))
    }, [LoadDeck])

    useEffect(() => {
        if (deck.length === 0 && !gameStart) {
            GetDeck()
        }
    })

    return (
        <></>
    )
}

export default FetchDeck