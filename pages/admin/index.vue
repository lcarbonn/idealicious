<template>
    <div>
        <ListGamesList :isAdmin="true" :games="games" @deleteGame="deleteGame"></ListGamesList>
    </div>
</template>

<script>
import authentasadmin from '~/mixins/authentasadmin.js';

export default {
    name: 'AdminGamesList',
    mixins: [authentasadmin],
    mounted () {
        this.$store.dispatch("games/getGames")
    },
    computed: {
        games() {
            return this.$store.getters["games/games"];
        }
    },
    methods: {
        deleteGame(gameId) {
            console.debug("deleteGame :" + gameId)
            this.$store.dispatch("games/deleteGame", gameId)
        }
    }
}    

</script>