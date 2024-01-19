<script setup>
	import { useCommitForm } from '@/hooks/useForm'
	import { controlDoor } from '@/api/api/airDoor'

	const props = defineProps({
		dataForm: {
			type: Object,
			default: () => {
				return {}
			},
		},
		videoUrl1: {
			type: String,
			default: '',
		},
		videoUrl2: {
			type: String,
			default: '',
		},
	})

	const form = ref({
		door1LeftWinSet: '',
		door1RightWinSet: '',
		door2LeftWinSet: '',
		door2RightWinSet: '',
	})

	const tabList = [
		{
			name: 'A门左侧风窗',
			closeKey: 'windowStatusA1', // 关到位key
			openKey: 'windowStatusA1', // 开到位key
			openRebackKey: 'openDegreeNowA1', // 当前开度key
			openSetKey: 'door1LeftWinSet', // 设置开度key
			type: '21',
		},
		{
			name: 'A门右侧风窗',
			closeKey: 'windowStatusA2', // 关到位key
			openKey: 'windowStatusA2', // 开到位key
			openRebackKey: 'openDegreeNowA2', // 当前开度key
			openSetKey: 'door1RightWinSet', // 设置开度key
			type: '22',
		},
		{
			name: 'B门左侧风窗',
			closeKey: 'windowStatusB1', // 关到位key
			openKey: 'windowStatusB1', // 开到位key
			openRebackKey: 'openDegreeNowB1', // 当前开度key
			openSetKey: 'door2LeftWinSet', // 设置开度key
			type: '23',
		},
		{
			name: 'B门右侧风窗',
			closeKey: 'windowStatusB2', // 关到位key
			openKey: 'windowStatusB2', // 开到位key
			openRebackKey: 'openDegreeNowB2', // 当前开度key
			openSetKey: 'door2RightWinSet', // 设置开度key
			type: '24',
		},
	]

	const downBtn = async (key, type) => {
		if (parseInt(form.value[key]) >= 0 && parseInt(form.value[key]) <= 100) {
			await useCommitForm(controlDoor, {
				queryParams: {
					devId: props.dataForm.id,
					controlType: type,
					controlValue: form.value[key],
				},
			})
		}
	}
</script>

<template>
	<div class="four_window_door">
		<div class="four_window_door_video_1">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
				<m-video type="fm" :video-path="videoUrl1" :domid="'mDevicePlayer3'" />
			</border-box>
		</div>
		<div class="four_window_door_video_2">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
				<m-video type="fm" :video-path="videoUrl2" :domid="'mDevicePlayer4'" />
			</border-box>
		</div>
		<template v-for="(item, index) in tabList" :key="index">
			<border-box name="border1" background-color="rgba(24, 25, 49, 0.54)">
				<div class="four_window_door_form">
					<div class="four_window_door_form_title">
						<border-box name="border5">
							<div class="set_btn_default">
								<span>{{ item.name }}</span>
							</div>
						</border-box>
					</div>
					<div class="four_window_door_form_line_1">
						<span>关到位</span>
						<div :class="[dataForm[item.closeKey] === '2' ? 'green_ball' : 'yellow_ball']"></div>
						<span>开到位</span>
						<div :class="[dataForm[item.openKey] === '1' ? 'green_ball' : 'yellow_ball']"></div>
					</div>
					<div class="four_window_door_form_line_2">
						<span>当前开度</span>
						<span>{{ dataForm[item.openRebackKey] }}</span>
					</div>
					<div class="four_window_door_form_line_3">
						<span>设置开度</span>
						<el-input v-model="form[item.openSetKey]" />
						<span>%</span>
						<div class="normal_btn" @click="downBtn(item.openSetKey, item.type)">设置</div>
					</div>
				</div>
			</border-box>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_air_four_window_door';
</style>
