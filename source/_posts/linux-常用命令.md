---
title: linux 常用命令
tags:
  - 笔记
  - linux
  - 常用
categories: linux 常用命令
cover: >-
  https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Mobile_search_jxq5.svg
description: 自用命令
abbrlink: dc3ac5b2
top: 9
date: 2023-07-28 19:04:16
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