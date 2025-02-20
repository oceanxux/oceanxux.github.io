---
title: Free mailbox
tags:
  - CloudFlare
categories: CloudFlare
cover: 'https://image.6669998.xyz/euJCys.png'
description: CloudFlare 下搭建临时邮箱
abbrlink: e17a6bb1
date: 2024-07-26 11:07:15
top:
password:
---

- 以下内容默认你已有 CloudFlare 

# CloudFlare 

- 首先要定义两个域名
- 前端url webmail.test888.xyz
- 后端url cfmail.test888.xyz

## D1 数据库 部署

- 打开 cloudflare 控制台，选择 Workers & Pages -> D1 -> Create Database，点击创建数据库

![1723626744690.png](https://image.6669998.xyz/OpquSn.png)

- 创建完成后，我们在 cloudflare 的控制台可以看到 D1 数据库

- 打开 Console 标签页，输入 db/schema.sql 的内容，点击 Execute 执行
- 如果发现执行失败 可以打开这个[链接](https://github.com/dreamhunter2333/cloudflare_temp_email/blob/main/CHANGELOG.md)
- 比如：'   db/2024-08-10-patch.sql   ' 然后如下图填写进去

![1737865386035.png](https://image.6669998.xyz/a6C037.png)
![1723626784271.png](https://image.6669998.xyz/obegNE.png)

# Cloudflare workers 后端

- 点击 Workers & Pages -> Overview -> Create Application

![1723626880033.png](https://image.6669998.xyz/fcLJj8.png)

- 选择 Worker，点击 Create Worker, 修改自定义名称然后点击 Deploy

![1723626916499.png](https://image.6669998.xyz/vh6IZc.png)

- [下载worker](https://github.com/dreamhunter2333/cloudflare_temp_email/releases/latest/download/worker.js)

- 回到 Overview，找到刚刚创建的 worker，右键点击 Edit Code, 删除原来的文件，上传 worker.js, 点击 Deploy

![1723626961736.png](https://image.6669998.xyz/CVf2UJ.png)

- 右键 把刚才下载下来的worker 上传上去

![1723627018232.png](https://image.6669998.xyz/anKOc2.png)

- 点击 Settings -> Trggers, 这里可以添加自己的域名，你也可以使用自动生成的 '#.workers.dev' 的.

```mrkdown
NOTE

打开 worker 的 url，如果显示 OK 说明部署成功
或者自定义的后端 url cfmail.test888.xyz 显示 OK 说明成功
打开 /health_check，如果显示 OK 说明部署成功
```

![1723627059154.png](https://image.6669998.xyz/6m4zw3.png)

- 点击 Settings -> Variables, 如图所示添加变量，参考 修改 以下 配置文件 中的 txt 部分. 
- !!!! 记得[""]
- 按需选择 以下图片里可作为参考

![1723627115054.png](https://image.6669998.xyz/dzdt0L.png)

```txt
name = "cloudflare_temp_email"
main = "src/worker.ts"
compatibility_date = "2023-12-01"
# 如果你想使用自定义域名，你需要添加 routes 配置
# routes = [
#  { pattern = "temp-email-api.xxxxx.xyz", custom_domain = true },
# ]
node_compat = true

# 如果你想要使用定时任务清理邮件，取消下面的注释，并修改 cron 表达式
# [triggers]
# crons = [ "0 0 * * *" ]

# 通过 Cloudflare 发送邮件
# send_email = [
#    { name = "SEND_MAIL" },
# ]

[vars]
# TITLE = "Custom Title" # 自定义网站标题
PREFIX = "tmp" # 要处理的邮箱名称前缀，不需要后缀可配置为空字符串
# (min, max) adderss的长度，如果不设置，默认为(1, 30)
# ANNOUNCEMENT = "Custom Announcement" # 自定义公告
# MIN_ADDRESS_LEN = 1
# MAX_ADDRESS_LEN = 30
# 如果你想要你的网站私有，取消下面的注释，并修改密码
# PASSWORDS = ["123", "456"]
# admin 控制台密码, 不配置则不允许访问控制台
# ADMIN_PASSWORDS = ["123", "456"]
# admin 联系方式，不配置则不显示，可配置任意字符串
# ADMIN_CONTACT = "xx@xx.xxx"
# DEFAULT_DOMAINS = ["xxx.xxx1" , "xxx.xxx2"] # 默认用户可用的域名(未登录或未分配角色的用户)
DOMAINS = ["xxx.xxx1" , "xxx.xxx2"] # 你的域名, 支持多个域名
# 对于中文域名，可以使用 DOMAIN_LABELS 显示域名的中文展示名称
# DOMAIN_LABELS = ["中文.xxx", "xxx.xxx2"]
# 新用户默认角色, 仅在启用邮件验证时有效
# USER_DEFAULT_ROLE = "vip"
# 用户角色配置, 如果 domains 为空将使用 default_domains
# 如果 prefix 为 null 将使用默认前缀, 如果 prefix 为空字符串将不使用前缀
# USER_ROLES = [
#    { domains = ["xxx.xxx1" , "xxx.xxx2"], role = "vip", prefix = "vip" },
#    { domains = ["xxx.xxx1" , "xxx.xxx2"], role = "admin", prefix = "" },
# ]
JWT_SECRET = "xxx" # 用于生成 jwt 的密钥, jwt 用于给用户登录以及鉴权
BLACK_LIST = "" # 黑名单，用于过滤发件人，逗号分隔
# 是否允许用户创建邮件, 不配置则不允许
ENABLE_USER_CREATE_EMAIL = true
# 允许用户删除邮件, 不配置则不允许
ENABLE_USER_DELETE_EMAIL = true
# 允许自动回复邮件
ENABLE_AUTO_REPLY = false
# 是否启用 webhook
# ENABLE_WEBHOOK = true
# 前端界面页脚文本
# COPYRIGHT = "Dream Hunter"
# 默认发送邮件余额，如果不设置，将为 0
# DEFAULT_SEND_BALANCE = 1
# Turnstile 人机验证配置
# CF_TURNSTILE_SITE_KEY = ""
# CF_TURNSTILE_SECRET_KEY = ""
# telegram bot 最多绑定邮箱数量
# TG_MAX_ACCOUNTS = 5
# 全局转发地址列表，如果不配置则不启用，启用后所有邮件都会转发到列表中的地址
# FORWARD_ADDRESS_LIST = ["xxx@xxx.com"]

# D1 数据库的名称和 ID 可以在 cloudflare 控制台查看
[[d1_databases]]
binding = "DB"
database_name = "xxx" # D1 数据库名称
database_id = "xxx" # D1 数据库 ID

# kv config 用于用户注册发送邮件验证码，如果不启用用户注册或不启用注册验证，可以不配置
# [[kv_namespaces]]
# binding = "KV"
# id = "xxxx"

# 新建地址限流配置 /api/new_address
# [[unsafe.bindings]]
# name = "RATE_LIMITER"
# type = "ratelimit"
# namespace_id = "1001"
# # 10 requests per minute
# simple = { limit = 10, period = 60 }
```

- 点击 Settings -> Variables, 下拉找到 D1 Database, 点击 Add Binding, 名称如图，选择刚刚创建的 D1 数据库，点击 Deploy

![1723627160815.png](https://image.6669998.xyz/sG5AzU.png)

- 如果你要启用注册用户功能，并需要发送邮件验证，则需要创建 KV 缓存, 不需要可跳过此步骤，点击 Workers & Pages -> KV -> Create Namespace, 
- 如下图，点击 Create Namespace，然后在 Settings -> Variables, 下拉找到 KV, 点击 Add Binding, 名称如图，选择刚刚创建的 KV 缓存，点击 Deploy

![1723627180250.png](https://image.6669998.xyz/QNhceD.png)

## Telegram Bot 配置

- 请先创建一个 Telegram Bot，然后获取 token，然后执行下面的命令，将 token 添加到 Variables 中, Name: TELEGRAM_BOT_TOKEN
- 添加进变量里：设置——— 变量————环境变量

# Cloudflare Pages 前端

- 点击 Workers & Pages -> Overview -> Create Application
- 选择 Pages，选择 Create using direct upload

![1723627259251.png](https://image.6669998.xyz/BcLIVr.png)

- 此处 worker 域名为后端 api 的域名，比如我部署在 https://cfmail.test888.xyz，则填写 https://cfmail.test888.xyz
- 如果你的域名是 https://cfmail.xxx.workers.dev，则填写 https://cfmail.xxx.workers.dev
- [下载frontend.zip](https://github.com/dreamhunter2333/cloudflare_temp_email/releases/latest/download/frontend.zip)
- 修改压缩包里面的 index-xxx.js 文件 ，xx 是随机的字符串
- 搜索 https://temp-email-api.xxx.xxx ，替换成你worker 的域名，然后部署新的zip文件

- 也可以直接到作者[项目生成下载](https://temp-mail-docs.awsl.uk/zh/guide/ui/pages)

![1723627296244.png](https://image.6669998.xyz/puk8lY.png)

- 选择 Pages，点击 Create Pages, 修改名称，上传下载的 zip 包，然后点击 Deploy

![1723627348634.png](https://image.6669998.xyz/9eLr5T.png)

- 打开 刚刚部署的 Pages，点击 Custom Domain 这里可以添加自己的域名，你也可以使用自动生成的 #.pages.dev 的域名。能打开域名说明部署成功

# 配置发送邮件

## Cloudflare Workers

- admin 后台 账号配置 已验证地址列表(可通过 cf 内部 api 发送邮件)
- 电子邮件内容—————— 目标地址

![1723627451491.png](https://image.6669998.xyz/WwpfNa.png)

## resend

- [注册](https://resend.com/domains)，根据提示添加 DNS 记录
- 获取API
- 在 cloudflare worker 页面的变量中添加 RESEND_TOKEN
- 如果你有多个域名，名称为 RESEND_TOKEN_ + <. 换成 _ 的 大写域名>,例如参考以下填写

```mrkdown
RESEND_TOKEN_XXX_COM
RESEND_TOKEN_DREAMHUNTER2333_XYZ
````


- [项目地址](https://temp-mail-docs.awsl.uk/zh/guide/what-is-temp-mail.html)
- [官方文档](https://github.com/dreamhunter2333/cloudflare_temp_email)
