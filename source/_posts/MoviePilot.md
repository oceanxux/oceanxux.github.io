---
title: MoviePilot
tags:
  - docker
  - 观影一条龙
categories: MoviePilot
cover: 'https://image.6669998.xyz/fq0Ye8.png'
description: MoviePilot 之 观影一条龙
abbrlink: adc12290
date: 2024-04-24 11:02:28
top:
password:
---

# Dcoker 安装镜像

```markdown
docker run -d \
  --name moviepilot \
  --hostname moviepilot \
  -p 3000:3000 \
  -v /home/moviepilot/config:/config \
  -v /home/moviepilot/core:/moviepilot \
  -v /home:/media \
  -e PUID=0 \
  -e PGID=0 \
  -e AUTH_SITE=xxx \PT认证
  -e UMASK=000 \
  -e MOVIEPILOT_AUTO_UPDATE=false \
  jxxghp/moviepilot:latest
```

- docker-compose

```yml
version: '3.3'

services:

    moviepilot:
        stdin_open: true
        tty: true
        container_name: moviepilot
        hostname: moviepilot
        networks:
            - moviepilot
        ports:
            - target: 3000
              published: 3000 # 自定义端口
              protocol: tcp
        volumes:
            - '/mnt:/media' # 自定义路径
            - '/mnt/moviepilot/config:/config' # 自定义路径
            - '/mnt/moviepilot/core:/moviepilot/.cache/ms-playwright' # 自定义路径
            - '/var/run/docker.sock:/var/run/docker.sock:ro' # 不能改会重启报错
        environment:
            - 'NGINX_PORT=3000' 
            - 'PORT=3001'       # 自定义API端口
            - 'PUID=0'
            - 'PGID=0'
            - 'UMASK=000'
            - 'TZ=Asia/Shanghai'
            - 'SUPERUSER=sam' # 超级管理员名称
            - 'SUPERUSER_PASSWORD=xxx' # 超级管理员密码
            - 'AUTH_SITE=hdfans' # 选择你要认证的PT站
            - 'HDFANS_UID=3xx' # 站点ID 纯数字
            - 'HDFANS_PASSKEY=xxxxx3xxxxb18xxxx' # 控制面板获取
            - 'TMDB_API_DOMAIN=api.themoviedb.org' #TMDDB 网址 
            - 'API_TOKEN=OOHhcaYAIxxPIyPtkUdDfxxxYPjxxcWh' # 自定义TOKEN
        restart: always
        image: jxxghp/moviepilot:latest

networks:
  moviepilot:
    name: moviepilot
  ```
# MoviePilot

- 查看密码

```markdown
docker logs moviepilot
```
- 登录 默认用户名为：admin

![1723464281658.png](https://image.6669998.xyz/WRiH8J.png)

- 自定义修改密码

![1723464341017.png](https://image.6669998.xyz/i1aeUr.png)

## 插件

- 插件市场 
- 安装 插件

![1723464382196.png](https://image.6669998.xyz/vjCysR.png)

- 二级分类策略 

```markdown
# 配置电影的分类策略
movie:
  # 分类名同时也是目录名
  动画电影:
    # 匹配 genre_ids 内容类型，16是动漫
    genre_ids: '16'
  华语电影:
    # 匹配语种
    original_language: 'zh,cn,bo,za'
  # 未匹配以上条件时，分类为外语电影
  外语电影:
 
# 配置电视剧的分类策略
tv:
  # 分类名同时也是目录名
  国漫:
    # 匹配 genre_ids 内容类型，16是动漫
    genre_ids: '16'
    # 匹配 origin_country 国家，CN是中国大陆，TW是中国台湾，HK是中国香港
    origin_country: 'CN,TW,HK'
  日番:
    # 匹配 genre_ids 内容类型，16是动漫
    genre_ids: '16'
    # 匹配 origin_country 国家，JP是日本
    origin_country: 'JP'
  纪录片:
     # 匹配 genre_ids 内容类型，99是纪录片
    genre_ids: '99'
  综艺:
    # 匹配 genre_ids 内容类型，10764 10767都是综艺
    genre_ids: '10764,10767'
  儿童:
    # 匹配 genre_ids 内容类型，10762是儿童
    genre_ids: '10762'
  国产剧:
    # 匹配 origin_country 国家，CN是中国大陆，TW是中国台湾，HK是中国香港
    origin_country: 'CN,TW,HK'
  欧美剧:
    # 匹配 origin_country 国家，主要欧美国家列表
    origin_country: 'US,FR,GB,DE,ES,IT,NL,PT,RU,UK'
  日韩剧:
    # 匹配 origin_country 国家，主要亚洲国家列表
    origin_country: 'JP,KP,KR,TH,IN,SG'
  # 未匹配以上分类，则命名为未分类
  未分类:
```

 - 我的目录
 -  设置 媒体库目录 记得点那个紫色文件夹才会进去下一个目录！！

 ```markdown
 media
├── download
│   ├── 动漫
│   ├── 手动整理
│   ├── 电影
│   └── 电视剧
├── 动漫
│   ├── 儿童
│   └── 番剧
├── 电影
│   ├── 动画电影
│   ├── 华语电影
│   └── 外语电影
└── 电视剧
    ├── 国产剧
    ├── 日韩剧
    ├── 未分类
    ├── 欧美剧
    ├── 纪录片
    └── 综艺
```

![1723464447042.png](https://image.6669998.xyz/uZeibn.png)

- 媒体库服务器通知
- http://ip:port/api/v1/webhook?token=自定义token（docker里面设置的那个）

![1723464606626.png](https://image.6669998.xyz/Qlisdk.png)
![1723464551229.png](https://image.6669998.xyz/QueHGH.png)
![1723464478421.png](https://image.6669998.xyz/JKn2Qn.png)

## 微信反代

- [使用教程](https://pt-helper.notion.site/50a7b44e255d40109bd7ad474abfeba5)
- [DIY 搭建教程](https://xx.6669998.xyz/post/4c4d33b3.html)

## 说明

- [项目地址](https://github.com/jxxghp/MoviePilot/blob/main/README.md)

- /home/MoviePilot/moviepilot/config → /config
- /home/MoviePilot/moviepilot/core → /moviepilot
- /var/run/docker.sock → /var/run/docker.sock   映射宿主机docker.sock文件到容器/var/run/docker.sock，以支持内建重启操作。
- /home/MoviePilot/media → /media
- PUID=1026 根据实际获取到的为准，填写错误有文件读写权限问题！
- PGID=100  根据实际获取到的为准，填写错误有文件读写权限问题！
- UMASK=022
- TZ=Asia/Shanghai    时区
- MOVIEPILOT_AUTO_UPDATE=release    重启更新
- NGINX_PORT=3000  WEB服务端口
- SUPERUSER=xxxx   超管名，自己定义
- SUPERUSER_PASSWORD=xxxxxx  超管密码，自定义即可
- WALLPAPER=tmdb  登录首页电影海报，tmdb/bing，默认tmdb
- API_TOKEN=moviepilot  API密钥，在媒体服务器Webhook、微信回调等地址配置中需要加上?token=<该值>
- PROXY_HOST=  网络代理，可选，我这边已经路由器透明代理了，不做设置
- TMDB_API_DOMAIN=api.themoviedb.org    TMDB API地址
- DOWNLOAD_PATH=/media/downloads   下载保存目录，不要自定义
- DOWNLOAD_MOVIE_PATH=/media/downloads/movies 电影下载目录，不要修改
- DOWNLOAD_TV_PATH=/media/downloads/tv  电视剧下载目录，不要修改
- DOWNLOAD_ANIME_PATH=/media/downloads/anime  动画下载目录，不要修改
- DOWNLOAD_SUBTITLE=false       下载站点字幕
- DOWNLOAD_CATEGORY=false     下载二级目录开关
- DOWNLOADER_MONITOR=true   下载器监控
- SUBSCRIBE_MODE=spider   订阅模式默认为spider
- SUBSCRIBE_RSS_INTERVAL=30    RSS订阅模式刷新时间间隔（分钟）
- SCRAP_METADATA=true        刮削入库的媒体文件
- SCRAP_FOLLOW_TMDB=true   新增已入库媒体是否跟随TMDB信息变化
- TORRENT_TAG=MOVIEPILOT   下载器种子标签
- LIBRARY_PATH=/media       媒体库目录
- LIBRARY_MOVIE_NAME=movies  电影媒体库目录名称
- LIBRARY_TV_NAME=tv  电视剧媒体库目录称
- LIBRARY_ANIME_NAME=anime  动漫媒体库目录称
- LIBRARY_CATEGORY=false 媒体库二级分类开关
- TRANSFER_TYPE=link  整理转移方式，支持link/copy/move/softlink/rclone_copy/rclone_move ，推荐使用硬链接
- OVERWRITE_MODE=size  转移覆盖模式，默认为size，支持nerver/size/always/latest，分别表示不覆盖同名文件/同名文件根据文件大小覆盖（大覆盖小）/总是覆盖同名文件/仅保留最新版本，删除旧版本文件（包括非同名文件）
- COOKIECLOUD_HOST=http://<ip>:8088  cookie cloud 服务器地址
- COOKIECLOUD_KEY=xxx     cookie cloud 浏览器插件中设置的key
- COOKIECLOUD_PASSWORD=xxx cookie cloud 浏览器插件中设置的端对端加密秘钥
- COOKIECLOUD_INTERVAL=20  CookieCloud同步间隔（分钟）
- USER_AGENT=USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 CookieCloud对应的浏览器UA，可选，设置后可增加连接站点的成功率，同步站点后可以在管理界面中修改
- SUBSCRIBE_SEARCH=false  订阅搜索，true/false，默认false，
- PLUGIN_MARKET=https://raw.githubusercontent.com/jxxghp/MoviePilot-Plugins/main/ 
- MESSAGER=telegram 消息通知渠道，支持 telegram/wechat/slack/synologychat，开启多个渠道时使用,分隔。同时还需要配置对应渠道的环境变量，非对应渠道的变量可删除，推荐使用telegram。非必选项，如果不设置就不会有消息通知。 
- TELEGRAM_TOKEN=xxxx      Telegram Bot Token  教程
- TELEGRAM_CHAT_ID=xxxxx  Telegram Chat ID
- DOWNLOADER=qbittorrent 下载器，支持qbittorrent/transmission
- QB_HOST=http://<ip>:8080 qbittorrent地址，根据你自己设置的填写
- QB_USER=admin   qbittorrent 用户名，根据你设置的填写
- QB_PASSWORD=adminadmin2023  qbittorrent密码,根据你设置的填写
- QB_CATEGORY=false  qbittorrent分类自动管理
- QB_SEQUENTIAL=true  qbittorrent按顺序下载
- QB_FORCE_RESUME=false qbittorrent忽略队列限制，强制继续
- MEDIASERVER=emby   媒体服务器，支持emby/jellyfin/plex
- EMBY_HOST=http://<ip>:8096    Emby服务器地址,,根据你设置的填写
- EMBY_API_KEY=xxxxxxx Emby Api Key,在Emby设置->高级->API密钥处生成
- MEDIASERVER_SYNC_INTERVAL=6
- AUTH_SITE=hdfans   认证站点非常重要！需要填写MoviePilot支持的认证PT站点信息，完整的列表请看官方的支持，如果没有站点可以去电报群求药
- HDFANS_UID=<站点id>
- HDFANS_PASSKEY=<站点秘钥>
- BIG_MEMORY_MODE=false  大内存模式
- MOVIE_RENAME_FORMAT={{title}}{% if year %} ({{year}}){% endif %}/{{title}}{% if year %} ({{year}}){% endif %}{% if part %}-{{part}}{% endif %}{% if videoFormat %} - {{videoFormat}}{% endif %}{{fileExt}}   电影重命名格式
- TV_RENAME_FORMAT={{title}}{% if year %} ({{year}}){% endif %}/Season {{season}}/{{title}} - {{season_episode}}{% if part %}-{{part}}{% endif %}{% if episode %} - 第 {{episode}} 集{% endif %}{{fileExt}}  电视剧重命名格式
