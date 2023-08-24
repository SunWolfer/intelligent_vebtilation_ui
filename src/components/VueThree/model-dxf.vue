<script>
	import { defineComponent } from 'vue'
	import { DXFLoader } from './LoaderDXF/index'
	import mixin from './model-mixin.vue'
	import { Group } from 'three'
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
	import { getCenter } from './utils'

	export default defineComponent({
		name: 'model-dxf',
		mixins: [mixin],
		props: {
			lights: {
				type: Array,
				default() {
					return [
						{
							type: 'HemisphereLight',
							position: { x: 0, y: 1, z: 0 },
							skyColor: 0xffffff,
							groundColor: 0xffffff,
							intensity: 0.8,
						},
						{
							type: 'DirectionalLight',
							position: { x: 1, y: 1, z: 1 },
							color: 0xffffff,
							intensity: 0.8,
						},
					]
				},
			},
		},
		data() {
			return {
				loader: new DXFLoader(),
			}
		},
		methods: {
			loadFont() {
				let self = this
				const textLoader = new FontLoader()
				return new Promise((resolve, reject) => {
					textLoader.load(import.meta.env.BASE_URL + 'file/FangSong_Regular.json', function (font) {
						self.loader.setFont(font)
						resolve()
					})
				})
			},
			async load() {
				if (!this.src) return

				if (this.object) {
					this.wrapper.remove(this.object)
				}

				await this.loadFont()

				this.reportProgress('start')
				this.loader.load(
					this.src,
					(data) => {
						this.reportProgress('end')
						let threeGroup = new Group()
						if (data && data.entities) {
							data.entities.forEach((ent) => threeGroup.add(ent))
						}
						this.addObject(threeGroup)
						this.$emit('load')
					},
					(event) => {
						this.reportProgress('progress', event)
						this.$emit('progress', event)
					},
					(event) => {
						this.reportProgress('end')
						this.$emit('error', event)
					},
				)
			},
			addObject(object) {
				this.wrapper.add(object)
				this.object = this.wrapper
				this.updateCamera()
				this.updateModel()

				const center = getCenter(object)
				this.wrapper.position.copy(center.negate())
			},
		},
	})
</script>
