<template>
    <div>
        <ListPlayersList :game="game" :players="players"></ListPlayersList>
    </div>
</template>

<script>

export default {
    name: 'GamePlayersList',
    mounted () {
        this.$store.dispatch("games/getGame", this.id);
        this.$store.dispatch("players/getPlayers", this.id);
    },
    computed: {
        id() {
        return this.$route.params.agid;
        },
        game() {
            return this.$store.getters["games/game"];
        },
        players() {
            return this.$store.getters["players/players"];
        }
    }
}    

</script>