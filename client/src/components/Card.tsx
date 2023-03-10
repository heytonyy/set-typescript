import { useState, useEffect, useCallback } from "react"
import { useGame } from "../context/gameContext"
import { CardType, GameActionType } from "../types/types"
import ShapeSVG from "./ShapeSVG"
import styles from "../style/game.module.css"
import "animate.css"

interface ICard {
    card: CardType
}

const Card = ({ card }: ICard) => {
    const { state, dispatch } = useGame()
    const { selectedCards, deck } = state

    const [isActive, setActive] = useState(false)
    const [isBlinking, setBlinking] = useState(false)
    const [deckCheck, setDeckCheck] = useState(deck.length) // used to clear isActive when board is reset

    const ToggleSelectCard = useCallback((card: CardType, action: string) => {
        const selectedCopy = state.selectedCards
        let newSelected: CardType[] = []
        if (action === 'ADD') {
            newSelected = [...selectedCopy, card]
        }
        if (action === 'REMOVE') {
            newSelected = selectedCopy.filter(p => card._id !== p._id)
        }
        dispatch({
            type: GameActionType.SELECT_CARD,
            payload: {
                selectedCards: newSelected
            }
        })
    }, [state.selectedCards, dispatch])

    const onCardClick = useCallback((card: CardType, e: React.MouseEvent) => {
        if (selectedCards.length < 3) {
            if ((e.target as Element).classList[1].includes("selected")) {
                ToggleSelectCard(card, "REMOVE")
            } else {
                ToggleSelectCard(card, "ADD")
            }
            setActive(!isActive)
        }
    }, [selectedCards, isActive, ToggleSelectCard])

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