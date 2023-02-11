import { useEffect } from "react"
import { useGame } from "../context/gameContext"
import  LoadDeck  from "../components/LoadDeck"
import BoardMenu from "../components/BoardMenu"
import Board from "../components/Board"
import "../style/var.css"

interface IGame {
  setShowEndGame: (gameOver: boolean) => void
}

const Game = ({ setShowEndGame }: IGame) => {
  const { state } = useGame()
  const { gameOver } = state

  useEffect(() => {
    // change to leaderboard form by passing gameOver Bool to Home.jsx to save to its state
    setShowEndGame(gameOver)
  }, [gameOver, setShowEndGame])

  return (
    <>
      <LoadDeck />
      <BoardMenu />
      <Board />
    </>
  )
}

export default Game