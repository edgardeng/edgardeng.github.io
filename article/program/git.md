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
| :tada: | tada | initial commit (首次提交) | Add |
| :sparkles: | sparkles | add module or feature (添加模块/功能) | Add |
| :loud_sound: | loud_sound | add log (添加日志) | Add |
| :bento: | bento | add assets（添加资源文件）| Add |
| :white_check_mark: | white_check_mark | update tests (修改测试) | Update |
| :art: | art | structure / format code (代码格式化) | Update |
| :hammer: | hammer | strength function (强化功能) | Update |
| :pencil2: | pencil2 | fix code (修改代码) | Update |
| :wrench: | wrench | update configuration files (配置文件) | Update |
| :memo: | memo | document (文档说明) | Add/Update |
| :bug: | bug| fix bugs (修改Bug) | Update|
| :package: | package | update compiled files or packages (修改库文件) | Add/Update |
| :bookmark: | bookmark| release / version (发布版本) | Update|
| :fire: | fire | delete file (删除文件) | Delete|
| :mute: | mute | delete logs (删除日志) | Delete|
