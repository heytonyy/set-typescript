import { useEffect } from "react"
import axios from "axios"
import { Shuffle, LoadDeck } from "../context/gameControls"

const FetchDeck = () => {
    axios.get("http://localhost:8000/api/cards/")
        .then(res => {
            const deckData = Shuffle(res.data)
            LoadDeck(deckData)
        })
        .catch(err => console.log(err))
}

export default FetchDeck