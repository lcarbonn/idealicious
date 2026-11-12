<template>
    <UPageCard>
        <template #header>
            {{ nbPlayers }}
        </template>
    <UPageColumns>
        <UCard v-for="player in players">
            <UBadge 
            :label="player.name"
            :color="variant(player)"
            icon="streamline-color:user-circle-single-flat"
            class="font-bold rounded-full"
            />
        </UCard>
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
        if(authUser.value?.uid == player.uid) return "success"
    }

</script>
