import { useCountdownTimer } from 'use-countdown-timer';
import { useCallback, useEffect } from 'react';
import { useGame } from "../context/gameContext"
import { GameActionType } from "../types/types"
import styles from "../style/game.module.css"

const BoardMenu = () => {
  const { state, dispatch } = useGame()
  const { gameStart, deck, score } = state

  const { countdown, start } = useCountdownTimer({
    timer: 1000 * 60 * 10,
  });

  const ToggleStart = useCallback(() => {
    const toggle = !state.gameStart
    dispatch({
      type: GameActionType.TOGGLE_START,
      payload: {
        gameStart: toggle
      }
    })
  }, [dispatch, state.gameStart])

  const SetBoard = useCallback(() => {
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
  }, [dispatch, state.deck])

  const GameOver = useCallback(() => {
    dispatch({
      type: GameActionType.GAME_OVER,
      payload: {
        gameOver: true,
        gameStart: false
      }
    })
  } , [dispatch])

  // turn on game
  const startGameHandler = () => {
    start()
    ToggleStart()
    SetBoard()
  }

  // end condition for running out of cards
  const drawFromDeckHandler = () => {
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
  }, [countdown, GameOver]);

  return (
    <div className={styles.menu}>
      {/* GAME BUTTON -- conditionally rendered based off gameStart */}
      {
        gameStart ? <button onClick={drawFromDeckHandler} className={styles.menuBtn}>New Board</button>
          : <button onClick={startGameHandler} className={styles.menuBtn}>Start</button>
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