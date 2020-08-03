from odoo import models, fields, api


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    test_href = fields.Char(string="测试链接")
    test_user = fields.Char(string="测试用户")
    test_pwd = fields.Char(string="测试密码")

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        params = self.env['ir.config_parameter'].sudo()
        params.set_param('test_href', self[0].test_href)
        params.set_param('test_user', self[0].test_user)
        params.set_param('test_pwd', self[0].test_pwd)

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        params = self.env['ir.config_parameter'].sudo()
        res.update(
            test_href=params.get_param('test_href'),
            test_user=params.get_param('test_user'),
            test_pwd=params.get_param('test_pwd'),
        )
        return res

    def sys_group(self):
        self.env["inherit_group"].sys_group()

