import { useState } from "react"
import styles from "../style/game.module.css"
import "../style/var.css"

interface IHeader {
    setTheme: (theme: string) => void
}

const Header = ({ setTheme }: IHeader) => {
    const [btnText, setBtnText] = useState('🌚')

    const toggleThemeHandler = () => {
        if (btnText === '🌚') {
            setBtnText('🌝')
            setTheme('dark')
        } else {
            setBtnText('🌚')
            setTheme('light')
        }
    }

    const backToHome = () => {
        window.location.href = '/'
    }

    return (
        <div className={styles.header}>
            <p className={styles.headerTitle} onClick={backToHome}>SET</p>
            <button onClick={toggleThemeHandler} className={styles.themeBtn}>{btnText}</button>
        </div>
    )
}

export default Header