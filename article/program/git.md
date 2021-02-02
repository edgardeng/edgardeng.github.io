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

#### 已有远程仓库，远程有代码

```
git init
git remote add origin https://gitee.com/heisaiAI/*.git
git pull
```

## 3. 代码版本


### 撤销
上述场景一，在未进行git push前的所有操作，都是在“本地仓库”中执行的。我们暂且将“本地仓库”的代码还原操作叫做“撤销”！

情况一：文件被修改了，但未执行git add操作(working tree内撤销)
```
git checkout fileName
git checkout .
```

情况二：同时对多个文件执行了git add操作，但本次只想提交其中一部分文件

```
git add *
git status
# 取消暂存
git reset HEAD <filename>
```

情况三：文件执行了git add操作，但想撤销对其的修改（index内回滚）

```
# 取消暂存
git reset HEAD fileName
# 撤销修改
git checkout fileName
```

情况四：修改的文件已被git commit，但想再次修改不再产生新的Commit

```
# 修改最后一次提交 

$ git add sample.txt
$ git commit --amend -m"说明"
```

情况五：已在本地进行了多次git commit操作，现在想撤销到其中某次Commit

```
git reset [--hard|soft|mixed|merge|keep] [commit|HEAD]
```

具体参数和使用说明，请查看：Git Pro深入浅出（二）中的重置揭秘部分

### 回滚
上述场景二，已进行git push，即已推送到“远程仓库”中。我们将已被提交到“远程仓库”的代码还原操作叫做“回滚”！注意：对远程仓库做回滚操作是有风险的，需提前做好备份和通知其他团队成员！

如果你每次更新线上，都会打tag，那恭喜你，你可以很快的处理上述场景二的情况
```
git checkout <tag>
```
如果你回到当前HEAD指向
```
git checkout <branch_name>
```

情况一：撤销指定文件到指定版本
```
# 查看指定文件的历史版本
git log <filename>
# 回滚到指定commitID
git checkout <commitID> <filename>
```

情况二：删除最后一次远程提交

方式一：使用revert
```
git revert HEAD
git push origin master
```
方式二：使用reset
```
git reset --hard HEAD^
git push origin master -f
```

二者区别：
revert是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；
reset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。

情况三：回滚某次提交
```
# 找到要回滚的commitID
git log
git revert commitID
删除某次提交
git log --oneline -n5
Git撤销&回滚操作-log
git rebase -i "commit id"^
注意：需要注意最后的^号，意思是commit id的前一次提交
git rebase -i "5b3ba7a"^
```


## 4. 提交规范

_:action: <{module}> message_

_:emoji: <{module}> message_

### 常用的action 和 emoji

|  #  | emoji | explanation | action |
| ----- | ----- | ----- | ----- |
| 🎨 | :art: | Improving structure / format of the code. | 代码优化 |
| ⚡  | :zap: | Improving performance. |代码优化|
| 🔥 | :fire:| Removing code or files. |代码删除|
| 🐛 | :bug: | Fixing a bug. |代码修复|
| 🚑 | :ambulance: | Critical hotfix. | 重要的更新/补丁|
| ✨ | :sparkles: | Introducing new features.| 新功能，新模块|
| 📝 | :pencil: | Writing docs.|文档|
| 🚀 | :rocket:| Deploying stuff. |部署|
| 💄 | :lipstick:| Updating the UI and style files.|样式修改|
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
| ⬇  | :arrow_down:| Downgrading dependencies.||
| ⬆  | :arrow_up:| Upgrading dependencies.||
| 📌 |:pushpin:| Pinning dependencies to specific versions.| 
| 👷 |:construction_worker:| Adding CI build system.| 
| 📈 |:chart_with_upwards_trend:| Adding analytics or tracking code.| 
| ♻  | :recycle:| Refactoring code.| | 
| 🐳 |:whale:| Work about Docker.| | 
| ➕ |:heavy_plus_sign:| Adding a dependency.| 
| ➖ |:heavy_minus_sign:| Removing a dependency.| 
| 🔧 |:wrench:| Changing configuration files.| 
| 🌐 |:globe_with_meridians:| Internationalization and localization.| 
| ✏ |:pencil2:| Fixing typos. 修改打字错误| | 
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
| ♿  |:wheelchair:|Improving accessibility.||
| 💡 |:bulb|:Documenting source code.||
| 🍻 |:beers|:Writing code drunkenly.||
| 💬 |:speech_balloon|:Updating text and literals.||
| 🗃 |:card_file_box:|Performing database related changes.||
| 🔊 |:loud_sound|:Adding logs.||
| 🔇 |:mute|:Removing logs.|| 
| 👥 |:busts_in_silhouette|:Adding contributor(s).||
| 🚸 |:children_crossing|:Improving user experience / usability.||
| 🏗 |:building_construction:|:Making architectural changes.||
| 📱 |:iphone|:Working on responsive design.||
| 🤡 |:clown_face|:Mockingr things.||
| 🥚 |:egg:|Adding an easter egg.||
| 🙈 |:see_no_evil:|Adding or updating a .gitignore file||
| 📸 |:camera_flash:|Adding or updating snapshots|
| ⚗  |:alembic: | Experimenting new things| |
| 🔍 |:mag:| Improving SEO| 
| ☸  |:wheel_of_dharma: | Work about Kubernetes| 
| 🏷️ |:label: | Adding or updating types (Flow, TypeScript)| 
| 🌱 |:seedling:| Adding or updating seed files| 
| 🚩 |:triangular_flag_on_post:| Adding, updating, or removing feature flags| 
| 🥅 |:goal_net:|Catching errors| 
| 💫 |:dizzy:| Adding or updating animations and transitions| 
| 🗑 |:wastebasket: | Deprecating code that needs to be cleaned up.| 
