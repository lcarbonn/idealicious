<template>
  <UUser
      :name="player.name"
      orientation="vertical"
      class="items-center"
      >
      <template #avatar>
        <UAvatar
          icon="noto:person-medium-light-skin-tone-blond-hair"
          :chip="isItMe?{
            color: 'success',
            position: 'top-right'
          }:false"        
          :ui="{
            icon: 'h-full w-full rounded-[inherit] object-cover '+getColor(player.playerId)
          }"/>
      </template>
      </UUser>
</template>
<script setup lang="ts">
    
  interface Props {
    player: IPlayer,
    uid:String
  }
  const props = defineProps<Props>()    

  const isItMe = computed(() => {
      return (props.uid == props.player.uid)
  })

</script>