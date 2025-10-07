import { type DocumentData } from "firebase/firestore"

/**
 * Interface IDeck
 * @public
 */
export type IDeck = {
    id:number
    playerId:number
    updatedAt:number
    toFirestore():object
}

/**
 * Deck class
 * @public
 */
export class Deck implements IDeck {
    id:number
    playerId:number
    updatedAt:number=new Date().getTime()
    /**
     * Deck constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc?:DocumentData) {
        this.id = doc?.data().id ?? 0
        this.playerId = doc?.data().playerId ?? 0
        this.updatedAt = doc?.data().updatedAt ?? new Date().getTime()
    }
    public toFirestore() {
        return {
            id:this.id,
            playerId:this.playerId,
            updatedAt:this.updatedAt
        }
    }
}
