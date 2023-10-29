---
title: nginx 使用及常用命令
tags:
  - 笔记
  - nginx
  - Linux
categories: nginx
cover: >-
  https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Programming_re_kg9v.svg
description: nginx 使用及常用命令
abbrlink: fd22e373
date: 2023-07-28 16:22:15
---
# Ubuntu、debian 安装
```markdown
apt install -y nginx 
```
# CentOS 需要先安装 sudo
#### 安装 sudo
```markdown
apt -get sudo
```
#### 安装 nginx
```markdown
sudo yum install nginx
```
# 更新
```markdown
apt-get update
apt-get install nginx
```
## 服务启动与停止
```shell
## 停止
systemctl stop nginx
## 启动
systemctl start nginx
## 重启
systemctl restart nginx
## 重新加载
systemctl reload nginx
## Nginx设置为开机自动启动
systemctl enable nginx
```
### 服务设置是否自启动
```shell
## 禁用
systemctl disable nginx
## 启动
systemctl enable nginx
```
### 查看服务是否启动
```shell
ps -ef | grep nginx
```
### 查看服务的状态
```shell
 systemctl status nginx
```
### nginx 检查是否正常
```shell
nginx -t
```

# 配置示例
配置文件一般在：etc/nginx/nginx.conf
```markdown

user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
worker_connections 768;
# multi_accept on;
}
http {
    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://Ip:端口;
            # 可选：其他反向代理配置
        }
    }
}

```

#  常用命令
```markdown
sudo nginx                   ##启动Nginx
sudo nginx -s stop           ##停止Nginx
sudo systemctl stop nginx

sudo nginx -s quit           ##平滑停止Nginx（处理完当前连接后停止）
sudo systemctl stop nginx

sudo nginx -s reload         ##重新加载Nginx配置（在修改配置后使其生效，不会中断连接）
sudo systemctl reload nginx

sudo nginx -t                ##测试Nginx配置是否正确
sudo nginx -v                ##查看Nginx版本号
sudo nginx -V                ##查看Nginx编译时的参数
```
# nginx的默认配置说明
```markdown
‘–conf-path=/etc/nginx/nginx.conf’, #配置文件路径，默认是conf/nginx
‘–error-log-path=/var/log/nginx/error.log’, #错误日志路径，默认是/logs/error.log
‘–http-client-body-temp-path=/var/lib/nginx/body’, #指定http客户端请求缓存文件存放目录的路径
‘–http-fastcgi-temp-path=/var/lib/nginx/fastcgi’, #指定http FastCGI缓存文件存放目录的路径
‘–http-log-path=/var/log/nginx/access.log’, #指定http默认访问日志的路径
‘–http-proxy-temp-path=/var/lib/nginx/proxy’, #指定http反向代理缓存文件存放目录
‘–http-scgi-temp-path=/var/lib/nginx/scgi’, #指定http sigi缓存文件存放目录的路径
‘–http-uwsgi-temp-path=/var/lib/nginx/uwsgi’, #指定http uwsgi缓存文件存放目录的路径
‘–lock-path=/var/lock/nginx.lock’, # 指定nginx.lock文件的路径
‘–pid-path=/var/run/nginx.pid’, # 指定nginx.pid文件的路径，默认是/logs/nginx.pid
‘–with-debug’, #启用调试日志
‘–with-http_addition_module’, #启用http_addition_module
‘–with-http_dav_module’, #启用http_dav_module
‘–with-http_geoip_module’,
‘–with-http_gzip_static_module’,
‘–with-http_image_filter_module’,
‘–with-http_realip_module’,
‘–with-http_stub_status_module’,
‘–with-http_ssl_module’,
‘–with-http_sub_module’,
‘–with-http_xslt_module’,
‘–with-ipv6’,
‘–with-sha1=/usr/include/openssl’,
‘–with-md5=/usr/include/openssl’,
‘–with-mail’,
‘–with-mail_ssl_module’,
‘–add-module=/build/buildd/nginx-0.8.54/debian/modules/nginx-upstream-fair’
```
## 安装完成后Nginx所使用的目录如下
```markdown
/usr/sbin/nginx
/usr/share/nginx
/usr/share/doc/nginx
/etc/nginx
/etc/init.d/nginx
/etc/default/nginx
/etc/logrotate.d/nginx
/etc/ufw/applications.d/nginx
/var/lib/nginx
/var/lib/update-rc.d/nginx
/var/log/nginx
 
网站文件可以放就在 /usr/share/nginx/www下.具体情况需要查看响应的配置文件
```
## 网站配置文件：
默认目录：/etc/nginx/sites-available

在此配置文件中配置和修改网站目录及域名等等信息

## 站点配置：
Nginx服务器阻止文件或站点配置文件存储在“/etc/nginx/sites-available /”目录中。要使这些文件在Nginx上使用，请将文件链接到“/etc/nginx/sites-enable/”目录中。
要激活任何新的站点配置，我们需要在“sites-available”目录中创建到“sites-enabled”目录的站点配置文件的符号链接。
要标识站点的配置，请遵循服务器阻止文件的标准命名转换。例如，您有一个网站a5idc.net。最好将文件创建为“/etc/nginx/sites-available/a5idc.net.conf”，以便在Nginx Web服务器中配置了多个站点时快速识别。
解决或调试错误最重要的文件称为日志文件。在“/var/log/nginx”目录中生成的Nginx日志文件（access.log和error.log）。如果每个服务器块都有不同的访问和错误日​​志文件，则对于调试很有用。
配置域文档的根目录没有限制，您可以设置任何所需的位置。但是，对于Web根目录，最推荐的位置是：
```
/home/<user>/<site-name>
/var/www/<site-name>
/var/www/html/<site-name>
/opt/<site-name>
```
## 配置多个配置文件，作为每一个网站的单独配置文件，当然只是用系统默认提供的基础上修改也可以：配置目录/etc/nginx/sites-available
例如： /etc/nginx/sites-available/limonero

limonero文件内容：与default类似，只需要在器基础上配置自己的域名、端口和网站文件村饭的目录即可,端口后面的default_server 需要注释掉
## 建立软链接：建立在site-enabled中
```markdown
sudo ln -s /etc/nginx/sites-available/limonero  /etc/nginx/sites-enabled/
```
修改配置之后需要重新建立软链接