<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'r1cht1g pf3rd',
  meta: [
    {
      name: 'description',
      content: 'A password generator that generates passwords that are really secure and easy to remember.',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
