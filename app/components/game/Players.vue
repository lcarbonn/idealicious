<template>
    <UPageCard>
        <template #header>
            {{ nbPlayers }}
        </template>
    <UPageColumns>
        <UUser v-for="player in players"
            :name="player.name"
            :avatar="{
                icon:'streamline-color:user-circle-single-flat',
                class:variant(player)
            }"
            />
    </UPageColumns>
    </UPageCard>
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

    const variant = (player:IPlayer) => {
        if(authUser.value?.uid == player.uid) return "bg-success"
    }

</script>
