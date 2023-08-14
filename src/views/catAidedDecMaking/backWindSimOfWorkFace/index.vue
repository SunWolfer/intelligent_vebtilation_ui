<!--工作面反风模拟-->
<script setup>

import LoadBackWindPlaneMap
  from "@/views/catAidedDecMaking/backWindSimOfWorkFace/loadBackWindPlaneMap.vue";
import {
  backWindSimOfWorkFace
} from "@/api/request/catAidedDecMaking/backWindSimOfWorkFace";

const {windList,
  windStatusList,
  windowStatusList} = backWindSimOfWorkFace()
</script>

<template>
  <div class="back_wind_body">
    <div class="fullDom">
      <load-back-wind-plane-map/>
    </div>
    <div class="back_wind_body_right">
      <border-box name="border2" title="监测点风量"></border-box>
      <div class="back_wind_body_right_l2 fullDom">
        <template v-for="item in windList">
          <span>{{item.label}}</span>
          <el-input v-model="item.value"/>
          <span>m3/min</span>
        </template>
      </div>
      <border-box name="border2" title="远控风门状态"></border-box>
      <div class="back_wind_body_right_l4 fullDom">
        <template v-for="item in windStatusList">
          <span>{{item.name}}</span>
          <div :class="item.status === '1'?'back_wind_body_btn_open':'back_wind_body_btn_close'">
            {{item.status === '1' ? '打开':'关闭'}}
          </div>

          <div/>
        </template>
      </div>
      <border-box name="border2" title="远控风窗状态"></border-box>
      <div class="back_wind_body_right_l6 fullDom">
        <template v-for="item in windowStatusList">
          <span>{{item.name}}</span>
          <div :class="item.status === '1'?'back_wind_body_btn_open':'back_wind_body_btn_close'">
            {{item.status === '1' ? '打开':'关闭'}}
          </div>
          <span>开度为{{item.value}}%</span>
        </template>
      </div>
      <div class="back_wind_body_right_l7 fullDom">
        <div class="back_wind_body_btn_green">
          <span>一键通风</span>
        </div>
        <div class="back_wind_body_btn_blue">
          <span>正常通风</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/catAidedDecMaking/backWindSimOfWorkFace";
</style>
