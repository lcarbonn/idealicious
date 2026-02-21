// composables/useBaserowWebSocket.ts
import { useWebSocket } from '@vueuse/core'

const isLog = false
/**
 * Baserow Message
 */
export interface BaserowWSMessage {
  type: string
  // page?: string
  // table_id?: number
  [key: string]: any
}

/**
 * Baserow Authentication Message
 */
export interface BaserowAuthenticationWSMessage extends BaserowWSMessage {
  success: boolean
  web_socket_id: string
}

/**
 * Baserow Subscribe message
 */
interface BaserowSubsribeWSMessage {
  page?: 'table'|'row'
  remove_page?: 'table'|'row'
  table_id: number
  row_id?:number
  user_field_names?:boolean
}

/**
 * Baserow Websocket Options
 */
interface UseBaserowWebSocketOptions {
  tableId?: number
  autoConnect?: boolean
  onMessage?: (data: BaserowWSMessage) => void
  onError?: (error: Event) => void
  onOpen?: () => void
  onClose?: () => void
}

export const useBaserowWebSocket = (options: UseBaserowWebSocketOptions = {}) => {
  const {
    tableId,
    autoConnect = true,
    onMessage,
    onError,
    onOpen,
    onClose
  } = options

  const config = useRuntimeConfig()
  // const { loggedIn } = useUserSession()

  const ws = ref<WebSocket | null>(null)

  const isConnected = ref(false)
  const isConnecting = ref(false)
  // const reconnectAttempts = ref(0)
  const lastMessage = ref<BaserowWSMessage | null>(null)
  const error = ref<string | null>(null)

  // Construire l'URL WebSocket
  const getWebSocketUrl = () => {
    const baseUrl = config.public.baseUrl
    const wsUrl = baseUrl.replace('https://', 'wss://').replace('http://', 'ws://')
    return `${wsUrl}/ws/core/`
  }

  // Obtenir le token JWT depuis le serveur
  const getJWTToken  = async () => {
    const { token } = await $fetch('/api/ws-refresh')
    if(isLog) console.log("✅ WebSocket token refreshed:", token)
    return token
  }

  // Connexion WebSocket
  const connect = async () => {
    // to delete for asynchronous users
    // if (!loggedIn.value) {
    //   error.value = 'User not authenticated'
    //   console.error('Cannot connect to WebSocket: user not authenticated')
    //   return
    // }

    if (isConnected.value || isConnecting.value) {
      if(isLog) console.warn('WebSocket already connected or connecting')
      return
    }

    isConnecting.value = true
    error.value = null

    try {
      // Récupérer le token JWT depuis le serveur
      const token = await getJWTToken()
      
      const wsUrl = getWebSocketUrl()

      const endpoint = `${wsUrl}?jwt_token=${token}`
      // Créer la connexion WebSocket avec le token JWT
      const { status:wsStatus, data:wsData, send, open:wsOpen, close:wsClose } = useWebSocket(endpoint, {

        onConnected(brws) {
          if(isLog) console.log('✅ WebSocket connected to Baserow')
          isConnected.value = true
          isConnecting.value = false
          error.value = null
          ws.value = brws

          // S'abonner à une table spécifique si fournie
          if (tableId) {
            subscribe(tableId)
          }

          // callback on open
          onOpen?.()
        },

        onMessage(ws, event) {
          const data = JSON.parse(event.data) as BaserowWSMessage
          if(isLog) console.log('📨 WebSocket message received:', data)
          lastMessage.value = data
          // callback on message received
          onMessage?.(data)
        },

        onError(ws, event) {
          if(isLog) console.error('❌ WebSocket error:', event)
          error.value = 'WebSocket error occurred'
          // callback on error
          onError?.(event)
        },

        onDisconnected(ws, event) {
          if(isLog) console.log('🔌 WebSocket disconnected', event.code, event.reason)
          isConnected.value = false
          isConnecting.value = false
          lastMessage.value = null

          // callback on disconnected
          onClose?.()
        }
      })
    } catch (err: any) {
      console.error('Failed to create WebSocket connection:', err)
      error.value = err.message || 'Failed to create WebSocket connection'
      isConnected.value = false
      isConnecting.value = false
    }
  }

  // Déconnexion
  const disconnect = () => {
    if (ws.value) {
      ws.value.close()
      ws.value = null
      isConnected.value = false
      isConnecting.value = false
    }
  }

  // Envoyer un message
  const send = (data: BaserowSubsribeWSMessage) => {
    if (!isConnected.value || !ws.value) {
      if(isLog) console.error('WebSocket not connected')
      return false
    }

    try {
      ws.value.send(JSON.stringify(data))
      return true
    } catch (err) {
      if(isLog) console.error('Failed to send WebSocket message:', err)
      return false
    }
  }

  // S'abonner aux événements d'une table
  const subscribe = (tableId: number) => {
    return send({
      page: 'table',
      table_id: tableId,
      user_field_names:true
    })
  }

  // Se désabonner des événements d'une table
  const unsubscribe = (tableId: number) => {
    return send({
      remove_page: 'table',
      table_id: tableId,
    })
  }

  // Auto-connexion au montage si activée
  onMounted(() => {
    if (autoConnect) {
      connect()
    }
  })

  // Déconnexion au démontage
  onUnmounted(() => {
    disconnect()
  })

  // // Reconnecter si l'utilisateur se connecte
  // watch(loggedIn, (newValue) => {
  //   if (newValue && autoConnect) {
  //     connect()
  //   } else if (!newValue) {
  //     disconnect()
  //   }
  // })

  return {
    // État
    isConnected: readonly(isConnected),
    isConnecting: readonly(isConnecting),
    lastMessage: readonly(lastMessage),
    error: readonly(error),

    // Méthodes
    connect,
    disconnect,
    send,
    subscribe,
    unsubscribe
  }
}