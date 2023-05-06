<template>
    <b-table 
      striped
      hover
      stacked="lg"
      :fields="fields"
      :items="copiedGames"
    >
      <template #cell(user.name)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonymous</span>
      </template>
      <template #cell(show_details)="row">
          <b-button @click="row.toggleDetails" size="sm" v-b-tooltip.hover :title="$t('gamelistDetail')"><b-icon icon="toggles"/></b-button>
          <b-button :href="'/game/'+row.item.id" size="sm" v-b-tooltip.hover :title="$t('gamelistPlay')"><b-icon icon="play"/></b-button>
          <b-button :href="path+'/game/'+row.item.id" size="sm" v-b-tooltip.hover :title="$t('gamelistPeople')"><b-icon icon="people"/></b-button>
          <b-button @click="deleteGame(row.item.id, row.item.title)" size="sm" v-b-tooltip.hover :title="$t('gamelistDelete')"><b-icon icon="trash"/></b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row v-if="row.item.user">
            <b-col class="text-sm-right"><b>Email:</b></b-col>
            <b-col>{{ row.item.user.email }}</b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right"><b>Started:</b></b-col>
            <b-col><b-form-checkbox v-model="row.item.started" switch disabled/></b-col>
          </b-row>
          <b-row>
            <b-col class="text-sm-right"><b>Ended:</b></b-col>
            <b-col><b-form-checkbox v-model="row.item.ended" switch disabled/></b-col>
          </b-row>
        </b-card>
      </template>      
    </b-table>
</template>

<script>

import { BIcon, BIconPen, BIconTrash, BIconPlay, BIconPeople, BIconToggles } from 'bootstrap-vue'
import { dateFormatter } from '~/scripts/common.js'

export default {
  name: 'GamesListComp',

  components: {
    BIcon,
    BIconPen,
    BIconPlay,
    BIconPeople,
    BIconTrash,
    BIconToggles
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
      copiedGames() {
        const cg = []
        if(this.games) {
          this.games.forEach(game => {
            const ngame = {}
            Object.assign(ngame, game)
            cg.push(ngame)
          })
        }
        return cg
      },
      fields() {
        let fields = []
        fields.push (
          {
            key: 'title',
            label: 'Title',
            sortable: true,
          },
        )
        if (this.isAdmin) {
          fields.push (
            {
            key: 'user.name',
            label: 'User',
            sortable: true
            },
          )
        }
        fields.push (        
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
            key: 'show_details',
            label: 'Actions',
           },
        )
        return fields
      }
    },

    methods: {
      deleteGame(id, title) {
          this.$bvModal.msgBoxConfirm('Vraiment ?',  {
            title: 'Delete Game : ' + title,
            centered: true
          })
            .then(value => {
              if(value==true) this.$emit("deleteGame", id)
            })
      },
      dateFormat(date) {
        return dateFormatter(date)
      },
      booleanFormatter(value) {
        return value ? 'Yes' : 'No'
      }
  }
}
</script>
