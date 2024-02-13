---
title: Linux 服务器常用命令
tags:
  - Linux
categories: Linux
description: 服务器常用命令
abbrlink: a6a6908d
cover: 
date: 2023-05-05 17:29:51
top: 9
---

- 个人常用命令

# 新系统一键安装常用命令

```markdown
apt-get install sudo && apt-get update -y && apt-get install -y curl && apt update && apt upgrade -y
```

# systemctl 相关

```markdown
systemctl start <service_name>      ##启动服务

systemctl stop <service_name>       ##停止服务

systemctl restart <service_name>    ##重启服务

systemctl reload <service_name>     ##重新加载服务配置（不重启服务）

systemctl status <service_name>     ##显示服务的状态

systemctl enable <service_name>     ##系统启动时自动启动

systemctl disable <service_name>    ##禁用系统启动时自动启动

systemctl is-enabled <service_name> ##查看服务是否已启用

systemctl is-active <service_name>  ##查看服务是否正在运行

systemctl is-failed <service_name>  ##查看服务是否处于失败状态

######### 列出所有已启用的服务

systemctl list-unit-files --type=service

######### 列出所有运行中的服务

systemctl list-units --type=service

```

# docker 相关

- docker安装

```shell
# 1
apt install docker -y
# 2
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

- dokcer-compose.yml 安装

```shell
1 直接安装
apt install docker-compose -y


2·拉取代码安装
curl -fsSL https://get.docker.com | bash -s docker
2.1 拉取代码
curl -L "https://github.com/docker/compose/releases/download/1.26.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2.2 给权限
chmod +x /usr/local/bin/docker-compose

2.3 测试docker-compose 版本信息

docker-compose --version
```

## 命令

```markdown
docker ps          ##列出所有正在运行的容器

docker images      ##列出本地所有Docker镜像

docker version     ##显示Docker版本信息

docker info        ##显示Docker系统信息（包括镜像和容器数量等）

docker ps -a       ##列出所有容器（包括已停止的）

docker stop <container_id>   ##停止一个正在运行的容器

docker start <container_id>  ##启动一个已停止的容器

docker rm <container_id>     ##删除一个停止的容器

docker rmi <image_name>      ##删除本地Docker镜像

docker restart <container_id> ##重启一个容器

docker logs <container_id>    ##查看容器的日志


########### 进入一个正在运行的容器（交互式模式）

docker exec -it <container_id> <command>
```
# 解压程序安装及解压方法

- 如有需要可以安装下sudo

```markdown
sudo --version    ##检查是否已安装sudo

##############################Debian& ubuntu

sudo apt-get update
sudo apt-get install sudo

#############################CentOS

sudo yum install sudo

###扩展一下 如何添加用户到root(username替换为要添加到sudo用户组的实际用户名)###
sudo usermod -aG sudo username
```

## 安装unzip和tar

- debian & ubuntu

```markdown
apt-get update -y && apt-get install -y unzip tar
```
- CentOS

````markdown
yum install unzip tar
````
### tar 使用方法
```markdown
tar -xzvf file.tar.gz   ##解压.tgz

#########解压到指定文件夹#########
tar -xzvf file.tar.gz -C /文件夹地址
```
- -x：表示提取（解压）文件。
- -v：显示详细信息，可以查看解压过程。
- -f：指定要解压的文件名。这个选项通常是必需的，并且应该紧跟在tar命令后面。
- -z：用于处理.tar.gz格式的文件，即使用gzip压缩。
- -j：用于处理.tar.bz2格式的文件，即使用bzip2压缩
- -J：用于处理.tar.xz格式的文件，即使用xz压缩。

### zip 使用方法

```markdown
unzip file.zip          ##解压.zip文件

#########解压到指定文件夹#########
unzip file.zip -d /文件夹地址
```

## 安装 dpkg-deb

```markdown
apt-get update -y && apt-get install -y dpkg
```
### dpkg-deb 使用方法

```markdown
mkdir /aa  ##新建空白文件夹

dpkg-deb -x 压缩包.deb aa/   ##aa是文件夹名
```
# 后台运行命令

## tmux 安装及使用

- 安装
- Ubuntu/Debian

```markdown
apt-get update - y && apt-get install -y tmux
```

- CentOS


```markdown
yum install tmux
```

- 使用
-  列出会话


```markdown
tmux ls      ##列出会话
```
- 重新连接会话 session_name(会话名字)

```markdown
tmux attach-session -t session_name
```
- 关闭会话 session_name(会话名字)

```markdown
tmux kill-session -t session_name
```
- 启动tmux：在终端中输入tmux并按回车键来启动tmux
- 创建会话：默认情况下，tmux会自动创建一个会话。您可以在会话中运行各种命令
- 分离会话：如果您想在后台保持会话运行，并且返回到原来的终端界面，可以按下Ctrl + b（前缀键），然后按下d键。这将会将会话分离，回到原始终端

# cronta （定时设置）

```markdown
crontab -e         ##编辑cron

crontab -l         ##查看cron表
```
## 时间怎么写 如下：

### minute  hour  day  month  day_of_week

- minute：表示分钟（0-59）
- hour：表示小时（0-23）
- day：表示日期（1-31）
- month：表示月份（1-12）
- day_of_week：表示星期几（0-7，其中0和7都表示星期日）
- 比如 每天早上7点准时运行 填写方式：  0 7 * * *


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

## 自用乌龟壳DD脚本

```shell
bash <(wget --no-check-certificate -qO- 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh') -d 11 -v 64 -a -p 99samuel
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

- 融合怪
- [作者库](https://github.com/spiritLHLS/ecs)

```shell
bash <(curl -L -s https://raw.githubusercontent.com/lmc999/RegionRestrictionCheck/main/check.sh)
````

- lemonbench
- [作者库](https://github.com/LemonBench/LemonBench)


```shell
wget -qO- https://raw.githubusercontent.com/LemonBench/LemonBench/main/LemonBench.sh | bash -s -- --fast
```
## warp

- xwgcf

```shell
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh
```

- Warp-go

```markdown
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/warp-go.sh && bash warp-go.sh
```

## 测试硬盘IO
````shell
curl -sL yabs.sh | bash
#不带测速
curl -sL yabs.sh | bash -s -- -i
````

## 三、三网测速脚本

```shell
bash <(curl -Lso- https://bench.im/hyperspeed)
或
bash <(curl -Lso-  https://git.io/superspeed_uxh)
```
## 四网回程测试

- [作者库](https://github.com/Netflixxp/jcnfbesttrace)

```shell
wget -O jcnf.sh https://raw.githubusercontent.com/Netflixxp/jcnfbesttrace/main/jcnf.sh && chmod +x jcnf.sh && clear &&./jcnf.sh
```

## 四、最新内核脚本 锐速/BBRPLUS/BBR2

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

## 五、流媒体解锁检测

### 主流流媒体检测

```shell
bash <(curl -L -s https://raw.githubusercontent.com/lmc999/RegionRestrictionCheck/main/check.sh)
#Neflix解锁检测
wget -O nf https://github.com/sjlleo/netflix-verify/releases/download/2.01/nf_2.01_linux_amd64 && chmod +x nf && clear && ./nf
```
## 六、回程路由测试：

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
## 七、安装ca-certificates解决证书不被信任问题

```shell
#centos
yum install -y wget && yum install -y ca-certificates
#debian/ubuntu
apt-get install -y wget && apt-get install -y ca-certificates
```
## 八、测试VPS是否开放25端口

```shell
apt update
apt install telnet
telnet smtp.aol.com 25
```

## 九、内存检测脚本
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

## 十、魔改 OpenVZ 开启 GoogleBBR

适用于基于OpenVZ虚拟机上的 Debian or Ubuntu。
```shell
#单网卡（单 IP） 服务器：
wget https://github.com/tcp-nanqinlang/lkl-rinetd/releases/download/1.1.0/tcp_nanqinlang-rinetd-debianorubuntu.sh
bash tcp_nanqinlang-rinetd-debianorubuntu.sh

#多网卡（多 IP） 服务器，会为所有网卡（所有 IP）提供加速：
wget https://github.com/tcp-nanqinlang/lkl-rinetd/releases/download/1.1.0/tcp_nanqinlang-rinetd-debianorubuntu-multiNIC.sh
bash tcp_nanqinlang-rinetd-debianorubuntu-multiNIC.sh
```

## 十一、一键安装openlitespeed+mraiodb+lsphp7.3环境和Wordpress

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

## 十二、测试IP质量（仅供参考）

```shell
bash <(wget -qO- --no-check-certificate https://gitlab.com/spiritysdx/za/-/raw/main/qzcheck.sh)
```

## 十三、测试是否解锁OpenAI

```shell
# 1
bash <(curl -Ls https://cpp.li/openai)
# 2
bash <(curl -Ls https://cdn.jsdelivr.net/gh/missuo/OpenAI-Checker/openai.sh)
```
