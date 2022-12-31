<template>
  <div>
    <b-table 
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="games"
    >
      <template #cell(id)="data">
        <b-button :href="'/game/'+data.value" size="sm" v-b-tooltip.hover :title="$t('gamelistPlay')"><b-icon icon="play"/></b-button>
        <b-button :href="'/admin/game/'+data.value" size="sm" v-b-tooltip.hover :title="$t('gamelistPeople')"><b-icon icon="people"/></b-button>
        <b-button @click="deleteGame(data.value)" size="sm" v-b-tooltip.hover :title="$t('gamelistDelete')"><b-icon icon="trash"/></b-button>
      </template>
    </b-table>
  </div>
</template>

<script>

import { BIcon, BIconPen, BIconTrash, BIconPlay, BIconPeople } from 'bootstrap-vue'

export default {
  name: 'GamesListComp',
  // mixins: [global],
  components: {
    BIcon,
    BIconPen,
    BIconPlay,
    BIconPeople,
    BIconTrash
  },

  props: {
    games:{
            type: Array,
            default: null
        }
  },

  data: () => ({
      fields: [
          {
            key: 'title',
            label: 'Title',
            sortable: true,
          },
          {
            key: 'started',
            sortable: true,
          },
          {
            key:'ended',
            sortable: true
           },
           {
            key: 'id',
            label: 'Id Game',
            sortable: true
           }
      ],
    }),
    methods: {
      deleteGame(id) {
          this.$bvModal.msgBoxConfirm('Vraiment ?',  {
            title: 'Delete Game',
            centered: true
          })
            .then(value => {
              if(value==true) this.$emit("deleteGame", id)
            })
      }
  }
}
</script>
