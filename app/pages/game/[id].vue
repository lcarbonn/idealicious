<template>
    <div v-if="game">
        <GameTitleChange :title="gameTitle" @updateGameTitle="updateGameT"/>
        <GameCollapseGame :game="game"/>
        <GameMenuGame :game="game"  class="mb-3 mt-3"/>
        <GamePlayers :players="players"/>
        <LogicJoinGame v-if="!isKnowPlayer && game.isNotYetStarted()" :gameId="gameId"/>
        <LogicPlayerGame v-if="isKnowPlayer" :gameId="gameId" :uid="authUser.uid"/>
        <div v-if="ended">
            <UCard v-if="!showGameIdeas && isKnowPlayer" :title="t('playerGame.ended')">
                <ListIdeasChain :gameId="gameId" :uid="authUser.uid":decksWithIdeas="decksWithIdeas" :players="players"/>
                <template #footer class="text-center" align-h="around">
                    <UButton @click="valideVotes">{{t('playerGame.validateVotes')}}</UButton>
                </template>
            </UCard>
            <UCard v-else :title="t('adminGame.allIdeas')">
                <ListIdeasChain :gameId="gameId" :uid="authUser.uid":decksWithIdeas="decksWithIdeas" :players="players" disabled/>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">

    // use game layout
    definePageMeta({
        layout: 'game'
    })

    // const
    const { t } = useI18n()
    //get the game id
    const gameId:string = useRoute().params.id as string

    const authUser = useAuthUser();

    // local ref
    const showGameInfo = ref(true)

    // stated properties
    const game = useGame()
    const player = usePlayer()
    const players = useGamePlayers()

    // stated properties
    const decksWithIdeas = useDecksWithIdeas()
    const decksWithIdeasSorted = useDecksWithIdeasSorted()

    onMounted(() => {
        // start listing the game
        listenGame(gameId)
        // listening to players of the game
        listenGamePlayer(gameId, authUser.value.uid)
        listenGamePlayers(gameId)
        // start listing the decks and ideas sorted by loves
        listenDecksIdeas(gameId)
        listenDecksIdeasSorted(gameId)
    })

      // computed properties
    const gameTitle = computed(() => {
        return game.value?.title
    })

    // is the player in the game
    const isKnowPlayer = computed(() => {
        return player.value?true:false
    })
    // does the player already validated is loves
    const showGameIdeas = computed(() => {
        return player.value?.loved
    })

    // game ended ?
    const ended = computed(() => {
        return game.value?.isEnded()
    })

    // mise à jour du titre du jeu
    const updateGameT = (newTitle:string) => {
        if(game.value) {
            game.value.title = newTitle
            updateGameTitle(game.value)
            .then(() => {
                messageToSnack(t('adminGame.titleChanged'))
            })
        }
    }

    // le joueur valide ses votes
    const valideVotes = () => {
        validateLoves(gameId, authUser.value.uid)
    }

</script>
