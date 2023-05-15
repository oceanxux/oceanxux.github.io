---
title: WebStorm_相关笔记
tags:
  - 笔记
categories: 笔记
cover: >-
  https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Firmware_re_fgdy.svg
description: WebStorm_相关笔记
abbrlink: 501ce0f9
date: 2023-05-15 17:44:58
---
- 无法加载文件 C:\Users\Administrator\AppData\Roaming\npm\hexo.ps1 报错
- 我在新安装的WebStorm中运行程序报错 无法运行（爆红）

### 解决方法
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
