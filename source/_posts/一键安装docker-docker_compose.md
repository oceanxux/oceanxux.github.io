---
title: 一键安装docker-常用命令
tags:
 - Linux
 - docker
categories: Docker
cover: 
description: 一键安装docker及常用命令
abbrlink: 4eb3381c
date: 2023-05-02 00:01:10
---


#  一、安装环境

## debian 升级下系统自带安装包

```shell
apt update && apt upgrade -y
```

#### 安装 curl

```shell
apt install curl
```

#### 或者

```shell
apt-get install curl
```

# 二、安装docker 

## 方法1

```shell
apt install docker -y
```

## 方法2

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```



## 测试docker 版本信息

```shell
docker --version
```



# 三、安装docker-compose

## 方法1

```shell
apt install docker-compose -y
```

## 方法2

```shell
curl -fsSL https://get.docker.com | bash -s docker
```

### 拉取代码

```shell
curl -L "https://github.com/docker/compose/releases/download/1.26.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 给权限

```shell
chmod +x /usr/local/bin/docker-compose
```

##  测试docker-compose 版本信息

```shell
docker-compose --version
```

# 四、docker 基础命令

## 启动docker

```shell
systemctl start docker
```

## 关闭docker

```shell
systemctl stop docker
```

## 重启docker

```shell
systemctl restart docker
```

## docker设置随服务启动而自启动

```shell
systemctl enable docker
```

## docker命令

```shell
#查看Docker已有容器
docker ps -a 
#进入容器
docker exec -it 容器名称 bash
#退出容器命令
exit 
#关闭容器
docker kill 容器ID
#查看docker网络模式
docker network ls
#重启容器
docker restart 容器名称 
```

# 五、docker 镜像命令

## 查看系统docker镜像列表

```shell
docker images
```

## 删除镜像 需先停止

```shell
#停止镜像
docker stop 镜像名/镜像ID
#停用所有容器
docker stop $(docker ps -q)
#删除一个
docker rmi -f 镜像名/镜像ID

#删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

#删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)
##强制删除
docker image rm 镜像名称/镜像ID
```

# 六、docker-compose 常用命令

```shell
#前台运行
docker-compose up
#后台运行
docker-compose up -d
#停止容器
docker-compose down
#查看容器状态
docker-compose ps
#查看容器日志
docker-compose logs
#构建镜像
docker-compose build
#重启容器
docker-compose restart
#停止容器
docker-compose stop
#启动容器
docker-compose start
#删除容器
docker-compose rm
#在容器内执行命令
docker-compose exec
#拉取镜像
docker-compose pull
#推送镜像
docker-compose push
#检查配置文件
docker-compose config
#查看容器事件
docker-compose events
#扩展容器数量
docker-compose scale
```
# 7 docker 报错问题
```bash
error pulling image configuration: download failed after attempts=6: net/http: TLS handshake timeout
## 或者 docker pull 超时
```
解决方法
```bash
## 加代理
# 创建一个名为 docker.service.d 的目录
 sudo mkdir -p /etc/systemd/system/docker.service.d
```

``` bash
# 创建一个新的配置文件 /etc/systemd/system/docker.service.d/http-proxy.conf 并编辑该文件
 sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf
```

```bash
# 在打开的文件中，将以下内容粘贴并保存
 [Service]
Environment="HTTP_PROXY=http://your_proxy_address:your_proxy_port/"
Environment="HTTPS_PROXY=http://your_proxy_address:your_proxy_port/"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,your_domain"
```
替换 your_proxy_address 和 your_proxy_port 为您的代理服务器的地址和端口号


```bash
# 重新加载配置文件并重新启动 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker
```