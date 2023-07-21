// 处理主题样式
export function handleThemeStyle(theme:string):void {
	document.documentElement.style.setProperty('--el-color-primary', theme)
	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(
			`--el-color-primary-light-${i}`,
			`${getLightColor(theme, i / 10)}`,
		)
	}
	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(
			`--el-color-primary-dark-${i}`,
			`${getDarkColor(theme, i / 10)}`,
		)
	}
}

// hex颜色转rgb颜色
export function hexToRgb(str:any) {
	let hexes: any = "";
	str = str.replace("#", "");
	hexes = str.match(/../g);
	for (let i = 0; i < 3; i++) hexes[i] = parseInt(hexes[i], 16);
	return hexes;
}

// rgb颜色转Hex颜色
export function rgbToHex(r:any, g:any, b:any) {
	let hexes = [r.toString(16), g.toString(16), b.toString(16)]
	for (let i = 0; i < 3; i++) {
		if (hexes[i].length == 1) {
			hexes[i] = `0${hexes[i]}`
		}
	}
	return `#${hexes.join('')}`
}

// 变浅颜色值
export function getLightColor(color:string, level:number) {
	let rgb = hexToRgb(color)
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
	}
	return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// 变深颜色值
export function getDarkColor(color:string, level:number) {
	let rgb = hexToRgb(color)
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor(rgb[i] * (1 - level))
	}
	return rgbToHex(rgb[0], rgb[1], rgb[2])
}
