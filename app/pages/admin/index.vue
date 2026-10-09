<template>
    <div class="mt-3">
        <GameTitle :title="t('pageTitle.gamesList')"></GameTitle>
        <ListGamesList :isAdmin="true" :games="games" @deleteGame="askDeleteGame"></ListGamesList>
    </div>
</template>

<script setup lang="ts">

    // i18N
    const { t } = useI18n()

    // global refs
    const games = useGames()

    // get the games
    onMounted(() => {
        getGames()
    })

    //methods
    const askDeleteGame = (game:IGame) => {
        // console.log("delete Game id:"+game.id + ", title:"+game.title)
        deleteGame(game.id)
        .then(()=>{
            messageToSnack(t('gamesList.deleteGameConfirmed'))
        })
    }

</script>