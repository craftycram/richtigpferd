<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="container">
    <div class="col center" style="align-items: start">
      <h1>r1cht1g pf3rd</h1>
      <i18n-t keypath="about.intro" tag="p" for="about.xkdc" class="text">
        <a href="https://xkcd.com/936/" target="_blank" class="text">{{
          $t('about.xkdc')
        }}</a>
      </i18n-t>
      <i18n-t keypath="about.words" tag="p" for="about.wordlist" class="text">
        <a href="/wordlist.txt" target="_blank" class="text">{{
          $t('about.wordlist')
        }}</a>
      </i18n-t>
      <p class="text">
        {{ $t('about.sources') }}
        <br />
        <a
          href="https://github.com/cpos/AlleDeutschenWoerter"
          target="_blank"
          rel="noopener noreferrer"
          class="text"
          >GitHub - AlleDeutschenWoerter</a
        >
      </p>
      <p class="text">
        {{ $t('about.poweredBy') }}
        <a
          href="https://www.marcrufeis.de/"
          target="_blank"
          rel="noopener noreferrer"
          class="text"
        >
          Marc Rufeis
        </a>
        &amp;
        <a
          href="https://itmr-dev.de/"
          target="_blank"
          rel="noopener noreferrer"
          class="text"
        >
          ITMR Developments</a
        >.
        <i18n-t keypath="about.contributors" class="text">
          <a
            href="https://github.com/craftycram/richtig-pferd"
            target="_blank"
            class="text"
            >GitHub</a
          >
        </i18n-t>
      </p>
      <p class="text">
        <i18n-t keypath="about.contribute" class="text">
          <a
            href="https://github.com/craftycram/richtig-pferd"
            target="_blank"
            class="text"
            >GitHub</a
          >
        </i18n-t>
      </p>
      <p class="text">
        {{ $t('about.languages') }}:
        {{ $i18n.availableLocales.join(', ') }}
      </p>
      <small style="margin-bottom: 1rem"
        ><sub class="text">
          {{ $t('about.gift') }}
          <a
            href="https://www.florian-geiselhart.de/"
            target="_blank"
            rel="noopener noreferrer"
            class="text"
          >
            Florian Geiselhart
          </a>
        </sub></small
      >
      <RouterLink
        to="/"
        style="display: inline-flex; align-items: center; float: right"
      >
        ⌫
        {{ $t('generic.back') }}
      </RouterLink>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
