export const defaultNode: INodeMesh = {
	geometry: {
		radius: 3,
	},
	material: {
		mapUrl: 'file/material/80.png',
		transparent: true,
		opacity: 1,
	},
}
// 编辑模型默认材质
export const defaultMesh: IMesh[] = [
	{
		geometry: {
			radiusTop: 6,
			radiusBottom: 6,
			height: 1,
			radialSegments: 4,
			openEnded: true,
			geometryType: 'Box',
		},
		material: {
			mapUrl: 'file/material/edit/011.png',
			transparent: true,
			opacity: 0.6,
			side: 2,
		},
	},
	{
		geometry: {
			radiusTop: 2,
			radiusBottom: 2,
			height: 1,
			radialSegments: 4,
			openEnded: false,
			geometryType: 'Box',
		},
		material: {
			type: 'MeshStandardMaterial',
			mapUrl: 'file/material/edit/80.png',
			transparent: false,
			opacity: 0.8,
			side: 1,
			colorWrite: true,
			roughness: 0,
			metalness: 0,
		},
	},
]
// 加载模型默认材质
export const loadDefaultMesh: IMesh[] = [
	{
		geometry: {
			radiusTop: 6,
			radiusBottom: 6,
			height: 1,
			radialSegments: 4,
			openEnded: true,
			geometryType: 'Box',
		},
		material: {
			mapUrl: 'file/material/011.png',
			transparent: true,
			opacity: 0.6,
			side: 2,
		},
	},
	{
		geometry: {
			width: 3,
			offsetY: 3,
			geometryType: 'Plane',
		},
		material: {
			type: 'MeshStandardMaterial',
			mapUrl: 'file/material/111.png',
			transparent: true,
			opacity: 0.6,
			side: 2,
			roughness: 0.6,
			metalness: 0.25,
			depthWrite: true,
			depthTest: false,
		},
	},
	{
		geometry: {
			radiusTop: 2,
			radiusBottom: 2,
			height: 1,
			radialSegments: 4,
			openEnded: false,
			geometryType: 'Box',
		},
		material: {
			type: 'MeshStandardMaterial',
			mapUrl: 'file/material/80.png',
			transparent: false,
			opacity: 0.8,
			side: 1,
			colorWrite: true,
			roughness: 0,
			metalness: 0,
		},
	},
]
