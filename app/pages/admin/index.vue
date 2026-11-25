<template>
    <div class="mt-3">
        <GameTitle :title="t('pageTitle.gamesList')"></GameTitle>
        <ListGamesList :isAdmin="true" :games="games" @deleteGame="deleteGameConfirmed"></ListGamesList>
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
    const deleteGameConfirmed = (game:IGame) => {
        deleteGame(game.id)
        .then(()=>{
            messageToSnack(t('gamesList.deleteGameConfirmed'))
        })
    }

</script>