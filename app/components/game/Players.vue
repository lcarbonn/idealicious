<template>
    <UCard :title="nbPlayers">
        <UPageColumns>
            <GamePlayer v-for="player in players" :player="player" :uid="authUser.uid"/>
        </UPageColumns>
    </UCard>
</template>
<script setup lang="ts">

    // const
    const { t } = useI18n()

    const authUser = useAuthUser()

    const props = defineProps({
        players: {
                type: Array<IPlayer>,
                default: undefined
            },
    })

    const nbPlayers = computed(() => {
        return props.players?.length + t('players.number')
    })
</script>
