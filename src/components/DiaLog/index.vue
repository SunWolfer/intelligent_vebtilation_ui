<script setup lang="ts">
	import { dynamicHeight, dynamicWidth } from '@/utils/ruoyi'

	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 1052,
		},
		height: {
			type: Number,
			default: 619,
		},
		hasBottomBtn: {
			type: Boolean,
			default: false,
		},
		btnList: {
			type: Array,
			default: ['确定', '取消'],
		},
	})
	const emits = defineEmits(['update:modelValue', 'submit', 'cancel'])
	const showDiaLog = computed({
		get() {
			return props.modelValue
		},
		set() {
			emits('update:modelValue', false)
		},
	})

	function closeDia() {
		showDiaLog.value = false
		emits('cancel')
	}

	const getDiaWidth = computed(() => {
		return dynamicWidth(props.width) + 'px'
	})
	const getDiaHeight = computed(() => {
		return dynamicHeight(props.height) + 'px'
	})

	function submitForms() {
		emits('submit')
	}
</script>

<template>
	<div class="os-dialog" v-if="showDiaLog">
    <div class="os-dialog-content animate__animated animate__faster animate__zoomInDown">
      <border-box name="border8" :title="title">
        <div class="os-dialog-close" @click="closeDia">
          <el-icon>
            <Close />
          </el-icon>
        </div>
        <div :class="hasBottomBtn ? 'os-dialog-content_type_2' : 'os-dialog-content_type_1'">
          <div class="content_type_2_header">
            <slot></slot>
          </div>
          <div v-if="hasBottomBtn" class="content_type_2_bottom">
            <slot name="bottom">
              <div class="normal_btn" @click="submitForms">{{ btnList[0] }}</div>
              <div class="normal_2_btn" @click="closeDia">{{ btnList[1] }}</div>
            </slot>
          </div>
        </div>
      </border-box>
    </div>
	</div>
</template>

<style lang="scss">
	.os-dialog {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 20;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.os-dialog-content {
		position: absolute;
		width: v-bind(getDiaWidth);
		height: v-bind(getDiaHeight);
		min-width: 560px;
		min-height: 330px;
	}
	.os-dialog-content_type_1 {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.os-dialog-content_type_2 {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-template-rows: 1fr vh(100);
		grid-template-areas:
			'l1 l1 l1'
			'. l2 .';
	}
	.content_type_2_header {
		grid-area: l1;
		position: relative;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.content_type_2_bottom {
		grid-area: l2;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
    justify-content: center;
		place-items: center center;
	}
	//  关闭按钮
	.os-dialog-close {
		position: absolute;
		right: 25px;
		top: 45px;
		width: 12px;
		height: 11px;
		color: rgba(185, 220, 239, 1);
		cursor: pointer;
	}
</style>
