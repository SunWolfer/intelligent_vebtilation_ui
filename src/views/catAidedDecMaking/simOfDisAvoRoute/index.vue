<!--避灾路线模拟-->
<script setup>

import HomeThree from "@/views/components/home/HomeThree.vue";
import HomeDisPreRoute from "@/views/components/home/HomeDisPreRoute.vue";
import {home} from "@/api/request/home";

const {threeRef,
  setDisaster,
  setPersonnel,
  changeDisasterType,
  imitateRoute} = home()
</script>

<template>
  <div class="fullDom">
    <HomeThree ref="threeRef" />

    <!--    避灾路线模拟-->
    <HomeDisPreRoute
      :dom-left="72"
      :dom-bottom="690"
      @set-disaster="setDisaster"
      @set-personnel="setPersonnel"
      @imitate-route="imitateRoute"
      @change-disaster-type="changeDisasterType"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
