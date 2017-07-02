/*
 * @Author: 柿子
 * @Date:   2017-07-01 20:20:47
 * @Last Modified by:   柿子
 * @Last Modified time: 2017-07-03 01:58:32
 */

'use strict';
var Hogan = require('node_modules/hogan.js')
var conf = {
    serverHost: ''
}
var _mm = {
    request: function(param) {
        var _this = this
        $.ajax({
            type: param.menthod || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
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
            error: function(res) {
                typeof param.error === 'function' && param.error(res.statusText)
            }
        })
    },
    //获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost = path
    },
    // 获取url参数
    getUrlParam: function(name) {
        //?keyword=xxx&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg)
        return  result ? decodeURIComponent(result[2]) : null
    },
    //成功提示
    successTips:function(msg){
        alert(msg||'成功')
    },
    //失败提示
    erroTips:function(msg){
        alert(msg||'失败')
    },
    //渲染html
    renderHtml: function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate)
         var result = template.render(data)
         return result
    },
    //表单验证
    validata : function(valuefa，type){
        var value = $.trim(value)
        //非空验证
        if('require' ===type){
            return !!value
        }
        //手机号验证
        if('phone' ===type){
            return /^1\d{10}$/.test(value)
        }
        //邮箱格式
        if('email' ===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.tesr(value);
        }
    },
    //统一登陆处理
    dologin: function() {
        window.location.href = './login.html?redirect =' + encodeURIComponent(window.location.href)
    },
    //调到主页
    goHome: function() {
        window.location.href = './index.html'
    },
}
module.exports = _mm
