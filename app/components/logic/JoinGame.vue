<!-- Main page -->
<template>

    <GameJoinGame v-if="showForm" @joinGame="joinGame"/>
  
</template>

<script setup lang="ts">

    const { t } = useI18n()

    // emits declaration
    const emit = defineEmits(['playerJoined'])

    // props
    const props = defineProps({
      gameId: {
          type: String,
          default: null
      }
    })

    //local ref
    const showForm = ref(false)

    // global states
    const authUser = useAuthUser()
    const user = useUser()

    onMounted(() => {
        if(authUser.value) checkUser(authUser.value.uid)
    })
    // check if user already exists in the game
    watch(authUser, (newAuthUser)=>{
        if(newAuthUser) checkUser(newAuthUser.uid)
    })

    // emit methods
    // join the game
    const joinGame = (name:string) => {
        // console.log("join the game name=" + name)
        // add the player to the game
        addGamePlayer(props.gameId, authUser.value.uid, name)
        .then((player) => {
            messageToSnack(t('joinGame.welcomePlayer', {player: player.name}))
            emit("playerJoined", props.gameId, player.uid)
        })
    }

    // vérifie si l'utilisateur connecté est déjà player du jeu
    const checkJoined = (gameId:string, uid:string, name?:string) => {
        checkGamePlayerJoined(gameId, uid, name)
            .then((player) => {
                if(player) {
                    console.log("player already in the game, emit playerJoined ")
                    emit("playerJoined", props.gameId, uid)
                    messageToSnack(t('joinGame.welcomePlayer', {player: player.name}))
                } else {
                    console.log("player not known, show form")
                    showForm.value = true
                }
            })
    }
    // verifier si utilisateur connecté est un user existant
    const checkUser = (uid:string) => {
        getUser(uid).then((userDb) => {
            if(userDb) {
                user.value = userDb
                checkJoined(props.gameId, uid, user.value.name)
            } else {
                checkJoined(props.gameId, uid)
            }
        })
    }

</script>