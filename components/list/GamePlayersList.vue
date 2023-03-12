<template>
  <div>
    <b-table
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="players"
    >
      <template #cell(user.name)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonymous</span>
      </template>
      <template #cell(user.email)="data">
        <span v-if="data.value">{{data.value}}</span>
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
        if (this.isAdmin) {
          return [
            {
              key: 'name',
              label: 'Nom',
              sortable: true,
            },
            {
            key: 'user.name',
            label: 'User',
            sortable: true
            },
            {
              key: 'user.email',
              label: 'Email',
              sortable: true
            },
            {
              key: 'playerId',
              label: 'Id Player',
              sortable: true
            },
            {
              key: 'round',
              label: 'Round',
              sortable: false,
            },
          ]
        } else {
          return [
            {
              key: 'name',
              label: 'Nom',
              sortable: true,
            },
            {
              key: 'playerId',
              label: 'Id Player',
              sortable: true
            },
            {
              key: 'round',
              label: 'Round',
              sortable: false,
            },
          ]
        }
      }
    }
}
</script>
