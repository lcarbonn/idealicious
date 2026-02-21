
const isLog = false

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if(isLog) console.log("session getToken:", session)
  if (!session.user) {
    if(isLog) console.log("Unauthorized")
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  // Le token JWT est dans session.secure
  const jwtToken = session.secure?.access_token
  
  if (!jwtToken) {
    if(isLog) console.log("No JWT token available")
    throw createError({
      statusCode: 401,
      message: 'No JWT token available'
    })
  }

  if(isLog) console.log("token:", jwtToken)
  return {
    token: jwtToken
  }
})