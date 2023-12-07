/**
 * 开发环境
 */
;(function () {
	window.SITE_CONFIG = {}

	// 地图服务连接请求地址
	window.SITE_CONFIG['mapUrl'] = 'http://127.0.0.1:8099'
	// socket请求地址
	window.SITE_CONFIG['socketip'] = 'ws://127.0.0.1:8083/intelligent_ventilation'
	// 视频模式(vlc/webrtc)
	window.SITE_CONFIG['videoMode'] = 'webrtc'
	// webRTC地址
	window.SITE_CONFIG['webrtcServer'] = 'http://192.168.124.24:8005'
	// 免验证登录用户名
	window.SITE_CONFIG['noValidUser'] = 'admin'
	// 免验证登录密码
	window.SITE_CONFIG['noValidPass'] = '123456'
	// 标题
	window.SITE_CONFIG['APP_TITLE'] = '智能通风管控平台'
	//
})()
