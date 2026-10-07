<template>
      <BContainer fluid v-if="game">
        <BRow align-h="evenly">
          <BCol cols="auto" v-if="notYetStarted">
            <BButton pill id="start" variant="secondary" @click="startGame">
              <PlayCircle/> {{ t('actionBar.start')}}
            </BButton>
            <b-tooltip target="start" triggers="hover">{{ t('actionBar.start')}}</b-tooltip>
          </BCol>
          <BCol cols="auto" v-if="started">
            <BButton pill id="stop" variant="secondary" @click="endGame">
              <StopCircle/> {{ t('actionBar.end')}}
            </BButton>
            <b-tooltip target="stop" triggers="hover">{{ t('actionBar.end')}}</b-tooltip>
          </BCol>
          <BCol cols="auto" v-if="ended">
            <BButton pill id="new" variant="secondary" @click="restartGame">
              <PlayBtn/> {{ t('actionBar.restart')}}
            </BButton>
            <b-tooltip target="new" triggers="hover">{{ t('actionBar.restart')}}</b-tooltip>
          </BCol>
        </BRow>
      </BContainer>
</template>

<script setup lang="ts">

    // icons
    import PlayCircle from '~icons/bi/play-circle'
    import StopCircle from '~icons/bi/stop-circle'
    import PlayBtn from '~icons/bi/play-btn'

    // const
    const { t } = useI18n()

    // props
    const props = defineProps({
      game: {
          type: Game,
          default: null
      }
    })

    // computed props
    const started = computed(() => {
      return props.game?.isStarted()
    })
    const notYetStarted = computed(() => {
      return props.game?.isNotYetStarted()
    })
    const ended = computed(() => {
      return props.game?.isEnded()
    })

    // emits declaration
    const emit = defineEmits(['startGame', 'endGame', 'restartGame'])

    // emits méthods
    const startGame = () => {
        emit('startGame')
    }
    const endGame = () => {
        emit('endGame')
    }
    const restartGame = () => {
        emit('restartGame')
    }
</script>