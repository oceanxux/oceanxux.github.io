---
title: 甲骨文 Oracle 重装系统
tags:
  - Oracle
  - Linux
categories: linux
cover: "https://tu.i3.pw/imgs/2023/10/29a3c938bb54a50c.jpg"
description: 甲骨文重装系统
abbrlink: ad4fd11a
date: 2023-05-05 20:26:40
---
# 首先新建一个 Ubuntu 系统
版本号20.04 或 18.04 
## AMD
密码是 MoeClub.org 用户名root 端口22
```shell
sudo -i
apt-get -y update && apt-get -y install unzip zip wget curl
bash <(wget --no-check-certificate -qO- 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh') -d 10 -v 64 -a -firmware
```
## ARM 
密码：password 用户名： root 端口： 22
```shell
sudo -i
curl -fLO https://raw.githubusercontent.com/bohanyang/debi/master/debi.sh
chmod a+rx debi.sh
sudo ./debi.sh --architecture arm64 --user root --password password
sudo shutdown -r now
```
# 自用 debian11 系统
- ARM DD 
```shell
bash <(wget --no-check-certificate -qO- 'https://raw.githubusercontent.com/MoeClub/Note/master/InstallNET.sh') -d 11 -v 64 -p "password"
```
- AMD dd
```shell
bash <(wget --no-check-certificate -qO- 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh') -d 11 -v 64 -a -p password
```

## Windows Server 2008 R2 64位 精简版
账户：Administrator  密码：nat.ee
```shell
wget --no-check-certificate -qO InstallNET.sh 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh' && bash InstallNET.sh -dd 'https://oss.sunpma.com/Windows/Oracle_Win_Server2008R2_sp1_64_Administrator_nat.ee.gz'
```
## Windows Server 2012 R2 64位 精简版
账户：Administrator  密码：nat.ee
```shell
wget --no-check-certificate -qO InstallNET.sh 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh' && bash InstallNET.sh -dd 'https://oss.sunpma.com/Windows/Oracle_Win_Server2012R2_64_Administrator_nat.ee.gz'
```
# 安装oracle 原装系统时 脚本 root 自定义密码登录 方式
```markdown
创建oracle实例的时候，在最下面的”管理“菜单中找到初始化脚本行，
粘贴以下命令，则在创建后直接可以使用root账号登录VPS，
登录的密码是  samuel ，所以使用以下命令行记得改成你自己的密码！
同理这个Oracle的配置脚本也适合一些Grub预设开发
```
```markdown
#!/bin/bash
echo root:samuel |sudo chpasswd root
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/g' /etc/ssh/sshd_config;
sudo service sshd restart
```
# 甲骨文开放端口
```shell
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F
```
### 安装后建议一键 安装 Curl 和sudo
```markdown
apt-get install sudo && apt-get update -y && apt-get install curl -y && apt update && apt upgrade -y
```
###### centos 系统安装 Curl
```markdown
yum update -y && yum install curl -y
```
# 声明：
本人网络自用收集笔记 