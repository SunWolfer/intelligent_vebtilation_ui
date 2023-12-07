<!--控制器-->
<script setup>
	import GradualTitle from '@/views/components/gradualTitle/index.vue'

	const props = defineProps({
		dataList: {
			type: Array,
			default: [],
		},
		chooseData: {
			type: String,
		},
	})
	const emits = defineEmits(['setChoose'])

	const chooseController = (data) => {
		emits('setChoose', data)
	}
</script>

<template>
	<!--		控制器-->
	<border-box
		class="window-controller-border"
		name="border10"
		:title-width="-1"
		:color="['#0857a8', '#25d2f5']"
	>
		<div class="fullDom">
			<gradual-title title="控制器" />
			<div class="controller-label c-center">
				<div class="controller-green-ball"></div>
				<span>在线</span>
				<div class="controller-red-ball"></div>
				<span>离线</span>
			</div>
			<ul class="controller-ul">
				<li
					v-for="i in dataList"
					:class="chooseData === i.ip ? 'chooseLiText' : ''"
					@click="chooseController(i)"
				>
					<span class="overText" :title="`${i.ip}(${i.location})`">{{
						`${i.ip}(${i.location})`
					}}</span>
					<div class="fr c-center">
						<div
							:class="i.onlineStatus === '1' ? 'controller-green-ball' : 'controller-red-ball'"
						></div>
					</div>
				</li>
			</ul>
		</div>
	</border-box>
</template>

<style scoped lang="scss">
	//	控制器
	.window-controller-border {
		position: absolute;
		right: vw(100);
		top: vh(15);
		width: vw(362);
		height: vh(180);
		padding: vh(20) vw(23);

		.controller-label {
			position: absolute;
			right: 0;
			top: 0;
			height: vh(36);
			line-height: vh(36);

			span {
				font-size: vw(14);
				font-family:
					PingFang SC,
					serif;
				font-weight: 400;
				color: #ffffff;
				line-height: vh(36);
				margin: 0 vw(5);
			}
		}

		.controller-green-ball {
			width: vh(16);
			height: vh(16);
			background: radial-gradient(circle, #00ff00, #cefff9);
			border-radius: 50%;
		}

		.controller-red-ball {
			width: vh(16);
			height: vh(16);
			background: radial-gradient(circle, #ff0000, #ffc1aa);
			border-radius: 50%;
		}

		.controller-ul {
			position: relative;
			width: 100%;
			height: vh(100);
			list-style: none;
			background-color: rgba(255, 255, 255, 0);
			overflow-y: auto;
			font-size: vw(16);
			font-family:
				PingFang SC,
				serif;
			font-weight: 400;
			color: #ffffff;
			line-height: vh(30);
			margin: vh(5) 0 0 0;
			padding: 0;

			li {
				border-bottom: 1px dashed rgba(55, 159, 219, 0.7);
				cursor: pointer;

				span {
					display: inline-block;
					width: calc(100% - #{vw(45)});
				}

				.fr {
					width: vh(16);
					height: vh(30);
				}
			}
		}
	}

	@mixin gradualText {
		font-family:
			Microsoft YaHei,
			serif;
		font-size: vw(24);
		font-weight: 600;
		color: #00ffff;
		line-height: vh(36);

		background: linear-gradient(92deg, #01aaff 30%, #00eaff 50%, #01aaff 70%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 4s infinite linear;
	}

	.chooseLiText {
		span {
			@include gradualText;
			font-family:
				PingFang SC,
				serif;
			font-size: vw(16);
			font-weight: 400;
			line-height: vh(30);
		}

		background-color: #024690;
	}
</style>
