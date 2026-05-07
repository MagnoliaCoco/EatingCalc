<script setup lang="ts">
  import { ref } from 'vue';
  import axios from "axios";
  const updatetime = ref('')
  function getMarket() {
    if(localStorage.getItem('market') && (Math.floor(Date.now() * 0.001) - JSON.parse(<string>localStorage.getItem('market')).timestamp >= 5400) || !localStorage.getItem('market')){
      axios.get('https://www.milkywayidle.com/game_data/marketplace.json?' + Date.now())
        .then((response) => {
          console.log(response.data)
          localStorage.setItem('market', JSON.stringify(response.data))
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          console.log(true);
        })
    }
    else {
      console.log(false);
    }
    updatetime.value = new Date(JSON.parse(<string>localStorage.getItem('market')).timestamp * 1000).toString()
    console.log(JSON.parse(<string>localStorage.getItem('market')).timestamp);
  }
  getMarket()
</script>

<template>
  <button type="button" @click="getMarket">更新价格</button>
  <span>{{ updatetime }}</span>
</template>

<style scoped>
  button {
    width: 100px;
    height: 40px;
  }
</style>