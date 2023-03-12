<template>
  <div>
    <b-table
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="players"
    >
    <template #cell(isAdmin)="data">
      <b-form-checkbox v-model="data.value" switch disabled>
      </b-form-checkbox>
    </template>

    </b-table>
  </div>
</template>

<script>

import { BIcon, BIconPen, BIconTrash, BIconPlay } from 'bootstrap-vue'
import { dateFormatter } from '~/scripts/common.js'

export default {
  name: 'PlayersListComp',

  components: {
    BIcon,
    BIconPen,
    BIconPlay,
    BIconTrash
  },

  props: {
    players:{
            type: Array,
            default: null
        }
  },

  computed: {
      fields() {
          return [
            {
              key: 'name',
              label: 'Nom',
              sortable: true,
            },
            {
              key: 'email',
              label: 'Email',
              sortable: true
            },
            {
              key: 'isAdmin',
              label: 'isAdmin',
              sortable: true
            },
            {
              key: 'createdAt',
              label: 'Created',
              formatter: 'dateFormat',
              sortable: true
            },
            {
              key: 'updatedAt',
              label: 'Updated',
              formatter: 'dateFormat',
              sortable: true,
            },
          ]
      }
    },

  methods: {
      dateFormat(date) {
        return dateFormatter(date)
      },
      booleanFormatter(value) {
        return value ? 'Yes' : 'No'
      }
  }
}
</script>
