<template>
  <div>
    <UTable
      sticky
      :data="users"
      :columns="columns">
      <template #isAdmin-cell="{ row }">
        <USwitch v-model="(row.original as IUser).isAdmin" switch @click="changeIsAdmin(row.original)"/>
      </template>
      <template #action-cell="{ row }">
        <UTooltip :text="t('usersList.delete')">
          <UButton icon="streamline-color:recycle-bin-2-flat" @click="askForDeleteUser()" class="mr-1" size="sm"></UButton>
        </UTooltip>
      </template>
    </UTable>
    <UiSimpleModal
      :open="modalDeleteLigne"
      :title="t('usersList.deleteUserTitle')"
      :description="t('usersList.deleteUserMessage')"
      @on-ok="confirmDelete"/>
  </div>
</template>

<script setup lang="ts">

import type { TableColumn } from '@nuxt/ui';

    // for lang
    const { t } = useI18n()
  
    //local ref
    const modalDeleteLigne = ref(new ModalShow())
    const selectedUser = ref()

    // props
    const props = defineProps({
        users: {
            type: Array<IUser>,
            default: undefined
        },
    })

  // properties of the users table
  const columns = computed<TableColumn<IUser>[]>(() => [
    {
      accessorKey: 'name',
      header: t('usersList.table.name')
    },
    {
      accessorKey: 'email',
      header: t('usersList.table.email'),
    },
    {
      accessorKey: 'isAdmin',
      header: t('usersList.table.isAdmin'),
    },
    {
      accessorKey: 'createdAt',
      header: t('usersList.table.created'),
      cell: ({ row }) => {
        return dateFormatter(row.original.createdAt)
      }
    },
    {
      accessorKey: 'updatedAt',
      header: t('usersList.table.updated'),
      cell: ({ row }) => {
        return dateFormatter(row.original.updatedAt)
      }
    },
    {
      id: 'action',
      header: 'Actions',      
    }
  ])

  // emits declaration
  const emit = defineEmits(['deleteUser', 'changeIsAdmin'])


  const changeIsAdmin = (user:IUser) => {
    user.isAdmin = !user.isAdmin
    user.updatedAt = new Date().getTime()
    emit('changeIsAdmin', user)
  }

  // methodes
  const askForDeleteUser = (user:IUser) => {
    selectedUser.value = user
    modalDeleteLigne.value.show = !modalDeleteLigne.value.show;
  }
  const confirmDelete = () => {
    emit('deleteUser', selectedUser.value.uid)
  }

</script>
