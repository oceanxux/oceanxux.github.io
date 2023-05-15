---
title: 备份Docker镜像到DockerHub
fileName: demo
author: sam
type: test
categories: 笔记
tags:
  - docker
  - 笔记
abbrlink: ad99b136
cover: 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/writer_q06d.svg'
description: docker
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