<template>
    <UCard :title="nbPlayers">
        <UPageGrid
            :ui= "{
              base: 'relative grid grid-cols-'+getCols(players?.length)+' md:grid-cols-'+players?.length+' lg:grid-cols-'+players?.length
            }"
            >
            <GamePlayer v-for="player in players" :player="player" :uid="authUser.uid"/>
        </UPageGrid>
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

    const max = 3
    const getCols = (cols:number|undefined) => {
        if (!cols) return max
        return cols < 3 ? cols : max
    }
    const nbPlayers = computed(() => {
        return props.players?.length + t('players.number')
    })
</script>
