<!-- Player page -->
<template>
  <div class="mb-3" >
    <BaseTimer v-if="deckReceived" :max="maxTime" :restart="restart" @timer-completed="timerCompleted"></BaseTimer>
    <!-- Card for the last idea -->
    <UCard v-if="round>0 && !deckReceived" :class="getColor(deckId)" class="mt-3" text-variant="dark">
        {{t('playerGame.waitingIdea', {player: previousPlayerName})}}
    </UCard>
    <UCard v-if="round>0 && deckReceived" :class="getColor(deckId)" class="mt-3" text-variant="dark">
      <template #default  v-if="lastIdea?.message">
        <UFormField :label="t('playerGame.previousIdea', {player: previousPlayerName})">
          <UInput id="lastIdea" disabled v-model="lastIdea.message"></UInput>
        </UFormField>
      </template>
      <template #default  v-else>
        {{t('playerGame.noIdeaYet')}}
      </template>
    </UCard>

    <!-- Card for player idea -->
    <UCard v-if="deckReceived" :class="getColor(deckId)" class="mt-3" text-variant="dark">
      <template #default>
        <UFormField :label="getLabel">
          <UInput autofocus v-model="newIdea" @keydown.enter="addNewIdea"
            maxlength="140" trim></UInput>
        </UFormField>
        <UTooltip :text="t('playerGame.addIdea')">
          <UButton
              icon="streamline-color:add-1-flat"
              @click="addNewIdea"
              :label="t('playerGame.addIdea')"
              class="mt-2"
            />
          </UTooltip>
      </template>
      <template #footer>
      </template>
    </UCard>

    <!-- modal for asking in case of skiping idea -->
    <UiSimpleModal
      :open="modalDeleteLigne"
      :title="t('playerGame.skipTitle')"
      :description="t('playerGame.skipQuestion')"
      @on-ok="skipIdea"/>
  </div>
</template>

<script setup lang="ts">

    // const timer
    const maxTime = 20

    // const
    const { t } = useI18n()

    //local refs
    const newIdea = ref("")
    const restart = ref(false)
    const modalDeleteLigne = ref(new ModalShow())

    // props
    const props = defineProps({
      round: {
          type: Number,
          default: 0
      },
      lastIdea: {
          type: Idea,
          default: null
      },
      deckId: {
          type: Number,
          default: null
      },
      previousPlayerName: {
        type:String,
        default: ""
      }
    })

    const deckReceived = computed(() => {
      return (props.deckId!=null)
    })

    const getLabel = computed(() => {
      return (props.round==0?t('playerGame.firstIdea'):t('playerGame.newIdea'))
    })

    // emits declaration
    const emit = defineEmits(['addNewIdea'])

    // emits méthods
    const addNewIdea = () => {
      if(newIdea.value == "") {
        modalDeleteLigne.value.show = !modalDeleteLigne.value.show;
      } else {
        // console.log('addNewIdea')
        emit("addNewIdea", newIdea.value)
        newIdea.value=""
        restart.value = true
      }
    }

    const skipIdea = () => {
      // console.log("skip idea")
      emit("addNewIdea")
      restart.value = true
    }

    const timerCompleted = () => {
      skipIdea()
      // restart.value = true
    }
</script>