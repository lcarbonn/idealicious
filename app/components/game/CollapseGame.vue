<template>
    <UCollapsible v-if="notStarted" v-model:open="open">
        <UButton
        :label="getTitle"
        trailing-icon="i-lucide-chevron-down"
        block
        />
        <template #content>
            <GameAdminGame v-if="!ended" :game="game"/>
        </template>
    </UCollapsible>
</template>

<script setup lang="ts">

    // const
    const { t } = useI18n()

    const props = defineProps({
      game: {
          type: Game,
          default: null
      }
    })

    const open = ref(true)

    const ended = computed(() => {
        return props.game?.isEnded()
    })

    const notStarted = computed(() => {
        return props.game?.isNotYetStarted()
    })

    // recup titre
    const getTitle = computed(() => {
        if(props.game?.isEnded()) return t('adminGame.gameEnded')
        if(props.game?.isStarted()) return t('adminGame.gameStarted')
        if(props.game?.isNotYetStarted()) return t('adminGame.gameNotYetStarted')
    })

</script>