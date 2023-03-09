<template>
  <div>
    <b-table
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="players"
    >
    </b-table>
  </div>
</template>

<script>

import { BIcon, BIconPen, BIconTrash, BIconPlay } from 'bootstrap-vue'

export default {
  name: 'PlayersListComp',

  components: {
    BIcon,
    BIconPen,
    BIconPlay,
    BIconTrash
  },

  props: {
    isAdmin: {
            type: Boolean,
            default: false
        },
    game: Object,
    players:{
            type: Array,
            default: null
        }
  },

  computed: {
      fields() {
        if (this.isAdmin) {
          return [
            {
              key: 'name',
              label: 'Nom',
              sortable: true,
            },
            {
              key: 'id',
              label: 'User ID',
              sortable: true,
            },
            {
              key: 'round',
              label: 'Round',
              sortable: true,
            },
            {
              key: 'playerId',
              label: 'Id Player',
              sortable: true
            }
          ]
        } else {
          return [
            {
              key: 'name',
              label: 'Nom',
              sortable: true,
            },
            {
              key: 'round',
              label: 'Round',
              sortable: true,
            },
            {
              key: 'playerId',
              label: 'Id Player',
              sortable: true
            }
          ]
        }
      }
    }
}
</script>
