<template>
  <div>
    <UTable
      sticky
      :data="games"
      :columns="columns"
      :empty="t('gamesList.empty')">
      <template #action-cell="{ row }">
        <ListGameButton
          :row="row"
          :isAdmin="isAdmin"
          @expand-game="expandGame"
          @ask-for-delete-game="askForDeleteGame"
          />
      </template>
      <template #expanded="{ row }">
          <UPageGrid v-if="row.original.user">
            <span class="text-sm-right"><b>Owner:</b></span>
            <span>{{ (row.original.user as IUser).email }}</span>
          </UPageGrid>
          <UFormField label="Started:">
            <USwitch v-model="(row.original as IGame).started" switch disabled/>
          </UFormField>
          <UFormField label="Ended:">
            <USwitch v-model="(row.original as IGame).ended" switch disabled/>
          </UFormField>
      </template>      
    </UTable>
    <UiSimpleModal
      :open="modalDeleteLigne"
      :title="t('gamesList.deleteGameTitle')"
      :description="t('gamesList.deleteGameMessage')"
      @on-ok="confirmDelete"/>
  </div>
</template>

<script setup lang="ts">
  
    import type { TableColumn, TableRow } from '@nuxt/ui';
    
    // for lang
    const { t } = useI18n()
    //local ref
    const selectedGame = ref()
    const modalDeleteLigne = ref(new ModalShow())

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
  const emit = defineEmits(['deleteGame'])

  // methodes
  // ask for game deletion, open modal
  const askForDeleteGame = (game:IGame) => {
    selectedGame.value = game
    modalDeleteLigne.value.show = !modalDeleteLigne.value.show;
  }
  // delete confirmed
  const confirmDelete = () => {
    emit('deleteGame', selectedGame.value)
  }
  // expand the line of the game to show details
  const expandGame = (row:TableRow<IGame>) => {
    row.toggleExpanded()
  }

</script>
