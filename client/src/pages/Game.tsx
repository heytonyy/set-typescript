import { useState, useEffect } from "react"
import BoardMenu from "../components/BoardMenu"
import Board from "../components/Board"
import { useGame } from "../context/gameContext"
import { Shuffle, LoadDeck } from "../context/gameControls"
import axios from "axios"
import "../style/var.css"

interface GameProps {
  setShowEndGame: (gameOver: boolean) => void
}

const Game = ({ setShowEndGame }: GameProps) => {
  const [deck, setDeck] = useState<boolean>(false)
  const { state } = useGame()
  const { gameOver } = state


  useEffect(() => {
    // load deck
    if (!deck) {
      axios.get("http://localhost:8000/api/cards/")
      .then(res => {
        const deckData = Shuffle(res.data)
        LoadDeck(deckData)
        setDeck(true)
      })
      .catch(err => console.log(err))
    }
    // change to leaderboard form by passing gameOver Bool to Main.jsx to save to its state
    setShowEndGame(gameOver)
  }, [gameOver, setShowEndGame, deck])

  return (
    <>
      <BoardMenu />
      <Board />
    </>
  )
}

export default Game