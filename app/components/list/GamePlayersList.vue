<template>
  <UTable
    sticky
    :data="players"
    :columns="columns"
    :empty="t('playersList.empty')">
  </UTable>
</template>

<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui';

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

  // properties of the players table
  const columns: TableColumn<IPlayer>[] = [
    {
      accessorKey: 'name',
      header: t('playersList.table.name')
    },
    {
      accessorKey: 'playerId',
      header: t('playersList.table.playerId'),
    },
    {
      accessorKey: 'round',
      header: t('playersList.table.round'),
    }
  ]
  // ajouter email du joueur si user est admin
  if(props.isAdmin) {
    columns.splice(1,0,
      {
        accessorKey: 'user.email',
        header: t('playersList.table.email'),
        cell: ({ row }) => {
          if(row.original.user?.email) return row.original.user.email
          else return "Anonyme"
        }
      }
    )
  }
</script>
