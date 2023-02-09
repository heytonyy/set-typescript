import { createContext, useContext, useReducer } from "react"
import { gameReducer, GameActions } from "./gameReducer"
import { GameStateType } from "../types/types"

const initialState = {
    gameStart: false,
    gameOver: false,
    deck: [],
    boardCards: [],
    selectedCards: [],
    score: 0,
    message: '',
    messageColor: false,
}

const GameContext = createContext<{
    state: GameStateType
    dispatch: React.Dispatch<GameActions>
}>({
    state: initialState,
    dispatch: () => null,
})

interface GameProviderProps {
    children: React.ReactNode
}

const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, initialState)

    return (
        <GameContext.Provider value={{ state, dispatch }} >
            {children}
        </GameContext.Provider>
    )
}

// error checking to make sure to have context
const useGame = () => {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGame must be used within game context')
    }
    return context
}

export { useGame, GameProvider }
