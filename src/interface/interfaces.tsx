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