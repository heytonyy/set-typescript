import { useState } from "react"
import styles from "../style/game.module.css"
import { CardType } from "../types/types"
import ShapeSVG from "./ShapeSVG"

// example endpoint response from API
const examples = [
    {
        "_id": "63667a744c499a4bf83afeb6",
        "number": 1,
        "shape": "diamond",
        "color": "red",
        "fill": "striped",
        "createdAt": "2022-11-05T15:00:04.018Z",
        "updatedAt": "2022-11-05T15:00:04.018Z",
        "__v": 0
    },
    {
        "_id": "63667a984c499a4bf83afebb",
        "number": 1,
        "shape": "squiggle",
        "color": "red",
        "fill": "solid",
        "createdAt": "2022-11-05T15:00:40.615Z",
        "updatedAt": "2022-11-05T15:00:40.615Z",
        "__v": 0
    },
    {
        "_id": "63667ac84c499a4bf83afec5",
        "number": 1,
        "shape": "oval",
        "color": "red",
        "fill": "open",
        "createdAt": "2022-11-05T15:01:28.016Z",
        "updatedAt": "2022-11-05T15:01:28.016Z",
        "__v": 0
    }
]

interface RulesExampleProps {
    card: CardType
}

const RulesExample = ({ card }: RulesExampleProps) => {
    return (
        <div className={styles.card}>
            {/* div overlay with z-index=1, since below is a composite element */}
            <div className={styles.clickOverlay} >&nbsp;</div>
            {/* content consists of SVG of shapes (which is composed of a viewbox, path, and fill pattern) */}
            <div className={styles.cardContent}>
                {
                    // repeats # of shapes, thanks stacks over flow!
                    [...Array(card.number)].map( (e, i) => <ShapeSVG card={card} key={i}/>)
                }
            </div>
        </div>
    )
}

const ShowRules = () => {

}

const HideRules = () => {
    
}

const Rules = () => {
    const [showRules, setShowRules] = useState(false)

    return (
        <div className={styles.rules}>
            <h2> <strong>Rules</strong>:</h2>
            <p>The objective of the game is to find a <strong>set</strong> of cards.</p>
            <p>A <strong>set</strong> consists of three cards satisfying all of these conditions:</p>
            <ul>
                <li>They all have the <strong>same</strong> number of shapes or have <strong>three different</strong> number of shapes.</li>
                <li>They all have the <strong>same</strong> shape or have <strong>three different</strong> shapes.</li>
                <li>They all have the <strong>same</strong> fill or have <strong>three different</strong> fills.</li>
                <li>They all have the <strong>same</strong> color or have <strong>three different</strong> colors.</li>
            </ul>
            <p>The following is an example of a set:</p>

            <div className={styles.exampleBoard}>
                {
                    examples.map((p, i) => <RulesExample key={i} card={p} />)
                }
            </div>

            <ul>
                <li>They all have the same number of shapes (<strong>1</strong>)</li>
                <li>They all have three different shapes (<strong>diamond, squiggle, oval</strong>)</li>
                <li>They all have three different fills (<strong>striped, solid, open</strong>)</li>
                <li>They all have the same color (<strong>red</strong>)</li>
            </ul>
            <p>The board will have exactly <strong>12 cards</strong> in play. If you click 3 cards that are a set, the cards are removed from the board and 3 new cards are drawn from the deck and placed on the board.</p>
            <p>If you want a new board or cant find a set, press "<strong>New Board</strong>" to get 12 new cards on the board. The previous cards are discarded.</p>
            <p>There are <strong>81 cards</strong> in the deck. You will have <strong>10 mins</strong> to find as many sets as possible.</p>
            <p>If you run out of time or the deck runs of cards, <strong>the game is over</strong>.</p>
            <p>When ready, press the "<strong>Start</strong>" button to play. Enjoy!</p>
        </div>
    )
}

export default Rules