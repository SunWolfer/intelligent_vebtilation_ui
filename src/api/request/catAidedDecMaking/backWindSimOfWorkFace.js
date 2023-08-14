export const backWindSimOfWorkFace = () => {
//   监测点风量列表
  const windList = ref([{
    label: '12501辅运巷',
    value:'0'
  },{
    label: '12502回风巷',
    value:'1010'
  },{
    label: '12503回风巷',
    value:'0'
  },{
    label: '12501综采工作面',
    value:'1010'
  }])

  // 远程风门状态
  const windStatusList = ref([{
    name: '远程控制自动风门Ⅰ',
    status: '1'
  },{
    name: '远程控制自动风门Ⅱ',
    status: '0'
  },{
    name: '远程控制自动风门Ⅲ',
    status: '0'
  }])
  // 远程风窗状态
  const windowStatusList = ref([{
    name: '远程控制调节风窗Ⅰ',
    status: '1',
    value: 0
  },{
    name: '远程控制调节风窗Ⅱ',
    status: '0',
    value: 25
  },{
    name: '远程控制调节风窗Ⅲ',
    status: '0',
    value: 0
  }])
  return {
    windList,
    windStatusList,
    windowStatusList
  }
}
