<template>
  <div>
    <b-table
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="players"
    >
    <template v-if="isAdmin" #cell(user.email)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonyme</span>
      </template>
    </b-table>
  </div>
</template>

<script>

import { BIcon, BIconPen, BIconTrash, BIconPlay } from 'bootstrap-vue'

export default {
  name: 'GamePlayersListComp',

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
        let fields = []
        fields.push (
          {
              key: 'name',
              label: 'Nom',
              sortable: true,
            },
        )
        if (this.isAdmin) {
          fields.push (
            {
                key: 'user.email',
                label: 'Email',
                sortable: true
              },
          )
        }
        fields.push (
          {
              key: 'playerId',
              label: 'Id Player',
              sortable: true
            },
        )
        fields.push (
          {
              key: 'round',
              label: 'Round',
              sortable: false,
            },
        )
        fields.push (
          {
              key: 'round',
              label: 'Round',
              sortable: false,
            },
        )
        return fields
      }
    }
}
</script>
