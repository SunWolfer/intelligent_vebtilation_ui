<script setup>
	const props = defineProps({
		status: String,
	})

	const { proxy } = getCurrentInstance()

	// 导入
	const uploadRef = ref(null)
	// 文件类型
	const fileType = ref(['txt'])
	// 文件列表
	const fileList = ref([])
	const emits = defineEmits(['readContent'])

	watch(fileList.value, async (value) => {
		if (value.length === 0) return
		const file = value[0]
		const reader = new FileReader()
		reader.readAsText(file, 'UTF-8')
		reader.onload = (evt) => {
			const fileString = evt.target.result
			emits('readContent', {
				status: props.status,
				content: fileString,
			})
		}
	})

	// 校验文件格式
	const checkFile = (file) => {
		const fileName = file.name.split('.')
		const fileExt = fileName[fileName.length - 1]
		const isTypeOk = fileType.value.indexOf(fileExt) >= 0
		if (!isTypeOk) {
			proxy.$modal.msgError(`文件格式不正确, 请上传${fileType.value.join('/')}格式文件!`)
			return false
		}
		return true
	}
	// 文件读取
	const fileChange = (uploadFile) => {
		if (!checkFile(uploadFile)) return
		fileList.value[0] = uploadFile.raw
	}
	// 	文件超出
	const handleExceed = (uploadFile) => {
		if (!checkFile(uploadFile[0])) return
		fileList.value[0] = uploadFile[0]
	}
</script>

<template>
	<el-upload
		ref="uploadRef"
		action=""
		:auto-upload="false"
		:show-file-list="false"
		:limit="1"
		:on-change="fileChange"
		:on-exceed="handleExceed"
	>
		<template #default>
			<div class="green_control_btn">导入</div>
		</template>
	</el-upload>
</template>

<style scoped lang="scss">
	@mixin control_btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		width: vw(68);
		height: vh(31);
		background-size: 100% 100%;
		font-size: vw(14);
		font-family:
			PingFang SC,
			serif;
		font-weight: 400;
		color: #ffffff;
		padding: 0;
		border: none;
		background-color: transparent;
	}
	.green_control_btn {
		@include control_btn;
		background-image: url('@/assets/images/controlLogicSettings/button_mr_g.png');
		&:hover {
			background-image: url('@/assets/images/controlLogicSettings/button_xz_g.png');
		}
	}
</style>
