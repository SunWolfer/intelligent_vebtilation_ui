<!--图纸管理-->
<script setup>
	import LoadDrawingPlaneMap from '@/views/venManagement/drawingManagement/loadDrawingPlaneMap.vue'

	const dataList = ref([
		{
			title: '2023-07-12',
			createPeople: '11',
			version: '2023-07-12',
			dateTime: '2023-07-12 12:11:10',
			name: '1101平面图',
		},
		{
			title: '2023-07-11',
			createPeople: '11',
			version: '2023-07-11',
			dateTime: '2023-07-11 12:11:10',
			name: '1101平面图',
		},
		{
			title: '2023-07-10',
			createPeople: '11',
			version: '2023-07-10',
			dateTime: '2023-07-10 12:11:10',
			name: '1101平面图',
		},
	])
	const chooseVersion = ref(0)
	// 选择版本
	const setVersion = (index) => {
		chooseVersion.value = index
	}
</script>

<template>
	<div class="fullDom draw_manage">
		<div class="c-center">
			<div class="draw_manage_c1_l1">添加图纸</div>
		</div>
		<div class="fullDom draw_manage_c2_l1">
			<div class="draw_manage_c2_l1_btn c-center"><span>修改</span></div>
			<div class="draw_manage_c2_l1_btn c-center"><span>删除</span></div>
			<div class="draw_manage_c2_l1_btn c-center"><span>三维图绘制预览</span></div>
			<div class="draw_manage_c2_l1_btn c-center"><span>三维图发布到编辑器</span></div>
			<div class="draw_manage_c2_l1_text c-center">全屏</div>
		</div>
		<div class="fullDom draw_manage_c1_l2">
			<border-box name="border2" title="图纸管理"></border-box>
			<div class="draw_manage_c1_l2_body">
				<template v-for="(item, index) in dataList">
					<div class="draw_manage_c1_l2_item">
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
							:class="
								chooseVersion === index ? 'dec_point_left_bg_active' : 'dec_point_left_bg_default'
							"
						>
							{{ item.title }}
						</div>
						<div class="draw_manage_c1_l2_item_text">
							<span>上传人：{{ item.createPeople }}</span>
							<span>版本号：{{ item.version }}</span>
							<span>时间：{{ item.dateTime }}</span>
							<span>文件名：{{ item.name }}</span>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div class="fullDom">
			<LoadDrawingPlaneMap />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/drawingManagement';
</style>
