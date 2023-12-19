// * Echarts 按需引入
import { PolarComponentOption } from 'echarts'
import 'echarts-gl'
import 'echarts-liquidfill'
import {
	BarChart,
	BarSeriesOption,
	GaugeChart,
	GaugeSeriesOption,
	HeatmapChart,
	HeatmapSeriesOption,
	LineChart,
	LineSeriesOption,
	PictorialBarChart,
	PictorialBarSeriesOption,
	PieChart,
	PieSeriesOption,
	RadarChart,
	RadarSeriesOption,
	ScatterChart,
	ScatterSeriesOption,
} from 'echarts/charts'

import {
	DatasetComponent,
	DatasetComponentOption,
	DataZoomComponent,
	DataZoomComponentOption,
	GraphicComponent,
	GraphicComponentOption,
	GridComponent,
	GridComponentOption,
	LegendComponent,
	MarkLineComponent,
	PolarComponent,
	TitleComponent,
	TitleComponentOption,
	ToolboxComponent,
	TooltipComponent,
	TooltipComponentOption,
	TransformComponent,
	VisualMapComponent,
	VisualMapComponentOption,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| PieSeriesOption
	| GaugeSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| GraphicComponentOption
	| DatasetComponentOption
	| DataZoomComponentOption
	| RadarSeriesOption
	| PictorialBarSeriesOption
	| HeatmapSeriesOption
	| VisualMapComponentOption
	| ScatterSeriesOption
	| PolarComponentOption
>

// 注册必须的组件
echarts.use([
	LegendComponent,
	TitleComponent,
	TooltipComponent,
	ToolboxComponent,
	GraphicComponent,
	GridComponent,
	DatasetComponent,
	DataZoomComponent,
	TransformComponent,
	MarkLineComponent,
	BarChart,
	LineChart,
	PieChart,
	GaugeChart,
	RadarChart,
	PictorialBarChart,
	HeatmapChart,
	LabelLayout,
	UniversalTransition,
	VisualMapComponent,
	ScatterChart,
	CanvasRenderer,
	PolarComponent,
])
export default echarts
