---
title: WebStorm_相关笔记
tags:
  - 学习笔记
categories: 学习笔记
cover: 'https://tu.i3.pw/imgs/2023/10/0bd1c91a0d524dbc.jpg'
description: WebStorm_相关笔记
abbrlink: 501ce0f9
date: 2023-05-15 17:44:58
---

# 报以下错误

- 无法加载文件 C:\Users\Administrator\AppData\Roaming\npm\hexo.ps1 报错
- 我在新安装的WebStorm中运行程序报错 无法运行（爆红）

## 解决方法

- 出现这个报错是因为系统默认的执行策略为 Restricted(禁止运行脚本)，所以要将它改成RemoteSigned （可以运行脚本）
- 以管理员身份打开powershell
- 查看当前执行策略，为 Restricted则需要替换

```bash
get-ExecutionPolicy
```

- 修改执行策略

```bash
set-ExecutionPolicy RemoteSigned
```

- 选择Y 更改执行策略
- 查看现有的执行策略

```bash
get-ExecutionPolicy
```
- 当执行策略显示RemoteSigned 则表示修改成功，就可以在powershell运行脚本了

# 2099年激活

- 网盘下载LicenseServer-obfuscate-2.0.0

## 手动安装为插件 然后重启 IDE
![](https://tu.i3.pw/imgs/2023/10/2666d9c8d2d1883c.png)

## 证书初始化

- 帮助 > LicenseServer > 证书服务器


![](https://tu.i3.pw/imgs/2023/10/9c2bab1a38ec6cea.jpg)

- 点击以下JB按钮复制2099激活码 > 重启IDE

![](https://tu.i3.pw/imgs/2023/10/3f66c306d689d6ee.jpg)

# 复制到的激活码激活

- 把激活码复制到激活码激活即可显示 2099有效期
