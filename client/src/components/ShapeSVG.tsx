import { useCallback } from "react"
import { CardType } from "../types/types"

interface IShapeSVG {
    card: CardType
}

interface IMap {
    [key: string]: string
}

// Color hexcode references
const colorBook: IMap = {
    red: "#e74c3c",
    green: "#27ae60",
    purple: "#8e44ad"
}

// Paths to draw the 3 different shapes
const pathBook: IMap = {
    diamond: "M25 0 L50 50 L25 100 L0 50 Z",
    squiggle: "M38.4,63.4c0,16.1,11,19.9,10.6,28.3c-0.5,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z",
    oval: "M25,99.5C14.2,99.5,5.5,90.8,5.5,80V20C5.5,9.2,14.2,0.5,25,0.5S44.5,9.2,44.5,20v60 C44.5,90.8,35.8,99.5,25,99.5z"
}


const ShapeSVG = ({ card }: IShapeSVG) => {
    const { shape, color } = card

    // conditional striped fill pattern
    const fillPattern = useCallback((card: CardType) => {
        const color = card.color
        if (card.fill === "striped") {
            return (
                <defs>
                    <pattern
                        id={"striped-" + color}
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(90)" >
                        <line
                            x1="0"
                            y="0"
                            x2="0"
                            y2="4"
                            stroke={colorBook[color]}
                            strokeWidth="2" />
                    </pattern>
                </defs>
            )
        }
    }, [])

    // decides the fill parameter of the SVG based off the card's fill property
    const fillType = useCallback((card: CardType) => {
        if (card.fill === "striped") {
            return `url(#striped-${card.color})`
        } else if (card.fill === "open") {
            return "none"
        } else if (card.fill === "solid") {
            return colorBook[card.color]
        }
    }, [])

    return (
        <svg viewBox="-2 -2 54 104">
            {
                fillPattern(card)
            }
            <path d={pathBook[shape]} stroke={colorBook[color]} fill={fillType(card)} ></path>
        </svg>
    )
}

export default ShapeSVG