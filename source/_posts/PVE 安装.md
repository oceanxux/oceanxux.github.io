---
title: PVE 安装
tags:
  - PVE 安装
categories: PVE
cover: 'https://image.6669998.xyz/R9SZZk.png'
description: PVE
abbrlink: 53d0683d
date:
top:
password:
---

# PVE 安装

- PVE： 全称 Proxmox Virtual Environment，开源的虚拟化管理平台。它基于 Debian Linux 操作系统，并集成了 KVM 和 LXC 两种虚拟化技术，可以帮助用户快速搭建和管理虚拟化环境。

## 直接官网下载最新镜像 iso，选择 iso images

![660cd022d2c9d.png](https://image.6669998.xyz/OusSFw.png)

## U 盘做一个启动盘

- 注意如果用 rufus 工具的话，记得用 dd 模式 ，否则下个步骤会无法识别。 
其他工具 [balenaEtcher](https://etcher.balena.io/)，使用也很简单，选择镜像，选择 u 盘，制作即可，注意制作过程可能会有弹窗，点取消就

![660cd0b218c5f.png](https://image.6669998.xyz/Ur3CBq.png)

## 主板 Bios 选择 U 盘的 UEFI 启动

- 进入界面，选第一个 install promox VE，选择安装位置，选择地区（china），设置密码和邮箱，设置网络，开始安装。安装后会启动进入系统，用户 root，密码为刚才设置的密码。启动后会显示 IP，在同个局域网内可通过浏览器访问，注意是 https 而非 http

![1723786580369.png](https://image.6669998.xyz/hJSC0Z.png)

## 将U盘插入电脑，开机选择U盘启动，进入引导界面，选择Install Proxmox VE进入pve安装程序

- 点agree同意协议

![660cd6696cbab.png](https://image.6669998.xyz/VSrdXr.png)

- 选择安装磁盘

![660cd67256a76.png](https://image.6669998.xyz/fgqXZe.png)

- 设置国家、时区、键盘布局，然后点击Next(下一步）

![1723786894151.png](https://image.6669998.xyz/igK6lH.png)

- 设置密码、和邮箱，继续点击Next(下一步）。

![1723786961171.png](https://image.6669998.xyz/zPsLtE.png)

- 按实际情况配置网络，一般情况下会自动获取ip等信息

![660cd677be6cc.png](https://image.6669998.xyz/DMqdtv.png)

- 最后确认信息，无误后点Install安装系统

![660cd67db62b3.png](https://image.6669998.xyz/GKqwRf.png)

- 最后移除U盘，然后点击Reboot重启机器

# 配置pve

- 安装完后通过https://[你设置的ip，如图中的192.168.3.780:8006访问pve管理界面
- username填root，密码填安装系统时设置的密码

![660cd6870d91a.png](https://image.6669998.xyz/BThcas.png)

[参考大佬](https://rickg.cn/2022/05/25/pve-openwrt/)

# PVETOOLS脚本 （方法1）

- [项目地址](https://github.com/ivanhao/pvetools)

## 一键无脑

```shell
echo "nameserver  8.8.8.8" >> /etc/resolv.conf && rm -rf pvetools && rm -rf /etc/apt/sources.list.d/pve-enterprise.list && export LC_ALL=en_US.UTF-8 && apt update && apt -y install git && git clone https://github.com/ivanhao/pvetools.git && echo "cd /root/pvetools && ./pvetools.sh" > pvetools/pvetools && chmod +x pvetools/pvetools* && ln -s /root/pvetools/pvetools /usr/local/bin/pvetools && pvetools
```

# 设置 pve 每次重启后立即进入系统（方法二）

- pve 每次重启后停留在 进入 pve / 高级选项 / 进入 boot 页等选项页，而不是直接进入系统的解决方法。
编辑 GRUB 配置文件并更新 GRUB 引导程序
- 以 root 用户身份登录到 PVE 服务器
- 打开 GRUB 配置文件（/etc/default/grub）并使用文本编辑器进行编辑。例如，您可以使用 nano 编辑器打开该文件

```markdown
nano /etc/default/grub
```

- 在 GRUB 配置文件中找到 GRUB_TIMEOUT 选项，并将其值设置为 0，以使系统在启动时自动选择默认内核并立即启动。例如

```markdown
GRUB_TIMEOUT=0
```

- 更新 GRUB 引导程序以使更改生效。运行以下命令

```markdown
update-grub
```

- 重启测试

```markdown
reboot
```
# 更换国内软件源

- 更新通用软件源为清华源

```markdown
nano /etc/apt/sources.list
```

- 添加以下，同时注释原有的，在其前面加#

```markdown

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free

#deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free

#deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free

#deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free

#deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
```

## 更新企业订阅为免费源

- 步骤一

```markdown
nano /etc/apt/sources.list.d/pve-enterprise.list
```

- 步骤二
- 添加以下，同时注释原有的，在其前面加#
```markdown
deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription

apt install apt-transport-https ca-certificates
```

## 更换 CT Templates (LXC 容器) 源

- 将 /usr/share/perl5/PVE/APLInfo.pm 文件中默认的源地址 http://download.proxmox.com 替换为 https://mirrors.tuna.tsinghua.edu.cn/proxmox 即可
- 使用以下命令

```markdown

cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back
sed -i 's|http://download.proxmox.com|https://mirrors.tuna.tsinghua.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm
```

- 针对 /usr/share/perl5/PVE/APLInfo.pm 文件的修改，重启后生效

```markdown
systemctl restart pvedaemon.service
```

![1723787182939.png](https://image.6669998.xyz/f646V9.png)

## 去除无效订阅弹窗

![1723787201317.png](https://image.6669998.xyz/ZIFKkA.png)

- 修改文件在这个路径：/usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js

```markdown
nano /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js
```

![1723787218496.png](https://image.6669998.xyz/3NYFlu.png)

- 按 ctrl+w 或 F6 搜索 “data.status”，将整个 if 条件改为 false，注意需要保证这两快捷键不被其他软件占用，edge 浏览器占用了 ctrl+w (关闭当前串口)

```markdown
if(false)
```

![1723787225026.png](https://image.6669998.xyz/5rMPTX.png)

- [参考教程](https://sharedblog.net/posts/2023-07-05-pve-setting/)