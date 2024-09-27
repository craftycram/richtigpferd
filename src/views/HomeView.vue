<script setup>
import { ref, watch, onMounted } from 'vue';

const wordlist = ref([]);
const loaded = ref(false);
const password = ref('');
const customize = ref(false);
const length = ref(4);
const digit = ref(true);
const keepCase = ref(true);
const uppercase = ref(true);
const dash = ref(true);
const umlauts = ref(true);
const copyOnLoad = ref(false);

const copied = ref(false);
const copiedTimeout = ref(null);

fetch('/wordlist.txt')
  .then((response) => response.text())
  .then((text) => text.split('\n'))
  .then((list) => (wordlist.value = list))
  .then(() => (loaded.value = true))
  .then(() => generate());

function generate() {
  copied.value = false;

  let words = [];
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * wordlist.value.length);
    words.push(wordlist.value[randomIndex]);
  }

  let result = '';
  if (uppercase.value && !keepCase.value) {
    words = words.map((word) => {
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

  if (!umlauts.value) {
    result = result
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/Ä/g, 'Ae')
      .replace(/Ö/g, 'Oe')
      .replace(/Ü/g, 'Ue');
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

function changeSettings(g = true) {
  const settings = {
    length: length.value,
    digit: digit.value,
    keepCase: keepCase.value,
    uppercase: uppercase.value,
    dash: dash.value,
    umlauts: umlauts.value,
    copyOnLoad: copyOnLoad.value,
  };
  localStorage.setItem('settings', JSON.stringify(settings));
  if (g) generate();
}

function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('settings'));
  if (settings) {
    length.value = settings.length;
    digit.value = settings.digit;
    keepCase.value = settings.keepCase;
    uppercase.value = settings.uppercase;
    dash.value = settings.dash;
    umlauts.value = settings.umlauts;
    copyOnLoad.value = settings.copyOnLoad;
  }
}

onMounted(() => {
  loadSettings();
  generate();
  if (copyOnLoad.value) {
    copy();
  }
});

watch(
  length,
  (update) => (length.value = update > 64 ? 64 : update <= 0 ? 1 : update),
);
</script>

<template>
  <main class="container">
    <div class="col center" style="align-items: start">
      <div class="row">
        <div class="col">
          <h1 class="mt0">r1cht1g pf3rd</h1>
        </div>
      </div>
      <div class="row w100">
        <div class="col col-12" style="flex-direction: row">
          <input
            type="text"
            readonly
            v-model="password"
            style="text-transform: none; flex-grow: 1"
          />
          <input
            class="ml1 words"
            type="number"
            name="length"
            id="length"
            v-model="length"
            min="1"
            max="64"
            style="width: 7ch"
            @change="changeSettings"
          />
          <!-- label for="length" class="ml1">length</-->
        </div>
      </div>
      <div class="row w100">
        <div class="col col-lg-2 col-md-3 col-sm-6 col-6">
          <button @click="generate" :disabled="!loaded" class="mtb1 primary">
            {{ $t('main.generate') }}
          </button>
        </div>
        <div class="col col-lg-2 col-md-2 col-sm-6 col-6">
          <button @click="copy" :disabled="!loaded" class="mtb1 primary">
            {{ copied ? '✔︎' : $t('main.copy') }}
          </button>
        </div>
        <!--div class="row mtb1" style="align-items: center;">
          <input type="number" name="length" id="length" v-model="length" min="1" max="64" style="width: 7ch" @change="changeSettings">
          <label for="length" class="ml1">length</label>
        </div-->
        <div
          class="col col-lg-2 col-md-4 col-sm-6 col-6"
          style="justify-content: center"
        >
          <div class="ml1" style="display: inline-flex">
            <div class="row" style="align-items: center; flex-wrap: nowrap">
              <input
                type="checkbox"
                name="customize"
                id="customize"
                v-model="customize"
              />
              <label for="customize">{{ $t('main.customize') }}</label>
            </div>
          </div>
        </div>
        <div class="spacer" />
        <div
          class="col col-1"
          style="justify-content: center; align-items: end"
        >
          <RouterLink
            to="/about"
            style="display: inline-flex; align-items: center; float: right"
          >
            {{ $t('main.about') }}
          </RouterLink>
        </div>
      </div>
      <div v-if="customize">
        <div class="row mtb025" style="flex-wrap: nowrap">
          <div class="col" style="flex-direction: row">
            <input
              type="checkbox"
              name="addDigit"
              id="addDigit"
              v-model="digit"
              @change="changeSettings"
            />
            <label for="addDigit">{{
              $t('main.customizations.addDigit')
            }}</label>
          </div>
        </div>
        <div class="row mtb025" style="flex-wrap: nowrap">
          <div class="col" style="flex-direction: row">
            <input
              type="checkbox"
              name="keepCase"
              id="keepCase"
              v-model="keepCase"
              @change="changeSettings"
            />
            <label for="keepCase">{{
              $t('main.customizations.keepCase')
            }}</label>
          </div>
        </div>
        <div class="row mtb025" v-if="!keepCase">
          <div class="col" style="flex-direction: row">
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              v-model="uppercase"
              @change="changeSettings"
            />
            <label for="uppercase">{{
              $t('main.customizations.uppercase')
            }}</label>
          </div>
        </div>
        <div class="row mtb025" style="flex-wrap: nowrap">
          <div class="col" style="flex-direction: row">
            <input
              type="checkbox"
              name="addDash"
              id="addDash"
              v-model="dash"
              @change="changeSettings"
            />
            <label for="addDash">{{
              $t('main.customizations.addDashes')
            }}</label>
          </div>
        </div>
        <div class="row mtb025" style="flex-wrap: nowrap">
          <div class="col" style="flex-direction: row">
            <input
              type="checkbox"
              name="umlauts"
              id="umlauts"
              v-model="umlauts"
              @change="changeSettings"
            />
            <label for="umlauts">{{
              $t('main.customizations.umlauts')
            }}</label>
          </div>
        </div>
        <div class="row mtb025" style="flex-wrap: nowrap">
          <div class="col" style="flex-direction: row">
            <input
              type="checkbox"
              name="copyOnLoad"
              id="copyOnLoad"
              v-model="copyOnLoad"
              @change="changeSettings(false)"
            />
            <label for="copyOnLoad">{{
              $t('main.customizations.copyOnLoad')
            }}</label>
          </div>
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
