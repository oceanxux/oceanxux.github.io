---
title: VPS 网络重装 Debian 11 脚本
tags:
  - Linux
  - 笔记
categories: 重装 Debian 11
cover: 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Share_link_re_54rx.svg'
description: VPS
abbrlink: 2fa5099b
date: 2023-05-05 20:21:15
---
# 暂不支持 Oracle Linux 作为原系统。创建新机器时请选择 Ubuntu 20.04 或 18.04 系统模板。
## 下载脚本：
```shell
curl -fLO https://raw.githubusercontent.com/bohanyang/debi/master/debi.sh && chmod a+rx debi.sh
```
```shell
sudo ./debi.sh --cdn --network-console --ethx --bbr --user root --password <新系统用户密码>
```
--bbr 开启 BBR
--ethx 网卡名称使用传统形式，如 eth0 而不是 ens3
--cloud-kernel 安装占用空间较小的 cloud 内核，但可能会导致 UEFI 启动的机器（如 Oracle、Azure 及 Hyper-V、Google Cloud 等）VNC 黑屏。BIOS 启动的普通 VPS 则没有此问题。
默认时区为 UTC，添加 --timezone Asia/Shanghai 可使用中国时区。
默认使用 Debian 官方 CDN 镜像源（deb.debian.org），添加 --china 可使用阿里云镜像源
##  如果没有报错可以重启：
```shell
sudo shutdown -r now
```
约 30 秒后可以尝试 SSH 登录 installer 用户，密码与之前设置的相同。如果成功连接，可以按 Ctrl-A 然后再按 4 监控安装日志。安装完成后会自动重启进入新系统。

