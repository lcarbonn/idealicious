<template>
    <div>
        <ListPlayersList :players="players" @deletePlayer="deletePlayer"></ListPlayersList>
    </div>
</template>

<script>
import authentasadmin from '~/mixins/authentasadmin.js';

export default {
    name: 'AdminGamesList',
    mixins: [authentasadmin],
    mounted () {
        this.$store.dispatch("users/getUsers")
        this.$store.dispatch("navbar/setTitle", this.$i18n.t('navbarPlayerListTitle'))
    },
    computed: {
        players() {
            return this.$store.getters["users/users"];
        }
    },
    methods: {
        deletePlayer(gameId) {
            // console.debug("deleteGame :" + gameId)
            // this.$store.dispatch("games/deleteGame", gameId)
            // .then(() => {
            //     this.$store.dispatch("games/getGames")
            //     }
            // )
        }
    }
}    

</script>