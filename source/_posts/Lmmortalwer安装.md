---
title: Lmmortalwrt安装
tags:
  - openwrt
categories: Lmmortalwrt
cover: 'https://tu.idcfq.com/imgs/2023/10/a72fdcdbf7ac6217.webp'
description: 安装及使用
abbrlink: dfd5965
date: 2023-10-20 21:43:07
---

# 安装

- 项目地址
- 在pve 下安装

```bash
# 项目github地址

https://github.com/immortalwrt/immortalwrt

# 项目下载吉林大学开源镜像站
https://mirrors.jlu.edu.cn/immortalwrt/

#其他下载地址
https://firmware-selector.immortalwrt.org/
```

# 选择 generic-squashfs-combined-efi.img
 
- 拉取镜像
 
```bash
cd /tmp && https://mirrors.jlu.edu.cn/immortalwrt/releases/23.05.1/targets/x86/64/immortalwrt-23.05.1-x86-64-generic-squashfs-combined-efi.img.gz
```

- 通过解压 gunzip

```bash
 gunzip immortalwrt-23.05.1-x86-64-generic-squashfs-combined-efi.img.gz
 ```
 
- 重命名便于扩容

```bash
mv immortalwrt-23.05.1-x86-64-generic-squashfs-combined-efi.img.gz open.ing
```

# 扩容

- 查看目前大小


```shell
ls -h  #查看镜像
```

```shell
ls -lah  #查看镜像大小
```

- 扩容分区

```shell
dd if=/dev/zero bs=1M count=10240 >>opwrt.img
```

![65f1a5b5cedda.png](https://image.6669998.xyz/VRbsmc.png)

- 打印查看

```shell
parted open.img  #打开镜像

print           #查看具体分区
```

![65f1a6ef77fe2.png](https://image.6669998.xyz/196A8C.png)
 
- 第一步 OK  
- 第二部 fix

- 把新增的10G分配

```bash
resizepart 2 100%
```

![65f1a7b368d0c.png](https://image.6669998.xyz/ZtgXZc.png)

- 查看分区是否成功

```shell
parted
```

- 确认无误退出

```shell
quit
```

# 安装 immortalwrt

- 新建一个Pve 虚拟机
- 把镜像推送到虚拟机

```shell
qm importdisk ID open.img local-lvm   #id 为虚拟机ID
```

![65f1a87ac1696.png](https://image.6669998.xyz/dPIrf7.png)

## 修改IP

```shell
cd /etc/configb
```

- 备份 network

```shell
cp network network.bak
```

![65f1aa258b17a.png](https://image.6669998.xyz/F9W0lm.png)

- 编辑 network 更改IP

```shell
nano network
```
![65f1aa9d9e20b.png](https://image.6669998.xyz/DngxeI.png)

## 重启网络服务

```shell
service network restart
```

- 查看Ip

```shell
ip add 
```

#  防火墙添加规则

```shell
iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
````

- 完结