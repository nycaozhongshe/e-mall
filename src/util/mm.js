/*
 * @Author: 柿子
 * @Date:   2017-07-01 20:20:47
 * @Last Modified by:   柿子
 * @Last Modified time: 2017-07-01 22:21:30
 */

'use strict';
var _mm = {
    request: function(param) {
        var _this = this
        $.ajax({
            type: param.menthod || get,
            url: param.url || '',
            dataType: param.type || json,
            data: param.data || '',
            success: function(res) {
                //请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //需要登陆
                else if (res.status === 10) {
                    _this.dologin()
                } //请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function() {
                typeof param.error === 'function' && param.error(res.statusText)
            }
        })
    },
    dologin: function() {
        window.location.href = './login.html?redirect =' + encodeURIComponent(window.location.href)
    }
}
module.exports = _mm
