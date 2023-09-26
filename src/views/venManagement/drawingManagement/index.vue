<!--图纸管理-->
<script setup>
	import LoadDrawingPlaneMap from '@/views/venManagement/drawingManagement/loadDrawingPlaneMap.vue'
	import { useGainList } from '@/hooks/useGainList'
	import {
		addCenterCadFile,
		cadEdit,
		cadList,
		removeCad,
		setCadModelToEdit,
	} from '@/api/api/drawingManagement'
	import { useCommitForm } from '@/hooks/useForm'
	import useCurrentInstance from '@/hooks/useCurrentInstance'

	const { dataList, queryDataList } = useGainList({
		apiFun: cadList,
	})

	const chooseVersion = ref(0)
	// 选择版本
	const setVersion = (index) => {
		chooseVersion.value = index
	}
	// 选中对象
	const chooseData = computed(() => {
		console.log(dataList.value[chooseVersion.value])
		return dataList.value[chooseVersion.value]
	})
	// 地图范围
	const mapExtent = computed(() => {
		return [
			chooseData.value?.geoMinX,
			chooseData.value?.geoMinY,
			chooseData.value?.geoMaxX,
			chooseData.value?.geoMaxY,
		]
	})
	// 刷新图层
	const readyMap = ref(true)

	const refreshMap = () => {
		readyMap.value = false
		nextTick().then(() => {
			readyMap.value = true
		})
	}
	watch(
		() => chooseVersion.value,
		() => {
			refreshMap()
		},
	)

	const dataForm = ref({
		name: '',
	})
	// 修改弹窗
	const updateVisible = ref(false)
	const handleUpdate = () => {
		updateVisible.value = true
	}
	//   修改文件名
	const updateFireName = async () => {
		await useCommitForm(cadEdit, {
			queryParams: {
				...chooseData.value,
				name: dataForm.value.name,
			},
			afterReadyDataFun: () => {
				updateVisible.value = false
				queryDataList?.()
			},
		})
	}
	//   删除版本
	const handleDelete = async () => {
		await useCommitForm(removeCad, {
			queryParams: chooseData.value,
			afterReadyDataFun: () => {
				queryDataList?.()
			},
		})
	}

	//   中心线图纸上传地址
	const centerCadUrl = computed(() => {
		return '/api/manage/cad/addCenterCadFile?version=' + chooseData.value?.version
	})
	//   中心线图纸预览
	const centerVisible = ref(false)
	const handleCenter = () => {
		if (chooseData.value.centerPubFlag === '1') {
			centerVisible.value = true
		}
	}
	// 中心线地图范围
	const centerExtent = computed(() => {
		return [
			chooseData.value?.centerGeoMinX,
			chooseData.value?.centerGeoMinY,
			chooseData.value?.centerGeoMaxX,
			chooseData.value?.centerGeoMaxY,
		]
	})
	//   三维图绘制
	const drawingMap = async () => {
		await useCommitForm(addCenterCadFile, {
			queryParams: {
				version: chooseData.value.version,
			},
			afterReadyDataFun: () => {
				queryDataList?.()
			},
		})
	}
	const { proxy } = useCurrentInstance()
	// 三维图预览
	const router = useRouter()
	const toThreePreview = () => {
		if (chooseData.value.modelFlag === '1') {
			router.push({
				path: '/homeChild/threePreview',
				query: { tag: chooseData.value.modelTag },
			})
		} else {
			proxy.$modal.msgWarning('请先转换三维图')
		}
	}
	//   cad发布到编辑器
	const sendEditVersion = async () => {
		if (chooseData.value.modelFlag === '1') {
			await useCommitForm(setCadModelToEdit, {
				queryParams: {
					version: chooseData.value.version,
				},
			})
		} else {
			proxy.$modal.msgWarning('请先转换三维图')
		}
	}
	// 查看图纸变更项
	const imgVisible = ref(false)
	const handleImg = () => {
		if (chooseData.value?.centerChangePng) {
			imgVisible.value = true
		}
	}
	//   定时查询列表数据
	const listInterval = ref(-1)
	listInterval.value = setInterval(() => {
		queryDataList?.()
	}, 5000)
	onBeforeUnmount(() => {
		clearInterval(listInterval.value)
	})
</script>

<template>
	<div class="draw_manage fullDom">
		<div class="c-center">
			<file-upload
				:limit="1"
				:file-type="['dwg', 'DWG']"
				:is-show-tip="false"
				request-url="/api/manage/cad/addCadFile"
			>
				<template #default>
					<div class="draw_manage_c1_l1">添加图纸</div>
				</template>
			</file-upload>
		</div>
		<div class="draw_manage_c2_l1 fullDom">
			<file-upload
				:limit="1"
				:file-type="['dwg', 'DWG']"
				:is-show-tip="false"
				:request-url="centerCadUrl"
			>
				<template #default>
					<div class="draw_manage_c2_l1_btn c-center"><span>中心线图纸上传</span></div>
				</template>
			</file-upload>

			<div class="draw_manage_c2_l1_btn c-center" @click="handleCenter">
				<span>中心线图纸预览</span>
			</div>
			<div class="draw_manage_c2_l1_btn c-center" @click="handleImg">
				<span>查看图纸变更项</span>
			</div>
			<div class="draw_manage_c2_l1_btn c-center" @click="handleUpdate"><span>修改</span></div>
			<div class="draw_manage_c2_l1_btn c-center" @click="handleDelete"><span>删除</span></div>
			<div class="draw_manage_c2_l1_btn c-center" @click="drawingMap"><span>三维图绘制</span></div>
			<div class="draw_manage_c2_l1_btn c-center" @click="toThreePreview">
				<span>三维图预览</span>
			</div>
			<div class="draw_manage_c2_l1_btn c-center" @click="sendEditVersion">
				<span>三维图发布到编辑器</span>
			</div>
		</div>
		<div class="draw_manage_c1_l2">
			<border-box name="border2" title="图纸管理"></border-box>
			<div class="draw_manage_c1_l2_body fullDom">
				<template v-for="(item, index) in dataList">
					<div class="draw_manage_c1_l2_item fullDom">
						<div class="draw_manage_c1_l2_item_icon">
							<div
								:class="
									chooseVersion === index
										? 'dec_point_left_icon_active'
										: 'dec_point_left_icon_default'
								"
							></div>
						</div>
						<div
							@click="setVersion(index)"
							class="overText"
							:class="
								chooseVersion === index ? 'dec_point_left_bg_active' : 'dec_point_left_bg_default'
							"
						>
							{{ item.version }}
						</div>
						<div class="draw_manage_c1_l2_item_text">
							<span class="overText">上传人：{{ item.createBy }}</span>
							<span class="overText">版本号：{{ item.version }}</span>
							<span class="overText">时间：{{ item.createTime }}</span>
							<span class="overText" :title="item.dwgName">名称：{{ item.name }}</span>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div class="fullDom" style="background-color: #111115; overflow-y: hidden">
			<template v-if="readyMap">
				<div v-if="chooseData?.pubFlag === '1'" class="fullDom">
					<LoadDrawingPlaneMap :group-name="chooseData?.pubGroup" :extent="mapExtent" />
				</div>
				<div v-else class="none_map"></div>
			</template>
		</div>
		<!--    修改弹窗-->
		<dia-log
			v-if="updateVisible"
			v-model="updateVisible"
			title="修改"
			:width="800"
			:height="500"
			has-bottom-btn
			@submit="updateFireName"
		>
			<el-form :model="dataForm">
				<el-form-item label="名称">
					<el-input v-model="dataForm.name" />
				</el-form-item>
			</el-form>
		</dia-log>
		<!--    中心线图纸预览-->
		<dia-log
			v-if="centerVisible"
			v-model="centerVisible"
			title="中心线图纸预览"
			:width="1920"
			:height="900"
		>
			<LoadDrawingPlaneMap :group-name="chooseData?.centerPubGroup" :extent="centerExtent" />
		</dia-log>
		<!--  查看图纸变更项  -->
		<el-image-viewer
			v-if="imgVisible"
			:url-list="[chooseData?.centerChangePng]"
			@close="imgVisible = false"
		></el-image-viewer>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/drawingManagement';
</style>
