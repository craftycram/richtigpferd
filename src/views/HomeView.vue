<script setup>
import { ref } from 'vue'

const wordlist = ref([])
const loaded = ref(false)
const password = ref('')
const length = ref(4)
const digit = ref(true)
const keepCase = ref(true)
const uppercase = ref(true)
const dash = ref(true)

const copied = ref(false)
const copiedTimeout = ref(null)

fetch('/wordlist.txt')
  .then(response => response.text())
  .then(text => text.split('\n'))
  .then(list => wordlist.value = list)
  .then(() => loaded.value = true)
  .then(() => generate())

function generate() {
  console.log(wordlist);
  copied.value = false

  let words = []
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * wordlist.value.length)
    words.push(wordlist.value[randomIndex])
  }

  let result = ''
  if (digit.value) {
    const randomIndex = Math.floor(Math.random() * 10)
    words.push(randomIndex)
  }
  if (uppercase.value && !keepCase.value) {
    words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
  } else if (!keepCase.value) {
    words.map(word => word.toLowerCase())
  }
  if (dash.value) {
    result = words.join('-')
  } else {
    result = words.join('')
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
</script>

<template>
  <main class="container">
    <div class="col center" style="align-items: start;">
      <h1 class="mt0">r1cht1g pf3rd</h1>
      <div style="width: 100%">
        <input type="text" readonly v-model="password" style="text-transform: none; width: 100%;">
      </div>
      <div>
        <button @click="generate" :disabled="!loaded" class="mtb1 mr1 primary">Generate</button>
        <button @click="copy" :disabled="!loaded" class="mtb1 mr1 primary" style="width: calc(4ch + 40px);">{{ copied ? '✔︎' : 'Copy' }}</button>
      </div>
    </div>
  </main>
</template>
