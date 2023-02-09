import React from 'react'
import styles from '../style/game.module.css'

interface RulesWrapperProps {
    children: React.ReactNode
}

const RulesWrapper = ({ children }: RulesWrapperProps) => {

    return (
        <div className={styles.rulesWrapper}>
            {children}
        </div>
    )
}

export default RulesWrapper