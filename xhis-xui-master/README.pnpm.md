# xhis-frontend-mono

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ASUS-AICS_xhis-frontend-mono&metric=alert_status&token=a74c67486726e2c89f2c55bdc8bc2ac26fe1b028)](https://sonarcloud.io/summary/new_code?id=ASUS-AICS_xhis-frontend-mono)

## Development

**Install pnpm**

Make sure `pnpm` pkg manager is install.
[Installation Guide](https://pnpm.io/installation)

```
npm i -g pnpm@7.x
```

Make sure NodeJs 16 LTS is used,
please use **nvm**(linux, mac) or **nvs**(window) to switch environment.

```
nvs use 16
```

**Install Monorepo**

```
pnpm i
```

**Build local dependencies**

> This process will change to Lerna if possible.

```
pnpm base-build
```

### XUI

```
pnpm --filter xui start
```

[XUI Readme](/packages/xui/README.md)

### XFrontend widgets

```
pnpm --filter x-fe-basic start
```

### XWidgets playground

```
pnpm --filter x-widgets start
```

[XWidget Readme](/packages/widgets/README.md)

## Local widget server for testing (for seeing local widgets code changes on local opd)

1.
```sh
# at xhis-frontend-mono
pnpm run dev:widgets
# at xhis-opd-frontend
npm run dev
```
2. Connect to `http://localhost:3000?widgetPort=4000`
3. Set environment variable `FOCUS_WIDGETS` if you only want to build certain widgets when hot reloaded (for faster development)
ex. `export FOCUS_WIDGETS=DrugOrder,IcdEditor` => Then only these two widgets will be hot reloaded, and life becomes brighter :)
4. Or you can go to `/widgets/build.js` and set default widgets to build to achieve the same effect of 3.

aicswiki: [Setup Widget Server](https://aicswiki.azurewebsites.net/en/project/saas-his/xHis/Guideline/Widget-Framework)

## Local Development with infrastructures

When you change your related widgets in `fe`, you can see your changes when the `xhis-frontend-mono` is finishing building, but if you change something in other packages, ex: `xui`, `utils`, you will not see any changes in the local website, since **the actual packages are installed in `xhis-opd-frontend`, when you are developing you only load the local `fe` package into the `xhis-opd-frontend`, and this mechanism is used through `widgetPort` params in your url, `xhis-opd-frontend` install those packages through online instead of local**
To be able to view your changes in `http://localhost:3000?widgetPort=4000`, you have to do the followings 

Since `xhis-opd-frontend` use `external` packages to utilize those packages in mono, so what you have to do is to make sure your opd use the latest packages you change.


Let's take `xui` for example, after I made a change in `xui` 

1. Level a version 

Go to `package.json` in `xui`, let's say the current version is `1.43.0-master.1`, change it to `1.43.0-master.2`

2. Pack your changes
```sh
# xui can be any package name you would like to build 
cd packages/xui
pnpm run build 
pnpm pack 
```

Then you will see a `asus-aics-xui-1.43.0-master.1.tgz` in your xui folder

3. Level and Pack external

Go to `package.json` in `external`, level up a version just like xui

```sh
# you don't have to build external 
cd packages/external
pnpm pack 
```

4. Install these two packages at Opd

```sh
# at xhis-opd-frontend
npm install ../path-to-xui-tgz
npm install ../path-to-external-tgz
```

5. Re-run Opd 

Then you will be able to see your changes in `http://localhost:3000?widgetPort=4000`

> If you use `localhost:3080`, you don't actually have to do all those steps, you can directly see your changes when you build the packages at local

## Test

For all workspace:

```
pnpm test
```

If need to specified any scope package, follow Jest-Cli config:
eg.

_run xui only_

```
pnpm test packages/xui/
```

_run specified test file_

```
pnpm test packages/xui/src/components/XButton/XButton.spec.ts
```

_run specified test file and generate corresponding code coverage_
```
pnpm test packages/fe/src/widgets/ActionBar -- --coverage --collectCoverageFrom="**/ActionBar/**"
```

Or you can simply use Jest extension in VSCode.

## Build and Publish/Deploy

> WIP

## Conventional Commit Message

```
$ git commit -m "type(scope?): subject"
```
See more details on this [PR](https://github.com/ASUS-AICS/xhis-frontend-mono/pull/2081).

**Type** must be in a commit message (see types as follows)

- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither adds a feature nor fixes a bug
- test: Add missing tests or correct existing tests
- style: Changes that do not affect the meaning of code (white-space, formatting, missing semi colons, css adjustment, etc)
- docs: Only changes documentation (README.md)
- perf: A code change that improves performance
- build: Changes that affect the build system or external dependencies (pnpm, npm, bump version)
- ci: Changes to our CI configuration files and scripts (example scopes: Azure Pipeline, Travis)
- chore: others
- revert: The commit reverts a previous commit

**Scope** is optional. Most common way is to use name below `packages/`. For example:
```
$ git commit -m "fix(fe): a bug"
$ git commit -m "feat(xui/XDialogue): add new mask"
$ git commit -m "docs: add husky and commitlint"
$ git commit -m "build(x-fe-external): bump version to 1.0.690"
```

**Subject** must be in a commit message. Tell everybody an outline of code changes you make.

## TODO

- monorepo organize tool
- Enforce eslint and tsc check in both test and src code
- Better documentation place
