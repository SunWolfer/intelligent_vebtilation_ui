// * Echarts 按需引入
import * as echarts from 'echarts/core'
import {
	BarChart,
	// 系列类型的定义后缀都为 SeriesOption
	BarSeriesOption,
	LineChart,
	LineSeriesOption,
	PieChart,
	PieSeriesOption,
	GaugeChart,
	GaugeSeriesOption,
	RadarChart,
	RadarSeriesOption,
	PictorialBarChart,
	PictorialBarSeriesOption,
	HeatmapChart,
	HeatmapSeriesOption,
	ScatterChart,
	ScatterSeriesOption,
} from 'echarts/charts'

import { LegendComponent } from 'echarts/components'
import {
	TitleComponent,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	TooltipComponent,
	ToolboxComponent,
	TooltipComponentOption,
	GridComponent,
	GridComponentOption,
	// 数据集组件
	DatasetComponent,
	DatasetComponentOption,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
	DataZoomComponent,
	DataZoomComponentOption,
	VisualMapComponent,
	VisualMapComponentOption,
	MarkLineComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import 'echarts-liquidfill'
import 'echarts-gl'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| PieSeriesOption
	| GaugeSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| DatasetComponentOption
	| DataZoomComponentOption
	| RadarSeriesOption
	| PictorialBarSeriesOption
	| HeatmapSeriesOption
	| VisualMapComponentOption
	| ScatterSeriesOption
>

// 注册必须的组件
echarts.use([
	LegendComponent,
	TitleComponent,
	TooltipComponent,
	ToolboxComponent,
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
])
export default echarts
