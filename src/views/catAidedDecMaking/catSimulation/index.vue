<!--灾变模拟-->
<script setup>

import HomeDisaster from "@/views/components/home/HomeDisaster.vue";
import HomeThree from "@/views/components/home/HomeThree.vue";
import {home} from "@/api/request/home";

const {threeRef,setDisaster,changeDisasterType,generateDisaster} = home()
</script>

<template>
<div class="fullDom">
  <HomeThree ref="threeRef" />
  <!--    灾害模拟-->
  <home-disaster
    :dom-left="72"
    :dom-bottom="690"
    @set-disaster="setDisaster"
    @change-disaster-type="changeDisasterType"
    @generate-disaster="generateDisaster"
  />
</div>
</template>

<style scoped lang="scss">

</style>
