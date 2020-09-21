
// 自定义页面实际上是一个 client action，也就是客户端动作，通过对 AbstractAction 这个抽象类进行扩展，
// 从而指定自定义页面的模板和页面的事件等
odoo.define('custom_page.demo', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');

    var CustomPageDemo = AbstractAction.extend({
        template: 'DemoPage',
        events: {'click .demo-submit': '_onSubmitClick'},

        _onSubmitClick: function (e) {
            e.stopPropagation();
            alert('Submit clicked!');
        }
    });

    // add方法对动作进行注册，第一个参数表示注册的动作名，第二个参数是要注册的动作对象；
    core.action_registry.add('custom_page.demo', CustomPageDemo);

    return CustomPageDemo;

});

