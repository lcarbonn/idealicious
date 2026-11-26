<template>
  <UPageGrid class="lg:grid-cols-3">
    <UCard
      v-for="user in users"
      variant="subtle"
      class="text-xs"
      :title="user.name">
      <template #default>
        <div class="grid grid-cols-2 gap-2">
          <div>{{t('usersList.table.email')}}</div>
            <div class="font-semibold">{{user.email}}</div>
          <div>{{t('usersList.table.created')}}</div>
            <div class="font-semibold">{{dateFormatter(user.createdAt)}}</div>
          <div>{{t('usersList.table.updated')}}</div>
            <div class="font-semibold">{{dateFormatter(user.updatedAt)}}</div>
          <div>{{t('usersList.table.isAdmin')}}</div>
            <USwitch v-model="user.isAdmin" @click="changeIsAdmin(user)"/>
        </div>
        <UTooltip :text="t('usersList.delete')">
          <UButton icon="streamline-color:recycle-bin-2-flat" @click="askForDeleteUser()" class="mr-1" size="sm"></UButton>
        </UTooltip>

      </template>
      <!-- <template #footer class="justify-items-center">
        <ListGamesListActions
          :game="game"
          :isAdmin="isAdmin"
          @ask-for-delete-game="askForDeleteGame"
          />
      </template> -->
    </UCard>
  </UPageGrid>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()

  // props
    const props = defineProps({
        users: {
            type: Array<IUser>,
            default: undefined
        },
    })

  // emits declaration
  const emit = defineEmits<{
    changeIsAdmin: [user:IUser];
    askForDeleteUser: [user:IUser];
  }>()

  const changeIsAdmin = (user:IUser) => {
    emit('changeIsAdmin', user)
  }

  const askForDeleteUser = (user:IUser) => {
      emit('askForDeleteUser', user)
  }

</script>
