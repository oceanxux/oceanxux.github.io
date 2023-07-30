---
title: Emby happy
tags:
  - Emby
  - Linux
categories: Emby_happy
cover: >-
  https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Developer_activity_re_39tg.svg
description: Emby
abbrlink: a26881bd
date: 2023-05-15 18:42:09
---

 - 写在开头 happy 只是学习 建议体验完还是正版更好
 - [Emby 官方购买](https://emby.media/premiere.html)
## emby_4.7.11.0
- emby开心版4.7.11

### 下载4.7.11.0版本emby
[Emby下载地址](https://github.com/MediaBrowser/Emby.Releases/releases/tag/4.7.11.0)

 -根据自己的平台下载对应的安装程序

### 下载破解文件
```bash
https://github.com/skysolf/emby_4.7.11.0
```
- emby-happy4.7.11.0.sh 和 emby-happy.tar 
- 下载这两个到 root 目录
### 给运行权限
```bash
chmod 777 ./emby-happy4.7.11.0.sh
```
### 运行
```bash
./emby-happy4.7.11.0.sh
```

### 重启Emby
```bash
systemctl restart emby-server
```
- 其他命令
```bash
# 启动
systemctl status emby-server

# 停止
systemctl stop emby-server
```
### 网页端 UI 美化
- 拉取 修改后的美化插件

```bash
wget https://ghproxy.com/https://github.com/oceanxux/movie/blob/eda351dbf2e1ba47131322f995fa8b566b0d5138/MediaBrowser.Model.dll
```
- 先删除原本文件 (我是选择移出来)

```bash
mv /opt/emby-server/system/MediaBrowser.Model.dll /root/MediaBrowser.Model.dll.bk
```
- 进行替换
```bash
cp /root MediaBrowser.Model.dll /opt/emby-server/system/MediaBrowser.Model.dll
```
- 重启完成


- 该教程纯个人学习使用 如果作者比较介意 可立即删除

- [大佬的库地址](https://github.com/skysolf/emby_4.7.11.0)
- [沧水大佬 可直接食用](https://cangshui.net/5138.html)


````
wget --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/Solmonz/Sam-Emby/main/emby-happy.sh && chmod 777 emby-happy.sh && bash emby-happy.sh
````