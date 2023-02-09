export type CardType = {
    _id: string;
    color: string;
    shape: string;
    number: number;
    fill: string;
}

export type LeaderboardType = {
    _id: string;
    initials: string;
    score: number;
    createdAt: string;
}

export type GameStateType = {
    gameStart: boolean;
    gameOver: boolean;
    deck: CardType[];
    boardCards: CardType[];
    selectedCards: CardType[];
    score: number;
    message: string;
    messageColor: boolean;
}

export enum GameActionType {
    TOGGLE_START = 'TOGGLE_START',
    GAME_OVER = 'GAME_OVER',
    LOAD_DECK = 'LOAD_DECK',
    SET_BOARD = 'SET_BOARD',
    SELECT_CARD = 'SELECT_CARD',
    CHECK_FOR_SET = 'CHECK_FOR_SET',
    UPDATE_BOARD = 'UPDATE_BOARD'
}