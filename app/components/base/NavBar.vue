<template>
  <div>
    <UHeader v-model:open="open">
      <template #title>
        <UAvatar
          class="rounded-none"
          src="/icon-64x64.png"/>Idealicious
      </template>

      <UNavigationMenu
        :items="items">
      </UNavigationMenu>
      <UiLocalePicker size="sm"/>
      <UiColorModePicker size="sm"/>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical">
        </UNavigationMenu>
        <UiLocalePicker size="sm" class="relative flex flex-col"/>
        <UiColorModePicker size="sm" class="relative flex flex-col px-2.5"/>
      </template>    

    </UHeader>
    <!-- modal for asking reset loves and delete -->
    <UiSimpleModal
      :open="modalResetLoves"
      :title="t('adminGame.resetLovesQuestion')"
      :description="t('adminGame.resetLovesQuestion')"
      @on-ok="resetLoves"/>
    <UiSimpleModal
      :open="modalDelete"
      :title="t('gamesList.deleteGameTitle')"
      :description="t('gamesList.deleteGameMessage')"
      @on-ok="confirmDelete"/>
    </div>
</template>
<script setup lang="ts">

  import type { NavigationMenuItem } from '@nuxt/ui'

  // i18N
  const { t } = useI18n()

  const modalResetLoves = ref(new ModalShow())
  const modalDelete = ref(new ModalShow())
  const open = ref(false)

  // global states
  const authUser = useAuthUser()
  const user = useUser()
  const player = usePlayer()
  const game = useGame()

  // computed properties
  const isAnonymous = computed(() => {
    return authUser.value?.isAnonymous
  })

  const isConnected = computed(() => {
    return authUser?.value?true:false
  })

  const userName = computed(() => {
    return user.value?.name ?? null
  })

  const playerName = computed(() => {
    return player.value?.name ?? userName.value
  })

  const isAdmin = computed(() => {
    return user.value?.isAdmin
  })

  const isMyGame = computed(() => {
    return game.value?.userUid == authUser.value.uid
  })

  // methods
  // sign out
  const signOut = () => {
    signOutUser().then(() => {
      useGame().value = undefined
      messageToSnack(t('login.signOutOk'))
      navigateTo('/')
    })
  }

  // export ideas to csv file
  const exportIdeas = () => {
    // console.log("export ideas asked")
    if(game?.value) {
      const gameId = game.value.id
      const separator = t('exportSeparator')
      const players = useGamePlayers()
      const ideas = useDecksWithIdeasSorted()
      exportCSVFile(gameId, separator, ideas.value, players.value )
    }
    }

    // ask before reset loves
    const askResetLoves = () => {
      open.value = !open.value
      modalResetLoves.value.show = !modalResetLoves.value.show
    }

    // reset loves
    const resetLoves = () => {
      if(game?.value) {
        const gameId = game.value.id
        const players = useGamePlayers()
        resetIdeasLoves(gameId)
          .then(() => {
              resetPlayersLoved(gameId, players.value)
              messageToSnack(t('adminGame.resetedLoves'))
          })
      }
    }

    // Restart the game
    const restartGame = () => {
      if(game?.value) {
        game.value.restartGame()
        updateGame(game.value)
      }
    }

    // methodes
    const askDeleteGame = () => {
      open.value = !open.value
      modalDelete.value.show = !modalDelete.value.show
    }
    const confirmDelete = () => {
      if(game?.value) {
          deleteGame(game.value.id)
          .then(()=>{
              messageToSnack(t('gamesList.deleteGameConfirmed'))
              navigateTo('/')
          })
        }
    }

  // set the list of navigation items
  const items = computed<NavigationMenuItem[]>(() => {
    const items:NavigationMenuItem[] = []

    // add active game menus
    if(game.value?.isEnded()  && (isMyGame.value || isAdmin.value)) {
    items.push(
      {
        label: t('navbar.actualGame'),
        icon: 'streamline-color:button-play-flat',
        children: [
            {
            label: t('actionBar.resetLoves'),
            icon: 'streamline-color:disable-heart-flat',
            onSelect: () => {
              askResetLoves()
            }},
            {
            label: t('actionBar.exportButton'),
            icon: 'streamline-color:download-circle-flat',
            onSelect: () => {
              exportIdeas()
            }},
            {
            label: t('actionBar.restart'),
            icon: 'streamline-color:arrow-round-left-flat',
            onSelect: () => {
              restartGame()
            }},
            {
            label: t('gamesList.delete'),
            icon: 'streamline-color:recycle-bin-2-flat',
            onSelect: () => {
              askDeleteGame()
            }}
        ]
      },
    )
    }
    // add my games list menu
    items.push(
      {
      label: t('navbar.myGamesList'),
      icon: "streamline-color:play-list-8-flat",
      to:"/games"
      }
    )

    // add admin menus
    if(isConnected.value && isAdmin.value) {
      items.push(
        {
        label: "Settings",
        icon: 'streamline-color:wrench-flat',
        children: [
          {
            label: t('navbar.gamesList'),
            icon: "streamline-color:play-list-8-flat",
            to:"/admin"
          },
          {
            label: t('navbar.usersList'),
            icon:"streamline-color:user-multiple-group-flat",
            to:"/admin/users"
          }
        ]
        }
      )
    }

    // loggedIn/logout mngt
    if(isConnected.value  && !isAnonymous.value) {
      items.push(
        {
          label: ""+playerName.value,
          icon:"streamline-color:user-circle-single-flat",
          children: [
            {
              label: t('navbar.logout'),
              icon: 'streamline-color:logout-1-flat',
              onSelect: () => {
                signOut()
              }
            },
          ]
        },
      )
    }
    if(!isConnected.value  || isAnonymous.value) {
      items.push(
        {
          label: t('navbar.login')+' / '+t('navbar.signup'),
          icon:"streamline-color:user-circle-single-flat",
          children: [
            {
              label: t('navbar.login'),
              icon: 'streamline-color:login-1-flat',
              to: '/login'
            },
            {
              label: t('navbar.signup'),
              icon: 'streamline-color:login-1-flat',
              to: '/signup'
            },
          ]
        },
      )
    }
    return items
  })

</script>
