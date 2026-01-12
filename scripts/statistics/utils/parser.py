import re
import esprima
from bs4 import BeautifulSoup

class HtmlParser():
    def __init__(self, html):
        self.soup = BeautifulSoup(html, 'html.parser')

    def query_tag(self, tag):
        return self.soup.find(tag)

    def count_tag(self, tag):
        return len(self.soup.find_all(tag.lower()))


class JsParser():
    def __init__(self, js):
        self.js = js

    def get_modules(self):
        pattern = f'import (.*?);'
        js_import = re.findall(pattern, str(self.js), re.DOTALL)
        modules = list(filter((lambda x: not 'type ' in x), js_import))
        modules = list(map((lambda x: esprima.parseModule('import '+x+';')), modules))
        return modules

    def get_module(self, source):
        modules = self.get_modules()
        module = list(filter((lambda x: x.body[0].source.value == source), modules))
        return module

    def get_module_alias_map(self, module):
        res = {}
        for m in module:
            for body in m.body:
                for specifier in body.specifiers:
                    res[specifier.imported.name] = specifier.local.name
        return res
