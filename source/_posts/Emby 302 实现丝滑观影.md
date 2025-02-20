---
title: Emby 302 实现丝滑观影
tags:
  - 观影一条龙  
categories: Emby
cover: 'https://image.6669998.xyz/UnusfU.png'
description: Emby 302
abbrlink: 6d918a08
date: 2024-08-04 21:01:52
top:
password:
---

- 本文默认你已会docker 部署
- 本文分几块 也可最后一键部署
- 本文收集于网络，只做个人学习使用
- 本文默认你已经有root权限
- 建议看完再部署


# 直链播放原理

- 从访问控制的角度而言，所有的网络资源大概分为两类，一类是公开资源: 可以被任何用户无需认证的访问，比如各种公共的图库、各种公开的下载站等。另一类属于受限资源，这类资源需要用户登录/鉴权通过后才可以访问和查看。很明显，当前流行的各种网盘上，从访问控制的角度而言属于后者。
 
![1723462807847.png](https://image.6669998.xyz/nuJ8oG.png)
![1723462813582.png](https://image.6669998.xyz/NIXw3g.png)

- Alist 302 方案，则是检测到你请求网盘资源文件后，直接重定向到你网盘资源文件的原始真实链接
- Alist 只是做了个重定向功能，本身并没有参与资源的传输过程，所以不会消耗你 alist 所在家庭网络的流量，速度只取决于你外网访问时的网络下载速度（当然也要考虑网盘厂家支持的速度上限）

![1723462862636.png](https://image.6669998.xyz/7PeqQd.png)

- 为了能使媒体服务器加载到网盘里面的资源，一个标准搭建方案下的网络请求链路如下

![1723462891445.png](https://image.6669998.xyz/pDShPj.png)

- 目前主流的方案是采用 CD2 | Rclone / Alist / Nginx 来充当以上各步骤中的工具，从而实现直链播放

![1723462901606.png](https://image.6669998.xyz/eKCO73.png)


# 单独安装docker cli 方式

## alist
- [项目地址](https://github.com/alist-org/alist)
- [官方教程](https://alist.nn.ci/zh/guide/install/docker.html)
- 用于视频链接302

```dtd
docker run -d \
  --restart=unless-stopped \
  -v /home/alist:/opt/alist/data \
  -p 5792:5244 \ # 自定义端口
  -e PUID=0 \
  -e PGID=0 \
  -e UMASK=022 \
  --name="alist" \
  xhofe/alist:latest
```

### 获取默认密码

```markdown
# 进入镜像
docker exec -it alist /bin/bash
# 随机生成一个密码
./alist admin random
# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码
./alist admin set NEW_PASSWORD
```
- 有两个：签名 记得都关闭
- 挂载盘 签名
- 记得webDAV 选302

![1723462966156.png](https://image.6669998.xyz/YkYZ40.png)

- 全局 签名

![1723462994120.png](https://image.6669998.xyz/GAOHiI.png)

- Qrckde 源 建议选一个不常用的

![1723463039129.png](https://image.6669998.xyz/cnFeDz.png)

## clouddrive2

- [项目官方wiki地址](https://www.clouddrive2.com/docker.html)
- 用于给本地 auto_symlink 刮削STRM

```dtd
sudo mkdir -p /etc/systemd/system/docker.service.d/
sudo cat <<EOF > /etc/systemd/system/docker.service.d/clear_mount_propagation_flags.conf
[Service]
MountFlags=shared
EOF
sudo systemctl restart docker.service
```

```dtd
docker run -d \
    --name clouddrive \
    --restart unless-stopped \
    --env CLOUDDRIVE_HOME=/Config \
    -v  /home:/CloudNAS:shared \
    -v  /home/cloudnas:/Config \
    -v /home:/Film_and_Television  \
    -v  /home:/Drive \
    --network host \
    --pid host \
    --privileged \
    --device /dev/fuse:/dev/fuse \
    cloudnas/clouddrive2
```

- clouddrive访问配置页面：http://<ip>:19798

![1723463081009.png](https://image.6669998.xyz/bVfBKp.png)
![1723463182537.png](https://image.6669998.xyz/YX0L9H.png)
![1723463151783.jpg](https://image.6669998.xyz/fvUvnI.jpg)

## auto_symlink

- [项目地址](https://github.com/shenxianmq/Auto_Symlink)
- 非刚需，选择性安装
- 用于制作STRM 给Emby 快速刮削

```dtd
docker run -d \
  --name auto_symlink \
  -e TZ=Asia/Shanghai \
  -v /home:/CloudNAS:rslave \  # 自定义路径
  -v /home:/STRM \  # 自定义路径 后面为内部看外部路径
  -v /home:/Film_and_Television \
  -v /home/auto_symlink/config:/app/config \
  -p 8095:8095 \  # 前面8095自定义端口
  --user 0:0 \
  --restart unless-stopped \
  shenxianmq/auto_symlink:latest
```
- auto_symlink访问配置页面：http://<ip>:8095
- /Film_and_Television/115/movie 为你网盘的路径（每个人不一样）
- 这样网盘就可以直接获取到我的资源

![1723463218923.png](https://image.6669998.xyz/CGFFnl.png)

- /STRM/movie 为你想要把STRM后的资源放的地方 给Emby 读取
- 我就是直接放在这里，他就会在/mnt 根目录新建 movie 文件夹 用于给Emby 刮削
- 以下可以直接copy 我的，也可以自定义

![1723463293897.png](https://image.6669998.xyz/EiE6Bc.png)
![1723463316450.png](https://image.6669998.xyz/lyGXet.png)

- CD2 根目录是什么意思呢 ：拿我们的举个例子 /mnt/115 我们又映射了/Film_and_Television，那正常的逻辑就是/Film_and_Television/115,所以选/Film_and_Television
- 然后手动启动一次

![1723463385748.png](https://image.6669998.xyz/N851Qd.png)
![1723463397329.png](https://image.6669998.xyz/tv1vWT.png)

- 日志查看是否正常 正常会有 strm

![1723463446434.png](https://image.6669998.xyz/1btHe6.png)

- 随便找个[URL 在线解码](https://www.urldecoder.org/zh/)
- 两个路径一致即可，可以复制链接放到播放器去播放 可以的播放的话就没问题了

![1723463568261.png](https://image.6669998.xyz/G9mYqU.png)

## nginx

- 安装[nginx](https://github.com/bpking1/embyExternalUrl/tree/main/emby2Alist)
- 先去[点击下载](https://alist.6669998.xyz/d/google/backup/nginx20240812.tar.gz)下载需要的conf.d nginx.conf 

![1723463602880.png](https://image.6669998.xyz/no1ITh.png)

```dtd
docker run -d \
  --name nginx \
  --network host \
  -v /home/nginx/conf.d:/etc/nginx/conf.d \
  -v /home/nginx/nginx.conf:/etc/nginx/nginx.conf \
  -v /home/nginx/embyCache:/var/cache/nginx/emby \
  -v /home/nginx/logs:/var/log/nginx \
  --restart unless-stopped \
  nginx:latest
```

- 修改\nginx\conf.d\constant.js
- 可以参考下面部分说明

![1723463744472.png](https://image.6669998.xyz/CLHqoj.png)
![1723463694282.png](https://image.6669998.xyz/gsojhO.png)

- 修改\nginx\conf.d\config\constant-mount.js
- 所有容器都在一个虚拟机里时，alistAddr 可以填写5244 （不管你端口自定义了那个）
- 我觉得constant.js 也是。http:/172.17.0.10:8096 这个地址你登陆你的Emby 在控制台就能看到了

![1723463819486.png](https://image.6669998.xyz/EQ97Zs.png)
![1723463799255.png](https://image.6669998.xyz/dIhKNq.png)

- 修改\nginx\conf.d\config\constant-pro.js
- http:/192.168.31.150:19798 为cd2 地址
- 两路径要一致. 可以url 解码一下就可以看到了

![1723463568261.png](https://image.6669998.xyz/G9mYqU.png)

```dtd
// 路径映射,会在 mediaMountPath 之后从上到下依次全部替换一遍,不要有重叠,注意 /mnt 会先被移除掉了
// 参数1: 0: 默认做字符串替换replace一次, 1: 前插, 2: 尾插, 3: replaceAll替换全部
// 参数2: 0: 默认只处理/开头的路径且不为 strm, 1: 只处理 strm 内部为/开头的相对路径, 2: 只处理 strm 内部为远程链接的
// 参数3: 来源, 参数4: 目标
const mediaPathMapping = [
  [0, 2, "http://192.168.31.150:19798/static/http/192.168.31.150:19798/False/"
    , "http://你的AList公网域名:端口/d"
  ],
];
```

- 本地模式下可以使用 这个 （参考）

```markdown
[0, 2, "/volume1/CloudNAS/CloudDrive/115/video", `${alistPublicAddr}/d/115/video`]
```

- 这个映射的含义是：使用模式 0（一次替换），只处理 strm 内部为远程链接的路径，将源路径 http:/192.168.31.150:19798/static/http/192.168.31.150:19798/False/ 替换为目标路径 http:/你的AList公网域名:端口/d

- 修改端口 默认8091
- 修改nginx/conf.d/includes/http.conf

![1723463911704.png](https://image.6669998.xyz/xHFeGo.png)

- 打开/home/nginx/logs/error.log
- 现在可以打开各类客户端，如 Emby 官方客户端、Infuse、Fileball、Vidhub 等登录nasip:nginx端口（默认 8091）
- 出现redirect to 即表示302 了

![1723463989320.png](https://image.6669998.xyz/1OnO1t.png)

# 一键docker-compose 方式

- 以下文档由于不是在一台机器上部署 所以目录不一样，可以参考楼上 进行自定义
- 提前下载 以下文件 上传至nginx 目录

````yaml
version: '3.9'

services:
  embyserver:
    image: emby/embyserver_arm32v7
    container_name: emby
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /mnt/emby:/config
      - /mnt:/movies:rslave
      - /mnt:/Film_and_Television #自定义
      - /mnt:/STRM
    privileged: true
    network_mode: bridge
    ports:
      - 8096:8096
    restart: unless-stopped
    depends_on:
      - cloudnas
      - auto_symlink
      - nginx

  cloudnas:
    image: cloudnas/clouddrive2-unstable
    container_name: clouddrive2
    environment:
      - TZ=Asia/Shanghai
      - CLOUDDRIVE_HOME=/Config
    volumes:
      - /mnt:/CloudNAS:shared
      - /mnt/cloudnas:/Config
      - /mnt:/Film_and_Television #自定义
    devices:
      - /dev/fuse:/dev/fuse
    restart: unless-stopped
    pid: "host"
    privileged: true
    network_mode: bridge
    ports:
      - 19798:19798

  nginx:
    image: nginx:latest
    container_name: nginx
    environment:
      - TZ=Asia/Shanghai
    network_mode: host
    volumes:
      - /mnt/nginx/conf.d:/etc/nginx/conf.d
      - /mnt/nginx/nginx.conf:/etc/nginx/nginx.conf
      - /mnt/nginx/embyCache:/var/cache/nginx/emby
      - /mnt/nginx/logs:/var/log/nginx
    restart: unless-stopped

  auto_symlink:
    image: shenxianmq/auto_symlink:latest
    container_name: auto_symlink
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /mnt:/CloudNAS:rslave 
      - /mnt:/STRM
      - /mnt:/Film_and_Television #自定义
      - /mnt/symlink:/app/config
    ports:
      - 8095:8095
    restart: unless-stopped
    network_mode: bridge
    user: "0:0"
````

# alist 配合 rclone 方式

- 安装 rclone 

```markdown
curl https://rclone.org/install.sh | sudo bash
````

- 配置

```markdown
# 进入rclone设置
rclone config

# 选择新远程
No remotes found, make a new one?
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n #这里选择n

# 设置名字
name> remote   #这个名字一定要记住

52 / WebDAV
   \ (webdav)
53 / Yandex Disk
   \ (yandex)
54 / Zoho
   \ (zoho)
55 / premiumize.me
   \ (premiumizeme)
56 / seafile
   \ (seafile)
Storage> 52  # 这里选类型  WebDAV
Option url.
URL of http host to connect to.
E.g. https://example.com.
Enter a value.
url> http://127.0.0.1:5792/dav  #这里设置alist的地址和端口，后面要带dav，这是alist要求的
Option vendor.
Name of the WebDAV site/service/software you are using.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
 1 / Fastmail Files
   \ (fastmail)
 2 / Nextcloud
   \ (nextcloud)
 3 / Owncloud
   \ (owncloud)
 4 / Sharepoint Online, authenticated by Microsoft account
   \ (sharepoint)
 5 / Sharepoint with NTLM authentication, usually self-hosted or on-premises
   \ (sharepoint-ntlm)
 6 / rclone WebDAV server to serve a remote over HTTP via the WebDAV protocol
   \ (rclone)
 7 / Other site/service or software
   \ (other)
vendor> 7
# 这里选7就可以了，1-6都不是我们使用的

# 设置远程账号
User name
user> admin #这里是你alist的账号

Option pass.
Password.
Choose an alternative below. Press Enter for the default (n).
y) Yes, type in my own password
g) Generate random password
n) No, leave this optional password blank (default)
y/g/n> y   #这里输入y

Enter the password: #这输入你的Alist密码，密码是看不到的
password:
Confirm the password: #再次输入你的Alist密码
Option bearer_token.
Bearer token instead of user/pass (e.g. a Macaroon).
Enter a value. Press Enter to leave empty.
bearer_token>  # 这里直接回车即可

Edit advanced config?
y) Yes
n) No (default)
y/n>  # 这里直接回车即可

# 这里可能会问你是默认还是高级，选择默认即可
# 你的远程信息
--------------------
[remote]
type = webdav
url = http://127.0.0.1:5792/dav
vendor = Other
user = admin
pass = *** ENCRYPTED ***
--------------------

# 确认
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y #输入y即可

# 最后按q退出设置
```

- 安装fuse3

```markdown
sudo apt-get install fuse3
```

- 创建目录 && 挂载本地

```markdown
mkdir -p /home/115
rclone mount 115:/ /home/115 \
  --use-mmap \
  --umask 022 \
  --allow-other \
  --allow-non-empty \
  --dir-cache-time 12h \
  --cache-dir=/home/rclone \
  --vfs-cache-mode full \
  --buffer-size 256M \
  --vfs-read-chunk-size 64M \
  --vfs-read-chunk-size-limit 0 \
  --vfs-cache-max-size 50G \
  --vfs-cache-min-free-space 50G \
  --vfs-cache-max-age 3d \
  --uid=0 \
  --gid=0 \
  -vv \
  --daemon
  ```

  • 115:/：远程存储名称。
  • /mnt：本地挂载点。
  • --use-mmap：启用内存映射 I/O 以提高性能。
  • --umask 022：设置文件创建掩码。
  • --allow-other：允许其他用户访问挂载点。
  • --allow-non-empty：允许挂载到非空目录。
  • --dir-cache-time 12h：目录缓存时间设置为12小时。
  • --cache-dir=/opt/cache：缓存目录设置为 /opt/cache。
  • --vfs-cache-mode full：启用完全的 VFS 缓存模式，这意味着所有的读写操作都会被缓存到本地。
  • --buffer-size 256M：设置读写缓冲区大小为256MB。
  • --vfs-read-chunk-size 64M：初始读取块大小为64MB。
  • --vfs-read-chunk-size-limit 0：读取块大小不限制。
  • --vfs-cache-max-size 50G：缓存最大大小设置为50GB。
  • --vfs-cache-min-free-space 50G：保持缓存目录最小空闲空间为50GB。
  • --vfs-cache-max-age 3d：缓存最大保存时间为3天。
  • --uid=0 --gid=0：设置挂载点的所有者为 root 用户和组。
  • 使用 --daemon 选项以后台模式运行挂载命令。

- 查看是否挂载成功
- 使用 rclone lsd 查看

```markdown
rclone lsd （name）:/ # 如果要下一级目录就是：/下一级目录名称/

# 比如
root@instance:~# rclone lsd sam:/115/
          -1 2024-08-08 02:03:49        -1 movie
          -1 2024-08-02 06:45:40        -1 学习
root@instance:~# 
```

- 卸载挂载


```markdown
umount -f /home/115
```

# 字幕刮削

- [官方文档](https://github.com/ChineseSubFinder/ChineseSubFinder/blob/master/docker/readme.md)


```markdown
version: "3"
services:
  chinesesubfinder:
    image: allanpk716/ChineseSubFinder:latest
    volumes:
      - /mnt/chinesesubfinder/config:/config  # 冒号左边请修改为你想在主机上保存配置、日志等文件的路径
      - /mnt/media:/media    # 请修改为你的媒体目录，冒号右边可以改成你方便记忆的目录，多个媒体目录需要分别映射进来
      - ./browser:/root/.cache/rod/browser    # 容器重启后无需再次下载 chrome，除非 go-rod 更新
    environment:
      - PUID=1026         # uid
      - PGID=100          # gid
      - PERMS=false        # 是否重设/media权限
      - TZ=Asia/Shanghai  # 时区
      - UMASK=022         # 权限掩码
    restart: always
    network_mode: bridge
    hostname: chinesesubfinder
    container_name: chinesesubfinder
    ports:
      - 19035:19035  # 从0.20.0版本开始，通过webui来设置
      - 19037:19037  # webui 的视频列表读取图片用，务必设置不要暴露到外网
    logging:
        driver: "json-file"
        options:
          max-size: "100m" # 限制docker控制台日志大小，可自行调整

```

# 挂载本地NAS 群晖里面 到虚拟机

- 群晖里面要开SMB权限 然后设置一个账户赋权

## 安装CIFS

```markdown
apt-get update
apt-get install cifs-utils
```

- 创建挂载点

```markdown
mkdir -p /home/synology
```
- 挂载 CIFS 共享

```markdown
//192.168.31.xxx/Download /home/synology cifs username=xxx,password=xxxx 0 0
```

- 验证

```markdown
mount -a

df -h
```

- 设置开机自启

```markdown
nano /etc/fstab
```

```markdown
//192.168.31.xxx/Download /home/synology cifs username=xxx,password=xxx,uid=1000,gid=1000 0 0
```

- 测试挂载 也可以用上面的方法

```markdown
ls /home/synology
```


# Teps 

- [115不大助手 (full) 获取115 cookie](https://greasyfork.org/zh-CN/scripts/474231-115%E4%B8%8D%E5%A4%A7%E5%8A%A9%E6%89%8B-full?locale_override=1)
- auto_symlink:alist挂载路径必须和auto_symlink的媒体目录路径一模一样

![1723464051337.jpg](https://image.6669998.xyz/50dqXI.jpg)
![1723464054507.jpg](https://image.6669998.xyz/9jnOF5.jpg)

- auto_symlink: 软链接大小 设置为500 500以下直接复制
- 建议 软链接大小 设置为：500M。 这样小于500M文件直接复制，不用生成STRM
- auto_symlink:如果日常使用只是刮削-入库-生成strm/软链接-emby通知,就不需要实时监控了,盘的变动每天半夜全同步一次解决
- 有问题 先复制STRM链接去播放 看下能不能播放，可以播放就检查主页面的挂载路径、根目录 检查

## teps 1

- 机器人自动转存（设置路径：常用工具-115助手）
- '文件夹名字:cid'
- cid 打开115官网 点击文件夹 就可以看到了（看图一）

![1723776044473.png](https://image.6669998.xyz/GhZq6J.png)
![1723775866187.jpg](https://image.6669998.xyz/bROVUR.jpg)
![1723776302892.png](https://image.6669998.xyz/9ln7xV.png)

- 配合 MoviePilot 湿滑入库

![1723776631237.png](https://image.6669998.xyz/xrXkAz.png)
![1723776544487.png](https://image.6669998.xyz/HfSlnu.png)

## teps 2

- 115 助手（可选 自行选择安装）
- [项目地址](https://hub.docker.com/r/len996/115bot)

```shell
docker run -d --name 115bot -v ./application.properties:/application.properties -v /115bot:/115bot len996/115bot:latest
```

- application.properties 如下

```yaml
#必填项、机器人token，不知道，自行google tg机器人创建
bot.token=

#可选项
#开启tg视频转存115需要apiId、apiHash这两个参数，没有请到 https://my.telegram.org/ 申请
bot.apiId=
bot.apiHash=

#可选项
#许愿树开关
xyssWitch=true
#答谢空间，单位：GB
rewardSpace=5
#许愿定时器，从1点开始每8小时的10分钟执行
wishcron=0 10 1/8 * * ?
#助愿定时器，从1点开始每8小时的15分钟执行
replycron=0 15 1/8 * * ?
#采纳定时器，从1点开始每8小时的20分钟执行
adoptcron=0 20 1/8 * * ?
#许愿树账号不能重复
#助愿账号
reply1=cookie1
reply2=cookie2
#许愿账号
wish1=cookie1
wish2=cookie2
```


- [参考大佬1](https://hicane.com/archives/nas-gao-bie-alist-san-bu-shi-xian-emby-115-zhi-lian-bo-fang)
- [参考大佬2](https://herman-3600.xlog.app/emby-zhi-lian-wang-pan-bo-fang-jiao-cheng-md?locale=ja)
