<!--三维通风系统巷道管理-->
<script setup>
	import useList from '@/hooks/useList'
	import { useForm } from '@/hooks/useForm'
	import {
		delVentWay,
		getVentWay,
		listRegion,
		listVentWay,
		updateVentWay,
	} from '@/api/api/roadwayManagement'
	import { useDict } from '@/hooks/useDict'
	import { selectDictLabel } from '@/utils/ruoyi'
	import RoadFireUpload from '@/views/venManagement/roadwayManagement/roadFireUpload.vue'
	import { useGainList } from '@/hooks/useGainList'

	const {
		queryParams,
		dataList,
		total,
		getList,
		handleQuery,
		handleSelectionChange,
		handleDelete,
	} = useList({
		apiFun: listVentWay,
		params: {
			pageNum: 1,
			pageSize: 10,
			name: undefined,
			code: undefined,
		},
		deleteFun: delVentWay,
	})

	// 查询风路分支图区域
	const { dataList: regionList } = useGainList({
		apiFun: listRegion,
	})

	const { vent_shape, shore_type, ven_air_direction, vent_source, need_cal_type } = useDict(
		'vent_shape',
		'shore_type',
		'ven_air_direction',
		'vent_source',
		'need_cal_type',
	)
	const formatterVentShape = (row) => {
		return selectDictLabel(vent_shape.value, row.ventShape)
	}
	const formatterShoreType = (row) => {
		return selectDictLabel(shore_type.value, row.shoreType)
	}
	const formatterVenAirDirection = (row) => {
		return selectDictLabel(ven_air_direction.value, row.venAirDirection)
	}
	// 导入数据
	const uploadVisible = ref(false)
	const handleUpload = () => {
		uploadVisible.value = true
	}

	// 新增修改操作
	const { formRef, form, title, open, submitForm } = useForm({
		formParams: {
			id: undefined,
			name: undefined,
			code: undefined,
		},
		titleMes: '巷道',
		updateApi: updateVentWay,
		afterAddFun: handleQuery,
		afterUpdateFun: handleQuery,
	})
	const handleUpdate = async (row) => {
		const res = await getVentWay({
			id: row.id,
		})
		form.value = res.data
		open.value = true
		title.value = `修改巷道`
	}
	const confirmList = ref([
		{
			label: '是',
			value: '1',
		},
		{
			label: '否',
			value: '0',
		},
	])
</script>

<template>
	<div class="table_page_default_no_btn">
		<el-form :model="queryParams" inline>
			<el-form-item label="巷道名称 ">
				<el-input v-model="queryParams.name" />
			</el-form-item>
			<el-form-item label="巷道编号 ">
				<el-input v-model="queryParams.code" />
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
				<div class="normal_2_btn" @click="handleUpload">导入</div>
				<div class="normal_3_btn" @click="handleDelete">删除</div>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="巷道名称" align="center" prop="name" />
			<el-table-column label="巷道编号" align="center" prop="code" />
			<el-table-column label="巷道周长(m)" align="center" prop="circumference" />
			<el-table-column label="巷道长度(m)" align="center" prop="length" />
			<el-table-column label="巷道断面积(㎡)" align="center" prop="surface" />
			<el-table-column
				label="巷道形状"
				align="center"
				prop="ventShape"
				:formatter="formatterVentShape"
			/>
			<el-table-column
				label="支护类型"
				align="center"
				prop="shoreType"
				:formatter="formatterShoreType"
			/>
			<el-table-column
				label="进回风类型"
				align="center"
				prop="venAirDirection"
				:formatter="formatterVenAirDirection"
			/>
			<el-table-column label="风阻(N·S2/m8)" align="center" prop="ventR" />
			<el-table-column label="计划风量(m³/min)" align="center" prop="minQ" />
			<el-table-column label="人工实测风量(m³/min)" align="center" prop="personQ" />
			<el-table-column label="人工实测风量时间" align="center" prop="personQTime" />
			<el-table-column label="操作" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="handleUpdate(scope.row)">修改</el-button>
					<el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="table_page_pagination">
			<pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
		<dia-log
			v-if="open"
			v-model="open"
			:title="title"
			@submit="submitForm"
			:width="1200"
			:height="810"
			has-bottom-btn
			:btn-list="['保存', '取消']"
		>
			<div class="dia_form fullDom">
				<div class="form_title">巷道信息</div>
				<el-form
					ref="formRef"
					:model="form"
					inline
					label-width="auto"
					label-position="left"
					class="form_top"
				>
					<el-form-item label="巷道名称" class="table_page_form_row">
						<el-input v-model="form.name" />
					</el-form-item>
					<el-form-item label="巷道周长(m)">
						<el-input v-model="form.circumference" />
					</el-form-item>
					<el-form-item label="巷道长度(m)">
						<el-input v-model="form.length" />
					</el-form-item>
					<el-form-item label="巷道断面积(m2)">
						<el-input v-model="form.surface" />
					</el-form-item>
					<el-form-item label="巷道形状">
						<el-select v-model="form.ventShape" clearable style="width: 100%">
							<el-option v-for="i in vent_shape" :key="i.value" :label="i.label" :value="i.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="巷道支护类型">
						<el-select v-model="form.shoreType" clearable style="width: 100%">
							<el-option v-for="i in shore_type" :key="i.value" :label="i.label" :value="i.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="进回风类型">
						<el-select v-model="form.venAirDirection" clearable style="width: 100%">
							<el-option
								v-for="i in ven_air_direction"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="起始高程(m)">
						<el-input v-model="form.startAltitude" />
					</el-form-item>
					<el-form-item label="结束高程(m)">
						<el-input v-model="form.endAltitude" />
					</el-form-item>
					<el-form-item label="需风量计算类型">
						<el-select v-model="form.needCalType" clearable>
							<el-option
								v-for="i in need_cal_type"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="是否显示风流方向">
						<el-select v-model="form.directionShow" clearable>
							<el-option
								v-for="i in confirmList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="是否有密闭墙">
						<el-select v-model="form.wallExists" clearable>
							<el-option
								v-for="i in confirmList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="是否连通地面">
						<el-select v-model="form.groundFlag" clearable>
							<el-option
								v-for="i in confirmList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="是否显示巷道名称">
						<el-select v-model="form.roadNameShow" clearable>
							<el-option
								v-for="i in confirmList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select> </el-form-item
					><el-form-item label="是否显示风量标签">
						<el-select v-model="form.modelWindShow" clearable>
							<el-option
								v-for="i in confirmList"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="form_title">通风参数</div>
				<el-form :model="form" inline label-width="auto" label-position="left" class="form_top">
					<el-form-item label="最大风量(m³/min)"> <el-input v-model="form.maxQ" /> </el-form-item
					><el-form-item label="计划风量(m³/min)"> <el-input v-model="form.minQ" /> </el-form-item
					><el-form-item label="人工实测风量(m³/min)">
						<el-input v-model="form.personQ" /> </el-form-item
					><el-form-item label="人工实测风量时间">
						<el-date-picker
							v-model="form.personQTime"
							value-format="YYYY-MM-DD hh:mm:ss"
							type="datetime"
							placeholder="选择日期"
							prefix-icon="Calendar"
						/>
					</el-form-item>
					<el-form-item label="风阻(N·s2/m8)"> <el-input v-model="form.ventR" /> </el-form-item
					><el-form-item label="摩擦系数(N·s2/m4)">
						<el-input v-model="form.ventFriction" /> </el-form-item
					><el-form-item label="局部风阻"> <el-input v-model="form.ventPartR" /> </el-form-item
					><el-form-item label="风阻测定来源">
						<el-select v-model="form.ventSource" clearable style="width: 100%">
							<el-option
								v-for="i in vent_source"
								:key="i.value"
								:label="i.label"
								:value="i.value"
							/>
						</el-select> </el-form-item
					><el-form-item label="人工测定风阻时间">
						<el-date-picker
							v-model="form.ventPersonTime"
							value-format="YYYY-MM-DD hh:mm:ss"
							type="datetime"
							placeholder="选择日期"
							prefix-icon="Calendar"
						/> </el-form-item
					><el-form-item label="风路分支图区域">
						<el-select v-model="form.windMapRegion" clearable style="width: 100%">
							<el-option
								v-for="i in regionList"
								:key="i.value"
								:label="i.region"
								:value="i.region"
							/> </el-select
					></el-form-item>
					<el-form-item label="起始节点">
						<el-input disabled v-model="form.startNode" /> </el-form-item
					><el-form-item label="结束节点">
						<el-input disabled v-model="form.endNode" />
					</el-form-item>
				</el-form>
			</div>
		</dia-log>
		<!--    导入数据-->
		<RoadFireUpload v-if="uploadVisible" v-model="uploadVisible" @submit="handleQuery" />
	</div>
</template>

<style scoped lang="scss">
	.dia_form {
		display: grid;
		grid-template-rows: repeat(2, vh(26) 1fr);
		padding-left: vw(50);
	}
	.form_top {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(auto-fill, vh(38));
		align-content: space-between;
	}
	.form_title {
		font-size: vw(26);
		font-family: YouSheBiaoTiHei, serif;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.78);

		background: linear-gradient(180deg, #d7e8ff 30%, #2bbbea 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
