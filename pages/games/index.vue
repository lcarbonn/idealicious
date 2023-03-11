<template>
    <div>
        <ListGamesList :games="games" @deleteGame="deleteGame"></ListGamesList>
    </div>
</template>

<script>
export default {
    name: 'GamesList',
    mounted () {
        this.$store.dispatch("games/getUserGames", this.uid)
        this.$store.dispatch("navbar/setTitle", this.$i18n.t('navbarMyGameListTitle'))
    },
    computed: {
        games() {
            return this.$store.getters["games/games"];
        },
        uid() {
            return this.$store.getters["auth/getUserUid"]
        }
    },
    methods: {
        deleteGame(gameId) {
            console.debug("deleteGame :" + gameId)
            this.$store.dispatch("games/deleteGame", gameId)
            .then(() => {
                this.$store.dispatch("games/getUserGames", this.uid)
                }
            )
        }
    }
}    

</script>