<!--数据项组件-->
<script setup>
	import { doorItemManagement } from '@/api/request/venManagement/itemManagement/doorItemManagement'
	import { selectDictLabel } from '@/utils/ruoyi'

	const props = defineProps({
		type: {
			type: String,
			default: '1',
		},
	})
	const {
		queryParams,
		total,
		dataList,
		getList,
		handleQuery,
		handleDelete,
		handleSelectionChange,
		ITEM_SJLX,
		CZLX,
		formRef,
		form,
		rules,
		title,
		open,
		cancel,
		submitForm,
		handleUpdate,
		handleAdd,
		ITEM_YWLX,
		disaddrType,
		CvariateList,
		clearDataform,
		disanalyzeType,
		CanalyzeTypeList,
	} = doorItemManagement(props.type)
</script>

<template>
	<div class="table_page_default">
		<el-form :model="queryParams" inline>
			<el-form-item label="标签名称">
				<el-input v-model="queryParams.name"></el-input>
			</el-form-item>
			<el-form-item label="标签编码">
				<el-input v-model="queryParams.code"></el-input>
			</el-form-item>
			<el-form-item>
				<div class="normal_btn" @click="handleQuery">查询</div>
			</el-form-item>
		</el-form>
		<div class="table_page_btn_line">
			<div class="normal_btn" @click="handleAdd">新增</div>
			<div class="normal_3_btn" @click="handleDelete">删除</div>
		</div>
		<el-table :data="dataList" border @selectionChange="handleSelectionChange">
			<el-table-column type="selection" align="center" width="50" />
			<el-table-column
				prop="name"
				align="center"
				min-width="110"
				:show-overflow-tooltip="true"
				label="标签名称"
			/>
			<el-table-column
				prop="code"
				align="center"
				min-width="160"
				:show-overflow-tooltip="true"
				label="标签编码"
			/>
			<el-table-column
				prop="sjlx"
				align="center"
				min-width="110"
				:show-overflow-tooltip="true"
				label="数据类型"
			>
				<template #default="scope">
					<span>{{ selectDictLabel(ITEM_SJLX, scope.row.sjlx) }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="czlx" align="center" min-width="110" label="操作类型">
				<template #default="scope">
					<span>{{ selectDictLabel(CZLX, scope.row.czlx) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="value"
				align="center"
				min-width="50"
				:show-overflow-tooltip="true"
				label="标签值"
			/>
			<el-table-column align="center" width="150" label="操作">
				<template #default="scope">
					<el-button link size="small" @click="handleUpdate(scope.row)">修改</el-button>
					<el-button link size="small" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			v-show="total > 0"
			:total="total"
			v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize"
			@pagination="getList"
		/>
		<!--    新增修改弹窗-->
		<dia-log
			:title="title"
			v-model="open"
			:width="800"
			has-bottom-btn
			:btn-list="['保存', '取消']"
			@submit="submitForm"
			@cancel="cancel"
		>
			<el-form
				ref="formRef"
				:model="form"
				:rules="rules"
				class="table_page_form"
				label-width="auto"
				label-position="left"
			>
				<el-form-item label="标签编码" prop="code">
					<el-input :readonly="form.id !== undefined" v-model="form.code" placeholder="标签编码" />
				</el-form-item>
				<el-form-item label="操作类型" prop="czlx">
					<el-select v-model="form.czlx" placeholder="请选择操作类型" clearable>
						<el-option
							v-for="item in CZLX"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="form.name" placeholder="标签名称" />
				</el-form-item>
				<el-form-item label="标签值" prop="value">
					<el-input v-model="form.value" placeholder="标签值" />
				</el-form-item>
				<el-form-item label="业务类型" prop="ywlx">
					<el-select v-model="form.ywlx" placeholder="请选择设备类型">
						<el-option
							v-for="item in ITEM_YWLX"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="关联标签" prop="relateCode">
					<el-input v-model="form.relateCode" placeholder="关联标签" />
				</el-form-item>
				<el-form-item label="数据类型" prop="sjlx">
					<el-select v-model="form.sjlx" @change="clearDataform" placeholder="请选择数据类型">
						<el-option
							v-for="item in ITEM_SJLX"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="寄存器" prop="addrType">
					<el-select :disabled="disaddrType" v-model="form.addrType" placeholder="请选择">
						<el-option
							v-for="item in CvariateList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="解析方式" prop="analyzeType">
					<el-select
						:disabled="disanalyzeType"
						v-model="form.analyzeType"
						placeholder="请选择解析方式"
					>
						<el-option
							v-for="item in CanalyzeTypeList"
							:key="item.code"
							:label="item.value"
							:value="item.code"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="转换系数" prop="vark">
					<el-input type="number" v-model="form.vark" placeholder="转换系数" />
				</el-form-item>
				<el-form-item label="转换常量" prop="varb">
					<el-input type="number" v-model="form.varb" placeholder="转换常量" />
				</el-form-item>
				<el-form-item label="数据地址" prop="addr">
					<el-input type="number" v-model="form.addr" placeholder="数据地址" />
				</el-form-item>
				<el-form-item label="是否显示:" prop="visible">
					<el-switch
						v-model="form.visible"
						active-text="显示"
						active-value="1"
						inactive-text="不显示"
						inactive-value="0"
					/>
				</el-form-item>
			</el-form>
		</dia-log>
	</div>
</template>

<style scoped lang="scss"></style>
