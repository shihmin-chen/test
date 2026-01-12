import os
import glob
import subprocess
import json

files = glob.glob('../packages/xcm/src/module/**/*.ts', recursive=True)

valid_files = []
xcm_loc = {}
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        if '{@link' in content:
            valid_files.append(os.path.abspath(file))

all_loc = subprocess.run(
    ['cloc', '--json', '--by-file', '../packages/xcm/src/module'],
    stdout=subprocess.PIPE,
    shell=True
)
all_loc = json.loads(all_loc.stdout)

for path, result in all_loc.items():
    if path == 'header' or path == 'SUM':
        continue
    full_path = os.path.abspath(path)
    if full_path in valid_files:
        xcm_loc[os.path.basename(path).replace('.ts', '')] = result['code']

print(xcm_loc)
