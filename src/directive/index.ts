import copyText from './common/copyText'
import drag from './common/drag'
import hasPermi from './permission/hasPermi'
import hasRole from './permission/hasRole'
import inputInt from './permission/inputInt'

export default function directive(app: any) {
	app.directive('hasRole', hasRole)
	app.directive('hasPermi', hasPermi)
	app.directive('inputInt', inputInt)
	app.directive('copyText', copyText)
	app.directive('drag', drag)
}
