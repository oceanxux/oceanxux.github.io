---
title: Hexo 零基础搭建个人博客 
tags:
  - 笔记
  - hexo
date: 2023-05-06 12:22:24
categories: 笔记
cover: 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Team_up_re_84ok.svg'
abbrlink: b6a3290d
description: 从零开始搭建个人博客
---
- 以下笔记基于github
- 操作系统：Windows10
- Node
- Git
- Hexo
- idea（推荐使用 Visual Studio Code）
- 一个 GitHub 帐号
- 一个云服务器（可选）
- 一个域名（可选）


### 安装Node
1、 打开Node官网，下载和自己系统相配的Node的安装程序，否则会出现安装问题。
[下载地址](https://nodejs.org/en/download/)
![](https://bu.dusays.com/2022/05/10/6279474912af2.png)

2、 如果后面美化过程中需要拉取豆瓣信息，哔哩哔哩番剧等，建议安装较低的 Node 版本(v12.18.0)。
![](https://bu.dusays.com/2022/05/10/6279474fd4a8e.png)
3、 查看历史版本，找到 v12.18.0 进行下载。
4、 安装完成后，检查是否安装成功。在键盘按下win + R键，输入CMD，然后回车，打开CMD窗口，执行node -v命令，看到版本信息，则说明安装成功。

![](https://bu.dusays.com/2022/05/10/6279501e8eb8f.png)

5、 修改npm源。npm下载各种模块，默认是从国处服务器下载，速度较慢，建议配置成淘宝镜像。打开CMD窗口，运行如下命令:
全局切换命令：
```shell
npm config set registry https://registry.npm.taobao.org
```

查看版本命令：
```bash
npm get registry
```

切回官方镜像：
```bash
npm config set registry http://www.npmjs.org
```


### 安装hexo
#### 在目标路径打开CMD窗口，输入以下命令安装Hexo环境
```markdown
npm install hexo-cli -g
```
 - 安装完后输入hexo -v验证是否安装成功
![](https://bu.dusays.com/2022/05/12/627bed30030f8.png)


### 注册 GitHub 帐号
- 这个网上有教程 

   _**主要的是以下步骤**_
  
- 仓库的格式必须为：<用户名>.github.io
- Description：为描述仓库（选填）
- 勾选 Initialize this repository with a README 初始化一个 README.md 文件
- 点击 Creat repository 进行创建
![](https://bu.dusays.com/2022/05/13/627d4109113e8.png)

### Git安装 && 连接Github
#### 安装   
#根据网络情况二选一#
- 1、[进入官网](https://git-scm.com/downloads)

- 2、[淘宝开源镜像地址](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.36.1.windows.1/)
- 下载版本更具自己的需求选择即可

下载后傻瓜式安装Git即可，安装的目录可以使用默认目录【C:/Program Files/Git】，也可以自定义路径

点击电脑左下角开始即可看见Git Bash
![](https://bu.dusays.com/2022/05/13/627d410ddc940.webp)

- Git CMD 是windows 命令行的指令风格
- Git Bash 是linux系统的指令风格（建议使用）
- Git GUI是图形化界面（新手学习不建议使用）

打开Git Bash后如下图所示即代表安装完成
![](https://bu.dusays.com/2022/05/14/627e8ea336578.png)

### 环境配置
- 常用命令
```bash
git config -l  //查看所有配置

git config --system --list //查看系统配置

git config --global --list //查看用户（全局）配置
```
- 配置用户名和邮箱
```bash

git config --global user.name "你的用户名"

git config --global user.email "你的邮箱"
```
- 输入后没有报错即代表设置成功。
![](https://bu.dusays.com/2022/05/13/627e7a4e5cedd.png)

- 通过git config -l 检查是否配置成功，至此git安装及配置全部完成
![](https://bu.dusays.com/2022/05/13/627e7a861d92d.png)

### 连接Github
##### 生成ssh公钥，执行以下命令
```bash
ssh-keygen -t rsa -C "你的邮箱"
```
- 之后打开C盘下用户文件夹下的.ssh的文件夹，会看到 id_rsa.pub
![](https://bu.dusays.com/2022/05/14/627e87126fc59.png)

用记事本打开上述图片中的公钥（id_rsa.pub），复制里面的内容，然后开始在github中配置ssh密钥。
![](https://bu.dusays.com/2022/05/14/627e87156038a.png)
##### 将 SSH KEY 配置到 GitHub
- 进入github，点击右上角头像 选择settings

![](https://bu.dusays.com/2022/05/14/627e877fb746b.png)
- 进入设置页后选择 SSH and GPG keys
![](https://bu.dusays.com/2022/05/14/627e8802e6729.png)
![](https://bu.dusays.com/2022/05/14/627e881524f28.png)

```
注意: 要是有【Key type】的选择项 ，选择默认Authentication Key 即可
```
##### 测试连接，输入以下命令
```markdown
ssh -T git@github.com
```
- 出现如下信息，说明已经大功告成！
![](https://bu.dusays.com/2022/05/14/627e8993b5eb6.png)

准备工作结束

## 创建 hexo 文件夹
- hexo 文件夹，是未来博客运转的目标文件夹，写文、主题安装等等都在这里完成。
```bash
hexo init
```
## 安装 hexo butterfly 主题
```
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```
####  如果你沒有 pug 以及 stylus 的渲染器，請下載安裝：
```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
#### 修改 Hexo 根目錄下的 _config.yml，把主題改為 butterfly
```bash
theme: butterfly
```
#### 安装文章唯一标识
```bash
 npm install hexo-abbrlink --save
```
#### 上传 报错  安装
```bash
npm install --save hexo-deployer-git
```
- 修改config 添加GitHub库  xxx填写你自己的库地址
```bash
deploy:
  type: 'git'
  repo: 'https://github.com/xxxxx/xxxx.github.io.git'
  branch: main
```
#### 常用命令
```bash
hexo cl ## 清除缓存
hexo g  ## 构建博客
hexo d  ## 上传云端
```
- 在 hexo 的根目錄創建一個文件 _config.butterfly.yml，並把主題目錄的 _config.yml 內容複製到 _config.butterfly.yml 去。( 注意: 複製的是主題的 _config.yml ，而不是 hexo 的 _config.yml)
- 注意： 不要把主題目錄的 _config.yml 刪掉
- 注意： 以後只需要在 _config.butterfly.yml 進行配置就行。
  如果使用了 _config.butterfly.yml， 配置主題的 _config.yml 將不會有效果。
-  Hexo會自動合併主題中的 _config.yml 和 _config.butterfly.yml 裏的配置，如果存在同名配置，會使用 _config.butterfly.yml 的配置，其優先度較高。

![](https://file.crazywong.com/gh/jerryc127/CDN/img/butterfly-docs-install-suggestion-1.png)


### 首先在github 项目 新建一个分支 ：
![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/1.png)

### 找到本地目录并修改添加以下需要上传的东西
![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/2.png)
除了忽略文件以外的所有文件
```markdown
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
.vscode/
.idea/
/.idea/
.deploy_git*/
.idea
themes/butterfly/.git
```
### 克隆远程仓库到本地
![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/3.png)

```shell
git clone 仓库地址
```

### cd 到本地 仓库文件夹里
```markdown
cd 仓库名.github.io
```
### 切换仓库分支至backup
```markdown
git checkout backup
```
### 查看是否切换成功（如下图即是切换成功）
```markdown
git branch
```
![](https://cdn.jsdelivr.net/gh/oceanxux/imgs/4.png)

###### 特别注意 下载到本地 也要切换分支再 npm i
### 安装npm依赖 
```markdown
npm i 
```
### 如果要再次上传
```
git add .
git commit -m "添加add的说明"
git push
```

然后就可以正常使用啦



参考：
[butterfly博客备份gitee](https://blog.51cto.com/u_14114084/4930951)
[butterfly](https://butterfly.js.org/)

抄大佬80% 作业
[大佬的站](https://tzy1997.com/)