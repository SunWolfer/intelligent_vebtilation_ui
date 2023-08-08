import { AnimationAction, AnimationMixer, Clock, LoopOnce, Object3D } from 'three'

interface animationObj {
	name: string
	value: AnimationAction
}
export class ModelAnimation {
	object: Object3D
	mixer: AnimationMixer
	cartoonList: animationObj[]
	animationReqId: number | undefined
	clock: Clock
	constructor(object: Object3D) {
		this.object = object
		this.mixer = new AnimationMixer(this.object)
		this.cartoonList = this._initList()
		this.clock = new Clock()
		this.renderAnimation()
	}
	_initList() {
		let modList = []
		for (let i = 0; i < this.object.children.length; i++) {
			const childObj = this.object.children[i]
			for (let j = 0; j < childObj.animations.length; j++) {
				let obj = childObj.animations[j]
				const animation = this.mixer.clipAction(obj) // 返回动画操作对象
				animation.timeScale = 1 // 设置动画播放速度
				modList.push({
					name: obj.name,
					value: animation,
				})
			}
		}

		return modList
	}
	/**
	 * 播放动画
	 * @param playName 下一个播放动画的名称
	 * @param isOnce 是否单次播放
	 * @param stopOther 是否关闭其他动画
	 * @private
	 */
	_playCartoon(playName: string, isOnce = false, stopOther = true) {
		// 播放动画
		if (!playName) {
			for (let argument of this.cartoonList) {
				argument.value.play()
				argument.value.paused = false
			}
		} else {
			for (let i = 0, len = this.cartoonList.length; i < len; i++) {
				if (this.cartoonList[i].name === playName) {
					if (isOnce) {
						this.cartoonList[i].value.setLoop(LoopOnce, 0) // 不循环播放
						this.cartoonList[i].value.clampWhenFinished = true // 暂停在动画最后一帧
						this.cartoonList[i].value.enabled = true
					}
					this.cartoonList[i].value.play()
					this.cartoonList[i].value.paused = false
					if (stopOther) this._disposeMod(i)
				}
			}
		}
	}

	/**
	 * 暂停动画
	 * @param playName 暂停播放动画的名称
	 * @private
	 */
	_pausedCartoon(playName: string) {
		// 暂停动画
		for (let i = 0, len = this.cartoonList.length; i < len; i++) {
			if (this.cartoonList[i].name === playName) {
				this.cartoonList[i].value.paused = true
				this._disposeMod(i)
			}
		}
	}

	/**
	 * 取消下标与入参不一致的动画
	 * @param zindex
	 * @private
	 */
	_disposeMod(zindex: number) {
		// 取消动画
		for (let i = 0, len = this.cartoonList.length; i < len; i++) {
			if (i !== zindex) {
				this.cartoonList[i].value.stop()
			}
		}
	}

	/**
	 * 设置动画播放速度
	 * @param speed 速度 Integer
	 * @private
	 */
	_cartoonSpeed(speed: number) {
		for (let i = 0, len = this.cartoonList.length; i < len; i++) {
			this.cartoonList[i].value.timeScale = speed
		}
	}
	/**
	 * 隐藏模型
	 * @param {Object} name
	 */
	_removeMassif(name: string) {
		this.object.traverse((obj) => {
			if (obj.name === name) {
				// obj.material.visible = false
				obj.visible = false
			}
		})
	}
	/**
	 * 显示模型
	 * @param {Object} name
	 */
	_addMassif(name: string) {
		this.object.traverse((obj) => {
			if (obj.name === name) {
				// obj.material.visible = true
				obj.visible = true
			}
		})
	}
	renderAnimation() {
		this.animationReqId = requestAnimationFrame(this.renderAnimation.bind(this))
		let time = this.clock.getDelta()
		if (this.mixer) {
			this.mixer.update(time)
		}
	}
	unMountClass() {
		cancelAnimationFrame(this.animationReqId!)
	}
}
