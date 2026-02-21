import { refreshAccessToken } from "../useFetch/baserrowFetch"

const isLog = false

export default defineEventHandler(async (event) => {
  // Le token JWT est dans session.secure
  const session = await refreshAccessToken(event)

  if(isLog) console.log("session refreshToken:", session)

  if (!session?.user) {
    if(isLog) console.log("Unauthorized")
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  const jwtToken = session?.secure?.access_token
  
  if (!jwtToken) {
    if(isLog) console.log("No JWT token available")
    throw createError({
      statusCode: 401,
      message: 'No JWT token available'
    })
  }

  if(isLog) console.log("token refreshed:", jwtToken)
  return {
    token: jwtToken
  }
})