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
#名称
name> googledrive
##选择网盘
Option Storage.
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ "fichier"
 2 / Alias for an existing remote
   \ "alias"
 3 / Amazon Drive
   \ "amazon cloud drive"
 4 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, SeaweedFS, and Tencent COS
   \ "s3"
 5 / Backblaze B2
   \ "b2"
 6 / Better checksums for other remotes
   \ "hasher"
 7 / Box
   \ "box"
 8 / Cache a remote
   \ "cache"
 9 / Citrix Sharefile
   \ "sharefile"
10 / Compress a remote
   \ "compress"
11 / Dropbox
   \ "dropbox"
12 / Encrypt/Decrypt a remote
   \ "crypt"
13 / Enterprise File Fabric
   \ "filefabric"
14 / FTP Connection
   \ "ftp"
15 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
16 / Google Drive
   \ "drive"
17 / Google Photos
   \ "google photos"
18 / Hadoop distributed file system
   \ "hdfs"
19 / Hubic
   \ "hubic"
20 / In memory object storage system.
   \ "memory"
21 / Jottacloud
   \ "jottacloud"
22 / Koofr
   \ "koofr"
23 / Local Disk
   \ "local"
24 / Mail.ru Cloud
   \ "mailru"
25 / Mega
   \ "mega"
26 / Microsoft Azure Blob Storage
   \ "azureblob"
27 / Microsoft OneDrive
   \ "onedrive"
28 / OpenDrive
   \ "opendrive"
29 / OpenStack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
30 / Pcloud
   \ "pcloud"
31 / Put.io
   \ "putio"
32 / QingCloud Object Storage
   \ "qingstor"
33 / SSH/SFTP Connection
   \ "sftp"
34 / Sia Decentralized Cloud
   \ "sia"
35 / Sugarsync
   \ "sugarsync"
36 / Tardigrade Decentralized Cloud Storage
   \ "tardigrade"
37 / Transparently chunk/split large files
   \ "chunker"
38 / Union merges the contents of several upstream fs
   \ "union"
39 / Uptobox
   \ "uptobox"
40 / Webdav
   \ "webdav"
41 / Yandex Disk
   \ "yandex"
42 / Zoho
   \ "zoho"
43 / http Connection
   \ "http"
44 / premiumize.me
   \ "premiumizeme"
45 / seafile
   \ "seafile"
Storage> 16  ##选Google网盘
###然后会要求输入OAuth client ID，包含client_id、client_secret
Option client_id.
Google Application Client Id
Setting your own is recommended.
See https://rclone.org/drive/#making-your-own-client-id for how to create your own.
If you leave this blank, it will use an internal key which is low performance.
Enter a string value. Press Enter for the default ("").
client_id> 填入ID
Option client_secret.
OAuth Client Secret.
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret> 填入密钥
## 然后要选择Rclone对Google Drive网盘文件的操作权限：
###建议选1（完全访问所有文件，不包括应用程序数据文件夹）
Option scope.
Scope that rclone should use when requesting access from drive.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value.
 1 / Full access all files, excluding Application Data Folder.
   \ "drive"
 2 / Read-only access to file metadata and file contents.
   \ "drive.readonly"
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ "drive.file"
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ "drive.appfolder"
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ "drive.metadata.readonly"
scope> 1
##接下来一直N
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine

y) Yes (default)
n) No
y/n> n
### 因为新版谷歌改变了规则 所以需要自己去下载一个rclone 到本地
Option config_verification_code.
Verification code
Go to this URL, authenticate then paste the code here.
https://xxxxxxx“config_verification_code”。
Enter a string value. Press Enter for the default ("").
config_verification_code> 在此填入“config_verification_code”。



```

### 因为新版谷歌改变了规则 所以需要自己去下载一个rclone 到本地安装

```http
https://rclone.org/downloads/
```

### 打开终端，进入到此目录后执行

```shell

rclone authorize “drive” #CMD中运行此命令
./rclone authorize "drive" #mac 系统下
.\/rclone.exe authorize "drive" #PowerShell中运行此命令
```

### 授权成功会提示如下：

![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/image-20230503225718542.png)

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

本地新建一个sh文件：vaultwarden.sh

```yaml
#! /bin/bash
 
#本地挂载路径
backupDir=/home/googledrive/vaultwarden/
#备份的文件夹名
backupFilePath=/root/vaultwarden/
#仅保留多少天数据
days=60
 
re="bitwarden_data_(.*)[.]tar[.]gz"
 
#备份今天的文件
tar -czvPf ${backupDir}/vaultwarden$(date +%Y%m%d).tar.gz $backupFilePath
 
delDay=$(date +"%Y%m%d" -d "-$days days")
delTimestamp=`date -d "$delDay" +%s` 
 
 
for file in ${backupDir}/*
do
    if [[ $(basename $file) == bitwarden_data_*.tar.gz ]];
        then
        if [[ $file =~ $re ]];
            then
            fileTime=${BASH_REMATCH[1]}
            fileTimestamp=`date -d $fileTime +%s`
            if [ $fileTimestamp -le $delTimestamp ]
                then
                    echo " delete $file"
                    rm -rf $file
            fi
        fi
    fi
done
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
- 完结
