---
title: 备份Docker镜像到DockerHub
tags:
  - docker
categories: Docker
abbrlink: ad99b136
cover: 'https://image.6669998.xyz/jxCcQH.png'
description: 备份Docker镜像到DockerHub
date: 2023-05-05 00:38:11
---

# 一、备份镜像

####  首先注册一个DockerHub账号 

```http
https://hub.docker.com/
```

#### 登录帐号 

```shell
docker login -u 你注册的账号
```

#### 然后按提示输入密码

 运行 docker images 命令来查看Docker镜像，如下

```shell
docker images
```

![](https://img-blog.csdnimg.cn/e8476538d9e2427da63f2343af01c2d2.png)

#  二、镜像构建及提交

#### 构建

```shell
docker tag 镜像id 你的账号/新名称:版本号
```

![](https://img-blog.csdnimg.cn/ed44eea632684a87bcaea68185fa1f49.png)

#### 提交

```shell
docker push 你的账号/镜像名称:版本号  #就是你刚才构建的名称版本
```

![](https://img-blog.csdnimg.cn/f55baf3755514f79a049d2a629735ffb.png)

#### 然后你就成功提交到了DockerHub上，可以登录WEB端查看及修改。

# 三、拉取镜像

```shell
docker pull 你的账号/镜像名称:版本号
```
# 四、docker 常用命令
```bash
docker ps -a     ### 列出所有的容器

docker images -a   ### 列出所有的镜像

docker pull xxx    ### 拉取镜像

docker run xxx     ### 运行镜像

docker stop xxx    ### 暂停xxx容器

docker rm xxx      ### 删除xxx容器

docker start xxx   ### 启动容器

docker restart xxx ### 重启容器

docker kill xxx    ### 强制停止容器
```
# 五、Docker管理面板
Docker管理面板最常用的就是Portainer

[项目地址](https://hub.docker.com/r/portainer/portainer-ce)

安装Portainer首先要拉去镜像：
```bash
docker pull portainer/portainer-ce:latest
```
然后运行Portainer
```dockerfile
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /etc/docekr:/data --name portainer --restart=always portainer/portainer-ce:latest
```
data的映射路径可以自己更改，我这里映射的是 /etc/docekr 路径