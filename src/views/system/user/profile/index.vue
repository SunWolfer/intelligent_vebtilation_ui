<template>
	<div class="fullDom">
		<!-- 个人信息 -->
		<div class="profile-individual">
			<div class="profile-individual-top">
				<div class="profile-individual-1"></div>
				<span>个人信息</span>
			</div>
			<div class="profile-individual-bottom">
				<el-form :model="state.user" class="profile-form" label-width="auto" label-position="right">
					<el-form-item>
						<template #label>
							<span>用户名称</span>
						</template>
						<div class="profile-decorator">
							<decorator name="decorator3"></decorator>
						</div>
						<span>{{ state.user.userName }}</span>
					</el-form-item>
					<el-form-item>
						<template #label>
							<span>手机号码</span>
						</template>
						<div class="profile-decorator">
							<decorator name="decorator3"></decorator>
						</div>
						<span>{{ state.user.phonenumber }}</span>
					</el-form-item>
					<el-form-item>
						<template #label>
							<span>用户邮箱</span>
						</template>
						<div class="profile-decorator">
							<decorator name="decorator3"></decorator>
						</div>
						<span>{{ state.user.email }}</span>
					</el-form-item>
					<el-form-item>
						<template #label>
							<span>所属部门</span>
						</template>
						<div class="profile-decorator">
							<decorator name="decorator3"></decorator>
						</div>
						<span v-if="state.user.dept"
							>{{ state.user.dept.deptName }} / {{ state.postGroup }}</span
						>
					</el-form-item>
					<el-form-item>
						<template #label>
							<span>所属角色</span>
						</template>
						<div class="profile-decorator">
							<decorator name="decorator3"></decorator>
						</div>
						<span>{{ state.roleGroup }}</span>
					</el-form-item>
					<el-form-item>
						<template #label>
							<span>创建日期</span>
						</template>
						<div class="profile-decorator">
							<decorator name="decorator3"></decorator>
						</div>
						<span>{{ state.user.createTime }}</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!--    基本资料/修改密码-->
		<div class="profile-basic">
			<div class="profile-btn">
				<template v-for="i in btnList">
					<chart-btns
						:btnimg="i.btnImg"
						:text="i.label"
						:tabs="i.value"
						:activeName="chooseTabs"
						@toClick="changeTabs"
					></chart-btns>
				</template>
			</div>
			<div class="profile-right-form">
				<border-box name="border7" :color="['#00FFFF', 'rgba(0,0,0,0)']">
					<div class="fullDom">
						<user-info v-if="chooseTabs === 'First'" :user="state.user"></user-info>
						<reset-pwd v-if="chooseTabs === 'Second'" :user="state.user"></reset-pwd>
					</div>
				</border-box>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ChartBtns from '@/views/components/ChartBtns'
	import UserInfo from './userInfo'
	import ResetPwd from './resetPwd'
	import { getUserProfile } from '@/api/system/user'

	const chooseTabs = ref('First')
	const btnList = ref([
		{
			label: '基本资料',
			btnImg: 'basicDocument-btn',
			value: 'First',
		},
		{
			label: '修改密码',
			btnImg: 'resetPwd-btn1',
			value: 'Second',
		},
	])
	function changeTabs(val) {
		chooseTabs.value = val
	}

	const activeTab = ref('userinfo')
	const state = reactive({
		user: {},
		roleGroup: {},
		postGroup: {},
	})

	function getUser() {
		getUserProfile().then((response) => {
			state.user = response.data
			state.roleGroup = response.roleGroup
			state.postGroup = response.postGroup
		})
	}

	getUser()
</script>
<style lang="scss" scoped>
	.profile-individual {
		position: absolute;
		width: vw(332);
		height: vh(380);
		left: vw(21);
		top: 5px;
		.profile-individual-top {
			position: relative;
			width: 100%;
			height: vh(80);
			margin-bottom: vh(6);
			span {
				font-size: vh(26);
				font-family: FZLanTingHei-R-GBK, serif;
				font-weight: 400;
				color: #36e5ff;
				line-height: vh(80);
				display: inline-block;
			}
		}
		.profile-individual-bottom {
			position: relative;
			width: 100%;
			height: vh(294);
			background-color: rgba(8, 35, 87, 0.6);
			padding: vh(20);
		}
	}
	.profile-basic {
		position: absolute;
		top: 5px;
		left: vw(370);
		width: vw(1510);
		height: vh(380);
		.profile-btn {
			position: relative;
			width: 100%;
			height: vh(50);
			:deep(.tBtns) {
				width: vw(170);
				height: vh(50);
				cursor: pointer;
				border-radius: 0 2px 2px 2px;
				border: 1px solid #276a9f;
				margin-right: 0.8854166667vw;
				margin-top: 0;
				background: rgba(0, 0, 0, 0.6);
				float: left;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 700;
			}
			:deep(.tBtns-hover) {
				width: vw(170);
				height: vh(50);
				margin-top: 0;
				float: left;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 700;
			}
		}

		.profile-right-form {
			position: relative;
			width: 100%;
			height: vh(324);
			margin-top: vh(6);
			.fullDom {
			}
		}
	}
	.profile-decorator {
		width: 1px;
		height: vh(15);
		margin: 0 vw(10);
	}
	.profile-form {
		:deep(.el-form-item--default) {
			margin-bottom: vh(5);
			.el-form-item__content {
				span {
					font-size: vh(16);
					font-family:
						PingFang SC,
						serif;
					font-weight: 400;
					color: #ffffff;
				}
			}
		}
	}
</style>
