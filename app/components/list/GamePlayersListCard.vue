<template>
  <UPageGrid class="lg:grid-cols-3">
    <UCard
      v-for="player in players"
      variant="subtle"
      class="text-xs"
      :title="player.name">
      <template #default>
        <div class="grid grid-cols-2 gap-2">
          <div>{{t('playersList.table.playerId')}}</div>
            <div class="font-semibold">{{player.playerId}}</div>
          <div>{{t('playersList.table.round')}}</div>
            <div class="font-semibold">{{player.round}}</div>
          <div v-if="isAdmin">{{t('playersList.table.email')}}</div>
            <div v-if="isAdmin" class="font-semibold">{{player.user? player.user?.email : 'Anonyme'}}</div>
        </div>
      </template>
    </UCard>
  </UPageGrid>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()

  // props
  const props = defineProps({
      isAdmin: {
          type: Boolean,
          default: false
      },
      players: {
          type: Array<IPlayer>,
          default: undefined
      },
  })
</script>
