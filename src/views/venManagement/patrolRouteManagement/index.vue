<!--巡检路线管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import { deviceTypes } from '@/api/request/home/menuType'
	import useEquipmentData from '@/hooks/useEquipmentData'
	import RouteAddOrUpdate from '@/views/venManagement/patrolRouteManagement/routeAddOrUpdate.vue'

	const { queryParams, dataList, getList, handleQuery, handleDelete } = useList({
		apiFun: () => {},
		params: {
			pageNum: 1,
			pageSize: 10,
			name: '',
		},
	})

	// 预览
	const previewVisible = ref(false)
	const previewForm = (row) => {
		previewVisible.value = true
	}
	// 路线图
	const routeList = ref([
		{
			name: '11221风门',
			type: deviceTypes.DOOR,
		},
		{
			name: '11221风窗',
			type: deviceTypes.WINDOW,
		},
		{
			name: '11221风门',
			type: deviceTypes.DOOR,
		},
	])
	// 行数
	const lineNum = computed(() => {
		return Math.ceil(routeList.value.length / 6)
	})
	const { formatterEquipmentType } = useEquipmentData()

	const chooseRow = ref({
		id: undefined,
	})
	const addOrUpdateVisible = ref(false)

	const handleAdd = () => {
		chooseRow.value = {
			id: undefined,
		}
		addOrUpdateVisible.value = true
	}
	const handleUpdate = (row) => {
		chooseRow.value = row
		addOrUpdateVisible.value = true
	}
</script>

<template>
	<div class="patrol_manage">
		<div class="patrol_manage_l1">
			<el-form :model="queryParams" inline>
				<el-form-item label="巡检路线名称">
					<el-input v-model="queryParams.name"></el-input>
				</el-form-item>
				<el-form-item>
					<div class="normal_btn" @click="handleQuery">查询</div>
					<div class="normal_4_btn" @click="handleAdd">新增</div>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="dataList" border height="100%">
			<el-table-column label="巡检路线名称" align="center" prop="name" />
			<el-table-column label="排序" align="center" prop="index" />
			<el-table-column label="操作" align="center">
				<template #default="scope">
					<el-button type="primary" link @click="previewForm">预览</el-button>
					<el-button type="primary" link @click="handleUpdate(scope.row)">修改</el-button>
					<el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="patrol_manage_l2_c2">
			<div class="patrol_manage_l2_c2_title">路线图</div>
			<div class="fullDom patrol_manage_l2_c2_body">
				<template v-for="i in lineNum">
					<div class="patrol_manage_l2_c2_line">
						<template v-for="(item, index) in routeList">
							<template v-if="index >= (i - 1) * 6 && index < i * 6">
								<div class="patrol_manage_l2_c2_body_item">
									<div class="patrol_manage_label c-center">
										<span>{{ item.name }}</span>
									</div>
									<div class="patrol_manage_label_bg c-center">
										{{ formatterEquipmentType(item.type) }}
									</div>
									<div class="patrol_manage_line_2"></div>
								</div>
								<div class="patrol_manage_l2_c2_body_item">
									<div class="patrol_manage_line_1"></div>
								</div>
							</template>
						</template>
					</div>
				</template>
			</div>
		</div>
		<route-add-or-update
			v-if="addOrUpdateVisible"
			v-model="addOrUpdateVisible"
			:choose-row="chooseRow"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/venManagement/patrolRouteManagement';
</style>
