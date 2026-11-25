<template>
  <div>
    <UPageGrid class="grid-cols-2 mb-4">
      <UiListTypeSwitch v-model="listType" size="sm" class="justify-self-end md:col-start-3 lg:col-start-5"/>
    </UPageGrid>
    <LazyListGamesListCard v-if="listType=='card'"
      :games="games"
      :is-admin="isAdmin"
      @askForDeleteGame="askForDeleteGame"
      />
    <LazyListGamesListTable v-if="listType=='table'"
      :games="games"
      :is-admin="isAdmin"
      @askForDeleteGame="askForDeleteGame"
      />
    <UiSimpleModal
      :open="modalDeleteLigne"
      :title="t('gamesList.deleteGameTitle')"
      :description="t('gamesList.deleteGameMessage')"
      @on-ok="confirmDelete"/>
  </div>
</template>

<script setup lang="ts">
    
    // for lang
    const { t } = useI18n()
    //local ref
    const selectedGame = ref()
    const modalDeleteLigne = ref(new ModalShow())

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

    const listType = ref()

  // emits declaration
  const emit = defineEmits(['deleteGame'])

  // methodes
  // ask for game deletion, open modal
  const askForDeleteGame = (game:IGame) => {
    selectedGame.value = game
    modalDeleteLigne.value.show = !modalDeleteLigne.value.show;
  }
  // delete confirmed
  const confirmDelete = () => {
    emit('deleteGame', selectedGame.value)
  }

</script>
