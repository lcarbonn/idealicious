<template>
    <div>
        <ListGamesList :games="games" @deleteGame="deleteGame"></ListGamesList>
    </div>
</template>

<script>
export default {
    name: 'GamesList',
    mounted () {
        const uid = this.$store.getters["auth/getUserUid"]
        this.$store.dispatch("games/getUserGames", uid)
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