# Git

> Git( a free and open source distributed version control system)是一个开源的分布式版本控制系统 

## 1. 常用命令

* 关于本仓库提交

```
git commit -m "<docs> add docs"
git push
```

* 关于分支 创建

```
git branch              # 查看已有分支
git branch dev          # 创建一个分支 dev
git checkout dev        # 切换到分支 dev 
```

* 关于分支 合并

```
git branch              # 查看已有分支
git checkout master     # 切换到分支 master 
git merge dev           # 合并分支dev到现在的分支
git branch -d dev       # 删除分支
```

## 2. 示例

#### 已有远程仓库，远程有代码

```
git init
git remote add origin https://gitee.com/heisaiAI/*.git
git pull
```

#### 已有远程仓库，本地有代码

```
git init
git remote add origin https://gitee.com/heisaiAI/*.git
git add readme.txt
git commit -m "init"
git push
```

#### 更换仓库

```
git remote rm origin
git remote add origin https://gitee.com/heisaiAI/*.git

git config --global user.name "edgardeng"
git config --global user.email "edgardeng@**.com"
```

## 3. 提交规范

_:action: <{module}> message_

_:emoji: <{module}> message_

### 常用的action 和 emoji

|  #  | emoji | explanation | action |
| ----- | ----- | ----- | ----- |
| 🎨 | :art: | Improving structure / format of the code. | 优化/格式化代码 |
| ⚡️ | :zap: | Improving performance. ||
| 🔥 | :fire:| Removing code or files. ||
| 🐛 | :bug: | Fixing a bug. ||
| 🚑 | :ambulance: | Critical hotfix. | 重要的更新/补丁|
| ✨ | :sparkles: | Introducing new features.| 新功能，新模块|
| 📝 | :pencil: | Writing docs.|文档|
| 🚀 | :rocket:| Deploying stuff. |部署|
| 💄 | :lipstick:| Updating the UI and style files.|修改UI，样式|
| 🎉 | :tada: | Initial commit. |首次提交|
| ✅ | :white_check_mark: | Updating tests.|测试修改|
| 🔒 | :lock: | Fixing security issues.|修复安全问题|
| 🍎 | :apple:| Fixing something on macOS.||
| 🐧 | :penguin:| Fixing something on Linux.||
| 🏁 | :checkered_flag:| Fixing something on Windows.||
| 🤖 | :robot:| Fixing something on Android.||
| 🍏 | :green_apple:| Fixing something on iOS.||
| 🔖 | :bookmark:| Releasing / Version tags.||
| 🚨 | :rotating_light:| Removing linter warnings.||
| 🚧 | :construction:| Work in progress.||
| 💚 | :green_heart:| Fixing CI Build.||
| ⬇️ | :arrow_down:| Downgrading dependencies.||
| ⬆️ | :arrow_up:| Upgrading dependencies.||
| 📌 |:pushpin:| Pinning dependencies to specific versions.| 
| 👷 |:construction_worker:| Adding CI build system.| 
| 📈 |:chart_with_upwards_trend:| Adding analytics or tracking code.| 
| ♻ ️| :recycle:| Refactoring code.| | 
| 🐳 |:whale:| Work about Docker.| | 
| ➕ |:heavy_plus_sign:| Adding a dependency.| 
| ➖ |:heavy_minus_sign:| Removing a dependency.| 
| 🔧 |:wrench:| Changing configuration files.| 
| 🌐 |:globe_with_meridians:| Internationalization and localization.| 
| ✏️ |:pencil2:| Fixing typos. 修改打字错误| | 
| 💩 |:poop： | Writing bad code that needs to be improved. | 
| ⏪ |:rewind:| Reverting changes. 取消修改| 
| 🔀 |:twisted_rightwards_arrows:| Merging branches.| 
| 📦 |:package:| Updating compiled files or packages.| 
| 👽 |:alien:| Updating code due to external API changes. 因外部API| 
| 🚚 |:truck:| Moving or renaming files.| 
| 📄 |:page_facing_up:| Adding or updating license.| 
| 💥 |:boom:| Introducing breaking changes.| | 
| 🍱 |:bento:| Adding or updating assets.| | 
| 👌 |:ok_hand|:Updating code due to code review changes.
| ♿️ |:wheelchair:|Improving accessibility.||
| 💡 |:bulb|:Documenting source code.||
| 🍻 |:beers|:Writing code drunkenly.||
| 💬 |:speech_balloon|:Updating text and literals.||
| 🗃 |:card_file_box:|Performing database related changes.||
| 🔊 |:loud_sound|:Adding logs.||
| 🔇 |:mute|:Removing logs.|| 
| 👥 |:busts_in_silhouette|:Adding contributor(s).||
| 🚸 |:children_crossing|:Improving user experience / usability.||
| 🏗 |:building_construction|:Making architectural changes.||
| 📱 |:iphone|:Working on responsive design.||
| 🤡 |:clown_face|:Mocking things.||
| 🥚 |:egg:|Adding an easter egg.||
| 🙈 |:see_no_evil:|Adding or updating a .gitignore file||
| 📸 |:camera_flash:|Adding or updating snapshots|
| ⚗  |:alembic: | Experimenting new things| |
| 🔍 |:mag:| Improving SEO| 
| ☸️ |:wheel_of_dharma: | Work about Kubernetes| 
| 🏷️ |:label: | Adding or updating types (Flow, TypeScript)| 
| 🌱 |:seedling:| Adding or updating seed files| 
| 🚩 |:triangular_flag_on_post:| Adding, updating, or removing feature flags| 
| 🥅 |:goal_net:|Catching errors| 
| 💫 |:dizzy:| Adding or updating animations and transitions| 
| 🗑 |:wastebasket: | Deprecating code that needs to be cleaned up.| 
