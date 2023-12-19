<!--避灾路线管理-->
<script setup>
	import { disPreRouteManagement } from '@/api/request/venManagement/disPreRouteManagement'
	import LoadRouteModel from '@/views/venManagement/disPreRouteManagement/loadRouteModel.vue'
	import { useThreeModelData } from '@/hooks/useThreeModelData'

	const {
		exitList,
		routeList,
		handleAddExit,
		handleDeleteExit,
		handleAddRouteTemp,
		handleRouteData,
		handleDeleteRoute,
	} = disPreRouteManagement()

	const { refreshModel } = useThreeModelData()
</script>

<template>
	<div class="fullDom">
		<div class="dis_route_title">点击巷道节点添加避灾路线安全出口,点击巷道添加系统避灾路线!!</div>
		<div class="dis_route_item">
			<template v-for="(item, index) in exitList" :key="item.node">
				<div class="dis_route_item_1">
					<border-box name="border3">
						<div class="dis_route_item_1_content">
							<div class="dis_route_item_text">安全出口</div>
							<div class="dis_route_item_label">
								[节点编号]<span>{{ item.node }}</span>
							</div>
							<div class="dis_route_item_btn">
								<div class="normal_3_btn" @click="handleDeleteExit(index)">删除</div>
							</div>
						</div>
					</border-box>
				</div>
			</template>
			<template v-for="(item, index) in routeList" :key="item.node">
				<div class="dis_route_item_2">
					<border-box name="border3">
						<div class="dis_route_item_2_content">
							<div class="dis_route_item_text">避灾路线</div>
							<div class="dis_route_item_label">
								[巷道编号]<span>{{ item.node }}</span>
							</div>
							<div class="dis_route_item_2_content_l3">
								<span>提示语</span>
								<el-input type="textarea" v-model="item.routeDesc" />
								<div class="normal_btn" @click="handleRouteData(item)">
									{{ item.id ? '保存' : '新增' }}
								</div>
								<div class="normal_3_btn" @click="handleDeleteRoute(index)">删除</div>
							</div>
						</div>
					</border-box>
				</div>
			</template>
		</div>
		<LoadRouteModel
			v-if="refreshModel"
			:label-list="exitList"
			:route-list="routeList"
			@add-node="handleAddExit"
			@remove-node="handleDeleteExit"
			@add-tunnel="handleAddRouteTemp"
			@remove-tunnel="handleDeleteRoute"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/disPreRouteManagement';
</style>
