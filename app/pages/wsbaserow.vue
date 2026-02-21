<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">WebSocket Live Data</h3>
        <div class="flex items-center gap-2">
          <UBadge :color="isConnected ? 'success' : 'error'">
            <UIcon 
              :name="isConnected ? 'i-heroicons-signal' : 'i-heroicons-signal-slash'" 
              class="w-3 h-3 mr-1"
            />
            {{ isConnected ? 'Connected' : 'Disconnected' }}
          </UBadge>
          <UButton
            v-if="!isConnected"
            @click="connect" 
            :loading="isConnecting"
            size="xs"
          >(Re)Connect</UButton>
          <UButton
            v-if="isConnected"
            @click="disconnect" 
            size="xs"
          >Close</UButton>
        </div>
      </div>
    </template>

    <div class="space-y-4">
      <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 rounded text-red-600 text-sm">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 inline mr-1" />
        {{ error }}
      </div>
      <h2 class="font-semibold">Raw data</h2>
      <UTable :data="rows" :columns="columns"/>
      <USeparator />
      <h2 class="font-semibold">Factures data</h2>
      <UTable :data="factures"/>

      <!-- <div v-if="lastMessage" class="text-xs text-gray-500">
        <div>Last update: {{ new Date().toLocaleTimeString() }}</div>
        <div>{{  lastMessage }}</div>
      </div> -->
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
  
  // table facture
  const config = useRuntimeConfig()
  const tableId = Number(config.public.tableFacture)

  const rows = ref<BaserowWSMessage[]>([])
  const factures = ref<IFactureNew[]>([])

  const getData = (data:BaserowWSMessage) => {
    return JSON.stringify(data)
  }
  const columns: TableColumn<BaserowWSMessage>[] = [
    { accessorKey: 'type', header: 'Type' },
    { accessorFn:getData, header: 'Data' },
  ]

  // WebSocket avec gestion des mises à jour en temps réel
  const { 
    isConnected, 
    isConnecting, 
    lastMessage, 
    error,
    connect,
    disconnect,
  } = useBaserowWebSocket({
    tableId,
    autoConnect: true,
    onMessage: (data) => {
      messageToSnack("message received "+data.type )
      rows.value.unshift(data)
      switch (data.type) {
        case 'authentication':
          const authMessage = data as BaserowAuthenticationWSMessage
          break;
        case 'rows_created':
          if (data.rows) {
            data.rows.forEach((row: any) => {
              const fac = new FactureNew(row)
              factures.value.unshift(fac)
            });
          }
          break

        case 'rows_updated':
          if (data.rows) {
            data.rows.forEach((row: any) => {
              const fac = new FactureNew(row)
              factures.value.unshift(fac)
            });
          }
          break

        case 'rows_deleted':
          if (data.rows) {
            data.rows.forEach((row: any) => {
              const fac = new FactureNew(row)
              factures.value.unshift(fac)
            });
          }
          break
      }
    },
    onOpen: () => {
      // messageToSnack("Connected - Real-time updates enabled")
    },
    onClose: () => {
      // messageToSnack("Disconnected - Real-time updates disabled")
    }
  })

  onMounted(() => {
    // loadData()
  })
</script>