<template>
  <div>
    <UTable
      sticky
      :data="games"
      :columns="columns"
      :empty="t('gamesList.empty')">
      <template #action-cell="{ row }">
        <ListGamesListActions
          :game="row.original"
          :isAdmin="isAdmin"
          @ask-for-delete-game="askForDeleteGame"
          >
          <UTooltip :text="t('gamesList.detail')">
            <UButton icon="streamline-color:pencil-flat" @click="expandGame(row)" class="mr-1" size="sm"></UButton>
          </UTooltip>
      </ListGamesListActions>
      </template>
      <template #expanded="{ row }">
          <UPageGrid v-if="row.original.user" class="mb-1">
            <span><b>Owner:</b></span>
            <span>{{ (row.original.user as IUser).email }}</span>
          </UPageGrid>
          <UPageGrid class="mb-1">
            <span><b>Started:</b></span>
            <USwitch v-model="(row.original as IGame).started" disabled/>
          </UPageGrid>
          <UPageGrid>
            <span><b>Ended:</b></span>
            <USwitch v-model="(row.original as IGame).ended" disabled/>
          </UPageGrid>
      </template>      
    </UTable>
  </div>
</template>

<script setup lang="ts">
  
    import type { TableColumn, TableRow } from '@nuxt/ui';
    
    // for lang
    const { t } = useI18n()

    // props
    const props = defineProps({
        isAdmin: {
            type: Boolean,
            default: false
        },
        games: {
            type: Array<IGame>,
            default: undefined
        },
    })

  // properties of the games table
  const columns = computed<TableColumn<IGame>[]>(() => [
    {
      accessorKey: 'title',
      header: t('gamesList.table.title')
    },
    {
      accessorKey: 'createdAt',
      header: t('gamesList.table.created'),
      cell: ({ row }) => {
        return dateFormatter(row.original.createdAt)
      }
    },
    {
      accessorKey: 'updatedAt',
      header: t('gamesList.table.updated'),
      cell: ({ row }) => {
        return dateFormatter(row.original.updatedAt)
      }
    },
    {
      id: 'action',
      header: 'Actions',      
    }
  ])
  // ajouter nom de l'animateur si user est admin
  if(props.isAdmin) {
    columns.value.splice(1,0,
      {
        accessorKey: 'name',
        header: t('gamesList.table.user'),
        cell: ({ row }) => {
          return row.original.user?.name
        }
      }
    )
  }

  // emits declaration
  const emit = defineEmits(['askForDeleteGame'])

  // methodes
  // ask for game deletion
  const askForDeleteGame = (game:IGame) => {
    emit('askForDeleteGame', game)
  }
  
  // expand the line of the game to show details
  const expandGame = (row:TableRow<IGame>) => {
    row.toggleExpanded()
  }

</script>
