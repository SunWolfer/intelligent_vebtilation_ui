<script setup>
	//设备对应图
	import { homeIcon } from '@/api/request/home/homeIcon'

	const emits = defineEmits(['moveCamera'])

	const {
		equipmentList,
		iconStyle,
		getEquipmentClass,
		clickFirstMenu,
		HomeIconSecondMenuRef,
		showSecondMenu,
		secondMenuList,
		navigateStyle,
		getChooseMenu,
		setChooseFather,
		setChooseEquipment,
	} = homeIcon(emits)
</script>

<template>
	<div>
		<div class="home_icon_bg">
			<template v-for="(item, index) in equipmentList" :key="item.id">
				<div class="home_icon_dom" :style="iconStyle(index)">
					<div :class="getEquipmentClass(item)" @click="setChooseFather(item.type)"></div>
					<div class="home_icon_text" @click="clickFirstMenu(item, index, $event)">
						{{ item.name + ` [${item.total}/` }}
						<span class="text-green">{{ item.onLine }}</span
						>]
					</div>
				</div>
			</template>
		</div>
		<div
			v-if="showSecondMenu"
			class="home_icon_s_m"
			ref="HomeIconSecondMenuRef"
			:style="navigateStyle"
		>
			<transition-group
				appear
				enter-active-class="animate__animated animate__faster animate__fadeInLeft"
				leave-active-class="animate__animated animate__faster animate__fadeOutLeft"
			>
				<div
					v-for="i in secondMenuList"
					:key="i.id"
					class="home_icon_s_m_animation"
					:class="getChooseMenu(i)"
					@click="setChooseEquipment(i)"
				>
					{{ i.name }}
				</div>
			</transition-group>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_icon';
</style>
