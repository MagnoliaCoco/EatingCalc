<script setup lang="ts">
  import { ref, watch } from 'vue';
  const updatetime = ref('')
  const gummy = ref('')
  const yogurt = ref('')
  const gummycount = ref(0)
  const yogurtcount = ref(0)
  const gummyprice = ref(0)
  const yogurtprice = ref(0)
  const gummymana = ref(0)
  const yogurtmana = ref(0)
  const gummys = ref(['软糖', '苹果软糖', '橙子软糖', '李子软糖', '桃子软糖', '火龙果软糖', '杨桃软糖'])
  const yogurts = ref(['酸奶', '苹果酸奶', '橙子酸奶', '李子酸奶', '桃子酸奶', '火龙果酸奶', '杨桃酸奶'])
  const gummyprices = ref(new Map([
    ['软糖', 0],
    ['苹果软糖', 0],
    ['橙子软糖', 0],
    ['李子软糖', 0],
    ['桃子软糖', 0],
    ['火龙果软糖', 0],
    ['杨桃软糖', 0]
  ]))
  const yogurtprices = ref(new Map([
    ['酸奶', 0],
    ['苹果酸奶', 0],
    ['橙子酸奶', 0],
    ['李子酸奶', 0],
    ['桃子酸奶', 0],
    ['火龙果酸奶', 0],
    ['杨桃酸奶', 0]
  ]))
  const gummymanas = ref(new Map([
    ['软糖', 40],
    ['苹果软糖', 80],
    ['橙子软糖', 120],
    ['李子软糖', 160],
    ['桃子软糖', 200],
    ['火龙果软糖', 240],
    ['杨桃软糖', 280]
  ]))
  const yogurtmanas = ref(new Map([
    ['酸奶', 50],
    ['苹果酸奶', 100],
    ['橙子酸奶', 150],
    ['李子酸奶', 200],
    ['桃子酸奶', 250],
    ['火龙果酸奶', 300],
    ['杨桃酸奶', 350]
  ]))
  function getData() {
    let data = JSON.parse(<string>localStorage.getItem('market'))
    updatetime.value = new Date(data.timestamp * 1000).toString()
    gummyprices.value = new Map([
      ['软糖', data.marketData['/items/gummy']['0']['a']],
      ['苹果软糖', data.marketData['/items/apple_gummy']['0']['a']],
      ['橙子软糖', data.marketData['/items/orange_gummy']['0']['a']],
      ['李子软糖', data.marketData['/items/plum_gummy']['0']['a']],
      ['桃子软糖', data.marketData['/items/peach_gummy']['0']['a']],
      ['火龙果软糖', data.marketData['/items/dragon_fruit_gummy']['0']['a']],
      ['杨桃软糖', data.marketData['/items/star_fruit_gummy']['0']['a']]
    ])
    yogurtprices.value = new Map([
      ['酸奶', data.marketData['/items/yogurt']['0']['a']],
      ['苹果酸奶', data.marketData['/items/apple_yogurt']['0']['a']],
      ['橙子酸奶', data.marketData['/items/orange_yogurt']['0']['a']],
      ['李子酸奶', data.marketData['/items/plum_yogurt']['0']['a']],
      ['桃子酸奶', data.marketData['/items/peach_yogurt']['0']['a']],
      ['火龙果酸奶', data.marketData['/items/dragon_fruit_yogurt']['0']['a']],
      ['杨桃酸奶', data.marketData['/items/star_fruit_yogurt']['0']['a']]
    ])
  }
  watch(() => gummy.value, (t) => {
    gummyprice.value = <number>gummyprices.value.get(t)
    gummymana.value = <number>gummymanas.value.get(t)
  })
  watch(() => yogurt.value, (t) => {
    yogurtprice.value = <number>yogurtprices.value.get(t)
    yogurtmana.value = <number>yogurtmanas.value.get(t)
  })
  getData();
</script>

<template>
  <h3>Selected: {{ gummy }} <span v-if="gummy && yogurt">+</span> {{ yogurt }}</h3>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>数量</th>
        <th>每分钟回蓝</th>
        <th>单价</th>
        <th>每小时成本</th>
        <th>每小时回蓝</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>
          <select v-model="gummy">
            <option value="">&nbsp;</option>
            <option v-for="gummy in gummys" :value="gummy">{{ gummy }}</option>
          </select>
        </th>
        <td><input type="number" min="0" max="60" v-model="gummycount"></td>
        <td>{{ gummy ? gummymana : 0}}</td>
        <td><input type="number" v-model="gummyprice"></td>
        <td>{{ gummy ? gummycount * gummyprice : 0 }}</td>
        <td>{{ gummy ? gummycount * gummymana : 0 }}</td>
      </tr>
      <tr>
        <th>
          <select v-model="yogurt">
            <option value="">&nbsp;</option>
            <option v-for="yogurt in yogurts" :value="yogurt">{{ yogurt }}</option>
          </select>
        </th>
        <td><input type="number" min="0" max="60" v-model="yogurtcount"></td>
        <td>{{ yogurt? yogurtmana : 0 }}</td>
        <td><input type="number" v-model="yogurtprice"></td>
        <td>{{ yogurt ? yogurtcount * yogurtprice : 0 }}</td>
        <td>{{ yogurt ? yogurtcount * yogurtmana : 0 }}</td>
      </tr>
        <tr>
          <td></td>
          <td></td>
          <td>{{ (gummy ? gummymana : 0) + (yogurt ? yogurtmana : 0)}}</td>
          <td></td>
          <td>{{ (gummy ? gummycount * gummyprice : 0) + (yogurt ? yogurtcount * yogurtprice : 0) }}</td>
          <td>{{ (gummy ? gummycount * gummymana : 0) + (yogurt ? yogurtcount * yogurtmana : 0) }}</td>
        </tr>
    </tbody>
  </table>
</template>

<style scoped>
  button {
    width: 100px;
    height: 40px;
  }
  table {
    margin: 10px;
    border-spacing: 0px;
    border-collapse: collapse;
    th, td {
      width: 150px;
      height: 75px;
      border: 1px solid;
      font-size: 26px;
      text-align: center;
    }
    input, select {
      color: var(--color-text);
      background: var(--color-background);
      width: inherit;
      height: inherit;
      border: 0px;
      font-size: 26px;
      text-align: inherit;
    }
  }
</style>