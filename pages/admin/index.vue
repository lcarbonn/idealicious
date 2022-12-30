<template>
    <div>
        <AdminGamesList :games="games" @deleteGame="deleteGame"></AdminGamesList>
    </div>
</template>

<script>

export default {
    name: 'AdminPage',

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