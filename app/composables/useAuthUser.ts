/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the auth user
 */
export const signInUser = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
        signInUserFirebase(email,password)
        .then((authUser) => {
            resolve(authUser)
        })
        .catch((error) => {
            errorToSnack("Error on login", error)
            reject(error)
        })
    })
  }

/**
 * Sign in anonymously in firebase
 * @returns A Promise that resolve the auth user
 */
export const signInAnonymous = () :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      signInAnonymousFirebase()
      .then((authUser) => {
        resolve(authUser)        
      })
      .catch((error) => {
        errorToSnack("Error on login", error)
        reject(error)
      })
    })
  }

/**
 * Sign out the current user
 */
export const signOutUser = () :Promise<void> => {
    return new Promise((resolve, reject) => {

      signOutUserFirebase()
      .then(() => {
        useUser().value = undefined
        usePlayer().value = undefined
        resolve()
      })
    })
  }

/**
 * Initialize the authUser listener on auth state change
 */
export const initUser = () => {
    const callback = async (auhUser:IAuthUser) => {
      const currentRoute = useRoute().fullPath
      useAuthUser().value = auhUser
      getUser(auhUser.uid)
        .then((dbuser) => {
          if(dbuser) {
              useUser().value = dbuser
              if(!dbuser.isAdmin && currentRoute.indexOf('/admin') != -1) {
                // console.log("auth state change, navigate")
                navigateTo('/')
            }
          }
          else {
            useUser().value = undefined
            usePlayer().value = undefined
          }
      })
      if(auhUser.isAnonymous && currentRoute.indexOf('/admin') != -1) {
        // console.log("auth state change, navigate")
        navigateTo('/')
      }
    }
    initUserFirebase(callback)
}

/**
 * Send password reset email
 * @param email - the email
 */
export const sendPasswordReset = (email:string) :Promise<void> => {
  return new Promise((resolve, reject) => {
    sendResetPasswordFirebase(email)
    .then(() => {
      resolve()
    })
    .catch((error) => {
      errorToSnack("Error on sending email to reset password", error)
      reject(error)
    })
  })
}

/**
 * Signup
 * @param form - the signup form
 * @throws Throws the firebase error
 */
export const signUp = (name:string, email:string, password:string) :Promise<void> => {
  return new Promise((resolve, reject) => {
    signUpFirebase(email, password)
    .then((authUser) => {
      const user = new User()
      user.name = name
      user.email = email
      user.uid = authUser.uid
      // create the user
      user.createdAt=new Date().getTime()
      createUser(user)
      useUser().value = user
      useAuthUser().value = authUser
      resolve()
    })
    .catch((error) => {
      errorToSnack("Error on signup", error)
      reject(error)
    })
  })
}