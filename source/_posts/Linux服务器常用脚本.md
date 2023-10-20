---
title: Linux 服务器常用脚本
tags:
  - Linux
  - 笔记
  - 常用
categories: Linux
description: 服务器常用脚本
abbrlink: a6a6908d
cover: 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/React_re_g3ui.svg'
date: 2023-05-05 17:29:51
---
机子拿到手第一件事是什么？卸载阿里云监控、测基本参数、安装面板？为了方便大家使用，在此做一个记录：
# 一、一键网络重装系统 - 魔改版（适用于Linux / Windows）
```shell
wget --no-check-certificate -qO ~/Network-Reinstall-System-Modify.sh 'https://www.cxthhhhh.com/CXT-Library/Network-Reinstall-System-Modify/Network-Reinstall-System-Modify.sh' && chmod a+x ~/Network-Reinstall-System-Modify.sh && bash ~/Network-Reinstall-System-Modify.sh -UI_Options

#Windows系统默认账号密码：Administrator/cxthhhhh.com
#Linux系统默认账号密码：root/cxthhhhh.com
```

## linux 修改时区

### 查看可用的时区列表
```bash
timedatectl list-timezones
```
### 直接修改上海时区
```bash
timedatectl set-timezone Asia/Shanghai
````
### 验证时区更改
```bash
timedatectl
```
## docker 一键安装
```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
## 自用乌龟壳DD脚本
```shell
bash <(wget --no-check-certificate -qO- 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh') -d 11 -v 64 -a -p 112101Zz
```
# 二、VPS综合测试脚本
```shell
#Linux 测试脚本，支持speedtest测速、丢包率、Geekbench v5、流媒体解锁等测试
bash <(wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh)
#跳过Geekbench和国际speedtest测试
bash <(wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh) -f

#综合测试脚本
```shell
curl -L https://gitlab.com/spiritysdx/za/-/raw/main/ecs.sh -o ecs.sh && chmod +x ecs.sh && bash ecs.sh
```
# 测试脚本2
```shell
bash <(curl -L -s https://raw.githubusercontent.com/lmc999/RegionRestrictionCheck/main/check.sh)
````
#测试硬盘IO
curl -sL yabs.sh | bash
#不带测速
curl -sL yabs.sh | bash -s -- -i
```
# 三、三网测速脚本
```shell
bash <(curl -Lso- https://bench.im/hyperspeed)
或
bash <(curl -Lso-  https://git.io/superspeed_uxh)
```
# 四、最新内核脚本 锐速/BBRPLUS/BBR2
#### 卸载内核
``` shell
wget -N --no-check-certificate "https://github.000060000.xyz/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
或
wget -O tcp.sh "https://git.io/coolspeeda" && chmod +x tcp.sh && ./tcp.sh
```
#### 不卸载内核
```shell
wget -N --no-check-certificate "https://github.000060000.xyz/tcpx.sh" && chmod +x tcpx.sh && ./tcpx.sh
或
wget -O tcpx.sh "https://git.io/JYxKU" && chmod +x tcpx.sh && ./tcpx.sh
```
# 五、流媒体解锁检测
#主流流媒体检测
```shell
bash <(curl -L -s https://raw.githubusercontent.com/lmc999/RegionRestrictionCheck/main/check.sh)
#Neflix解锁检测
wget -O nf https://github.com/sjlleo/netflix-verify/releases/download/2.01/nf_2.01_linux_amd64 && chmod +x nf && clear && ./nf
```
# 六、回程路由测试：
```shell
#三网回程测试
wget -qO- git.io/besttrace | bash

#指定IP回程测试
wget -N --no-check-certificate https://raw.githubusercontent.com/veip007/huicheng/master/huicheng && chmod +x huicheng
./huicheng 您的IP

#可视化路由跟踪工具
 bash <(curl -Ls https://raw.githubusercontent.com/sjlleo/nexttrace/main/nt_install.sh)

#回程线路测试（仅供参考）
curl https://raw.githubusercontent.com/zhucaidan/mtr_trace/main/mtr_trace.sh|bash
#
wget --no-check-certificate https://tutu.ovh/bash/returnroute/route && chmod +x route && clear && ./route 
```
# 七、安装ca-certificates解决证书不被信任问题
```shell
#centos
yum install -y wget && yum install -y ca-certificates
#debian/ubuntu
apt-get install -y wget && apt-get install -y ca-certificates
```
# 八、测试VPS是否开放25端口
```shell
apt update
apt install telnet
telnet smtp.aol.com 25
```
# 九、内存检测脚本
检测VPS真实可分配内存的小工具，适用于检测VPS超售情况。本程序检测的可分配内存指的是用户使用时最大能占用的内存量。
```shell
#CentOS / RHEL
yum install wget -y
yum groupinstall "Development Tools" -y
wget https://raw.githubusercontent.com/FunctionClub/Memtester/master/memtester.cpp
gcc -l stdc++ memtester.cpp
./a.out

#Ubuntu / Debian
apt-get update
apt-get install wget build-essential -y
wget https://raw.githubusercontent.com/FunctionClub/Memtester/master/memtester.cpp
gcc -l stdc++ memtester.cpp
./a.out
```
# 十、魔改 OpenVZ 开启 GoogleBBR
适用于基于OpenVZ虚拟机上的 Debian or Ubuntu。
```shell
#单网卡（单 IP） 服务器：
wget https://github.com/tcp-nanqinlang/lkl-rinetd/releases/download/1.1.0/tcp_nanqinlang-rinetd-debianorubuntu.sh
bash tcp_nanqinlang-rinetd-debianorubuntu.sh

#多网卡（多 IP） 服务器，会为所有网卡（所有 IP）提供加速：
wget https://github.com/tcp-nanqinlang/lkl-rinetd/releases/download/1.1.0/tcp_nanqinlang-rinetd-debianorubuntu-multiNIC.sh
bash tcp_nanqinlang-rinetd-debianorubuntu-multiNIC.sh
```
# 十一、一键安装openlitespeed+mraiodb+lsphp7.3环境和Wordpress
```shell
#Usage:
wget --no-check-certificate https://raw.githubusercontent.com/litespeedtech/ols1clk/master/ols1clk.sh && bash ols1clk.sh -w --adminpassword mypassword --email myemail@qing.su --lsphp 73 --wordpressplus mydomain.qing.su --wordpresspath /srv/www/mydomain.qing.su/public_html/ --dbrootpassword myrootpassword --dbname mywordpressdb --dbuser mywordpressdbuser --dbpassword mywordpressdbpassword --listenport 80 --wpuser mywpuser --wppassword mywppassword --wplang zh_CN
#Note
-w 安装wordpress
–adminpassword 后面加上你设定的OpenLiteSpeed后台管理员密码
–email 后面跟你的WordPress管理员邮箱
–lsphp 后面加上你想要安装的PHP版本，比如7.3就输入73, 5.6就输入56.
–wordpressplus 后面加上你的WordPress域名。请提前将该域名解析到这台VPS或者服务器上。
–wordpresspath 后面跟WordPress的安装路径。
–dbrootpassword 后面加上MariaDB数据库root用户的密码。
–dbname 后面加上你需要新建的WordPress的数据库名。
–dbuser 后面加上你需要新建的WordPress的数据库用户名。
–dbpassword 后面加上你需要新建的WordPress的数据库密码。
–listenport 后面加上网站的端口，默认是80。
–wpuser 后面加上你需要新建的WordPress的管理员用户名。
–wppassword 后面加上你需要新建的WordPress的管理员密码。
–wplang 后面加上WordPress语言，如果需要中文，填zh_CN; 如果需要英文，填en.
```
# 十二、测试IP质量（仅供参考）
```shell
bash <(wget -qO- --no-check-certificate https://gitlab.com/spiritysdx/za/-/raw/main/qzcheck.sh)
```
# 十三、测试是否解锁OpenAI
```shell
# 1
bash <(curl -Ls https://cpp.li/openai)
# 2
bash <(curl -Ls https://cdn.jsdelivr.net/gh/missuo/OpenAI-Checker/openai.sh)
```
