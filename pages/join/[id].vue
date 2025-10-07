<!-- Main page -->
<template>
    <div>
      <BaseTitle :title="gameTitle"></BaseTitle>
      <LogicJoinGame :gameId="gameId" @playerJoined="playerJoined"/>
    </div>
</template>

<script setup lang="ts">

    const gameId:string = useRoute().params.id as string

    // stated properties
    const game = useGame()

    //get the game
    onMounted(() => {
        getGame(gameId)
    })

    const playerJoined = (gameId:string, playerUid:string) => {
        navigateTo("/game/"+gameId+"/player/" + playerUid)
    }

    // computed properties
    const gameTitle = computed(() => {
      return game.value?.title
    })

</script>