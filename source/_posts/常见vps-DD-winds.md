---
title: 常见vps DD winds
tags:
  - 笔记
  - windos
  - Linux
categories: 笔记
cover: >-
  https://article.biliimg.com/bfs/article/46be7c7bf9cf61e8d74a19838965f41f5d13a4f0.png
description: DD_winds 笔记
abbrlink: d3229ea8
top: 4
date: 2023-08-21 23:08:51
---
# 一、前言

- 机器必须为debian/ubuntu 脚本不支持centos7机器执行

- 本文记录使用 1keydd 大佬的脚本，对市面上常见服务商的vps dd成windows记录，也可以dd成linux，大家可以根据自己的需求选择。

# 二、脚本使用
## 1、查看网卡信息

- 通常是通过 ip route show ifconfig 命令获得，apt-get install net-tools （ifconfig需安装网络工具包）

## 2、查看启动方式

- 机器不同的启动方式一般对应不同的dd包,执行这条命令查看vps启动方式是 UEFI 还是 BIOS

```shell
[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS
```
## 3、执行dd脚本

- 替换为自己的公网IP 子网掩码和网关
- 镜像可以自定义，你可以换成windows centos ubuntu debian pve 等都行
```markdown
wget -qO- 1keydd.com/inst.sh|bash -s - -n ip,netmask,gateway -t 自定义镜像/dd包
```
- 执行成功后可以通过 http://ip:80通过vnc查看dd进度，具体日志可以通过 http://ip:8000 查看
- 因为需要进入系统注入网卡，所以dd会擦除原密码并在登录时将密码修改为 1keydd

# 三、镜像dd包
- 暂时知道的dd包如下： 
- 1keydd作者的win10二合一dd包
- [cxthhhhh大佬的dd包](https://odc.cxthhhhh.com/SyStem/Windows_DD_Disks)
- [natee大佬的dd包，网友备份站点](https://dd.i3.pw/)
- [cosmiccat大佬的dd包](https://od1.cosmiccat.net/DD/)
- [秋水逸冰大佬的的dd包](https://dl.lamp.sh/vhd/)

#### 注：
秋水大佬的该win10 ltsc镜像会出现程序 wsappx 大量占用CPU和硬盘IO的情况，原因可能是未安装微软商店，但是实测部分机器 安装微软商店 后没有效果(有些机器也有效果) 暂不推荐使用
部分包不支持dd过程中注入静态网卡，无VNC的机器请选择支持脚本注入网卡的dd包
PS：欢迎推荐其他镜像

# 四、常见问题
### 远程登录账号密码是什么

- windows账号都是 Administrator ，密码是 1keydd 或者 cxthhhhh.com nat.ee cosmiccat Teddysun.com 等。
  
### 80端口显示 Something went wrong, connection is closed

- vnc 5900端口未放行

### 80端口打开显示空页面

- 我也遇到过，可能是浏览器插件，后来我下载了个火狐浏览器没有任何插件就行了

### 硬盘大小于实际不符

- 需要你自己扩容，windows扩容是在磁盘管理中 比较简单，linux扩容就有些复杂，有些是LVM格式 有些是其他格式。

### VNC观察到dd成功后 3389端口一直不通

- 应该是dd后无法进入系统修改网卡，请选用支持注入网卡的dd包。有VNC的可以通过VNC进入，手动配置网卡

### cxthhhhh的win7旗舰版太精简了 没有浏览器

- 通过快捷键win+R打开运行窗口，输入 iexplore 然后确定就可以打开IE浏览器了，通过IE浏览器下载其他浏览器 注意google和edge已经不支持win7

### cxthhhhh镜像无法下载

- 作者拉黑了部分服务商的IP，可以搜索下其他镜像站

### VNC控制台启动windows蓝屏报错 0xc000021a

- 镜像的驱动问题，换个镜像试试

### No bootable device

- BIOS启动的机器你使用的UEFI dd包，或者UEFI启动的机器你使用的BIOS启动的dd包

### 远程卡顿

- 这很正常 请使用隧道中转

### 部分VNC鼠标漂移

- 好像是分辨率的问题暂不知道如何解决

### 激活密钥

- 不了解 可以去某宝看看

### nat机是否可以dd

- 应该可以 没有试过

### dd后无ipv6

- 1keydd脚本及萌咖脚本有点小问题：dd后ipv6网卡会消失。纯ipv6小鸡dd后添加网卡可以看下面 hosmatic 这个例子

### 执行脚本后无输出

- 可能是脚本证书问题导致无法下载 忽略证书检测试试 wget -qO- 1keydd.com/inst.sh --no-check-certificate | bash -s ...

### 执行脚本报错 sudo ar curl missing !error happen while autoinstall! please running 'apt-get update && apt-get install sudo sudo binutils sudo curl binutils ' to install them

- 应该是机器执行 apt update 产生了报错，我也不太懂这个，我的解决办法是将 /etc/apt/sources.list 文件中的内容全部删去 然后新增 deb [trusted=yes] http://deb.debian.org/debian buster main ，再次执行一般不会报错了(此方法不一定对)

### wget dd无法执行 ip:8000/progress 显示 dd: failed to open '/dev/sda': Read-only file system

- 详见下面的 extravm

### wget dd那一步 下载&解压dd包速度低于15MB/S

- 这种情况一般是服务商的网络下载文件速度过于缓慢，可以尝试使用dd包作者提供的直链，可能过一会网络就好了，暂不清楚原因，可能是R2的问题。当然也不排除是CPU/硬盘过烂

# 五、常见dd脚本

- 以下脚本可能有更新，可能文中部分说法不准确，请评论/联系作者修正

## 1、萌咖脚本
项目地址：网友备份的站点

- 大多数dd脚本都是依照萌咖脚本二次开发的

下载脚本
```markdown
wget --no-check-certificate -qO InstallNET.sh 'https://raw.githubusercontent.com/veip007/dd/master/InstallNET.sh' && chmod +x InstallNET.sh
```
用法

- 详细用法请参考 https://github.com/veip007/dd

```markdown
#详细用法请参考 https://github.com/veip007/dd

bash InstallNET.sh --ip-addr x.x.x.x --ip-gate x.x.x.x --ip-mask x.x.x.x -dd dd包直链
```

## 2、1keydd脚本

- 项目地址：https://github.com/minlearn/1keydd

个人感觉最适合dd windows的脚本

用法
````markdown
wget -qO- inst.sh | bash -s - -n ,netmask,gateway -t dd包直链

例：
wget -qO- 1keydd.com/inst.sh | bash -s - -n 5.78.73.181,255.255.255.255,172.31.1.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz

wget -qO- 1keydd.com/inst.sh | bash -s - -n 2a0f:5707:aaef:292::1,ffff:ffff:0000:0000:0000:0000:0000:0000,2a0f:5707:aae0::1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_7_Vienna_Ultimate_CN_v2.0.vhd.gz

````
- 特点：
dd过程中自带vnc窗口和日志，方便排错
支持 DHCP/静态/不规则网卡的机器
支持注入网卡，适合无VNC的机器
因为需要进入系统注入网卡，所以dd会擦除原密码并在登录时将密码修改为 1keydd
linux只支持从源安装debian10，其他linux系统不支持

## 3、leitbogioro脚本
项目地址：https://github.com/leitbogioro/Tools

个人推荐用来dd成linux

下载脚本
```markdown
wget --no-check-certificate -qO InstallNET.sh 'https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh' && chmod a+x InstallNET.sh
```
- 用法

```markdown
#详细用法请参考 https://github.com/leitbogioro/Tools
#默认密码 LeitboGi0ro
例：
bash InstallNET.sh --image https://file.1323123.xyz/dd/windows/natee/guajibao-win7-sp1-ent-x64-cn.vhd.gz --ip-addr 139.162.52.1 --ip-mask 24 --ip-gate 139.162.52.1

bash InstallNET.sh -centos 7 --ip-addr 139.162.52.11 --ip-mask 24 --ip-gate 139.162.52.1
```
- 特点：
支持从源dd为linux，支持的linux系统很全
只支持DHCP或者规则的静态网卡，不支持不规则网卡的机器
用dd包dd windows时，无法插入网卡，因此不适合无VNC的非DHCP小鸡dd windows

4、bin456789脚本
项目地址：https://github.com/bin456789/reinstall

支持从windows系统dd成linux系统(亲测可行)

windows示例：
```markdown
#首先下载好 reinstall.bat 和 reinstall.sh
    
#直接同一目录cmd执行
reinstall.bat dd --img=https://file.1323123.xyz/dd/centos/cxthhhhh/CentOS_7.X_x64_Legacy_NetInstallation_Final_v9.8.vhd.gz

```
Linux示例：

linux我只尝试过通过dd包进行dd，并没有尝试使用iso安装
```markdown
#首先下载脚本
curl -O https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh

#直接执行
bash reinstall.sh dd --img=https://file.1323123.xyz/dd/centos/cxthhhhh/CentOS_7.X_x64_Legacy_NetInstallation_Final_v9.8.vhd.gz
```

## 5、秋水逸冰脚本
项目地址：https://teddysun.com

萌咖脚本的二开版本

用法
```markdown
#我不太清楚秋水的脚本用法

wget -qO DebianNET.sh qiu.sh/dd && bash DebianNET.sh -dd dd包直链
```
# 六、示例

- 以下服务器默认是服务商的vps，而非独服。几乎所有均为境外vps
- 请仔细阅读服务商条款，一些商家不允许dd windows 可能有删机/封号风险
- 商家口碑可以查看此频道的评论：https://t.me/vps_reviews 例如hetzner就搜索 #hetzner
- 前提条件：
机器系统为debian/ubuntu(1keydd脚本centos机器无法执行) 演示中没有明确标明ubuntu的话默认是debian10/11
内存最好2GB 1GB内存推荐安装win7
硬盘不能少于解压后镜像的大小(镜像那节有标记)
虚拟化可以是kvm或xen 不支持openvz
通过 ip:8000/progress 或80vnc端口 显示解压完后，会重启，重启这个过程会花费1~20分钟

## AWS_EC2
- BIOS启动 默认情况端口未开放 有VNC(screenshot 需要手动刷新)
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz

wget -qO- 1keydd.com/inst.sh | bash -s - -t https://file.1323123.xyz/dd/centos/cxthhhhh/CentOS_7.X_x64_Legacy_NetInstallation_Final_v9.8.vhd.gz
```
![](https://article.biliimg.com/bfs/article/f04cce6ae9ae6c264e235acd4ca790ce83e45c87.png)
![](https://article.biliimg.com/bfs/article/af4644bdba2a74c26aaf89b7d54f879cd2bc2d52.png)
![](https://article.biliimg.com/bfs/article/ff99ff551b54b2e4dcd518036ee8456aecce2b13.png)

- demo2：dd成centos7
![](https://article.biliimg.com/bfs/article/414fae33a5aa73f6e4131ee6902723fb15a23f4f.png)
![](https://article.biliimg.com/bfs/article/51e03d101315e707785632a1a09bd7f2f5474e74.png)

## AWS_lightsail
aws轻量 亚马逊轻量 光帆
BIOS启动 默认情况端口未开放 xen虚拟化(2023.7.1之后是kvm虚拟化)
我用的动态IP静态IP应该也是一样的
我用debian没成功 换用的ubuntu22.04可以
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 172.26.13.168,255.255.240.0,172.26.0.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
![](https://article.biliimg.com/bfs/article/a6506a0fa576d630cfe08f9a98ef78384b83fcfe.png)
![](https://article.biliimg.com/bfs/article/e9d62f661cd0476ed14a389ba8ad700e7b462c94.png@1e_1c.webp)
![](https://article.biliimg.com/bfs/article/8edfed06264e647a63e68e04d4072f73ee8f2dbb.png)
![](https://article.biliimg.com/bfs/article/4ee056654ecb89719bf27d8ab9e9d1c484faf638.png)

## Google Cloud
GCP UEFI启动 默认情况端口未开放
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.128.0.4,255.255.255.255,10.128.0.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz

#这个似乎无法重启 不太了解
wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.128.0.7,255.255.255.255,10.128.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12_UEFI.vhd.gz
```
![](https://article.biliimg.com/bfs/article/25fb2369aaebbfeb5ca16877d60c2578b3732b9f.png)
![](https://article.biliimg.com/bfs/article/71ce95ca86719e37e2d5534c62d0f2ca2e541c25.png)
![](https://article.biliimg.com/bfs/article/d8b77419542af6832c861aab5fc38f03286cde84.png)
![](https://article.biliimg.com/bfs/article/befbe92872db8b8c13032df3f79070fed6589159.png)

## Azure 微软云
UEFI启动 默认情况端口未开放 有故障恢复台(Serial console)
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.0.0.4,255.255.255.0,10.0.0.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz


wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.0.0.4,255.255.255.0,10.0.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2012R2_DataCenter_CN_v4.29_UEFI.vhd.gz
```
- 我这里用控制台默认设置的静态IP(收费)

![](https://article.biliimg.com/bfs/article/844ea03b111a0782ec1ff8773e35b5c4b78defc7.png)
![](https://article.biliimg.com/bfs/article/eacdafcb4b2351e3f3be6649911f93737e9de4b9.png)

- demo1

![](https://article.biliimg.com/bfs/article/370b8bd1b4935fd176a3deb0af19d0f0c95e3cf2.png)

- demo2

![](https://article.biliimg.com/bfs/article/f6bb134c9b4fa69c782feff11c302efa4ac92534.png)

## oracle_amd 甲骨文amd 乌龟壳

- UEFI启动 默认情况端口未开放 有VNC(但上手较复杂)

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.0.0.83,255.255.255.0,10.0.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12_UEFI.vhd.gz
```
![](https://article.biliimg.com/bfs/article/b16bbf29f78decdd6957e0e1376a44a53c6773fc.png)
![](https://article.biliimg.com/bfs/article/dda753091117b8b1127b5292c848a63f1936e419.png)
![](https://article.biliimg.com/bfs/article/777e9f0f0f604156bf51db4cbb6b5460195837e6.png)
![](https://article.biliimg.com/bfs/article/cd3d02a98adc49ee3acbb258eaa29bae103d2f30.png)
![](https://article.biliimg.com/bfs/article/1cefafd6459b6fdd33421cd2648b8a5d436cd385.png)

## oracle_arm 甲骨文arm

- 没有支持ram架构的windows，这里只能dd linux

## OVH_public_cloud
BIOS启动 控制台有VNC
IP和网关在控制台面板看，子网掩码用 ifconfig 显示是 /32 对应的 255.255.255.255
我尝试过ctxhhhhh大佬的windows10会蓝屏报错，但是windows server可以 1keydd大佬的win10也可以

````markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 51.79.141.178,255.255.255.255,51.79.140.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz

wget -qO- 1keydd.com/inst.sh | bash -s - -n 51.79.141.178,255.255.255.255,51.79.140.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12.vhd.gz
````
![](https://article.biliimg.com/bfs/article/3c66bfaf2edf8bdc03362f455302527aa63c7e93.png@1e_1c.webp)
![](https://article.biliimg.com/bfs/article/2c981d6ba53bc9f455cd3961a4b10445aac8f2c5.png@1e_1c.webp)

- boot启动正常

![](https://article.biliimg.com/bfs/article/d4c14ea31dc57ff9702ea271c60e33a33276ac30.png@1e_1c.webp)
![](https://article.biliimg.com/bfs/article/8bca623669a92378e969297011166a5f809ffbc4.png@1e_1c.webp)

## OVH_bare_metal
- BIOS启动 控制台有VNC
- virtual private servers
- OVH0.97就是这一款

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 139.99.98.171,255.255.255.255,139.99.96.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
![](https://article.biliimg.com/bfs/article/586a2292f2d8fed6ea9065c04c169be9f12a16ed.png)
![](https://article.biliimg.com/bfs/article/6f289b7f49721e84806f3cd87caa2c7b70bf77d7.png)
![](https://article.biliimg.com/bfs/article/8e4a9d96d360b92da6d039c0cec9266c94056ef9.png)

## 腾讯云CVM 良心云 凉心云 Tencent Cloud
- BIOS启动 默认情况端口未开放 控制台有VNC
- 我用cxthhhhh大佬的windows server 2022/2008镜像报 0xc000021a 蓝屏错误

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 172.22.0.4,255.255.240.0,172.22.0.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz


wget -qO- 1keydd.com/inst.sh | bash -s - -n 172.22.0.4,255.255.240.0,172.22.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2012R2_DataCenter_CN_v4.29.vhd.gz
```
![](https://article.biliimg.com/bfs/article/8e46ee67501e8c8b526c5a01d94626e30cbe0839.png)
![](https://article.biliimg.com/bfs/article/c30e3322228283de27da40c2c0ddb97597b0089e.png)

- demo2

![](https://article.biliimg.com/bfs/article/58cd6ea7186bfbbeac0bc57340fbf508e8247f85.png)


## 腾讯云轻量
- BIOS启动 默认情况端口未开放 控制台有VNC
- 我的这个腾讯云轻量 为 BIOS启动，不要选择带 UEFI的dd包


```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -t https://odc.cxthhhhh.com/d/SyStem/Windows_DD_Disks/Historical_File_Windows_DD_Disk/Disk_Windows_7_Vienna_Ultimate_CN_v2.0.vhd.gz
```
![](https://article.biliimg.com/bfs/article/18eb2de9fa1e4056ce0c073070118efd8882ee50.png)
![](https://article.biliimg.com/bfs/article/a65ea23b5ed17609f04ccc3f4f086b2b1e5761bc.png)
![](https://article.biliimg.com/bfs/article/6412970b28d66b342b51fde08b5d3f4376b59911.png)

## 阿里云ECS 套路云 aliyun alibabacloud
- 控制台有VNC 默认情况端口未开放
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 172.19.65.108,255.255.240.0,172.19.79.253 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12.vhd.gz
```
![](https://article.biliimg.com/bfs/article/223b88b5f515448229d19789c0ab0b6fbfb57060.png)
![](https://article.biliimg.com/bfs/article/6427434dfeb81c2184efeb63d039898d86c63e54.png)
![](https://article.biliimg.com/bfs/article/86d60fee9f026eea945782bbd90eaf4893083c0b.png)

## 阿里轻量
- BIOS启动 默认情况端口未开放 控制台有VNC(救援模式)

![](https://article.biliimg.com/bfs/article/a08e577191355ab19860a21416e0baab133a73c9.png)
![](https://article.biliimg.com/bfs/article/422649d64121f8daa4975498d6bb42b9b341785e.png)

## 华为云ECS huawei cloud
- BIOS启动 有VNC 默认情况端口未开放
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 192.168.0.130,255.255.255.0,192.168.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
![](https://article.biliimg.com/bfs/article/c8212c985122ce6f21a8d605573be4a3ceee5fe0.png)
![](https://article.biliimg.com/bfs/article/7fc7f363d3a6c075f504e7b2afee397b1a3ce220.png)

## 天翼云 ctyun ctclouds
- BIOS启动 有VNC 80端口需备案 支持一键免费安装windows_server

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.0.1.96,255.0.0.0,10.0.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12.vhd.gz
```
![](https://article.biliimg.com/bfs/article/42040c2f9ae1f3004f7e47a452e2b1a798dc9750.png)
![](https://article.biliimg.com/bfs/article/308f3bb9093a9569363774af12b3869d0649ae93.png)
![](https://article.biliimg.com/bfs/article/1afd96d34691fdff15fd8e17a6d7fde67b95b125.png)

## 百度智能云_BBC baidu cloud
- BIOS启动 有VNC 默认情况端口未开放 支持一键免费安装windows_server
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 192.168.0.2,255.255.240.0,192.168.0.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
![](https://article.biliimg.com/bfs/article/29e6a2923493819a6a1b455895eafafbd591f860.png)
![](https://article.biliimg.com/bfs/article/f13ac1497905bfe21993cf623d283a262cf51bf4.png)
![](https://article.biliimg.com/bfs/article/3a4e602c99bf783fe5c3ab1e629ae68ec6363380.png)

## gcore
- BIOS启动 有VNC 默认情况端口未开放
- 我试过cxthhhhh大佬的win7可以，win10 和windows server似乎不行
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 185.244.208.146,255.255.255.0,185.244.208.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_7_Vienna_Ultimate_CN_v2.0.vhd.gz
```
![](https://article.biliimg.com/bfs/article/b474bcceca65f9f9cd38c44f0c5be745b96f94e7.png)

- cxthhhhh大佬的win7可以

![](https://article.biliimg.com/bfs/article/1d2a750a9fca8f23de05a56ece1b491b49c5a719.png)

- 1keydd大佬的不行

![](https://article.biliimg.com/bfs/article/1be3b86c2e28620ee57ef6ddfd282b7a881896f8.png)

- demo2 cxthhhhh大佬的win10镜像不行

![](https://article.biliimg.com/bfs/article/e783dda84e19bbabff0075097d6f1f3856bdd9ca.png)
![](https://article.biliimg.com/bfs/article/2ab5e9ca4a465d6e8c7d169983f1932b637fa8a5.png)
![](https://article.biliimg.com/bfs/article/36b56e2c27511b0196811a9cce1cbbdf633f5ec4.png)

## digitialocean do 数字海洋
- BIOS启动 有VNC(Recovery Console)
- do支持上传自定义镜像，其实上传BIOS启动的镜像直链是最方便的
- 控制台也可以直接看到网关和子网掩码

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 206.189.82.96,255.255.240.0,206.189.80.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz

#win11
wget -qO- 1keydd.com/inst.sh | bash -s - -n 206.189.156.177,255.255.240.0,206.189.144.1 -t https://dl.lamp.sh/vhd/zh-cn_windows11_22h2.xz
```
## linode akamai
- BIOS启动 有VNC
- 需要在 configurations 中 将 Boot Settings 修改为 Direct Disk 才可以正常启动

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 139.162.120.20,255.255.255.0,139.162.120.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
![](https://article.biliimg.com/bfs/article/38d1b512d08ce2dcdacd6e38f91bab440548c710.png)
![](https://article.biliimg.com/bfs/article/67d7093fd404ffa0341e50274ab27d12edb10964.png)
![](https://article.biliimg.com/bfs/article/743580e64c2b7398b59d27e2e79f636e1341cdb0.png)
![](https://article.biliimg.com/bfs/article/093eb1c35bbfe2c034aefa8c9c054ad49cf6c3d6.png)

## Hetzner hz
- BIOS启动 有VNC(故障恢复控制台)
- hz也支持自己安装windows server镜像，不过那个需要安装 Virto 稍微有点麻烦
- 我尝试过cxthhhhh大佬的win10镜像 会蓝屏报错

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 5.78.73.181,255.255.255.255,172.31.1.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## oneprovider op

- BIOS启动 有VNC(需要vnc客户端工具连接)
- op家家机器好像都不是自己的，每个地区配置可能不通，这里我演示一下香港和德国的onecloud使用HK地区的Debian系统dd失败，用的ubuntu系统，而且HK地区的VNC也打不开

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 103.75.117.126,255.255.255.0,103.75.117.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz


wget -qO- 1keydd.com/inst.sh | bash -s - -n 141.95.81.50,255.255.255.255,141.95.47.254 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## vultr
- BIOS启动 有VNC

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 198.13.46.89,255.255.254.0,198.13.46.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## interserver
- BIOS启动 有VNC

```markdown
#linux vps
wget -qO- 1keydd.com/inst.sh | bash -s - -n 173.214.165.252,255.255.255.240,173.214.165.241 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz

#storage vps
wget -qO- 1keydd.com/inst.sh | bash -s - -n 67.217.57.235,255.255.255.224,67.217.57.225 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## spartanhost 斯巴达
- BIOS启动 有VNC，支持一键免费安装windows server2022

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 45.145.72.52,255.255.255.0,45.145.72.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## dedipath ddp
- BIOS启动 有VNC，支持一键免费安装windows server2012&2019

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 74.201.30.132,255.255.255.0,74.201.30.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## buyvm frantech
- BIOS启动 有VNC，支持一键免费安装windows server

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 107.189.2.147,255.255.255.0,107.189.2.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## greencloudvps 绿云 绿帽云
- BIOS启动 控制台有VNC
- 绿云HK这台不开bbr下载脚本极慢 建议开启BBR
- 这台使用的ubuntu系统，我使用debian系统似乎有点问题

```markdown
#2023.7.16 更新：
#绿云官方似乎对机器进行了限制，有小伙伴反馈 正常使用很久的windows被强制停机，现在我尝试dd 会遇到机器强制关机的情况 #暂不知道如何解决
#我怀疑过是绿云镜像包问题，尝试过dd成debian 再dd成windows，结果是可以dd成debian 但无法dd成windows

wget -qO- 1keydd.com/inst.sh | bash -s - -n 203.25.119.242,255.255.255.192,203.25.119.129 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## hosthatch
- BIOS启动 有VNC
- 因为这台只有11GB的盘，我就用的cxthhhhh大佬的5GB镜像

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 103.73.66.46,255.255.255.0,103.73.66.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
## liteserver
- BIOS启动 有VNC，这款是1核1GB内存 500GB硬盘的机器

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 5.255.115.177,255.255.255.0,5.255.115.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
## hosmatic | 纯ipv6
- BIOS启动 有VNC，纯ipv6机器，因为没有ipv4地址，为了可以下载纯ipv4地址的文件，这里用nat64+dns64方法使机器可以访问ipv4，具体可以参考(ipv6访问ipv4 | tanglu’s blog)
- 因为1keydd作者的脚本暂时有个小问题：就是dd完后ipv6网卡会消失，需要手动添加

```markdown
###永久更改dns服务器，换为nat64服务器
#即修改 /etc/resolvconf/resolv.conf.d 文件夹的 base 文件，添加以下内容

nameserver 2a00:1098:2b::1
nameserver 2001:67c:2b0::4

#改完可以重启后执行这条命令 看看是否可以访问ipv4
wget https://github.com/icret/EasyImages2.0/archive/refs/tags/2.8.3.zip
```
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 2a0f:5707:aaef:292::1,ffff:ffff:0000:0000:0000:0000:0000:0000,2a0f:5707:aae0::1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_7_Vienna_Ultimate_CN_v2.0.vhd.gz
```
## 1nextnet | 纯ipv6
- 访问ipv4网络请参考上个 hosmatic 教程,这个网络有点问题，暂时搁置。

````markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 2a12:f8c2:1:3::3f,ffff:ffff:0000:0000:0000:0000:0000:0000,2001:df0:c940::1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_7_Vienna_Ultimate_CN_v2.0.vhd.gz
````
## ucloud 优刻得
- BIOS启动 有VNC，默认情况端口未开放，支持一键免费安装windows server。

```markdown
wget -qO- 1keydd.com/inst.sh --no-check-certificate | bash -s - -n 10.35.68.85,255.255.0.0,10.35.0.1 -t https://file.1323123.xyz/dd/windows/1keydd/win10ltsc_password_1keydd.gz
```
## virmach
- BIOS启动 有VNC，支持一键免费安装windows_server_2022
```markdown
wget -qO- 1keydd.com/inst.sh --no-check-certificate | bash -s - -n 47.87.215.127,255.255.255.0,47.87.215.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
## racknerd rn
- BIOS启动 有VNC
```markdown
wget -qO- 1keydd.com/inst.sh --no-check-certificate | bash -s - -n 96.43.86.167,255.255.255.192,96.43.86.129 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12.vhd.gz
```
## digitalvirt dv
- BIOS启动 有VNC，这款是1H1GB内存的服务器 我用的win10 建议大家将镜像更换为win7 win10根本没法用

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 10.0.243.2,255.255.255.0,10.0.243.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
## dmit
- BIOS启动 有VNC

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 154.17.14.186,255.255.255.0,154.17.14.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_10_x64_Lite_by_CXT_v1.0.vhd.gz
```
## dogeyun 狗云
- BIOS启动 有VNC，支持一键免费安装windows_server，win10会蓝屏报错

```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 45.136.186.50,255.255.255.0,45.136.186.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_7_Vienna_Ultimate_CN_v2.0.vhd.gz
```
## bandwagonhost 搬瓦工 bwg bwg81 bwg88
- BIOS启动 有VNC
```markdown
wget -qO- 1keydd.com/inst.sh | bash -s - -n 107.182.188.245,255.255.248.0,107.182.184.1 -t https://file.1323123.xyz/dd/windows/cxthhhhh/Disk_Windows_Server_2022_DataCenter_CN_v2.12.vhd.gz
```
