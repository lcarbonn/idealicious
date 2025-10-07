import { type DocumentData } from "firebase/firestore"

/**
 * Interface IGame
 * @public
 */
export type IGame = {
    id:string,
    title: string,
    started: boolean,
    ended:boolean,
    createdAt:number,
    updatedAt:number,
    userUid:string,
    user:IUser|undefined,
    isStarted():boolean,
    isEnded():boolean,
    isNotYetStarted():boolean
    startGame():any
    stopGame():any
    restartGame():any
}

/**
 * Game class
 * @public
 */
export class Game implements IGame {
    id:string
    title: string
    started: boolean = false
    ended: boolean = false
    createdAt:number=new Date().getTime()
    updatedAt:number=new Date().getTime()
    userUid:string
    user:IUser|undefined
    /**
     * Game constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc?:DocumentData) {
        this.id = doc?.id ?? ""
        this.title = doc?.data().title ?? ""
        this.started= doc?.data().started ?? false
        this.ended= doc?.data().ended ?? false
        this.createdAt = doc?.data().createdAt
        this.updatedAt = doc?.data().updatedAt
        this.userUid= doc?.data().userUid ?? ""
    }
    public isStarted() {
        return (this.started && !this.ended)
    }
    public isEnded() {
        return (this.ended)
    }
    public isNotYetStarted() {
        return (!this.started && !this.ended)
    }
    public startGame() {
        this.started = true
        this.ended = false
    }
    public stopGame() {
        this.ended = false
    }
    public restartGame() {
        this.started = false
        this.ended = false
    }
}
