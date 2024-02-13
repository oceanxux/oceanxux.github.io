---
title: Alist 配合 lskypro 图床
tags:
  - docker
abbrlink: 248bd04d
date: 2024-02-13 16:55:18
categories: Docker
cover: 'https://image.6669998.xyz/ZbMjBm.png'
description: Alist 配合 lsky 搭建图床
top:
password:
---

- 基于docker 下安装
- [github 地址](https://github.com/HalcyonAzure/lsky-pro-docker)
- [lsky 官方文档 ](https://docs.lsky.pro/)

#  Alist

- [官方地址]()

```dockerfile
docker run -d \
    --restart=unless-stopped \
    -v /home/alist:/opt/alist/data \
    -p 5244:5244 \
    -e PUID=0 \
    -e PGID=0 \
    -e UMASK=022 \
    --name="alist" \
    xhofe/alist:latest
```

## 进入镜像 设置密码

```dockerfile
# 进入镜像
docker exec -it alist /bin/bash
# 随机生成一个密码
./alist admin random
# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码
./alist admin set NEW_PASSWORD
```
## 添加储存

![](https://image.6669998.xyz/A5rJbd.png)
![](https://image.6669998.xyz/2pqko9.png)
![](https://image.6669998.xyz/FbntYS.png)

# LskyPro

```dockerfile
docker run -d \
    --name lsky-pro \
    --restart unless-stopped \
    -p 5821:8089 \
    -v $PWD/lsky:/var/www/html \
    -e WEB_PORT=8089 \
    halcyonazure/lsky-pro-docker:latest
```
- 注意
- 其中 -v $PWD/lsky:/var/www/html \ 要把里面的 $PWD/lsky 换成你的路径。这样当docker掉了以后，下次再启动docker的时候数据不会丢失。
- -p 8089:8089 前面那个可以换成你自己指定的端口。

# WEB 配置

## 注册

- 打开网页 http:/localhost:prost

![](https://image.6669998.xyz/onVy1Y.png)

- 设置数据库为本地 SQLite 文件 
- 此方法未对接数据库，对接数据库可以自行对接

![](https://image.6669998.xyz/8vkASe.png)

- 如图就完成注册设置了

## 对接 alist

- 登录管理员账户，点击侧边栏的 “存储策略” 进入图片文件存储的相关配置，创建一个新的存储策略。

![](https://image.6669998.xyz/vcB0dF.png)

- 默认存储策略为本地存储，AList 提供的 WebDAV 服务创建一个新的存储策略，
- 配置项如表所示，其中访问域名即为图片直链对应的域名和路径

```handlebars
配置项  	配置内容	说明
名称	WebDAV 存储区	
储存策略	WebDAV	
访问域名	https://image.domain.name.cn/img	记得添加 /img 后缀，与 Nginx 配置保持一致
URL Queries		留空，无需填写
连接地址	https://alist.domain.name.cn	alist.domain.name.cn 为 AList 服务访问域名
认证方式	Basic	务必选择 Basic，否则连接失败
路径前缀	/dav/image	与 AList 存储配置保持一致
用户名	${username}	AList WebDAV 用户名（用户需有对 image 目录的 WebDAV 读写权限）
密码	${password}	AList WebDAV 密码（用户需有对 image 目录的 WebDAV 读写权限）
```

![](https://image.6669998.xyz/cDjZAJ.png)

- 一定要打开这个 我这上面耗时最多

![](https://image.6669998.xyz/i0JTFX.png)

# 其余小tips

[游览器插件](https://github.com/wisp-x/lsky-pro-chrome-extension/releases)


[参考大佬](https://blog.leohao.cn/2023/04/15/image-hub-tutorial/)