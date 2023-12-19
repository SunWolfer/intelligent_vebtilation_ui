<script setup>
	import { getServer } from '@/api/monitor/server'

	const server = ref([])
	const { proxy } = getCurrentInstance()

	const serverList = computed(() => {
		return [
			{
				className: 'server-cpu',
				name: 'CPU',
				headerList: ['属性', '值'],
				rowList: [
					['核心数', server.value?.cpu?.cpuNum],
					['用户使用率', `${server.value?.cpu?.used}%`],
					['系统使用率', `${server.value?.cpu?.sys}%`],
					['当前空闲率', `${server.value?.cpu?.free}%`],
				],
			},
			{
				className: 'server-internal',
				name: '内存',
				headerList: ['属性', '内存', 'JVM'],
				rowList: [
					['总内存', `${server.value?.mem?.total}G`, `${server.value?.jvm?.total}M`],
					['已用内存', `${server.value?.mem?.used}G`, `${server.value?.jvm?.used}M`],
					['剩余内存', `${server.value?.mem?.free}G`, `${server.value?.jvm?.free}M`],
					['使用率', `${server.value?.mem?.usage}%`, `${server.value?.jvm?.usage}%`],
				],
			},
			{
				className: 'server-server',
				name: '服务器信息',
				headerList: ['服务器名称', '操作系统', '服务器IP', '系统架构'],
				rowList: [
					[
						server.value?.sys?.computerName,
						server.value?.sys?.osName,
						server.value?.sys?.computerIp,
						server.value?.sys?.osArch,
					],
				],
			},
			{
				className: 'server-java',
				name: 'Java虚拟机信息',
				headerList: ['Java名称', '启动时间', '安装路径', '项目路径', 'Java版本', '运行时长'],
				rowList: [
					[
						server.value?.jvm?.name,
						server.value?.jvm?.startTime,
						server.value?.jvm?.home,
						server.value?.sys?.userDir,
						server.value?.jvm?.version,
						server.value?.jvm?.runTime,
					],
				],
			},
			{
				className: 'server-disc',
				name: '磁盘状态',
				headerList: [
					'盘符路径',
					'文件系统',
					'盘符类型',
					'总大小',
					'可用大小',
					'已用大小',
					'已用百分比',
				],
				rowList: server.value?.sysFiles,
			},
		]
	})
	function getTableStyle(list) {
		return {
			width: 100 / list.length + '%',
		}
	}

	function getList() {
		proxy.$modal.loading('正在加载服务监控数据，请稍候！')
		getServer().then((response) => {
			server.value = response.data
			proxy.$modal.closeLoading()
		})
	}

	getList()
</script>

<template>
	<div class="fullDom server_body">
		<template v-for="(item, index) in serverList" :key="'server' + index">
			<div :class="item.className">
				<border-box
					name="border9"
					background-color="rgba(8, 35, 87, 0.6)"
					:color="['#15b9e9', '#00ffff', 'none']"
				>
					<div class="item-box-content">
						<div class="item-box-content-title">{{ item.name }}</div>
						<div class="item-box-content-body">
							<div class="item-header">
								<div
									v-for="(head, hederIndex) in item.headerList"
									:key="'header' + hederIndex"
									class="text-center"
									:style="getTableStyle(item.headerList)"
								>
									{{ head }}
								</div>
							</div>
							<div class="item-row" v-for="(row, rowIndex) in item.rowList" :key="'row' + rowIndex">
								<div
									v-for="(col, colIndex) in row"
									:key="'col' + colIndex"
									class="text-center"
									:style="getTableStyle(item.headerList)"
									:title="col"
								>
									{{ col }}
								</div>
							</div>
						</div>
					</div>
				</border-box>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	@mixin serverBody {
		.item-box-content {
			position: relative;
			width: 100%;
			height: 100%;
			.item-box-content-title {
				position: relative;
				margin: vh(17) auto auto;
				width: vw(300);
				height: vh(34);
				background-image: url('@/assets/images/title-bg.png');
				background-size: 100% 100%;
				text-align: center;
				line-height: vh(34);
				color: #ffffff;
			}
			//无底部
			.item-box-content-body {
				position: relative;
				width: 100%;
				height: vh(197);
				color: #ffffff;
				padding: vh(10) vw(30);
				overflow-y: auto;
				.item-header {
					position: relative;
					width: 100%;
					height: vh(32);
					color: #000000;
					background: #00afff;
					font-size: vw(14);
					font-family:
						PingFang SC,
						serif;
					font-weight: 400;
					line-height: vh(32);
					text-align: center;
					div {
						display: inline-block;
					}
				}
				.item-row {
					position: relative;
					width: 100%;
					height: vh(34);
					font-size: vw(14);
					font-family:
						PingFang SC,
						serif;
					font-weight: 400;
					color: #ffffff;
					line-height: vh(34);
					text-align: center;
					div {
						display: inline-block;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						-o-text-overflow: ellipsis;
					}
					&:nth-child(n) {
						border-bottom: 1px dashed #238db0;
					}
					&:last-child {
						border: none;
					}
				}
			}
		}
	}
	.server_body {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: vw(110);
		grid-row-gap: vh(52);
		padding: 0 vw(60) vh(50) vw(60);
		@include serverBody;
	}

	.server-cpu {
	}
	.server-internal {
	}
	.server-server {
	}
	.server-java {
		grid-column: 1/4;
	}
	.server-disc {
		grid-column: 1/4;
	}
</style>
