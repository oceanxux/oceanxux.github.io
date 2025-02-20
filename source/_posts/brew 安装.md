---
title: brew 包管理安装
tags:
  - Mac
categories: Mac
description: brew 包管理安装
abbrlink: 78fbef06
date: 2023-10-29 14:38:48
cover: 'https://image.6669998.xyz/C351bR.png'
top:
---
# 安装brew

- url:https://brew.sh/zh-cn/

```markdown
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- 检查是否安装成功

```markdown
brew --version
```
# 安装Xcode Command Line Tools

```markdown
xcode-select --install
```
# 常用命令

- 安装 卸载 软件包

```markdown
# 安装
brew install name

# 卸载
brew uninstall name

#查看已安装的软件包
brew list

# 更新 Homebrew
brew update

# 搜索软件包
brew search name

# 显示Homebrew信息
brew doctor

# 显示过时的软件包
brew outdated

# 升级软件包
brew upgrade

# 清理不再需要的文件
brew cleanup

# 查看软件包信息
brew info name

```
