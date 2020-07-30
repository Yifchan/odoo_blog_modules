# -*- coding: utf-8 -*-

from odoo import models, fields, api


class FilePreview(models.Model):
    _name = "file.preview"
    _description = "文件预览模块"

    name = fields.Char(string="名称")
    img_ids = fields.Many2many("ir.attachment", relation="file_preview_ir_attachment_img_ref", string="文件图片")
    attachment_ids = fields.Many2many("ir.attachment", relation="file_preview_ir_attachment_attachment_ref", string="附件")
