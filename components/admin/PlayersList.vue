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
  name: 'AdminGameComp',
  mixins: [global],
  components: {
    BIcon,
    BIconPen,
    BIconPlay,
    BIconTrash
  },

  props: {
    game: Object,
    players:{
            type: Array,
            default: null
        }
  },

  data: () => ({
      fields: [
          {
            key: 'name',
            label: 'Nom',
            sortable: true,
          },
          {
            key: 'id',
            label: 'Uid',
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
      ],
    })
}
</script>
