<template>
	<div class="navbar">
		<div class="right-menu">
			<div class="avatar-container">
				<el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
					<div class="avatar-wrapper">
						<div class="avatar-wrapper-title">{{ userStore.name }}</div>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<router-link to="/user/profile">
								<el-dropdown-item>个人中心</el-dropdown-item>
							</router-link>
							<el-dropdown-item divided command="logout">
								<span>退出登录</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useUserStore from '@/store/modules/user'
	import useCurrentInstance from '@/hooks/useCurrentInstance'
	const userStore = useUserStore()

	function handleCommand(command: any) {
		switch (command) {
			case 'logout':
				logout()
				break
			default:
				break
		}
	}

	const { proxy } = useCurrentInstance()
	const router = useRouter()
	function logout() {
		proxy.$modal
			.prompt({
				title: '系统提示',
				message: '确定注销并退出系统吗?',
				icon: 'loginWarn',
				width: 750,
			})
			.then(() => {
				userStore.logOut().then(() => {
					router.push({ path: '/login' })
				})
			})
			.catch(() => {})
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: vh(46);
		top: vh(45);
		right: vw(40);
		overflow: hidden;
		position: absolute;
		background: transparent;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

		.right-menu {
			float: right;
			height: 100%;
			line-height: vh(60);
			display: flex;

			&:focus {
				outline: none;
			}

			.right-menu-item {
				display: inline-block;

				height: 100%;
				font-size: vw(18);
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background 0.3s;

					&:hover {
						background: rgba(0, 0, 0, 0.025);
					}
				}
			}

			.avatar-container {
				.avatar-wrapper {
					position: relative;
					color: #ffffff;

					.user-avatar {
						cursor: pointer;
						width: vh(40);
						height: vh(40);
						border-radius: 50%;
						display: inline-block;
						float: left;
					}

					.avatar-wrapper-title {
						margin: 0 vw(10);
						cursor: pointer;
						position: relative;
						font-size: vw(20);
						line-height: vh(40);
						height: vh(40);
						display: inline-block;
						user-select: none;
					}
				}
			}
		}
	}

	.warn-dia-body {
		margin-top: vh(20);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: vw(26);
		font-family:
			Adobe Heiti Std,
			serif;
		font-weight: normal;
		color: #fffffd;
		line-height: 44px;

		.el-icon {
			font-size: vw(26);
			line-height: 44px;
			color: rgba(255, 186, 0, 1);
		}
	}
</style>
