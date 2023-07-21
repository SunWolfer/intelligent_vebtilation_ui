export default {
	mounted: function (el:HTMLElement) {
		const input = el.getElementsByTagName('input')[0]
		input.onkeyup = function (e:any) {
			if (input.value.length === 1) {
				input.value = input.value.replace(/[^0-9]/g, '')
			} else {
				input.value = input.value.replace(/[^\d]/g, '')
			}
		}
		input.onblur = function (e:any) {
			if (input.value.length === 1) {
				input.value = input.value.replace(/[^0-9]/g, '')
			} else {
				input.value = input.value.replace(/[^\d]/g, '')
			}
		}
	},
}
