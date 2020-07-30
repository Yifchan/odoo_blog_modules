# -*- coding: utf-8 -*-
{
    'name': "file_preview",

    'summary': """
        文件/图片预览
        """,

    'description': """
        文件/图片预览
    """,

    'author': "Yifchan",
    'website': "https://www.cnblogs.com/yifchan/",

    'category': 'Uncategorized',
    'version': '13.0.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/import_src.xml',
        'views/menus.xml',
        'views/views.xml',
    ],
    'qweb': [
        "static/base.xml"
    ],
}
