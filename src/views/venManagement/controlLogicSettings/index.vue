<!--控制逻辑设置-->
<script setup>
	import GradualTitle from '@/views/components/gradualTitle/index.vue'
	import { getControllerList, readLogicOrder, sendLogicOrder } from '@/api/api/controlLogicSettings'
	import useSocket from '@/hooks/useSocket'
	import { isNull } from '@/utils/ruoyi'
	import { saveAs } from 'file-saver'
	import ControlReadFile from './ControlReadFile.vue'
	import ControllerItem from '@/views/components/ControllerItem/index.vue'

	// 	控制器列表
	const chooseLi = ref('0')
	const controllerList = ref([])

	// 查询控制器列表
	const initControlList = async () => {
		const { data } = await getControllerList()
		if (data && data.length > 0) {
			controllerList.value = data
		}
	}
	// 选择控制器
	const chooseController = (row) => {
		if (row?.onlineStatus === '1') {
			resetForm()
			chooseLi.value = row.ip
		}
	}

	watch(
		() => controllerList.value,
		(val) => {
			let chooseRow = val.filter((i) => {
				return i.ip === chooseLi.value
			})
			if (chooseRow.length === 0) {
				resetForm()
				chooseLi.value = '0'
				return
			}
			if (chooseRow[0].onlineStatus === '0') {
				resetForm()
				chooseLi.value = '0'
			}
		},
		{ deep: true },
	)

	// 	重置数据
	const resetForm = () => {
		for (let i = 0; i < processSteps.value.length; i++) {
			processSteps.value[i].content = ''
		}
	}
	// 流程步骤
	const processSteps = ref([
		{
			status: '0',
			content: '',
		},
		{
			status: '1',
			content: '',
		},
		{
			status: '2',
			content: '',
		},
		{
			status: '3',
			content: '',
		},
		{
			status: '4',
			content: '',
		},
		{
			status: '5',
			content: '',
		},
		{
			status: '6',
			content: '',
		},
		{
			status: '7',
			content: '',
		},
		{
			status: '8',
			content: '',
		},
		{
			status: '9',
			content: '',
		},
	])
	// socket连接
	const { socketData, clientSocket, dataRes } = useSocket('controllerList', 'statusContent')
	watch(
		() => dataRes.controllerList,
		(val) => {
			controllerList.value = val
		},
	)
	watch(
		() => dataRes.statusContent,
		(val) => {
			if (isNull(chooseLi.value)) return
			if (chooseLi.value === val.ip) {
				for (let i = 0; i < processSteps.value.length; i++) {
					if (processSteps.value[i].status === val.status) {
						processSteps.value[i].content = val.content
					}
				}
			}
		},
	)
	const { proxy } = getCurrentInstance()
	// 读取
	const readData = async (row) => {
		if (chooseLi.value === '0') return
		const { msg } = await readLogicOrder({
			ip: chooseLi.value,
			...row,
		})
		proxy.$modal.msg(msg)
	}
	// 下发
	const distributeData = async (row) => {
		if (chooseLi.value === '0') return
		const { msg } = await sendLogicOrder({
			ip: chooseLi.value,
			...row,
		})
		proxy.$modal.msg(msg)
	}
	// 导入文件
	const readContent = (obj) => {
		for (let i = 0; i < processSteps.value.length; i++) {
			if (processSteps.value[i].status === obj?.status) {
				processSteps.value[i].content = obj.content
			}
		}
	}

	// 导出文件
	const exportFile = (row) => {
		const file = new File([row.content], `控制逻辑${row.status}`, {
			type: 'text/plain;charset=utf-8',
		})
		saveAs(file)
	}

	onMounted(() => {
		initControlList()
		resetForm()
		clientSocket?.('controllerList|config|door')
	})

	onBeforeUnmount(() => {
		socketData.value?.close()
	})
</script>

<template>
	<div class="control_logic_setting">
		<border-box name="border11" class="fullDom" :color="['#0857a8', '#25d2f5']">
			<div class="door_control fullDom">
				<div class="door_control_top"></div>
				<div class="door_control_bottom">
					<template v-for="i in processSteps" :key="i.status">
						<div class="door_control_bottom_body fullDom">
							<gradual-title :title="i.status" style="width: 40px" />
							<el-input v-model="i.content" type="textarea" />
							<div class="door_control_bottom_body_btn">
								<div class="blue_control_btn" @click="readData(i)">读取</div>
								<div class="blue_control_btn" @click="distributeData(i)">下发</div>
								<ControlReadFile :status="i.status" @read-content="readContent" />
								<div class="green_control_btn" @click="exportFile(i)">导出</div>
							</div>
						</div>
					</template>
				</div>
			</div>
		</border-box>
		<ControllerItem
			:data-list="controllerList"
			:choose-data="chooseLi"
			@set-choose="chooseController"
		/>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/door/controlLogicSettings';
</style>
