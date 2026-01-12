# statistics

- The scripts will compute some statistical results of this mono repo.

## How to use

**Install requirements**
```
pip install -r scripts/statistics/requirements.txt
```
- `beautifulsoup4`: for parsing html
- `esprima`: for getting js AST

**Run scripts**
```
python scripts/statistics/<SCRIPT_NAME>.py
```
- `getXuiStatistics`: get total number of XUIs used in widgets.

## TODO
- Generate AST before stats.
- Replace python script with shell script + ts.
