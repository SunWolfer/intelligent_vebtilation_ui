/*
 * @FilePath: analysisData.ts
 * @Author: ZHY
 * @Date: 2023-01-31 14:10:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-31 14:26:21
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { sm2 } from 'sm-crypto'

//公钥
let publicKey =
	'048ab3653d6a966ea45695b12633d14c919dcaec5533a017e7e128b135d5a54ee8c2f4ea13a298925c3bcc01166ad7180974a3989b817cb187b0878bc6a08f7fbb25de9073fb32ba103e15b8ecbd8f9d29aeee82522da29f0c99b4e6763753829df2ef882409f91c67f0f1\n'
//私钥
let privateKey =
	'206366e1d09aff38c784fe49f079557071aaad560c4066e1349d5d510cc92089'

// sm2 加密
export const encryptPublicData = function (data: any) {
	const cipherMode = 1
	return sm2.doEncrypt(data, publicKey, cipherMode)
}

// sm-  解密
export const decodePublicData = function (data:any) {
	const cipherMode = 1
	return sm2.doDecrypt(data, privateKey, cipherMode)
}
