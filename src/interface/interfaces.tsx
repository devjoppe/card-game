export interface gameCards {
    id?: number,
    card_id: number,
    url: string,
    isFlipped: boolean
    complete: boolean
}

export interface cardPlayed {
    id: number,
    card_id: number
}

export interface commentType {
    title?:string
}

export interface highScoreList {
    id: string,
    user: string,
    score: number,
    complete: boolean
}