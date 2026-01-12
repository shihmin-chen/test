from utils.loader import FileLoader
from utils.parser import HtmlParser, JsParser

# const
WIDGETS_PATH = 'packages/fe/src/widgets'

# stats for xui imported count
count_map = {}
file_loader = FileLoader(WIDGETS_PATH)
file_paths = file_loader.get_file_paths('vue')
for file_path in file_paths:
    # get file content
    file_content = file_loader.load_file(file_path)

    # parse html (split to html, js, css)
    html_parser = HtmlParser(file_content)
    html = html_parser.query_tag('template')
    js = html_parser.query_tag('script')
    css = html_parser.query_tag('style')

    # parse js (find imported xui)
    js_parser = JsParser(js)
    module = js_parser.get_module('@asus-aics/xui')
    module_map = js_parser.get_module_alias_map(module)

    # increase count
    for (imported, local) in module_map.items():
        count = html_parser.count_tag(local)
        if imported in count_map.keys():
            count_map[imported]['import'] += 1
            count_map[imported]['template'] += count
        else:
            count_map[imported] = {
              'import': 1,
              'template': count,
            }
    print(file_path, '... done')

# print results
sorted_count_map = {k: v for k, v in sorted(count_map.items(), key=lambda item: item[1]['import'], reverse=True)}
print(sorted_count_map)
