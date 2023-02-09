import React, { useState, useEffect } from "react"
import Leaderboard from "../components/Leaderboard"
import PlayAgain from "../components/PlayAgain"
import ScoreCard from "../components/ScoreCard"

const EndGame = () => {
  const [winnerInput, setWinnerInput] = useState<boolean>(false)

  useEffect(() => {
    // re-render when winnerInput changes
  }, [winnerInput])

  return (
    <>
      <Leaderboard setWinnerInput={setWinnerInput} />
      <ScoreCard showForm={winnerInput} />
      <PlayAgain />
    </>
  )
}

export default EndGame