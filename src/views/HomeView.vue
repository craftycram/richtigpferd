<script setup>
import { ref } from 'vue'

const password = ref('')
const length = ref(16)
const digit = ref(true)
const uppercase = ref(true)
const dash = ref(true)

const copied = ref(false)
const copiedTimeout = ref(null)

function generate() {
  copied.value = false

  const chars = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const uppercaseChars = chars.toUpperCase()
  const specialChars = '-_!@#$%^&*()'

  let pool = chars
  if (digit.value) pool += digits
  if (uppercase.value) pool += uppercaseChars
  if (dash.value) pool += specialChars

  let result = ''
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length)
    result += pool[randomIndex]
  }

  password.value = result
}

async function copy() {
  try {
    await navigator.clipboard.writeText(password.value);
    copied.value = true
    clearTimeout(copiedTimeout.value)
    copiedTimeout.value = setTimeout(() => {
      copied.value = false
    }, 1000)
  } catch($e) {
    copied.value = false
  }
}

generate()
</script>

<template>
  <main class="container">
    <div class="col center" style="align-items: start;">
      <h1 class="mt0">r1cht1g pf3rd</h1>
      <div style="width: 100%">
        <input type="text" readonly v-model="password" style="text-transform: none; width: 100%;">
      </div>
      <div>
        <button @click="generate" class="mtb1 mr1 primary">Generate</button>
        <button @click="copy" class="mtb1 mr1 primary" style="width: calc(4ch + 40px);">{{ copied ? '✔︎' : 'Copy' }}</button>
      </div>
    </div>
  </main>
</template>
