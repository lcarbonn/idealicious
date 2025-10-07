import { type DocumentData } from "firebase/firestore"

/**
 * Interface IPlayer
 * @public
 */
export type IPlayer = {
    uid:string
    playerId:number
    name: string,
    round: number,
    loved:boolean,
    user:IUser|undefined
    toFirestore():object
}

/**
 * Player class
 * @public
 */
export class Player implements IPlayer {
    uid:string
    playerId:number
    name: string
    round:number
    loved:boolean
    user:IUser|undefined
    /**
     * Player constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc?:DocumentData) {
        this.uid = doc?.id ?? ""
        this.playerId = doc?.data().playerId ?? 0
        this.name = doc?.data().name ?? ""
        this.round = doc?.data().round ?? 0
        this.loved = doc?.data().loved ?? false
    }
    public toFirestore() {
        return {
            playerId:this.playerId,
            name:this.name,
            round:this.round,
            loved:this.loved
        }
    }
}
