---
title: caddy2 使用
tags:
  - 笔记
  - liunx
  - caddy
categories: caddy2
cover: >-
  https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/businessman_uyx7.svg
description: 使用方法及常见问题
abbrlink: 22f0e0cb
date: 2023-07-19 18:44:43
---
以下是基于我自己的甲骨文arm下
---

### 安装

```bash
wget https://github.com/caddyserver/caddy/releases/download/v2.6.4/caddy_2.6.4_linux_arm64.deb
```
### 解压
```bash
dpkg -i caddy_2.6.4_linux_arm64.deb ## 只是解压

dpkg-deb -x caddy_2.6.4_linux_arm64.deb /root/caddy  解压到指定文件夹
```

### 常用命令
```bash
caddy version：查看安装的 Caddy 版本。

caddy list-modules：列出可用的 Caddy 模块（插件）。

caddy list-modules --installed：列出已安装的 Caddy 模块。

caddy run：以前台模式运行 Caddy，并加载当前目录下的 Caddyfile 配置文件。

caddy start：以后台守护进程模式运行 Caddy，并加载当前目录下的 Caddyfile 配置文件。

caddy stop：停止后台运行的 Caddy 进程。

caddy reload：重新加载配置文件，用于更新配置而无需停止 Caddy。

caddy fmt：格式化 Caddyfile，使其符合 Caddy 的标准格式。

caddy validate：验证 Caddyfile 的语法是否正确。

caddy adapt：将 Caddyfile 转换为 JSON 配置，并打印出来，可用于检查配置是否正确。

caddy run --config /path/to/your/Caddyfile：以前台模式运行 Caddy，并加载指定路径的 Caddyfile 配置文件。

caddy start --config /path/to/your/Caddyfile：以后台守护进程模式运行 Caddy，并加载指定路径的 Caddyfile 配置文件。

caddy stop --config /path/to/your/Caddyfile：停止后台运行的指定配置文件的 Caddy 进程。
```
### 写法
```bahs
{
    # 全局配置选项，如果有的话
}

example.com {
      reverse_proxy localhost:端口# 该域名的配置选项
}

# 可以有更多的域名配置
```

### 端口查看是否占用
```bash
sudo netstat -tuln | grep :端口

sudo lsof -i :443 | grep LISTEN

```