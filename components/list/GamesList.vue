<template>
    <b-table 
      striped
      hover
      stacked="lg"
      :fields="fields"
      :items="games"
    >
      <template #cell(user.name)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonymous</span>
      </template>
      <template #cell(user.email)="data">
        <span v-if="data.value">{{data.value}}</span>
      </template>
      <template #cell(id)="data">
        <b-button :href="'/game/'+data.value" size="sm" v-b-tooltip.hover :title="$t('gamelistPlay')"><b-icon icon="play"/></b-button>
        <b-button :href="path+'/game/'+data.value" size="sm" v-b-tooltip.hover :title="$t('gamelistPeople')"><b-icon icon="people"/></b-button>
        <b-button @click="deleteGame(data.value)" size="sm" v-b-tooltip.hover :title="$t('gamelistDelete')"><b-icon icon="trash"/></b-button>
      </template>
    </b-table>
</template>

<script>

import { BIcon, BIconPen, BIconTrash, BIconPlay, BIconPeople } from 'bootstrap-vue'
import { dateFormatter } from '~/scripts/common.js'

export default {
  name: 'GamesListComp',

  components: {
    BIcon,
    BIconPen,
    BIconPlay,
    BIconPeople,
    BIconTrash
  },

  props: {
    isAdmin: {
            type: Boolean,
            default: false
    },
    games:{
            type: Array,
            default: null
        }
  },

   computed: {
      path() {
        if (this.isAdmin) return "/admin"
        else return "/games"
      },
      fields() {
        if (this.isAdmin) {
          return [
          {
            key: 'title',
            label: 'Title',
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
            key: 'createdAt',
            label: 'Created',
            sortable: true,
            formatter: 'dateFormat'
          },
          {
            key: 'updatedAt',
            label: 'Updated',
            sortable: true,
            formatter: 'dateFormat'
          },
          {
            key: 'started',
            label: 'Started',
            formatter: (value) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
          },
          {
            key:'ended',
            label: 'Ended',
            formatter: (value) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true
           },
           {
            key: 'id',
            label: 'Id Game',
            sortable: true
           }
          ]
        } else {
          return [
          {
            key: 'title',
            label: 'Title',
            sortable: true,
          },
          {
            key: 'createdAt',
            label: 'Created',
            sortable: true,
            formatter: 'dateFormat'
          },
          {
            key: 'updatedAt',
            label: 'Updated',
            sortable: true,
            formatter: 'dateFormat'
          },
          {
            key: 'started',
            label: 'Started',
            formatter: (value) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
          },
          {
            key:'ended',
            label: 'Ended',
            formatter: (value) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true
           },
           {
            key: 'id',
            label: 'Id Game',
            sortable: true
           }
          ]
        }
      }
    },

    methods: {
      deleteGame(id) {
          this.$bvModal.msgBoxConfirm('Vraiment ?',  {
            title: 'Delete Game',
            centered: true
          })
            .then(value => {
              if(value==true) this.$emit("deleteGame", id)
            })
      },
      dateFormat(date) {
        return dateFormatter(date)
      }
  }
}
</script>
