from odoo import fields, models, api, exceptions


class CustomConfigTransient(models.Model):
    _name = "custom.config.transient"
    _description = "自定义配置项瞬态模型"

    test_href = fields.Char(string="测试链接")
    test_user = fields.Char(string="测试用户")
    test_pwd = fields.Char(string="测试密码")

    @api.model
    def create(self, vals):
        configs = self.env["custom.config.item"].sudo().search([])
        if configs:
            configs[0].sudo().write(vals)
        else:
            self.env["custom.config.item"].sudo().create(vals)
        return super(CustomConfigTransient, self).create(vals)

    @api.model
    def default_get(self, fields_list):
        transients = super().default_get(fields_list)
        configs = self.env["custom.config.item"].sudo().search([])
        if configs:
            transients['test_href'] = configs[0]['test_href']
            transients['test_user'] = configs[0]['test_user']
            transients['test_pwd'] = configs[0]['test_pwd']
        return transients



