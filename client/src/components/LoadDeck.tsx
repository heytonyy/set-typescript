import { useEffect } from "react"
import axios from "axios"
import { CardType, GameActionType } from "../types/types"
import { useGame } from "../context/gameContext"

const Shuffle = (array: CardType[]) => {
    let currentIndex = array.length, randomIndex
    // while there remain elements to shuffle.
    while (currentIndex !== 0) {
        // pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        // swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}

const FetchDeck = () => {
    const { dispatch } = useGame()

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
        axios.get("http://localhost:8000/api/cards/")
        .then(res => {
            const deckData = Shuffle(res.data)
            LoadDeck(deckData)
        })
        .catch(err => console.log(err))
    })

    return (
        <></>
    )
}

export default FetchDeck