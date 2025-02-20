---
title: PVE  debian12
tags:
  - PVE
categories: debian
cover: 'https://image.6669998.xyz/sTH6GD.png'
description: PVE 下 debian12 安装
abbrlink: f64a8979
date:
top:
password:
---

- [PVE 创建虚拟机 ](https://xx.6669998.xyz/post/591eef1a.html)

# 安装debian 教程

## 下载镜像

- [镜像下载地址](https://mirrors.tuna.tsinghua.edu.cn/#)
- 需要其他镜像站下载地址到在文章底部

![660ac053c2c69.png](https://image.6669998.xyz/oYPuPu.png)
![660ac0d12af8d.png](https://image.6669998.xyz/pSq0yB.png)

- 然后通过SSH 把它上传到PVE到目录里
- 也可以直接链接下载

## 推送ISO镜像到容器

-  安装的时候选择不使用任何介质

![660c0eba8000f.png](https://image.6669998.xyz/Q2hmeL.png)

- 命令

```shell
qm importdisk [容器ID] 镜像名称 local-lvm
```

![660c0fda6a681.png](https://image.6669998.xyz/akiEI6.png)

- 进入到系统安装界面，选择Graphical install

![660c10c64ab41.png](https://image.6669998.xyz/0SQD0g.png)

- 选择系统使用语言：English

![660c10e6c63f4.png](https://image.6669998.xyz/mxGT7h.png)

- 选择地区：Hong Kong

![660c10fab0d77.png](https://image.6669998.xyz/LKwgn2.png)

- 选择键盘模式：American English

![660c1113b813b.png](https://image.6669998.xyz/gs5Zjz.png)

- 为计算机命名：可自定义

![660c153a9f89d.png](https://image.6669998.xyz/ORals8.png)

- 为计算机设置域名：可不填写

![1723785076477.png](https://image.6669998.xyz/ZyzZft.png)

- 设置root 账户 和密码

![660c156a930dd.png](https://image.6669998.xyz/J8IukG.png)

- 一般用户 （以下图片分别为：登陆名 称呼 密码）

![1723785173693.png](https://image.6669998.xyz/YAAHap.png)
![1723785189763.png](https://image.6669998.xyz/Wj5Axw.png)
![1723785244727.png](https://image.6669998.xyz/eAdDwK.png)

- 设定磁盘
- 磁盘分区方式选择

| 英文描述	 | 中文释义                                                             | 1 |
|---|------------------------------------------------------------------|---|
|Guided-use entire disk | 带引导模式方式直接使用整块磁盘                                                  | 2 |
|Guided-use entire disk and set up LVM	 | 带引导模式方式使用整块磁盘并使用LVM，LVM(Logical Volume Mananger)逻辑卷管理，可对磁盘进行弹性管理 | 3 |
|Guided-use entire disk and set up encrypted LVM | 带引导模式方式使用整块磁盘并使用加密的LVM     | 4   | 
| Manual | 完全手动模式                                                           | 5 |

![660c15eb3c9dc.png](https://image.6669998.xyz/NsFbxS.png)
![660c15fc7b47d.png](https://image.6669998.xyz/whkXcl.png)
![660c19e8ae472.png](https://image.6669998.xyz/gsqbQ3.png)

- 选择磁盘空间分区划分

| 1 | 英文描述  | 中文释义                  |
|---|-------|-----------------------|
| 2 | All files in one partition(recommended for new users) | 所有的文件都位于一个分区中(推荐新用户)  |
| 3 |Separate /home partition 单独设置home分区 |                       |
| 4 | Separate /home,/var,and /tmp partitions	 |单独设置home分区，var分区以及tmp分区|

![660c164ae4658.png](https://image.6669998.xyz/EDr9uh.png)
![660c19faab645.png](https://image.6669998.xyz/eKpBns.png)

- 选 debian源 
-  china

![660c17594779e.png](https://image.6669998.xyz/iQpCZz.png)

- 选 mirrors.163.com

![660c180425b60.png](https://image.6669998.xyz/MRt2G6.png)

- 自行选择代理

![660c181c08ec2.png](https://image.6669998.xyz/lhUhAt.png)

-  不上传匿名日志

![660c1913b0524.png](https://image.6669998.xyz/2kRPkl.png)

- 选择你需要的模式 我这里选择的SSH

![660c197d0de41.png](https://image.6669998.xyz/mqPGDr.png)

- 为GRUB加载引导程序选择安装的磁盘

![660c1b470014b.png](https://image.6669998.xyz/pmczjK.png)

- 重启结束

![660c1aff6baba.png](https://image.6669998.xyz/68mu9t.png)
![660c1b6fcf90b.png](https://image.6669998.xyz/DxVkYJ.png)

# 选择刚才安装到sata盘放到首位

![660c109483501.png](https://image.6669998.xyz/PbMvM3.png)

# 可选 IPs

- 添加这个后 会显示IP地址 比较方便

![660c1022ac2fa.png](https://image.6669998.xyz/Dp9QlE.png)
![1723784549917.png](https://image.6669998.xyz/UZ9uU6.png)


- Tips 

```shell
echo root:samuel |sudo chpasswd root
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/g' /etc/ssh/sshd_config;
sudo service sshd restart
```

- [阿里云镜像](http://mirrors.aliyun.com)
- [网易开源镜像站](http://mirrors.163.com)
- [搜狐开源镜像站](http://mirrors.sohu.com)
- [北京交通大学开源镜像站](http://mirror.bjtu.edu.cn)
- [兰州大学开源软件镜像站](http://mirror.lzu.edu.cn)
- [厦门大学开源软件镜像站](http://mirrors.xmu.edu.cn)
- [上海交通大学开源软件镜像站](http://ftp.sjtu.edu.cn)
- [清华大学开源软件镜像站](http://mirrors.tuna.tsinghua.edu.cn)
- [天津大学开源软件镜像站](http://mirror.tju.edu.cn)
- [中国科学技术大学开源软件镜像站](http://mirrors.ustc.edu.cn)
- [东北大学开源软件镜像站](http://mirror.neu.edu.cn)
- [东软信息学院开源软件镜像站](http://mirrors.neusoft.edu.cn)
- [浙江大学开源软件镜像站](http://mirrors.zju.edu.cn)
- [北京理工大学开源软件镜像站](http://mirror.bit.edu.cn)
- [华中科技大学开源软件镜像站](http://mirrors.hust.edu.cn)
- [中山大学开源软件镜像站](http://mirror.sysu.edu.cn)
- [大连理工大学开源软件镜像站](http://mirror.dlut.edu.cn)
