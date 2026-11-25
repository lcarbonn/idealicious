<template>
  <UPageGrid>
    <UCard
      v-for="game in games"
      variant="subtle"
      class="text-xs"
      :title="game.title">
      <template #default>
        <NuxtLink :to="'/game/'+game.id">
          <div class="grid grid-cols-2 gap-2">
            <div v-if="isAdmin">{{t('gamesList.table.user')}}</div>
              <div v-if="isAdmin" class="font-semibold">{{game.user?.name}}</div>
            <div>{{t('gamesList.table.created')}}</div>
              <div class="font-semibold">{{dateFormatter(game.createdAt)}}</div>
            <div>{{t('gamesList.table.updated')}}</div>
              <div class="font-semibold">{{dateFormatter(game.updatedAt)}}</div>
            <div v-if="isAdmin && game.user"><b>Owner:</b></div>
              <div v-if="isAdmin && game.user">{{ game.user?.email }}</div>
            <div>Started:</div>
              <USwitch v-model="game.started" disabled/>
            <div>Ended:</div>
              <USwitch v-model="game.ended" disabled/>
          </div>
        </NuxtLink>
      </template>
      <template #footer class="justify-items-center">
        <ListGamesListActions
          :game="game"
          :isAdmin="isAdmin"
          @ask-for-delete-game="askForDeleteGame"
          />
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
        games: {
            type: Array<IGame>,
            default: undefined
        },
    })

  // emits declaration
  const emit = defineEmits<{
    askForDeleteGame: [game:IGame];
  }>()

  const askForDeleteGame = (game:IGame) => {
    emit('askForDeleteGame', game)
  }

</script>
