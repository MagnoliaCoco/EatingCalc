<script setup lang="ts">
import GetMarket from './components/GetMarket.vue'
import EatingCalc from './components/EatingCalc.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <GetMarket/>
      <EatingCalc/>
      <EatingCalc/>
    </div>
  </main>
</template>

<style scoped>
  body {
        background-color: #333;
  }
</style>