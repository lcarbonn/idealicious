import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Create a user in firebase db
 * @param user - the user
 * @returns A Promise that resolve when created
 * @throws Throws the firebase error
 */
export const createUserDb = (user:IUser) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        // console.log("start create db user")
        user.createdAt = new Date().getTime()
        const docRef = doc($db as Firestore, "users", user.uid)
        setDoc(docRef, user.toFirestore() , { merge: true })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error createUserDb :"+error)
            reject(error)
        });
    })
};

/**
 * Get the user in firebase db
 * @param uid - the user uid
 * @returns A Promise that resolve the user
 * @throws Throws the firebase error
 */
export const getUserDb = (uid:string) :Promise<IUser|undefined> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        // console.log("start get user db uid:"+uid)

        const docRef = doc($db as Firestore, "users", uid)
        getDoc(docRef)
        .then((doc) => {
            if(doc.exists()) {
                const user:IUser = new User(doc)
                // console.log("end get user db uid: exists")
                resolve(user)
            } else {
                // console.log("end get user db uid: dont exist")
                resolve(undefined)
            }
        })
        .catch((error) => {
            // console.error("error getUser :"+error)
            reject(error)
        });
    })
};

/**
 * Get all the users
 * @returns A Promise that resolve an array of users
 * @throws Throws the firebase error
 */
export const getUsersDb = () :Promise<IUser[]> => {
    return new Promise((resolve, reject) => {
        // console.log("start getUsers")

        const { $db } = useNuxtApp()
        const usersRef = collection($db as Firestore, "users")
        getDocs(usersRef)
        .then((listUsers) => {
            const users:IUser[] = []
            listUsers.forEach((userDoc) => {
                const user:IUser = new User(userDoc)
                users.push(user)
            })
            // console.log("end getUsers nb users:" + users.length)
            resolve(users)
        })
        .catch((error) => {
            // console.error("error getUsers :"+error)
            reject(error)
        });
    })
};

/**
 * Update the user admin field
 * @param user - the id of the user
 * @returns a Promise after updated
 */
export const updateUserIsAdminDb = (user:IUser) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateUserIsAdminDb uid=" + user.uid)

        const { $db } = useNuxtApp()
        const docRef = doc($db as Firestore, "users", user.uid)
        updateDoc(docRef, {
            isAdmin:user.isAdmin,
            updatedAt:user.updatedAt
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error updateUserIsAdminDb : ", error)
            reject(error)
        });

    })
}

/**
 * Delete a user in firebase db
 * @param user - the user
  * @return A `Promise`that resolves when user is deleted
 */
export const deleteUserDb = (uid:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        // console.log("start deleteUserDb uid=" + uid)

        const docRef = doc($db as Firestore, "users", uid)
        deleteDoc(docRef)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            // console.error("error deleteUserDb : ", error)
            reject(error)
        });
    })
};
