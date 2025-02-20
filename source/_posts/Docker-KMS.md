---
title: Docker 搭建 kms
tags:
  - docker
categories: Docker
cover: "https://image.6669998.xyz/bYKQOM.png"
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
docker run -d -p 2851:1688 --restart=always --name="vlmcsd" mikolatero/vlmcsd
```

- :1688 前面自定义
- 前一个是主机端口，后一个是容器端口

## 激活windows

- 用管理员权限打开 cmd 或者 powershell

## 配置 GVLK

```markdown
slmgr /ipk <product key>
```

- 以下示例为 Windows 11 企业版

```markdown
slmgr /ipk NPPR9-FWDCX-D2C8J-H872K-2YT43 
```

- Windows Server 2008 R2 企业版：489J6-VHDMP-X63PK-3K798-CPX3Y 
- Windows Server 2012 R2 数据中心版：W3GGN-FT8W3-Y4M27-J84CP-Q3VJ9 
- Windows Server 2016：CB7KF-BWN84-R7R2Y-793K2-8XDDG 
- Windows Server 2019：WMDGN-G9PQG-XVVXX-R3X43-63DFG 
- Windows Server 2022：WX4NM-KYWYW-QJJR4-XV3QB-6VM33

[微软各个版本key](https://learn.microsoft.com/en-us/windows-server/get-started/kms-client-activation-keys)

## 配置 KMS 服务器

```markdown
slmgr /skms kms.6669998.xyz
```
- 如果没有绑定域名 就是 ip:port

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

```markdown
cscript ospp.vbs /sethst:kms.6669998.xyz
```

## 激活命令

```markdown
cscript ospp.vbs /act
```

[office各个版本key](https://learn.microsoft.com/zh-cn/DeployOffice/vlactivation/gvlks)
[officeKMS 主机缓存](https://learn.microsoft.com/zh-cn/DeployOffice/vlactivation/activate-office-by-using-kms)
[github 别人收集的](https://github.com/netnr/kms?tab=readme-ov-file)