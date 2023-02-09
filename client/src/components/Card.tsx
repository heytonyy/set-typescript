import { useState, useEffect } from "react"
import styles from "../style/game.module.css"
import ShapeSVG from "./ShapeSVG"
import { useGame } from "../context/gameContext"
import { ToggleSelectCard } from "../context/gameControls"
import { CardType } from "../types/types"

import "animate.css"

interface CardProps {
    card: CardType
}

const Card = ({ card }: CardProps) => {
    const { state } = useGame()
    const { selectedCards, deck } = state

    const [isActive, setActive] = useState(false)
    const [isBlinking, setBlinking] = useState(false)
    const [deckCheck, setDeckCheck] = useState(deck.length) // used to clear isActive when board is reset

    useEffect(() => {
        // 1.5 sec delay to match up with updateBoard --> clears isActive
        if (selectedCards.length === 3) {
            setBlinking(isActive) // turn on blinking
            setTimeout(() => {
                if (isActive) {
                    setActive(false)
                    setBlinking(false) // turn off blinking
                }
            }, 1500)
        }
        // true if board was reset --> clears isActive
        if (deckCheck > deck.length) {
            if (isActive) {
                setActive(false)
            }
            setDeckCheck(deck.length)
        }
    }, [selectedCards, deck, deckCheck, isActive])

    const onCardClick = (card: CardType, e: React.MouseEvent) => {
        if (selectedCards.length < 3) {
            if ((e.target as Element).classList[1].includes("selected")) {
                ToggleSelectCard(card, "REMOVE")
            } else {
                ToggleSelectCard(card, "ADD")
            }
            setActive(!isActive)
        }
    }

    return (
        <div className={styles.card}>
            {/* div overlay with z-index=1, since below is a composite element */}
            <div onClick={(e) => onCardClick(card, e)}
                className={`${styles.clickOverlay} ${isActive ? styles.selected : null} ${isBlinking ? 'animate__animated animate__flash' : null}`}>
            </div>
            {/* content consists of SVG of shapes (which is composed of a viewbox, path, and fill pattern) */}
            <div className={styles.cardContent}>
                {
                    // repeats for the number of shapes... cool trick, thanks stacks over flow!
                    [...Array(card.number)].map((_, i) => <ShapeSVG card={card} key={i} />)
                }
            </div>
        </div>
    )
}

export default Card