<template>
    <BCard>
        <BContainer>
            <BRow class="text-center" align-h="around">
                <BCol v-for="player in players">
                    <BAvatar
                        size="md"
                        :badge="player.name"
                        badge-placement="bottom"
                        :variant="variant(player)"
                        badge-text-variant="white"><Person/></BAvatar>
                </BCol>
            </BRow>
        </BContainer>
    </BCard>
</template>
<script setup lang="ts">

    // icons
    import People from '~icons/bi/people'
    import Person from '~icons/twemoji/person'

    const authUser = useAuthUser()

    const props = defineProps({
        players: {
                type: Array<IPlayer>,
                default: undefined
            },
    })

    const variant = (player:IPlayer) => {
        if(authUser.value?.uid == player.uid) return "danger"
    }

</script>