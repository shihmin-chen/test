import os

class FileLoader():
    def __init__(self, root_path):
        self.root_path = root_path

    def get_file_paths(self, file_ext):
        file_paths = []
        for root, dirs, files in os.walk(self.root_path):
            for file in files:
                if file.endswith(f'.{file_ext}'):
                    file_paths.append(os.path.join(root, file))
        return file_paths

    def load_file(self, path):
        with open(path, 'r', encoding='utf8') as f:
            lines = ''.join(f.readlines())
        return lines
