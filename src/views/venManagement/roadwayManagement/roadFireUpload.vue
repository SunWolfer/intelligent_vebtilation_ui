<script setup>
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	import { getToken } from '@/utils/auth'
	import { download } from '@/utils/request'

	const { proxy } = useCurrentInstance()
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(['update:modelValue', 'submit'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})
	const uploadRef = ref(null)
	const upload = {
		// 是否禁用上传
		isUploading: false,
		// 是否更新已存在的巷道数据
		updateSupport: 0,
		// 设置上传的请求头部
		headers: { Authorization: 'Bearer ' + getToken() },
		// 上传的地址
		url: import.meta.env.VITE_APP_BASE_API + '/api/calculate/ventilationroadway/importData',
	}

	/**文件上传中处理 */
	const handleFileUploadProgress = (event, file, fileList) => {
		upload.isUploading = true
	}
	/** 文件上传成功处理 */
	const handleFileSuccess = (response, file, fileList) => {
		upload.isUploading = false
		uploadRef.value?.handleRemove(file)
		emits('submit')
		showDiaLog.value = false
	}

	// 下载模板
	const downloadFire = async () => {
		await download(
			'/api/calculate/ventilationroadway/importTemplate',
			{},
			`巷道模板${new Date().getTime()}.xlsx`,
		)
	}

	/** 提交上传文件 */
	function submitFileForm() {
		uploadRef.value?.submit()
	}
</script>

<template>
	<dia-log
		title="导入数据"
		v-model="showDiaLog"
		v-if="showDiaLog"
		has-bottom-btn
		:width="800"
		:height="550"
		@submit="submitFileForm"
	>
		<el-upload
			ref="uploadRef"
			:limit="1"
			accept=".xlsx, .xls"
			:headers="upload.headers"
			:action="upload.url + '?updateSupport=' + upload.updateSupport"
			:disabled="upload.isUploading"
			:on-progress="handleFileUploadProgress"
			:on-success="handleFileSuccess"
			:auto-upload="false"
			drag
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<template #tip>
				<div class="el-upload__tip text-center">
					<div class="el-upload__tip" style="color: #fff">
						<el-checkbox v-model="upload.updateSupport" />是否更新已存在的巷道数据
					</div>
					<span style="color: #fff">仅允许导入xls、xlsx格式文件。</span>
					<el-link
						type="primary"
						:underline="false"
						style="font-size: 12px; vertical-align: baseline"
						@click="downloadFire"
						>下载模板</el-link
					>
				</div>
			</template>
		</el-upload>
	</dia-log>
</template>

<style lang="scss" scoped></style>
