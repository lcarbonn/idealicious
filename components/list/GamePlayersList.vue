<template>
  <div>
    <BTable
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="players"
      show-empty
      :empty-text="t('playersList.empty')"
    >
      <template v-if="isAdmin" #cell(user.email)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonyme</span>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
import type { TableFieldRaw } from 'bootstrap-vue-next'


    // for lang
    const { t } = useI18n()

    // props
    const props = defineProps({
        isAdmin: {
            type: Boolean,
            default: false
        },
        players: {
            type: Array<IPlayer>,
            default: undefined
        },
    })

    // const fields for table
    let fields:TableFieldRaw<IPlayer>[] = []
    fields.push (
      {
          key: 'name',
          label: t('playersList.table.name'),
          sortable: true,
        },
    )
    if (props.isAdmin) {
      fields.push (
        {
            key: 'user.email',
            label: t('playersList.table.email'),
            sortable: true
          },
      )
    }
    fields.push (
      {
          key: 'playerId',
          label: t('playersList.table.playerId'),
          sortable: true
        },
    )
    fields.push (
      {
          key: 'round',
          label: t('playersList.table.round'),
          sortable: false,
        },
    )
</script>
