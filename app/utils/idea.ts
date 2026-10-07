import { type DocumentData } from "firebase/firestore"

/**
 * Interface IIdea
 * @public
 */
export type IIdea = {
    id:string
    message:string
    playerId:string
    createdAt:number
    loved:number
    lovingPlayers:[string]
    toFirestore():object
}

/**
 * Idea class
 * @public
 */
export class Idea implements IIdea {
    id:string
    message:string
    playerId:string
    createdAt:number=new Date().getTime()
    loved:number=0
    lovingPlayers:[string]
    /**
     * Idea constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc?:DocumentData) {
        this.id = doc?.id ?? ""
        this.message = doc?.data().message ?? ""

        this.playerId = doc?.data().playerId ?? ""
        this.createdAt = doc?.data().createdAt ?? new Date().getTime()
        this.loved = doc?.data().loved ?? 0
        this.lovingPlayers = doc?.data().lovingPlayers ?? []
    }
    public toFirestore() {
        return {
            message:this.message,
            playerId:this.playerId,
            createdAt:this.createdAt,
            loved:this.loved,
            lovingPlayers:this.lovingPlayers
        }
    }
}
