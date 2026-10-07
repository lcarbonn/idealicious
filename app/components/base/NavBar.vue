<template>
  <client-only>
  <BNavbar :toggleable="true" variant="dark" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand>
      <BLink to="/" class="navbar-brand" style="font-weight: 800;">
      <BAvatar variant="dark" rounded
                  src="/icon.png"></BAvatar> Idealicious
                </BLink>
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse"/>
    <BOffcanvas id="nav-collapse" 
        placement="end"
        v-model="showMenu"
        title="Idealicious" 
        is-nav 
        style="background-color:var(--bs-primary);color:var(--bs-white)">
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown right v-if="game?.isEnded && (isMyGame || isAdmin)">
            <template #button-content>
              <em>{{ t('navbar.actualGame')}}</em>
            </template>
            <BDropdownItem variant="primary" @click="askResetLoves"><HeartBreak/> {{ t('actionBar.resetLoves')}}</BDropdownItem>
            <BDropdownItem variant="primary" @click="exportIdeas"><Download/> {{ t('actionBar.exportButton')}}</BDropdownItem>
            <BDropdownItem variant="primary" @click="restartGame"><ArrowCounterClockwise/> {{ t('actionBar.restart')}}</BDropdownItem>
            <BDropdownItem variant="primary" @click="askDeleteGame"><Trash/> {{ t('gamesList.delete')}}</BDropdownItem>
        </BNavItemDropdown>
        <BNavItem @click="showMenu=!showMenu"
              v-show="isConnected && isAdmin"
                to="/admin">{{t('navbar.gamesList')}}</BNavItem>
        <BNavItem @click="showMenu=!showMenu"
              v-show="isConnected && isAdmin"
                to="/admin/users">{{t('navbar.usersList')}}</BNavItem>
        <BNavItem @click="showMenu=!showMenu"
                to="/games">{{t('navbar.myGamesList')}}</BNavItem>
        <BNavItemDropdown right>
            <template #button-content>
              <em v-if="userName">{{userName}}&nbsp;</em>
              <em v-if="!userName && playerName">{{playerName}}&nbsp;</em>
              <em><Person/></em>
            </template>
            <BDropdownItem @click="showMenu=!showMenu" v-if="!isConnected || isAnonymous" to="/login" variant="primary">{{t('navbar.login')}}</BDropdownItem>
            <BDropdownItem @click="showMenu=!showMenu" v-if="!isConnected || isAnonymous" to="/signup" variant="primary">{{t('navbar.signup')}}</BDropdownItem>
            <BDropdownItem v-if="isConnected  && !isAnonymous" @click="signOut()" variant="primary">{{t('navbar.logout')}}</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
            <template #button-content>
              <em>Lang</em>
            </template>
            <BDropdownItem v-for="locale in availableLocales" @click="changeLocale(locale.code)" variant="primary">{{ locale.name }}</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <template #button-content>
              <em>
                <Moon v-if="colorMode=='dark'"/>
                <Sun v-if="colorMode=='light'"/>
                <Auto v-if="colorMode=='auto'"/>
              </em>
            </template>
          <BDropdownItem @click="changeColor('light')" variant="primary"><Sun/> light</BDropdownItem>
          <BDropdownItem @click="changeColor('dark')" variant="primary"><Moon/> dark</BDropdownItem>
          <BDropdownItem @click="changeColor('auto')" variant="primary"><Auto/> auto</BDropdownItem>
        </BNavItemDropdown>
        <BNavItem @click="showMenu=!showMenu"
          to="/mentions-legales">{{$t('legalNotices')}}</BNavItem>
      </BNavbarNav>
    </BOffcanvas >
    <BModal v-model="modalDelete" @ok="confirmDelete" centered  :title="t('gamesList.deleteGameTitle')"> {{t('gamesList.deleteGameMessage')}}</BModal>
    <BModal v-model="modalResteLoves" @ok="resetLoves" centered  :title="t('adminGame.resetLovesQuestion')"> {{t('adminGame.resetLovesQuestion')}}</BModal>        
  </BNavbar>
  </client-only>
</template>

<script setup lang="ts">

  // color mode
  import {useColorMode} from 'bootstrap-vue-next'
  import type { Locale } from 'vue-i18n';
  // icons
  import Sun from '~icons/bi/sun'
  import Moon from '~icons/bi/moon-stars'
  import Auto from '~icons/bi/circle-half'
  import Person from '~icons/bi/person'
  import HeartBreak from '~icons/bi/heartbreak'
  import ArrowCounterClockwise from '~icons/bi/arrow-counterclockwise'
  import Download from '~icons/bi/download'
  import Trash from '~icons/bi/trash'

  import {vBColorMode} from 'bootstrap-vue-next'

  // i18N
  const { t } = useI18n()
  const { locale, locales, setLocale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  
  const showMenu = ref(false)
  const colorMode = useColorMode({persist:true})
  const modalResteLoves = ref(false)
  const modalDelete = ref(false)

  const availableLocales = computed(() => {
    return locales.value
  })

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
    return authUser?.value
  })

  const playerName = computed(() => {
    return player.value?.name ?? null
  })

  const userName = computed(() => {
    return user.value?.name ?? null
  })
  const isAdmin = computed(() => {
    return user.value?.isAdmin
  })

  const isMyGame = computed(() => {
    return game.value?.userUid == authUser.value.uid
  })

  // methods
  const signOut = () => {
    signOutUser().then(() => {
      useGame().value = undefined
      showMenu.value = false
      messageToSnack(t('login.signOutOk'))
      navigateTo('/')
    })
  }

  // change the theme : dark, light, auto
  const changeColor = (theme:string) => {
    showMenu.value = false
    colorMode.value = theme
  }

  // change the locale language
  const changeLocale = (locale:Locale) => {
    showMenu.value = false
    setLocale(locale)
  }

  // export ideas to csv file
  const exportIdeas = () => {
    console.log("export ideas asked")
    showMenu.value = false
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
      modalResteLoves.value = true
    }

    // reset loves
    const resetLoves = () => {
      console.log("reset loves asked")
      showMenu.value = false
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
      showMenu.value = false
      if(game?.value) {
        game.value.restartGame()
        updateGame(game.value)
      }
    }

    // methodes
    const askDeleteGame = () => {
      modalDelete.value = true
    }
    const confirmDelete = () => {
      showMenu.value = false
      if(game?.value) {
          deleteGame(game.value.id)
          .then(()=>{
              messageToSnack(t('gamesList.deleteGameConfirmed'))
              navigateTo('/')
          })
        }
    }

</script>

<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>
