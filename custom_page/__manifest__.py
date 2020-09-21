# -*- coding: utf-8 -*-
{
    'name': "custom_page",

    'summary': """
        自定义页面
        """,

    'description': """
        自定义页面
    """,

    'author': "YifChan",
    'website': "https://www.cnblogs.com/yifchan",

    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'qweb': ["static/src/xml/base.xml"]
}


