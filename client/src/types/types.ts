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

export type GameProviderProps = {
    children: React.ReactNode;
}