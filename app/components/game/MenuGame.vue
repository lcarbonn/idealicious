<template>
    <BContainer>
        <BRow>
            <BCol>
                <!-- <BCard variant="primary"> -->
                    <GameActionsBar :game="game"
                        @start-game="startGame"
                        @end-game="endGame"
                        @restart-game="restartGame"/>
                <!-- </BCard> -->
            </BCol>
        </BRow>
    </BContainer>
</template>
<script setup lang="ts">

    // const
    const { t } = useI18n()

    const props = defineProps({
      game: {
          type: Game,
          default: null
      }
    })

    // emited methods
    // start the game
    const startGame = () => {
        // console.log("start the game")
        if(props.game) {
            props.game.startGame()
            updateGame(props.game)
            // isAnimatorView.value=false
            messageToSnack(t('adminGame.startGame'))
        }
    }

    // end the game
    const endGame = () => {
        console.log("end the game")
        if(props.game) {
            props.game.stopGame()
            updateGame(props.game)
            messageToSnack(t('adminGame.endGame'))
        }
    }

    // restart the game
    const restartGame = () => {
        console.log("restart the game")
        if(props.game) {
            props.game.restartGame()
            updateGame(props.game)
            messageToSnack(t('adminGame.gameStarted'))
        }
    }

</script>
  