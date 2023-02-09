import { useEffect } from "react"
import BoardMenu from "../components/BoardMenu"
import Board from "../components/Board"
import { useGame } from "../context/gameContext"
import  LoadDeck  from "../components/LoadDeck"
import "../style/var.css"

interface GameProps {
  setShowEndGame: (gameOver: boolean) => void
}

const Game = ({ setShowEndGame }: GameProps) => {
  const { state } = useGame()
  const { gameOver } = state


  useEffect(() => {
    // change to leaderboard form by passing gameOver Bool to Main.jsx to save to its state
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