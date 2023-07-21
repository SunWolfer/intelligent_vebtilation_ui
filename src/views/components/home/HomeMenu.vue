<script setup>
	import { homeMenu } from '@/api/request/home/homeMenu'

	const { menuList, showMenus, setHomeFun } = homeMenu()
</script>

<template>
	<div class="home_menu">
		<template v-for="item in menuList" :key="item.type">
			<div
				:class="showMenus.indexOf(item.type) !== -1 ? 'home_menu_active' : 'home_menu_default'"
				@click="setHomeFun(item.type, $event)"
			>
				{{ item.name }}
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/styles/home/home_menu';
</style>
