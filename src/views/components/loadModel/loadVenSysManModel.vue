<!--三维通风系统图编辑-->
<script setup>
	import useThree from '@/hooks/useThree'
	import { useModel } from '@/hooks/useModel'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import { EditType } from '@/components/VueThree/types/editType'
	import HomeModelType from '@/views/components/home/HomeModelType.vue'

	const props = defineProps({
		//   编辑类型
		editType: {
			type: Number,
			default: 0,
		},
		//   自定义数据
		customizeData: {
			type: Array,
			default: [],
		},
		//   自定义数据最大值
		customizeMaxNodeNum: {
			type: Number,
			default: 0,
		},
	})

	const emits = defineEmits(['tunnelHandle', 'chooseTunnel'])

	const {
		homeModelVisible,
		otherThreeMod,
		controlsOptions,
		lights,
		onLoad,
		onModel,
		onClick,
		operateModel,
		intersected,
		intersectedPosition,
	} = useThree()
	// 显示全部设备图标
	const { equipTypeImgClass } = useEquipmentData()

	const { isReady, allTypeList, loadAllTypeList } = useModel(operateModel)

	// 监听点击事件
	watch(
		() => intersected.value,
		(value) => {
			//   判断是否是巷道
			const name = value?.name
			if (!name) return
			const names = name.split('-')
			if (names.length === 2) {
				if (EditType.DEFAULT === props.editType) {
					emits('tunnelHandle', value, intersectedPosition.value)
				} else {
					emits('chooseTunnel', value, intersectedPosition.value)
				}
			} else {
				// 清空选中巷道
				emits('chooseTunnel', undefined, undefined)
			}
		},
	)

	//   双击
	const dblclick = (event, CIntersected) => {}
	//   相机事件完成
	const readyCamera = () => {
		//   添加图标
		loadAllTypeList?.()
    // 添加巷道名字贴图
    operateModel.value?.createdImgPlane()
	}
	//   获取改变巷道
	const changeHandle = () => {
		return homeModelVisible.value.tunnelMesh.overEditHandle()
	}
	// 保存并重绘巷道
	const redrawModel = (redrawList) => {
		return homeModelVisible.value.tunnelMesh.redrawModel(redrawList)
	}

  // 新增显示控制辅助平台高度
  const planeHeiVisible = computed(() => {
    return props.editType === EditType.ADD
  })
  // 辅助平台高度表单
  const planeForm = reactive({
    //当前点击位置高度
    addPositionHeight: 0,
    // 平台高度
    planeHeight: 0
  })
  watch(() => planeHeiVisible.value,(val) => {
    if (val) {
      planeForm.addPositionHeight = 0
    }
  })
  const changeAddPosition = (objList) => {
    if (objList.length !== 1) return
    planeForm.addPositionHeight = objList[0].position.y ?? 0
    homeModelVisible.value.planeHei = objList[0].position.y ?? 0
  }
  const changePlaneHeight = (val) => {
    planeForm.planeHeight = val
  }
  // 设置平台高度
  const setPlaneHeight = () => {
    homeModelVisible.value.planeHei = planeForm.planeHeight
  }

	defineExpose({
		changeHandle,
		redrawModel,
	})
</script>

<template>
	<div class="fullDom">
		<model-node-edit
			ref="homeModelVisible"
			:customize="true"
			:customize-data="customizeData"
			:customize-max-node-num="customizeMaxNodeNum"
			:other-three-mod="otherThreeMod"
			:lights="lights"
			:camera-size="0.1"
			:backgroundAlpha="0"
			:controlsOptions="controlsOptions"
			:choose-group="true"
			:edit-type="editType"
			plane-visible
			@load="onLoad"
			@onModel="onModel"
			@onClick="onClick"
			@onDblclick="dblclick"
			@ready-camera="readyCamera"
      @planeHeight="changePlaneHeight"
      @addPosition="changeAddPosition"
		>
			<!--			显示全部设备图标-->
			<template #label v-if="isReady">
				<div v-for="i in allTypeList" :key="i.uniqueCode" :id="i.uniqueCode" class="wind_label_bg">
					<div class="wind_three_label">
						<div class="three_label_header">
							<div :class="'home_map_' + equipTypeImgClass(i.devType)"></div>
						</div>
						<div class="three_label_footer"></div>
					</div>
				</div>
			</template>
      <template v-if="planeHeiVisible">
        <div class="plane_hei_dom">
          <div class="plane_hei_dom_label">平台高度：</div>
          <el-input v-model="planeForm.planeHeight"/>
          <div class="normal_btn" @click="setPlaneHeight">设置</div>
          <div class="plane_hei_dom_label">点击位置高度：</div>
          <el-input v-model="planeForm.addPositionHeight" disabled/>
        </div>
      </template>
		</model-node-edit>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_map';
	.wind_label_bg {
		position: absolute;
		top: vh(-50);
	}
	.wind_three_label {
		display: grid;
		grid-template-columns: vh(50);
		grid-template-rows: vh(50) vh(45);
		grid-template-areas:
			'header'
			'footer';
		justify-items: center;
	}
//  控制平台高度
  .plane_hei_dom{
    position: absolute;
    left: vw(60);
    top: vh(60);
    width: vw(380);
    height: vh(80);
    background: rgba(15,46,81,0.78);
    padding: 0 vw(10);
    display: grid;
    grid-template-columns: vw(130) 1fr vw(100);
    grid-template-rows: repeat(2,1fr);
    grid-row-gap: vh(5);
    align-items: center;
    .normal_btn{
      justify-self: center;
      width: vw(90);
      height: vh(40);
    }
  }
  .plane_hei_dom_label {
    justify-self: end;
    font-size: vw(16);
    color: #FFFFFF;
  }
</style>
