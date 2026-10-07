<!-- Player page -->
<template>
  <div class="mb-3" >
    <BaseTimer v-if="deckReceived" :max="maxTime" :restart="restart" @timer-completed="timerCompleted"></BaseTimer>
    <!-- Card for the last idea -->
    <BCard v-if="round>0 && !deckReceived" :class="getColor(deckId)" class="mt-3" text-variant="dark">
      <BCardText>
        <BSpinner variant="primary"/> {{t('playerGame.waitingIdea', {player: previousPlayerName})}}
      </BCardText>
    </BCard>
    <BCard v-if="round>0 && deckReceived" :class="getColor(deckId)" class="mt-3" text-variant="dark">
      <BCardText  v-if="lastIdea?.message">
        <BFormGroup class="mb-0">
          <label for="lastIdea">{{t('playerGame.previousIdea', {player: previousPlayerName})}}</label>
          <BFormInput id="lastIdea" disabled v-model="lastIdea.message"></BFormInput>
        </BFormGroup>
      </BCardText>
      <BCardText v-else>
        {{t('playerGame.noIdeaYet')}}
      </BCardText>
    </BCard>
    <!-- Card for player idea -->
    <BCard v-if="deckReceived" :class="getColor(deckId)" class="mt-3" text-variant="dark">
      <BCardText>
        <BContainer>
          <BRow>
            <BCol>
              <BFormGroup>
                <label for="newIdea" v-if="round==0">{{t('playerGame.firstIdea')}}</label>
                <label for="newIdea" v-else>{{t('playerGame.newIdea')}}</label>
                <BFormInput id="newIdea" autofocus v-model="newIdea" @keydown.enter="addNewIdea"
                  maxlength="140" trim class="mb-0"></BFormInput>
              </BFormGroup>
            </BCol>
          </BRow>
          <BRow class="text-center mt-1" align-h="around">
            <BCol>
              <BButton pill id="addButton" @click="addNewIdea">
                <PlusCircleFill/> {{ t('playerGame.addIdea')}}
              </BButton>
              <b-tooltip target="addButton" triggers="hover">{{ t('playerGame.addIdea')}}</b-tooltip>
            </BCol>
          </BRow>
        </BContainer>
      </BCardText>
    </BCard>
    <!-- modal for asking in case of skiping idea -->
    <BModal v-model="modalAskSkip" @ok="skipIdea" centered  :title="t('playerGame.skipTitle')"> {{t('playerGame.skipQuestion')}}</BModal>
  </div>
</template>

<script setup lang="ts">

    // icons
    import PlusCircleFill from '~icons/bi/plus-circle-fill'

    // const timer
    const maxTime = 20

    // const
    const { t } = useI18n()

    //local refs
    const newIdea = ref("")
    const modalAskSkip = ref(false)
    const restart = ref(false)

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

    // emits declaration
    const emit = defineEmits(['addNewIdea'])

    // emits méthods
    const addNewIdea = () => {
      if(newIdea.value == "") {
        modalAskSkip.value = true
      } else {
        console.log('addNewIdea')
        emit("addNewIdea", newIdea.value)
        newIdea.value=""
        restart.value = true
      }
    }

    const skipIdea = () => {
      console.log("skip idea")
      emit("addNewIdea")
    }

    const timerCompleted = () => {
      skipIdea()
      restart.value = true
    }
</script>