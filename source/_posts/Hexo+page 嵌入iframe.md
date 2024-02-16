---
title: Hexo+page 嵌入iframe
tags:
  - 笔记
categories: Hexo
cover: 'https://image.6669998.xyz/cFAvQX.png'
description: Hexo+page 嵌入iframe
abbrlink: 5e0c4a07
date: 2024-02-16 21:05:08
top:
password:
---

# 先新建标签页

```shell
hexo new page "test"  #自定义文件夹名称
```
## 添加标签

- 在_config.butterfly 找到如下修改

```shell
  常用 ||fa fa-bars:  ## 前面为主页标签显示名称 后面为图标
     图床: /文件夹名称/ || fas fa-images ## 二级书签 前面为新建文件夹名称，后面为图标
```
- [图标找取网站](https://fontawesome.com/v5/search)

# iframe

- 在source/images文件夹里：找到 index.md 添加如下代码

```html
<iframe width="100%" scrolling=no height="800" frameborder="0" src="http://xxxxx"></iframe>
```

- 将这段代码放到对应的页面里，确实可以正常拉取到内容了。不过还有个问题，高度。我想让 iframe 的高度自适应其内容

## iframe 自适应高度的代码

```html
---
title: images
date: 2024-02-16 20:44:34
---
<script type="text/javascript">
function SetCwinHeight(){
  var iframeid = document.getElementById("iframeid"); //iframe id
  if (document.getElementById) {
    if (iframeid && !window.opera) {
      if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
        iframeid.height = iframeid.contentDocument.body.offsetHeight + 50;
      } else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
        frameid.height = iframeid.Document.body.scrollHeight + 50;
      }
    }
  }
}
</script>

<iframe width="100%" id="iframeid" onload="Javascript:SetCwinHeight()" scrolling=no height="1000" frameborder="0" src="https://xxxx.xyz/"></iframe>
```

- [参考大佬](https://www.haoyizebo.com/posts/e9071e74/)