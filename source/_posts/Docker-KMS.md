---
title: Docker 搭建 kms
tags:
  - docker
categories: Docker
cover: "https://image.6669998.xyz/3DZjKl.png"
description: Docker 搭建 kms
abbrlink: f412001b
date: 2023-09-04 12:01:56
top:
---
# 安装docker 

- debian 升级下系统自带安装包

```shell
apt update && apt upgrade -y
```

- 安装 curl

```shell
apt install curl
```

- 或者

```shell
apt-get install curl
```

## 二、安装docker

- 方法1

```shell
apt install docker -y
```

- 方法2

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

# 安装 vlmscd
```markdown
docker pull mikolatero/vlmcsd
docker run -d -p 1688:1688 --restart=always --name="vlmcsd" mikolatero/vlmcsd
```
- 前一个是主机端口，后一个是容器端口

## 激活windows

- 用管理员权限打开 cmd 或者 powershell

## 配置 GVLK
```markdown
slmgr /ipk <product key>
```
[微软各个版本key](https://learn.microsoft.com/en-us/windows-server/get-started/kms-client-activation-keys)

## 配置 KMS 服务器
```markdown
slmgr /skms ip:port
```
## 激活
```markdown
slmgr /ato
```
# 激活Office
## 配置命令
```markdown
cscript ospp.vbs /sethst:ip
cscript ospp.obs /setprt:port
```
## 激活命令
```markdown
cscript ospp.vbs /act
```
[office各个版本key](https://learn.microsoft.com/zh-cn/DeployOffice/vlactivation/gvlks)
[officeKMS 主机缓存](https://learn.microsoft.com/zh-cn/DeployOffice/vlactivation/activate-office-by-using-kms)