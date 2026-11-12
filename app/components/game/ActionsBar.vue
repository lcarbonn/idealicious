<template>
    <UCard fluid class="text-center">
      <UTooltip :text="t('actionBar.start')" v-if="notYetStarted">
        <UButton :label="t('actionBar.start')" icon="streamline-color:button-play-flat" @click="startGame"></UButton>
      </UTooltip>
      <UTooltip :text="t('actionBar.end')" v-if="started">
        <UButton :label="t('actionBar.end')" icon="streamline-color:button-stop-flat" @click="endGame"></UButton>
      </UTooltip>
      <UTooltip :text="t('actionBar.restart')" v-if="ended">
        <UButton :label="t('actionBar.restart')" icon="streamline-color:button-play-flat" @click="restartGame"></UButton>
      </UTooltip>
    </UCard>
</template>

<script setup lang="ts">

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