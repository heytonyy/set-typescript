import { CardType, GameStateType } from '../types/types';
import { GameActionType } from '../types/types';

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

type GamePayload = {
    [GameActionType.TOGGLE_START]: {
        gameStart: boolean;
    };
    [GameActionType.GAME_OVER]: {
        gameOver: boolean;
        gameStart: boolean;
    };
    [GameActionType.LOAD_DECK]: {
        deck: CardType[];
    };
    [GameActionType.SET_BOARD]: {
        deck: CardType[];
        boardCards: CardType[];
        selectedCards: CardType[];
    };
    [GameActionType.SELECT_CARD]: {
        selectedCards: CardType[];
    };
    [GameActionType.CHECK_FOR_SET]: {
        score: number;
        message: string;
        messageColor: boolean;
    };
    [GameActionType.UPDATE_BOARD]: {
        deck: CardType[];
        selectedCards: CardType[];
        boardCards: CardType[];
        message: string;
        messageColor: boolean;
    };
};

type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];

const gameReducer = (state: GameStateType, action: GameActions) => {
    const { type, payload } = action
    switch (type) {
        case GameActionType.TOGGLE_START: {
            return {
                ...state,
                gameStart: payload.gameStart
            }
        }
        case GameActionType.GAME_OVER: {
            return {
                ...state,
                gameOver: payload.gameOver,
                gameStart: payload.gameStart
            }
        }
        case GameActionType.LOAD_DECK: {
            return {
                ...state,
                deck: payload.deck
            }
        }
        case GameActionType.SET_BOARD: {
            return {
                ...state,
                deck: payload.deck,
                boardCards: payload.boardCards,
                selectedCards: payload.selectedCards
            }
        }
        case GameActionType.SELECT_CARD: {
            return {
                ...state,
                selectedCards: payload.selectedCards
            }
        }
        case GameActionType.CHECK_FOR_SET: {
            return {
                ...state,
                score: payload.score,
                message: payload.message,
                messageColor: payload.messageColor
            }
        }
        case GameActionType.UPDATE_BOARD: {
            return {
                ...state,
                deck: payload.deck,
                selectedCards: payload.selectedCards,
                boardCards: payload.boardCards,
                message: payload.message,
                messageColor: payload.messageColor
            }
        }
        default: {
            throw new Error(`No case for ${type} in gameReducer`)
        }
    }
}

export { GameActionType, type GameActions, type GamePayload, gameReducer }