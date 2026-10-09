/**
 * Delete user in stated users list
 * @param uid - the user id
 */
const deleteStatedUser = (uid:string) => {
    let users:IUser[] =  []
    const oldUsers = useUsers().value
    if(oldUsers) {
        oldUsers.forEach((oldUser) => {
            if(oldUser.uid != uid) {
                users.push(oldUser)
            }
        })
    }
    useUsers().value = users
}
/**
 * Create a user
 * @param user - the user
 * @returns A Promise that resolve after created
 * @throws Throws the error
 */
export const createUser = (user:IUser) :Promise<void> => {
    return new Promise((resolve, reject) => {
        createUserDb(user)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error creating user", error)
            reject(error)
        })
    })
}

/**
 * Get the user
 * @param uid - the user uid
 * @returns A Promise that resolve the user or undefined
 * @throws Throws the error
 */
export const getUser = (uid:string) :Promise<IUser|undefined> => {
    return new Promise((resolve, reject) => {
        getUserDb(uid)
        .then((user) => {
            resolve(user)
        })
        .catch((error) => {
            errorToSnack("Error get user db", error)
            reject(error)
        })
    })
}

/**
 * Get all the users
 * @returns A Promise that resolve an array of users
 * @throws Throws the error
 */
export const getUsers = () :Promise<IUser[]> => {
    return new Promise((resolve, reject) => {
        getUsersDb()
        .then((users) => {
            useUsers().value = users
            resolve(users)
        })
        .catch((error) => {
            errorToSnack("Error getUsers", error)
            reject(error)
        })
    })
}

/**
 * Update the user admin field
 * @param uid - the id of the user
 * @param isAdmin - is admin or not
 * @returns a Promise after updated
 */
export const updateUserIsAdmin = (user:IUser) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start updateUserIsAdmin uid=" + user.uid)
        
        updateUserIsAdminDb(user).then(() => {
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error updateUserIsAdmin", error)
            reject(error)
        });
    })
}

/**
 * Delete the user
 * @param uid - the id of the user
 * @returns a Promise when done
 */
export const deleteUser = (uid:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("start deleteUser uid=" + uid)
        
        deleteUserDb(uid).then(() => {
            deleteStatedUser(uid)
            resolve()
        })
        .catch((error) => {
            errorToSnack("Error deleteUser", error)
            reject(error)
        });
    })
}
