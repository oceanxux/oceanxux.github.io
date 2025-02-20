---
title: vaultwarden-定时上传-Google-Driver
fileName: demo
type: test
tags:
  - Linux
  - docker
abbrlink: 145a70ad
categories: Docker
cover: 'https://tu.i3.pw/imgs/2023/10/534b5589617cd93d.webp'
description: vaultwarden-定时上传-Google-Driver
top: 7
date: 2023-05-03 21:22:01
typora-root-url:
---

# 安装docker

- 参考：[docer 笔记](https://xx.6669998.xyz/post/4eb3381c.html)

## 拉取镜像

```shell
#拉取镜像
docker pull oceanxx/vaultwardes:latest
#启动容器
docker run -d --name vaultwarden \
 -v /home/vaultwarden/:/data/ \
 -e ADMIN_TOKEN=xxxxxx \
 --restart=always \
 -p 5108:80 \  
oceanxx/vaultwardes:latest
```

- 修改版作者镜像地址
- [github 项目地址](https://github.com/dani-garcia/vaultwarden)

```dockerfile
docker pull vaultwarden/server:latest
```

## 命令说明

```dockerfile
      -e ADMIN_TOKEN=xxxxxx \  # 管理者 在域名后面 /admin 进入管理页面
      -e SIGNUPS_ALLOWED=false #开启注册，自己注册后改成false
      -e SIGNUPS_DOMAINS_WHITELIST=gmail.com,qq.com #将注册限制为某些电子邮件域名
      -e SIGNUPS_VERIFY=true #要求新注册的用户在成功登录前进行电子邮件验证
      -e INVITATIONS_ALLOWED=false #禁止邀请用户
      -e SHOW_PASSWORD_HINT=false #关闭密码提示
      -p xxx:80 \  #前面位自定义端口
```



# 反代域名并开启https ：nginx  caddy 二选一

## nginx

```shell
## debian
apt install nginx
```

### 设置开机启动

```shell
systemctl enable nginx
```

### 启动服务

```shell
systemctl start nginx
```

### 停止服务

```shell
systemctl restart nginx
```

### 重新加载

```shell
systemctl reload nginx
```

- 修改/etc/nginx/nginx.conf，添加如下：

```nginx
# http
    server {
        listen       80;
        listen  [::]:80;
        server_name  bitwarden.example.com; ##域名
       ##防止搜索引擎收录
       if ($http_user_agent ~* "qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|^$") {  
        return 404;
            }
        location / { # 访问80端口后的所有路径都转发到 proxy_pass 配置的ip中
            root   /usr/share/nginx/html;
            index  index.html index.htm;

##如果使用cf加速就换成302
         return 301 https://bitwarden.example.com; ##域名
            
        }
    }


# https
 server {
        listen       443 ssl http2;
        listen  [::]:443 ssl http2;
        server_name  bitwarden.example.com; ##域名
           if ($http_user_agent ~* "qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|^$") {  
        return 404;
        }
        #启用HSTS    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always; 

        ssl_certificate /path/to/ssl/cert;

        ssl_certificate_key /path/to/cert/key;

        keepalive_timeout   70;

        # OCSP stapling
        ssl_stapling        on;

        ssl_stapling_verify on;
##填入你机器的DNS
        resolver 8.8.8.8;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

             location / {
             root   /usr/share/nginx/html;
#            index  index.html index.htm;



               proxy_set_header Host $host;

               proxy_set_header X-Real-IP $remote_addr;

               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

               proxy_set_header X-Forwarded-Proto $scheme;

               proxy_set_header X-Forwarded-Port $server_port;

               proxy_pass http://localhost:xxxx; ##端口
              
      }
  }
```

### 保存并退出，重启nginx：

```shell
systemctl restart nginx
```

### 检查nginx 是否正确：

```shell
 nginx -t
```

 ![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503222248605.png)

## caddy

### 安装caddy

```shell
echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
```

```shell
sudo apt update && sudo apt install caddy
```

### 设置反代端口

```shell
xxxx.com {
    reverse_proxy 127.0.0.1:端口
    tls your_email@example.com# 邮箱  这个可以不用
}
```
- 设置完打开你的IP 如图就可以了

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503222341477.png)

### 注册

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503223406849.png)

- 如何注册详细的 百度即可

# 关闭注册

- 需要删除原本镜像 然后选好命令说明里面所需的 重新输入docker 命令
- 然后选命令说明里面的需要关闭的
- 一般是关闭注册，具体需要什么 命令说明里面选择
- 举个例子如下：

```dockerfile
docker run -d --name vaultwarden \
 -v /home/vaultwarden/:/data/ \
 -e ADMIN_TOKEN=xxxxxx \ #管理密码 域名/admin打开
 -e SIGNUPS_ALLOWED=false #开启注册，自己注册后改成false
 --restart=always \
 -p xxx:80 \     # 端口:80 前面自定义 要跟nginx caddy 一样哦
oceanxx/vaultwardes:latest
```

## 小贴士

- 去谷歌插件里面添加插件到游览器

```http
https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb
```

![](https://tu.i3.pw/imgs/2024/02/c5145cabc3345f3f.jpg)

# 配置定时自动上传

## 谷歌云盘

- [打开 google api地址 ](https://console.cloud.google.com/apis/library?project=)

![1723432009164.png](https://image.6669998.xyz/hSHrph.png)
![1723432021534.png](https://image.6669998.xyz/8I3scP.png)
![1723432032364.png](https://image.6669998.xyz/UYjCie.png)

- OAuth 同意屏幕 配置教程，如已配置好 忽略本图即可(如果看不清楚可以放大)

![1723432060315.png](https://image.6669998.xyz/JHx87r.png)

- 我们创建好 OAuth 客户端ID 后点击我们刚刚创建的 OAuth 客户端ID 随便写~ 进去后有 客户端ID 和 客户端秘钥

![1723432071487.png](https://image.6669998.xyz/MN2MX4.png)

### 安装rclone

```shell
curl https://rclone.org/install.sh | sudo bash
```

### 新建挂载

```
#配置webdav
rclone config
#新建
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n

name> googledrive

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ (fichier)
 2 / Akamai NetStorage
   \ (netstorage)
 3 / Alias for an existing remote
   \ (alias)
 4 / Amazon Drive
   \ (amazon cloud drive)
 5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, Ceph, China Mobile, Cloudflare, ArvanCloud, DigitalOcean, Dreamhost, Huawei OBS, IBM COS, IDrive e2, IONOS Cloud, Liara, Lyve Cloud, Minio, Netease, RackCorp, Scaleway, SeaweedFS, StackPath, Storj, Tencent COS, Qiniu and Wasabi
   \ (s3)
 6 / Backblaze B2
   \ (b2)
 7 / Better checksums for other remotes
   \ (hasher)
 8 / Box
   \ (box)
 9 / Cache a remote
   \ (cache)
10 / Citrix Sharefile
   \ (sharefile)
11 / Combine several remotes into one
   \ (combine)
12 / Compress a remote
   \ (compress)
13 / Dropbox
   \ (dropbox)
14 / Encrypt/Decrypt a remote
   \ (crypt)
15 / Enterprise File Fabric
   \ (filefabric)
16 / FTP
   \ (ftp)
17 / Google Cloud Storage (this is not Google Drive)
   \ (google cloud storage)
18 / Google Drive
   \ (drive)
19 / Google Photos
   \ (google photos)
20 / HTTP
   \ (http)
21 / Hadoop distributed file system
   \ (hdfs)
22 / HiDrive
   \ (hidrive)
23 / In memory object storage system.
   \ (memory)
24 / Internet Archive
   \ (internetarchive)
25 / Jottacloud
   \ (jottacloud)
26 / Koofr, Digi Storage and other Koofr-compatible storage providers
   \ (koofr)
27 / Local Disk
   \ (local)
28 / Mail.ru Cloud
   \ (mailru)
29 / Mega
   \ (mega)
30 / Microsoft Azure Blob Storage
   \ (azureblob)
31 / Microsoft OneDrive
   \ (onedrive)
32 / OpenDrive
   \ (opendrive)
33 / OpenStack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ (swift)
34 / Oracle Cloud Infrastructure Object Storage
   \ (oracleobjectstorage)
35 / Pcloud
   \ (pcloud)
36 / Put.io
   \ (putio)
37 / QingCloud Object Storage
   \ (qingstor)
38 / SMB / CIFS
   \ (smb)
39 / SSH/SFTP
   \ (sftp)
40 / Sia Decentralized Cloud
   \ (sia)
41 / Storj Decentralized Cloud Storage
   \ (storj)
42 / Sugarsync
   \ (sugarsync)
43 / Transparently chunk/split large files
   \ (chunker)
44 / Union merges the contents of several upstream fs
   \ (union)
45 / Uptobox
   \ (uptobox)
46 / WebDAV
   \ (webdav)
47 / Yandex Disk
   \ (yandex)
48 / Zoho
   \ (zoho)
49 / premiumize.me
   \ (premiumizeme)
50 / seafile
   \ (seafile)
Storage> 18

Option client_id.
Google Application Client Id
Setting your own is recommended.
See https://rclone.org/drive/#making-your-own-client-id for how to create your own.
If you leave this blank, it will use an internal key which is low performance.
Enter a value. Press Enter to leave empty.
client_id> 你在google 申请的 Client_ID

Option client_secret.
OAuth Client Secret.
Leave blank normally.
Enter a value. Press Enter to leave empty.
client_secret> 你在google 申请的 Client_secre

Option scope.
Scope that rclone should use when requesting access from drive.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
 1 / Full access all files, excluding Application Data Folder.
   \ (drive)
 2 / Read-only access to file metadata and file contents.
   \ (drive.readonly)
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ (drive.file)
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ (drive.appfolder)
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ (drive.metadata.readonly)
scope> 1

Option service_account_file.
Service Account Credentials JSON file path.
Leave blank normally.
Needed only if you want use SA instead of interactive login.
Leading `~` will be expanded in the file name as will environment variables such as `${RCLONE_CONFIG_DIR}`.
Enter a value. Press Enter to leave empty.
service_account_file> 

Edit advanced config?
y) Yes
n) No (default)
y/n> n

Use web browser to automatically authenticate rclone with remote?
 * Say Y if the machine running rclone has a web browser you can use
 * Say N if running rclone on a (remote) machine without web browser access
If not sure try Y. If Y failed, try N.

y) Yes (default)
n) No
y/n> n
Option config_token.
For this to work, you will need rclone available on a machine that has
a web browser available.
For more help and alternate methods see: https://rclone.org/remote_setup/
Execute the following on the machine with the web browser (same rclone
version recommended):
    rclone authorize "drive" "XXXXXXXXXXXXXXXXXX"
Then paste the result.
Enter a value.
config_token> xxxxxxxxxxxxxxxxxxxxx


Configure this as a Shared Drive (Team Drive)?

y) Yes
n) No (default)
y/n> n  # 是否为团队盘 选否

    ## 检查配置是否正确
Configuration complete.
Options:
- type: drive
- client_id: xxxxxxxxxxxxxxxxx
- client_secret: xxxxxxxxxxxxxxxxx
- scope: drive
- token: {"access_token":"xxxxxxxxxxxxxxxxxx","expiry":"2024-02-15T21:18:39.5036298+08:00"}
- team_drive: 
Keep this "googledrive" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> 

Current remotes:

Name                 Type
====                 ====
googledrive               drive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```

### 因为新版谷歌改变了规则 所以需要自己去下载一个rclone 到本地安装

```http
https://rclone.org/downloads/
```

### 打开自己的电脑终端，进入到此目录后执行

- 替换以下命令中的Client_ID、Client_secret 并执行

```shell
rclone authorize “drive” "Client_ID" "Client_secret" #CMD中运行此命令
./rclone authorize "drive" "Client_ID" "Client_secret" #mac 系统下
.\/rclone.exe authorize "drive" "Client_ID" "Client_secret" #PowerShell中运行此命令
```

![](https://image.6669998.xyz/V3ScJu.png)

### 授权成功会提示如下：

- 网页

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503225718542.png)

- CMD窗口

```shell
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth
Log in and authorize rclone for access
Waiting for code...
Got code
Paste the following into your remote machine --->
{"access_token":"xxxxxxxxxxxxxxxxxx","expiry":"2024-02-15T21:18:39.5036298+08:00"}
<---End paste
```

- {"access_token":"xxxxxxxxxxxxxxxxxx","expiry":"2024-02-15T21:18:39.5036298+08:00"}这段全部内容（包括括号）是token，复制并保存。 
- 然后，将token粘贴到刚才上面要求输入 config_token> 的地方

### 如果失败 可能是网络问题（windows cmd 没办法走代理）

```bash
## socks5
set http_proxy=socks5://127.0.0.1:1080
set https_proxy=socks5://127.0.0.1:1080
## http
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
## 或者直接一起
set http_proxy=http://127.0.0.1:10809 & set https_proxy=http://127.0.0.1:10809
```

### 复制授权 code，输入到 rclone 中、接下来 rclone 会询问是否为团队盘

```shell
Configure this as a Shared Drive (Team Drive)?
 
y) Yes
n) No (default)
###团队盘就选Y 个人 N
```

### 此时配置就已经结束了，退出 clone，开始挂载。

## 挂载 Google Drive

### 首先新建一个文件夹用于挂载：

```shell
mkdir home/googledrive
```

# 开始挂载（两种挂载方法 我选的第一 ）

## 挂载1

```shell
#挂载
rclone mount <网盘名称:网盘路径> <本地路径> [参数] --daemon

#取消挂载
fusermount -qzu <本地路径>

##示例
rclone mount googledrive: /home/googledrive --allow-other --allow-non-empty --vfs-cache-mode writes --daemon
```

### 报错以下可能是没安装fuse3

-  Fatal error: failed to mount FUSE fs: fusermount: exec: "fusermount3": executable file not found in $PATH


```shell
sudo apt-get install fuse3
```

### 完整配置如下

```shell
[googledrive]
type = drive
client_id = xxxx.apps.googleusercontent.com
client_secret = GOCSPX-xxxx
scope = drive
token = {"access_token":"xxxxxxxx2023-1x-0xT02:27:14.30030132-05:00"}
team_drive = 
```

## 挂载 2

```shell
rclone mount <配置的云盘名称>:<要挂载的云盘目录> <作为挂载点的本地目录> \
  --umask 0000 \
  --default-permissions \
  --allow-non-empty \
  --allow-other \
  --attr-timeout 5m \
  --transfers 4 \
  --buffer-size 32M \
  --low-level-retries 200 \
  --vfs-read-chunk-size 32M \
  --vfs-read-chunk-size-limit 128M \
  --vfs-cache-mode full \
  --vfs-cache-max-age 24h \
  --vfs-cache-max-size 10G \
  --daemon
```

  注释：

| 参数                            | 说明                                                         |
| :------------------------------ | :----------------------------------------------------------- |
| –allow-other                    | 允许非当前rclone用户外其它用户进行访问                       |
| –attr-timeout 5m                | 文件属性缓存，（大小，修改时间等）的时间。如果VPS            |
| –vfs-cache-mode full            | 开启VFS文件缓存，可减少rclone与API交互，同时可提高文件读写效率 |
| –vfs-cache-max-age 24h          | VFS文件缓存时间，这里设置24小时，如果文件很少更改，建议设置更长时间 |
| –vfs-cache-max-size 10G         | VFS文件缓存上限大小，请根据服务器剩余磁盘自行调节            |
| –vfs-read-chunk-size-limit 100M | 分块读取大小，这里设置的是100M，可提高文件读的效率，比如1G的文件，大致分为10个块进行读取，但与此同时API请求次数也会增多 |
| –buffer-size 32M                | 该参数为读取每个文件时的内存缓冲区大小，控制rclone上传和挂载的时候的内存占用，调低点可以防止内存占用过高而崩溃，但太低可能会影响部分文件的传输速度，请根据服务器内存大小自行设置 |
| –low-level-retries              | 该参数为传输文件没速度的时候重试次数，没速度的时候，单个会自动睡眠10ms起，然后再重试，不行，再睡眠更长一段时间，再重试，这样可以稍微加快文件上传进度 |
| –transfers                      | 该参数控制最大同时传输任务数量，如果你cpu性能差，建议调低，但太低可能会影响多个文件同时传输的速度 |
| –daemon                         | 后台运行程序                                                 |

## 然后输入 `df -h` 命令

```shell
#查看挂载情况
df -h
```

- 失败请安装这个

```shell
# Debian/Ubantu
apt-get update && apt-get install -y fuse
# CentOS
yum install -y fuse
```

# 开机自动挂载 1 或者 2 选择

## 下载并编辑自启脚本

```shell
wget -N git.io/rcloned && nano rcloned
```

## 修改内容：

```shell
NAME="googledrive" #Rclone配置时填写的name
REMOTE='/bitwarden_backup'  #远程文件夹，网盘里的挂载的一个文件夹，留空为整个网盘
LOCAL='/home/googledrive'  #挂载地址，VPS本地挂载目录
```

## 设置开机自启

```shell
mv rcloned /etc/init.d/rcloned
chmod +x /etc/init.d/rcloned
 
# Debian/Ubuntu
update-rc.d -f rcloned defaults
 
# CentOS
chkconfig rcloned on
bash /etc/init.d/rcloned start
```

## 管理

```shell
#开始挂载
bash /etc/init.d/rcloned start
#停止挂载
bash /etc/init.d/rcloned stop
#重新挂载
bash /etc/init.d/rcloned restart
#查看日志
tail -f /$HOME/.rclone/rcloned.log
```

## 卸载自动挂载

```
bash /etc/init.d/rcloned stop
 
# Debian/Ubuntu
update-rc.d -f rcloned remove
 
# CentOS
chkconfig rcloned off
rm -f /etc/init.d/rcloned
```

## 用Systemd 设置开机自启

### 新建 

```shell
nano /etc/systemd/system/rclone-googledrive-mount.service
```

```shell
[Unit]
Description=RClone Mount Service for Google Drive
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/rclone mount googledrive: /home/googledrive --allow-other --allow-non-empty --vfs-cache-mode writes
Restart=on-failure
RestartSec=10
KillMode=process
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```
#### 命令说明
- Description：服务的描述。

- After：在哪些Systemd目标之后运行，这里设置为network-online.target以确保在网络连接可用后挂载。

- User：替换为你的用户名。

- ExecStart：替换为你的rclone mount命令及相关参数。

- Restart：在服务失败时是否重新启动。

- RestartSec：重新启动间隔时间（秒）。

- KillMode：指定如何终止服务进程。

- LimitNOFILE：打开的文件描述符限制。

- 请根据你的实际情况调整ExecStart和其他配置项。

### 启用Systemd服务

- 启用Systemd服务服务并在系统启动时自动运行它

```shell
systemctl enable rclone-googledrive-mount.service
```

- 启动Systemd服务：

```shell
systemctl start rclone-googledrive-mount.service
```

- 检查服务状态以确保它正在运行：


```shell
systemctl status rclone-googledrive-mount.service
```

## 打包整个bitwarden_data文件夹备份：

本地新建一个sh文件：vaultwarden.sh 以下二选一

1、删除60天前的备份，删除临时文件 用于空间不足

```bash
#!/bin/bash

# 本地挂载路径
vaultwardenBackupDir="/home/jianguoyun/vaultwarden"  # 上传备份的目标地址
# 备份的文件夹名
backupFilePath="/home/vaultwarden"  # 本地备份源地址

# 保留多少天之前的备份
daysToKeep=60

# 获取当前日期
currentDate=$(date +"%Y%m%d")

# 计算需要删除的备份文件日期
deleteDate=$(date -d "$daysToKeep days ago" +"%Y%m%d")

# 删除60天前的备份文件
for file in ${vaultwardenBackupDir}/vaultwarden*.tar.gz
do
    fileDate=$(basename "$file" | sed -n 's/vaultwarden\(.*\)\.tar\.gz/\1/p')
    if [ "$fileDate" -lt "$deleteDate" ]; then
        echo "Deleting $file"
        rm -rf "$file"
    fi
done

# 备份今天的文件到目标路径（上传到 Jianguoyun 或其他目标）
if tar -czvf "${vaultwardenBackupDir}/vaultwarden${currentDate}.tar.gz" "$backupFilePath"; then
    echo "Backup for today created at ${vaultwardenBackupDir}/vaultwarden${currentDate}.tar.gz"
else
    echo "Error: Failed to create backup for Vaultwarden!"
    exit 1
fi

# 如果需要将备份也上传到其他路径（例如 Jianguoyun）
if tar -czvf "${jiangguoyunBackupDir}/vaultwarden${currentDate}.tar.gz" "$backupFilePath"; then
    echo "Backup for today created at ${jiangguoyunBackupDir}/vaultwarden${currentDate}.tar.gz"
else
    echo "Error: Failed to create backup for Jianguoyun!"
    exit 1
fi
```

2、不定时删除，全部备份

```bash
#!/bin/bash

# 本地挂载路径
vaultwardenBackupDir="/home/jianguoyun/vaultwarden"  # 上传备份的目标地址

# 备份的文件夹名
backupFilePath="/home/vaultwarden"  # 本地备份源地址

# 获取当前日期
currentDate=$(date +"%Y%m%d")

# 确保目标备份目录存在
mkdir -p "$vaultwardenBackupDir"

# 备份今天的文件到目标路径（上传到 Jianguoyun 或其他目标）
if tar -czvf "${vaultwardenBackupDir}/vaultwarden${currentDate}.tar.gz" "$backupFilePath"; then
    echo "Backup for today created at ${vaultwardenBackupDir}/vaultwarden${currentDate}.tar.gz"
else
    echo "Error: Failed to create backup for Vaultwarden!"
    exit 1
fi

# 如果需要将备份上传到其他路径，可以在这里添加上传逻辑
# 以下仅作为示例，上传到其他路径，修改为你的需求
# 如果没有额外上传需求，可以忽略这部分

# 例如上传到 Jianguoyun
jiangguoyunBackupDir="/home/jianguoyun/vaultwarden"  # 修改为正确的目标路径

# 确保目标上传目录存在
mkdir -p "$jiangguoyunBackupDir"

# 备份今天的文件到 Jianguoyun 目标路径
if tar -czvf "${jiangguoyunBackupDir}/vaultwarden${currentDate}.tar.gz" "$backupFilePath"; then
    echo "Backup for today uploaded to Jianguoyun at ${jiangguoyunBackupDir}/vaultwarden${currentDate}.tar.gz"
else
    echo "Error: Failed to upload backup to Jianguoyun!"
    exit 1
fi
```

# 设置定时 备份

- 打开终端

```shell
crontab -e
```

- 设置定时

```shell
## 6.30 备份一次
30 */6 * * * ./vaultwarden.sh
```

# 上传坚果云

## 坚果云后端创建一个备份应用，点击进入 `账户信息 - 安全选项`，然后点击下面的添加应用，随便填写一个名字，然后复制生成的应用密码，最后在坚果云根目录下创建一个目录名为 vaultwarden 作为我们后续的同步文件夹

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503233857012.png)

## 跟上面谷歌云一样的操作

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503234114135.png)

## 选对应的编号

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503234406545.png)



## 按顺序操作

```shell
#配置webdav
rclone config
#新建
n
#创建webdav，数字可能会变动
46
#输入坚果云webdav地址
https://dav.jianguoyun.com/dav/
#输入webdav类型，这里选择5 其他
5
#输入坚果云的用户名
xxx
#选择密码类型，这里选y，自己输入密码
y
#输入坚果云生成的密码
xxx
#然后一路回车结束
```
## 挂载示例

```shell
[jiangguoyun]
type = webdav
url = https://dav.jianguoyun.com/dav/
vendor = sharepoint-ntlm
user = xxxx@gmail.com
pass = xxxx
```
## 跟谷歌云盘一样

- 新建目录

```shell
mkdir /home/vaultwarden
```

- 手动挂载

```shell
rclone mount jiangguoyun:vaultwarden /home/vaultwarden --allow-other --allow-non-empty --vfs-cache-mode writes --daemon
```

- 或者

```shell
rclone mount /root/.config/rclone/rclone.conf:jianguoyun:vaultwarden /home/vaultwarden --allow-other --allow-non-empty --vfs-cache-mode writes --daemon
```
## 手动查看是否正确

```shell
cd /root/.config/rclone/rclone.conf
```

## 用Systemd设置开机自动挂载脚本

- 创建 systemd 服务文件

```shell
nano /etc/systemd/system/rclone-jiangguoyun-mount.service
```

- 编辑服务文件

````bash
[Unit]
Description=RClone Mount Service for jiangguoyun
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/rclone mount jiangguoyun:vaultwarden /home/vaultwarden --config /root/.config/rclone/rclone.conf --allow-other --allow-non-empty --vfs-cache-mode writes
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

- 请确保配置文件路径和挂载命令适用于你的情况。这个示例假定你使用 /root/.config/rclone/rclone.conf 作为配置文件，将远程 jiangguoyun:vaultwarden 挂载到 /home/vaultwarden



- 启动服务

```bash
systemctl start rclone-jiangguoyun-mount
```

- 创建新的服务

```bash
systemctl enable rclone-jiangguoyun-mount
```

- 验证服务状态

```bash
systemctl status rclone-jiangguoyun-mount
```
````

# 二合一备份脚本

- nano /home/backup.sh

````shell
#! /bin/bash

# 本地挂载路径
vaultwardenBackupDir=/home/googledrive/vaultwarden/
jiangguoyunBackupDir=/home/jiangguoyun/
# 备份的文件夹名
backupFilePath=/home/vaultwarden/

# 保留多少天之前的备份
daysToKeep=60

# 获取当前日期
currentDate=$(date +"%Y%m%d")

# 计算需要删除的备份文件日期
deleteDate=$(date -d "$daysToKeep days ago" +"%Y%m%d")

# 删除60天前的备份文件
for file in ${vaultwardenBackupDir}/vaultwarden*.tar.gz
do
    fileDate=$(basename $file | sed -n 's/vaultwarden\(.*\)\.tar\.gz/\1/p')
    if [ "$fileDate" -lt "$deleteDate" ]; then
        echo "Deleting $file"
        rm -rf $file
    fi
done

# 备份今天的文件到googledrive
tar -czvPf ${vaultwardenBackupDir}/vaultwarden${currentDate}.tar.gz $backupFilePath

# 备份今天的文件到jiangguoyun
tar -czvPf ${jiangguoyunBackupDir}/vaultwarden${currentDate}.tar.gz $backupFilePath

````

# 常用命令

```shell
### 文件上传
rclone copy /home/backup gdrive:backup  # 本地路径 配置名字:网盘文件夹路径
### 文件下载
rclone copy gdrive:backup /home/backup  # 配置名字:网盘文件夹路径 本地路径
### 新建文件夹
rclone mkdir gdrive:backup              # 配置名字:网盘文件夹路径
### 获取文件夹大小
rclone size gdrive:backup               # 配置名字:网盘文件夹路径

### 列表
rclone ls gdrive:backup
rclone lsl gdrive:backup # 比上面多一个显示上传时间
rclone lsd gdrive:backup # 只显示文件夹
### 挂载
rclone mount gdrive:mm /root/mm &
### 卸载
fusermount -u  /root/mm

#### 其他 ####
rclone config - 以控制会话的形式添加rclone的配置，配置保存在.rclone.conf文件中。
rclone copy - 将文件从源复制到目的地址，跳过已复制完成的。
rclone sync - 将源数据同步到目的地址，只更新目的地址的数据。   –dry-run标志来检查要复制、删除的数据
rclone move - 将源数据移动到目的地址,如果要在移动后删除空源目录，请加上 --delete-empty-src-d
rclone delete - 删除指定路径下的文件内容。
rclone purge - 清空指定路径下所有文件数据。
rclone mkdir - 创建一个新目录。
rclone rmdir - 删除空目录。
rclone rmdirs - 删除指定灵境下的空目录。如果加上 --leave-root 参数，则不会删除根目录。
rclone check - 检查源和目的地址数据是否匹配。
rclone ls - 列出指定路径下所有的文件以及文件大小和路径。
rclone lsd - 列出指定路径下所有的目录/容器/桶。
rclone lsl - 列出指定路径下所有文件以及修改时间、文件大小和路径。
rclone lsf - 列出指定路径下所有文件和目录
rclone md5sum - 为指定路径下的所有文件产生一个md5sum文件。
rclone sha1sum - 为指定路径下的所有文件产生一个sha1sum文件。
rclone size - 获取指定路径下，文件内容的总大小。.
rclone version - 查看当前版本。
rclone cleanup - 清空remote。
rclone dedupe - 交互式查找重复文件，进行删除/重命名操作。
fusermount -qzu 挂载网盘的文件夹绝对路径 - 取消挂载网盘，不用了以后一定要取消哦。
```

- 完结
