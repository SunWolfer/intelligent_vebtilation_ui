<script setup>
	//设备对应图
	import { Search } from '@element-plus/icons-vue'
	import { homeIcon } from '@/api/request/home/homeIcon'

	const emits = defineEmits(['moveCamera'])

	const {
		equipmentList,
		equipSearch,
		queryEquipList,
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
			<div class="home_icon_search">
				<el-input v-model="equipSearch" placeholder="请输入关键字搜索">
					<template #append>
						<el-button :icon="Search" @click="queryEquipList" />
					</template>
				</el-input>
			</div>
			<template v-for="(item, index) in equipmentList" :key="item.id">
				<div class="home_icon_dom" :style="iconStyle(index)">
					<div :class="getEquipmentClass(item)" @click="setChooseFather(item.type)"></div>
					<div class="home_icon_text" @click="clickFirstMenu(item, index, $event)">
						{{ item.name }}
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
