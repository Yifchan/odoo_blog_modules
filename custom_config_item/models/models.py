# -*- coding: utf-8 -*-

from odoo import models, fields, api, exceptions


class CustomConfigTest(models.Model):
    _name = "custom.config.test"
    _description = "自定义配置项模块"

    name = fields.Char(string="名称")

    def bt_pop_odoo_config(self):
        configs = self.env["res.config.settings"].sudo().search([])
        test_href = configs[0]['test_href']
        raise exceptions.ValidationError("odoo_test_href:%s" % test_href)

    def bt_pop_custom_config(self):
        configs = self.env["custom.config.item"].sudo().search([])
        test_href = configs[0]['test_href']
        raise exceptions.ValidationError("custom_test_href:%s" % test_href)


class CustomConfigItem(models.Model):
    _name = "custom.config.item"
    _description = "自定义配置项模块"

    name = fields.Char(string="名称")
    test_href = fields.Char(string="测试链接")
    test_user = fields.Char(string="测试用户")
    test_pwd = fields.Char(string="测试密码")




