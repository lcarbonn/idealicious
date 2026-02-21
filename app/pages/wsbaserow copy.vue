<script setup>
  import { useWebSocket } from '@vueuse/core'

  const token = ref()
  const endpoint = ref()
  const status = ref()
  const data = ref()
  const reconnectAttempts = ref(0)
  const close = ref()
  const open = ref()
  const wsId = ref()

  const getToken = async () => {
    const result = await $fetch('/api/ws-token')
    token.value = result.token
    endpoint.value='wss://baserow.nocolowco.fr/ws/core/?jwt_token='+token.value
    console.log("token first:", token.value)
  }

  const refreshToken = async () => {
    const result = await $fetch('/api/ws-refresh')
    token.value = result.token
    endpoint.value='wss://baserow.nocolowco.fr/ws/core/?jwt_token='+token.value
    console.log("token refreshed:", token.value)
  }

  const setWsId = (data) => {
    const res = JSON.parse(data)
    const type = res.type
    const success = res.success
    if(type === "authentication" && success === true) {
      wsId.value = res.web_socket_id
    }
  }

  const onMessage = (data) => {
    const res = JSON.parse(data)
    const type = res.type
    switch (type) {
      case 'authentication':
        const success = res.success
        if(type === "authentication" && success === true) {
          wsId.value = res.web_socket_id
        }
        break;
      case 'rows_created':
        if(data.rows)
        break;
      case 'rows_updated':
        
        break;
      case 'rows_deleted':
        
        break;
    
      default:
        break;
    }
  }

  const connect = async () => {
    try {

      //force refresh token before ws connexion
      await refreshToken()
      const { status:wsStatus, data:wsData, send, open:wsOpen, close:wsClose } = useWebSocket(endpoint.value, {
      // S'abonner aux événements d'une table
        onConnected(ws) {
          close.value = wsClose
          open.value = wsOpen
          const page = {
            page: 'table',
            table_id: 782
          }
          send(JSON.stringify(page))
          console.log('Connected!')
        },
        async onDisconnected(ws, event) {
          console.log('Disconnected!', event.code)
          wsId.value = undefined
        },
        onError(ws, event) {
          console.error('Error:', event)
        },     
        onMessage(ws, event) {
          console.log("new data:", event.data)
          setWsId(event.data)

        }
      })
      status.value = wsStatus
      data.value = wsData
    } catch (error) {
      console.log('error:',error)
    }
  }

  const openWS = async () => {
    // await getToken()
    reconnectAttempts.value = 0
    await connect()
  }

  // Only open the websocket after the page is hydrated (client-only)
  onMounted(openWS)
  onUnmounted(() => {
    close.value?.()
  })  

</script>

<template>
  <div>
    <p>Status: {{ status }}</p>
    <p>wsId: {{ wsId }}</p>
    <p>Data: {{ data }}</p>
    <p>
      <UButton @click="open">Open</UButton>
      <UButton @click="close(1000, 'Closing')">Close</UButton>
    </p>
  </div>
</template>