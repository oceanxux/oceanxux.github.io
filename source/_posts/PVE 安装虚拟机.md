---
title: PVE 安装虚拟机
tags:
  - PVE
categories: PVE
abbrlink: 591eef1a
date: 2024-04-03 12:04:01
cover:
description: PVE 安装虚拟机
top:
password:
---

# 创建虚拟机

![660c0eba8000f.png](https://image.6669998.xyz/DBdi9L.png)

- 在这 可选 是否使用已上传的镜像：IOS 镜像
- 示例的是自己通过SSH 链接PVE 把镜像拖到PVE 里面 推送到容器

![660ac2be4f5ea.png](https://image.6669998.xyz/LntGcM.png)
![660ac2f27594e.png](https://image.6669998.xyz/JKD7m5.png)
![660ac4ee7896a.png](https://image.6669998.xyz/8CHCGh.png)
![660ac5163144b.png](https://image.6669998.xyz/WV7AGh.png)
![660ac54963cbd.png](https://image.6669998.xyz/YNerxI.png)
![660ac58b07d38.png](https://image.6669998.xyz/dVv8pm.png)
![660ac5d50ebde.png](https://image.6669998.xyz/TsMyIE.png)

- 先查看自己的镜像推送到会在哪里
- 以下为 local-lvm
- 把下载的镜像 上传至PVE 自定义为 debian11.iso 

```shell
pvesm status
```

- 把上传到PVE目录的IOS镜像推送到 local-lvm

```shell
qm importdisk debian11.iso local-lvm
```

![660aca58de76e.png](https://image.6669998.xyz/ag7Fee.png)

- 推送后你可以在硬件 里面查看到 刚刚推送的
- 记得启动使用

![660c0fda6a681.png](https://image.6669998.xyz/akiEI6.png)

- 记得在安装完镜像后在选项里面启动顺序优先级：你安装到sata 的硬盘
- 可选：然后就可以删除安装镜像了

![660c109483501.png](https://image.6669998.xyz/PbMvM3.png)

- 可选：IPS 为可以在PVE 管理界面看到分配给你的IP

![660c1022ac2fa.png](https://image.6669998.xyz/Dp9QlE.png)
![1723784549917.png](https://image.6669998.xyz/UZ9uU6.png)