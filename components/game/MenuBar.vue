<template>
    <BContainer class="position-fixed fixed-bottom"
               style="z-index: 1000;"
               >
        <BRow>
            <BCol>
                <BCard variant="primary">
                    <GameActionsBar :game="game"
                        @start-game="startGame"
                        @end-game="endGame"/>
                </BCard>
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
        console.log("start the game")
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
  </script>
  