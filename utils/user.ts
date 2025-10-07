import { type DocumentData } from "firebase/firestore"

/**
 * Interface IUser
 * @public
 */
export type IUser = {
    uid:string,
    name:string,
    email:string,
    isAdmin:boolean,
    createdAt:number,
    updatedAt:number,
    toFirestore():object
}

/**
 * User class
 * @public
 */
export class User implements IUser {
    uid:string
    name: string
    email: string
    isAdmin: boolean = false
    createdAt:number
    updatedAt:number
    /**
     * User constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc?:DocumentData) {
        this.uid = doc?.id ?? undefined
        this.name = doc?.data().name ?? undefined
        this.email= doc?.data().email ?? undefined
        this.isAdmin= doc?.data().isAdmin ?? false
        this.createdAt = doc?.data().createdAt
        this.updatedAt = doc?.data().updatedAt
    }
    public toFirestore() {
        return {
            uid:this.uid,
            name:this.name,
            email:this.email,
            isAdmin:this.isAdmin,
            createdAt:this.createdAt
        }
    }
}
