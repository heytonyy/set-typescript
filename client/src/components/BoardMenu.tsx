import styles from "../style/game.module.css"
import { useGame } from "../context/gameContext"
import { GameActionType } from "../types/types"
import { useCountdownTimer } from 'use-countdown-timer';
import { useEffect } from 'react';


const BoardMenu = () => {
  const { state, dispatch } = useGame()
  const { gameStart, deck, score } = state

  const { countdown, start } = useCountdownTimer({
    timer: 1000 * 60 * 10,
  });

  const ToggleStart = () => {
    const toggle = !state.gameStart
    dispatch({
      type: GameActionType.TOGGLE_START,
      payload: {
        gameStart: toggle
      }
    })
  }

  const SetBoard = () => {
    const newDeck = state.deck
    const updatedBoard = newDeck.splice(0, 12)
    dispatch({
      type: GameActionType.SET_BOARD,
      payload: {
        deck: newDeck,
        boardCards: updatedBoard,
        selectedCards: [] // need to clear selected
      }
    })
  }

  const GameOver = () => {
    dispatch({
      type: GameActionType.GAME_OVER,
      payload: {
        gameOver: true,
        gameStart: false
      }
    })
  }

  const startGame = () => {
    start()
    ToggleStart()
    SetBoard()
  }

  // end condition for running out of cards
  const drawFromDeck = () => {
    if (deck.length > 0) {
      SetBoard()
    } else {
      GameOver()
    }
  }

  useEffect(() => {
    if (countdown === 0) {
      GameOver()
    }
  }, [countdown]);

  return (
    <div className={styles.menu}>
      {/* GAME BUTTON -- conditionally rendered based off gameStart */}
      {
        gameStart ? <button onClick={drawFromDeck} className={styles.menuBtn}>New Board</button>
          : <button onClick={startGame} className={styles.menuBtn}>Start</button>
      }

      {/* DECK TOTAL */}
      <div className={styles.menuItem}>
        <strong>Deck</strong>
        <p>{deck ? deck.length : 81}/81</p>
      </div>

      {/* TIMER */}
      <div className={styles.menuItem}>
        <strong>Time</strong>
        {
          gameStart ?
            <div>
              {countdown/1000/60 < 10 ? `0${Math.floor(countdown/1000/60)}` : Math.floor(countdown/1000/60)}:
              {countdown/1000%60 < 10 ? `0${Math.floor(countdown/1000%60)}` : Math.floor(countdown/1000%60)}
            </div>
            : <p>10:00</p>
        }
      </div>

      {/* SCORE */}
      <div className={styles.menuItem}>
        <strong>Sets</strong>
        <p>{score}</p>
      </div>
    </div>
  )
}

export default BoardMenu