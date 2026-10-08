import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
    getAuth,
    EmailAuthProvider,
    linkWithCredential,
    sendPasswordResetEmail,
    type UserCredential,
  } from "firebase/auth";
  import type { User } from "firebase/auth";

/**
 * State for firebaseUser
 */
const useFirebaseUser = () => useState<User|undefined>("firebaseUser");

/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the user credentials
 */
export const signInUserFirebase = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
  
      signInWithEmailAndPassword(auth,email,password)
      .then((credentials) => {
        useFirebaseUser().value = credentials.user
        const authUser = toAuthUser(credentials)
        resolve(authUser)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

/**
 * Sign in anonymously in firebase
 * @returns A Promise that resolve the user credentials
 */
export const signInAnonymousFirebase = () :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signInAnonymously(auth)
      .then((credentials) => {
        useFirebaseUser().value = credentials.user
        const authUser = toAuthUser(credentials)
        resolve(authUser)        
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

/**
 * Sign out the current user from firebase
 */
export const signOutUserFirebase = () :Promise<void> => {
    return new Promise((resolve, reject) => {
      getAuth().signOut()
      .then(() => {
        useFirebaseUser().value = undefined
        resolve()
      })
    })
  }

/**
 * Initialize the firebase listener on auth state change
 */
export const initUserFirebase = (callback:any) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    // console.log("onAuthStateChanged user:"+user)
    if (user) {
      useFirebaseUser().value = user
      const authUser = new AuthUser(user.uid, user.isAnonymous, user.email)
      callback(authUser)
    } else {
      //if signed out sign in anonymous
      // console.log("onAuthStateChanged signing anonymous")
      signInAnonymousFirebase().then((authUser)=>{
        if(authUser) callback(authUser)
      })
    }
  })
}

/**
 * Signup
 * @param form - the signup form
 * @throws Throws the firebase error
 */
export const signUpFirebase = (email:string, password:string) :Promise<IAuthUser> => {
  return new Promise((resolve, reject) => {
    const oldUser = useFirebaseUser().value
    if(oldUser && oldUser.isAnonymous) {
      //convert anonymous user to permanent user with email & password
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(oldUser, credential)
      .then((usercred) => {
        // sign the user as non anonymous
        // console.log("Anonymous account successfully upgraded", usercred?.user);
          signInUserFirebase(email, password)
          .then((authUSer) => {
            resolve(authUSer)
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
    } else {
      reject("Should not happend, please logout before")
    }
  })
}

/**
 * Send reset password
 * @param email - the email
 * @throws Throws the firebase error
 */
export const sendResetPasswordFirebase = (email:string) :Promise<void> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    sendPasswordResetEmail(auth, email)
    .then(() => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const toAuthUser = (credentials:UserCredential) => {
  return new AuthUser(credentials.user.uid, credentials.user.isAnonymous, credentials.user.email)
}