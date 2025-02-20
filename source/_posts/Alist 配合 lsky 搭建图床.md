---
title: Alist 配合 lskypro 搭建图床
tags:
  - docker
abbrlink: 248bd04d
date: 2024-02-13 16:55:18
categories: Docker
cover: 'https://image.6669998.xyz/ofg0V6.png'
description: Alist 配合 lsky 搭建图床
top:
password:
---

- 基于docker 下安装

#  Alist

- [官方地址](https://github.com/alist-org/alist)

```dockerfile
docker run -d \
    --restart=unless-stopped \
    -v /home/alist:/opt/alist/data \
    -p 5111:5244 \  #5111 自定义端口
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

## 添加储存 webav

![65cb778f64100.png](https://image.6669998.xyz/pBKBZq.png)
![65cb773f0f585.png](https://image.6669998.xyz/WZSNy5.png)
![65cb77d09002c.png](https://image.6669998.xyz/eYsPvu.png)

### 简单说明

- WebDAV 策略 分别是什么意思

• 302 重定向：重定向到真实链接  
• 使用代理 URL：重定向到代理 URL  
• 本机代理：直接通过本地中转返回数据（最佳兼容性）  
• 302重定向：虽然不会消耗流量，但是不建议共享使用，有封禁账户的风险  
• 代理URL：会消耗搭建代理URL的流量  
• 本地代理：会消耗搭建AList设备的流量

![1723430790054.png](https://image.6669998.xyz/3HMe4S.png)

# google drive 获取TOKEN

## 准备好Client_ID、Client_secret

- [google网址API 地址](https://console.cloud.google.com/apis/library)

![1723432009164.png](https://image.6669998.xyz/hSHrph.png)
![1723432021534.png](https://image.6669998.xyz/8I3scP.png)
![1723432032364.png](https://image.6669998.xyz/UYjCie.png)

- OAuth 同意屏幕 配置教程，如已配置好 忽略本图即可(如果看不清楚可以放大)

![1723432060315.png](https://image.6669998.xyz/JHx87r.png)

- 我们创建好 OAuth 客户端ID 后点击我们刚刚创建的 OAuth 客户端ID 随便写~ 进去后有 客户端ID 和 客户端秘钥

![1723432071487.png](https://image.6669998.xyz/MN2MX4.png)

# rclone
- [官网下载地址](https://rclone.org/downloads/)

- ![1723432516269.png](https://image.6669998.xyz/z1Mmlo.png)

- 进入终端或者CMD
- 替换以下命令中的Client_ID、Client_secret 并执行

```shell
rclone authorize “drive” "Client_ID" "Client_secret" #CMD中运行此命令
./rclone authorize "drive" "Client_ID" "Client_secret" #mac 系统下
.\/rclone.exe authorize "drive" "Client_ID" "Client_secret" #PowerShell中运行此命令
```

```cookie
# 手动 reclone 获取 TOKEN
{"access_token":"xxxxxx","token_type":"Bearer","refresh_token":"1//xxxxxx","expiry":"2024-02-14T18:25:45.937328+08:00"}

# 需要的是 如下里面的TOKEN
"refresh_token":"1//xxxxxx"
```

## 填入之前准备好的 Client_ID、Client_secret

![1723432788241.png](https://image.6669998.xyz/DUvBpU.png)

# LskyPro 图床

- [Dcoekr版 github 地址](https://github.com/HalcyonAzure/lsky-pro-docker)
- [lsky 官方文档 ](https://docs.lsky.pro/)

```dockerfile
docker run -d \
    --name lsky-pro \
    --restart unless-stopped \
    -p 5821:8089 \
    -v $PWD/lsky:/var/www/html \
    -e WEB_PORT=8089 \
    halcyonazure/lsky-pro-docker:latest
```
- 注意 备份这个数据库文件 database.sqlite 避免服务器boon

![1723431074906.png](https://image.6669998.xyz/wnQfG3.png)

- 其中 -v $PWD/lsky:/var/www/html \ 要把里面的 $PWD/lsky 换成你的路径。这样当docker掉了以后，下次再启动docker的时候数据不会丢失。
- -p 5821:8089 前面那个5821可以换成你自己指定的端口。

## WEB 配置

- 打开网页 http://localhost:port

- 设置数据库为本地 SQLite 文件 
- 此方法未对接数据库，对接数据库可以自行对接

![65cb78a2a0d75.png](https://image.6669998.xyz/RgdfGK.png)

- 如图就完成注册设置了

![65cb78c78ad23.png](https://image.6669998.xyz/02Nx3n.png)

### 对接 Alist

- 登录管理员账户，点击侧边栏的 “存储策略” 进入图片文件存储的相关配置，创建一个新的存储策略。

![65cb79ea861a5.png](https://image.6669998.xyz/q6j1wh.png)

- 默认存储策略为本地存储，AList 提供的 WebDAV 服务创建一个新的存储策略，
- 配置项如表所示，其中访问域名即为图片直链对应的域名和路径

![65cb7313e4477.png](https://image.6669998.xyz/dBve0d.png)

| 配置项 | 配置内容                         | 说明                                           |
|--|------------------------------|----------------------------------------------|
| 名称 | WebDAV                       | 存储区                                          |
|访问域名| https://alist.xxxxx.cn/image | 记得添加 /image 后缀              |
|URL| Queries                      | 留空，无需填写                                      |
|连接地址| https://alist.xxxxx.cn       | 为 AList 服务访问域名                               |
|认证方式| Basic                        | 务必选择 Basic，否则连接失败                            |
|路径前缀| /dav/image                   | 与 AList 存储配置保持一致                             |
|用户名| ${username}                  | AList WebDAV 用户名（用户需有对 image 目录的 WebDAV 读写权限 |
|密码| ${password}                  | AList WebDAV 密码（用户需有对 image 目录的 WebDAV 读写权限  |


- 一定要打开这个 我这上面耗时最多

![65cb79a00d879.png](https://image.6669998.xyz/D6358E.png)

# 反代域名

- 我使用的是caddy

```shell
image.xxxx.com {
    reverse_proxy 127.0.0.1:port
}
```

# 其余小tips

```markdown
类型：webdav
连接域名：https://反代ip:5244的域名
连接地址：http://ip:5244
域名路径：/dav/你的alist路径
用户名：alist用户名
密码：alist密码
alit开启guest用户，赋予权限，赋予路径和dav/你的alist路径一样
兰空图床要开启图片保护，隐藏alist连接域名，否则不能直接输出图床连接，打开会是alist页面
```
##  设置一个sh脚本 定期上传 记得加crontab

```bash
#! /bin/bash

# 定义源目录和备份目录
sourceDir="/home/lsky"
backupDir="/home/alist/google/backup/lsky"

# 获取当前日期
currentDate=$(date +"%Y%m%d")

# 备份今天的文件到指定备份目录
tar -czvPf ${backupDir}/lskyBackup_${currentDate}.tar.gz $sourceDir

# 输出备份完成信息
echo "备份完成：$backupDir/lskyBackup_${currentDate}.tar.gz"
```
[游览器插件](https://github.com/wisp-x/lsky-pro-chrome-extension/releases)
[alist官方教程](https://alist.nn.ci/zh/guide/)
[参考大佬](https://blog.leohao.cn/2023/04/15/image-hub-tutorial/)