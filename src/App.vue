<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'r1cht1g pf3rd – generate secure and easy to remember passwords',
  meta: [
    {
      name: 'description',
      content: 'A password generator that generates passwords that are really secure and easy to remember. Using a simple algorithm, the passwords are generated based on a word that you can remember.',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
