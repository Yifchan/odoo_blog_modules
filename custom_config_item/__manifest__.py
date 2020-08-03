# -*- coding: utf-8 -*-
{
    'name': "custom_config_item",

    'summary': """
        odoo自定义配置项""",

    'description': """
        odoo自定义配置项
    """,

    'author': "Yifchan",
    'website': "https://www.cnblogs.com/yifchan/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/13.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/menus.xml',
        'views/res_config_settings_view.xml',
    ],
}
