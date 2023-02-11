import { useState, useEffect } from "react"
import { GameProvider } from "../context/gameContext"
import Header from "../components/Header"
import Game from "./Game"
import EndGame from "./EndGame"
import Footer from "../components/Footer"
import Rules from "../components/Rules"
import styles from '../style/game.module.css'

interface IWrapper {
  children: React.ReactNode
}

const GameWrapper = ({ children }: IWrapper) => {
  return (
      <div className={styles.gameWrapper}>
          {children}
      </div>
  )
}

const RulesWrapper = ({ children }: IWrapper) => {
  return (
      <div className={styles.rulesWrapper}>
          {children}
      </div>
  )
}

const Home = () => {
  // state to know when to switch to EndGame view
  const [showEndGame, setShowEndGame] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
      document.body.className = theme;
  }, [theme])

  return (
    <GameProvider>
      <GameWrapper>
        <Header setTheme={setTheme}/>
        {
          !showEndGame ? <Game setShowEndGame={setShowEndGame} /> : <EndGame />
        }
        <Footer />
      </GameWrapper>
      <RulesWrapper>
        {
          !showEndGame && <Rules />
        }
      </RulesWrapper>
    </GameProvider >
  )
}

export default Home