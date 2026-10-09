<template>
    <BContainer v-if='game' fluid>
        <BRow  class="mt-3">
            <BCol>
                <GameTitleChange :title="gameTitle" @updateGameTitle="updateGameT"/>
            </BCol>
        </BRow>
        <BRow>
            <BCol>
                <BAccordion v-if="notStarted" class="mt-3">
                    <BAccordionItem :title="getTitle" :model-value="showGameInfo" visible>
                        <GameAdminGame v-if="!ended" :game="game"/>
                    </BAccordionItem>
                </BAccordion>
            </BCol>
        </BRow>
        <BRow>
            <BCol>
                <GameMenuGame :game="game" class="mt-3"/>
            </BCol>
        </BRow>
        <BRow>
            <BCol>
                <GamePlayers :players="players" class="mt-3 mb-3" />
            </BCol>
        </BRow>
        <BRow>
            <BCol>
                <BCard v-if="!isKnowPlayer">{{t('playerGame.notInGame')}}</BCard>
                <LogicJoinGame v-if="!isKnowPlayer && game.isNotYetStarted()" :gameId="gameId"/>
                <LogicPlayerGame v-if="isKnowPlayer" :gameId="gameId" :uid="authUser.uid"/>
                <BCard v-if="ended && !showGameIdeas && isKnowPlayer" :title="t('playerGame.ended')">
                    <ListIdeasChain :gameId="gameId" :uid="authUser.uid":decksWithIdeas="decksWithIdeas" :players="players"/>
                    <BCardText class="text-center" align-h="around">
                        <BButton pill @click="valideVotes">{{t('playerGame.validateVotes')}}</BButton>
                    </BCardText>
                </BCard>
                <BCard v-if="ended && (showGameIdeas || !isKnowPlayer)" :title="t('adminGame.allIdeas')">
                    <ListIdeasChain :gameId="gameId" :uid="authUser.uid":decksWithIdeas="decksWithIdeasSorted" :players="players" disabled/>
                    <!-- possible add change votes button -->
                </BCard>                
            </BCol>
        </BRow>
    </BContainer>
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

    // recup titre
    const getTitle = computed(() => {
        if(game.value?.isEnded()) return t('adminGame.gameEnded')
        if(game.value?.isStarted()) return t('adminGame.gameStarted')
        if(game.value?.isNotYetStarted()) return t('adminGame.gameNotYetStarted')
    })

    // game ended ?
    const ended = computed(() => {
        return game.value?.isEnded()
    })

    const notStarted = computed(() => {
        return game.value?.isNotYetStarted()
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
