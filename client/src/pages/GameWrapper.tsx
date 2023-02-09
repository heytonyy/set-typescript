import React from 'react'
import styles from '../style/game.module.css'

interface GameWrapperProps {
    children: React.ReactNode
}

const GameWrapper = ({ children }: GameWrapperProps) => {

    return (
        <div className={styles.gameWrapper}>
            {children}
        </div>
    )
}

export default GameWrapper