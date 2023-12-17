<script setup>
import { ref, watch } from 'vue';

const wordlist = ref([]);
const loaded = ref(false);
const password = ref('');
const customize = ref(false);
const length = ref(4);
const digit = ref(true);
const keepCase = ref(true);
const uppercase = ref(true);
const dash = ref(true);

const copied = ref(false);
const copiedTimeout = ref(null);

fetch('/wordlist.txt')
  .then((response) => response.text())
  .then((text) => text.split('\n'))
  .then((list) => (wordlist.value = list))
  .then(() => (loaded.value = true))
  .then(() => generate());

function generate() {
  console.log(wordlist);
  copied.value = false;

  let words = [];
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * wordlist.value.length);
    words.push(wordlist.value[randomIndex]);
  }

  let result = '';
  if (uppercase.value && !keepCase.value) {
    words = words.map((word) => {
      console.log(word);
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    });
  } else if (!keepCase.value) {
    words = words.map((word) => word.toLowerCase());
  }
  if (digit.value) {
    const randomIndex = Math.floor(Math.random() * 10);
    words.push(randomIndex);
  }
  if (dash.value) {
    result = words.join('-');
  } else {
    result = words.join('');
  }

  password.value = result;
}

async function copy() {
  try {
    await navigator.clipboard.writeText(password.value);
    copied.value = true;
    clearTimeout(copiedTimeout.value);
    copiedTimeout.value = setTimeout(() => {
      copied.value = false;
    }, 1000);
  } catch ($e) {
    copied.value = false;
  }
}

watch(
  length,
  (update) => (length.value = update > 64 ? 64 : update <= 0 ? 1 : update),
);
</script>

<template>
  <main class="container">
    <div class="col center" style="align-items: start">
      <div class="row" style="width: 100%; gap: 1rem">
        <div class="col">
          <h1 class="mt0">r1cht1g pf3rd</h1>
        </div>
      </div>
      <div style="width: 100%" class="row">
        <div class="col" style="width: 100%">
          <input
            type="text"
            readonly
            v-model="password"
            style="text-transform: none; width: auto"
          />
        </div>
        <div class="col" style="width: fit-content">
          <input
            class="ml1 words"
            type="number"
            name="length"
            id="length"
            v-model="length"
            min="1"
            max="64"
            style="width: 7ch"
            @change="generate"
          />
          <!-- label for="length" class="ml1">length</-->
        </div>
      </div>
      <div class="row w100">
        <button @click="generate" :disabled="!loaded" class="mtb1 mr1 primary">
          {{ $t('main.generate') }}
        </button>
        <button
          @click="copy"
          :disabled="!loaded"
          class="mtb1 mr1 primary"
          :style="{ width: `calc(${$t('main.copy').length}ch + 40px)` }"
        >
          {{ copied ? '✔︎' : $t('main.copy') }}
        </button>
        <!--div class="row mtb1" style="align-items: center;">
          <input type="number" name="length" id="length" v-model="length" min="1" max="64" style="width: 7ch" @change="generate">
          <label for="length" class="ml1">length</label>
        </div-->
        <div class="ml1" style="display: inline-flex">
          <div class="row" style="align-items: center">
            <input
              type="checkbox"
              name="customize"
              id="customize"
              v-model="customize"
            />
            <label for="customize">{{ $t('main.customize') }}</label>
          </div>
        </div>
        <div class="spacer" />
        <RouterLink
          to="/about"
          style="display: inline-flex; align-items: center; float: right"
        >
          {{ $t('main.about') }}
        </RouterLink>
      </div>
      <div v-if="customize">
        <div class="row mtb025">
          <input
            type="checkbox"
            name="addDigit"
            id="addDigit"
            v-model="digit"
            @change="generate"
          />
          <label for="addDigit">{{ $t('main.customizations.addDigit') }}</label>
        </div>
        <div class="row mtb025">
          <input
            type="checkbox"
            name="keepCase"
            id="keepCase"
            v-model="keepCase"
            @change="generate"
          />
          <label for="keepCase">{{ $t('main.customizations.keepCase') }}</label>
        </div>
        <div class="row mtb025" v-if="!keepCase">
          <input
            type="checkbox"
            name="uppercase"
            id="uppercase"
            v-model="uppercase"
            @change="generate"
          />
          <label for="uppercase">{{
            $t('main.customizations.uppercase')
          }}</label>
        </div>
        <div class="row mtb025">
          <input
            type="checkbox"
            name="addDash"
            id="addDash"
            v-model="dash"
            @change="generate"
          />
          <label for="addDash">{{ $t('main.customizations.addDashes') }}</label>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.words::after {
  content: 'words';
  margin-left: 0.25rem;
}
</style>
