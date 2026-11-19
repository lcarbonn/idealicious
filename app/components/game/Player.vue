<template>
  <UUser
      :name="player.name"
      orientation="vertical"
      class="items-center"
      >
      <template #avatar>
        <UAvatar 
          icon="noto:person-medium-light-skin-tone-blond-hair"
          :color="color"
          :ui="{
            icon: 'h-full w-full rounded-[inherit] object-cover'            
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

  const color = computed(() => {
      return (props.uid == props.player.uid)?"success":"neutral"
  })

</script>