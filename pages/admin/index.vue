<template>
    <div>
        <ListGamesList :isAdmin="true" :games="games" :users="users" @deleteGame="deleteGame"></ListGamesList>
    </div>
</template>

<script>
import authentasadmin from '~/mixins/authentasadmin.js';

export default {
    name: 'AdminGamesList',
    mixins: [authentasadmin],
    mounted () {
        this.$store.dispatch("games/getGames")
        this.$store.dispatch("users/getUsers")
    },
    computed: {
        games() {
            return this.$store.getters["games/games"];
        },
        users() {
            return this.$store.getters["users/users"];
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