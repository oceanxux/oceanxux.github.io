---
title: Hexo+Butterfly 自定义右键美化
tags:
  - Hexo
categories: Hexo
description: Hexo+Butterfly 自定义右键美化
abbrlink: 18a5e667
date: 2024-02-15 17:59:49
cover: 'https://image.6669998.xyz/kPgyFo.png'
top:
password:
---

# 目前实现的样式

![](https://image.6669998.xyz/EYuiZS.png)

# 正题

- 在config.butterfly.yml 打开 snackbar 

```yaml
snackbar:
  enable: true #true 为打开
  position: bottom-left
  bg_light: '#49b1f5' 
  bg_dark: '#1f1f1f' 
```

- 在路径：butterfly/layout/includes 下
  - 新建 
  -      文件夹： right-menu   文件： index.pug

- 把下列代码添加进去

```puml
#rightMenu.js-pjax
    .rightMenu-group.rightMenu-small
        a.rightMenu-item(href="javascript:window.history.back();")
            i.fa.fa-arrow-left
        a.rightMenu-item(href="javascript:window.history.forward();")
            i.fa.fa-arrow-right
        a.rightMenu-item(href="javascript:window.location.reload();")
            i.fa.fa-refresh
        a.rightMenu-item(href="javascript:rmf.scrollToTop();")
            i.fa.fa-arrow-up
    .rightMenu-group.rightMenu-line.hide#menu-text
        a.rightMenu-item(href="javascript:rmf.copySelect();")
            i.fa.fa-copy
            span='复制'
        a.rightMenu-item(href="javascript:window.open(\"https://www.baidu.com/s?wd=\"+window.getSelection().toString());window.location.reload();")
            i.fa.fa-search
            span='百度搜索'
    .rightMenu-group.rightMenu-line.rightMenuOther
        a.rightMenu-item.menu-link(href='/archives/')
            i.fa-solid.fa-archive
            span='文章归档'
        a.rightMenu-item.menu-link(href='/categories/')
            i.fa-solid.fa-folder-open
            span='文章分类'
        a.rightMenu-item.menu-link(href='/tags/')
            i.fa-solid.fa-tags
            span='文章标签'
    .rightMenu-group.rightMenu-line.hide#menu-to
        a.rightMenu-item(href="javascript:rmf.copyWordsLink()")
            i.fa.fa-link
            span='复制本文地址'
        a.rightMenu-item(href="javascript:rmf.openWithNewTab()")
            i.fa.fa-window-restore
            span='新窗口打开'
    .rightMenu-group.rightMenu-line.hide#menu-img
        a.rightMenu-item(href="javascript:rmf.openWithNewTab()")
            i.fa.fa-window-restore
            span='在新窗口打开'
    .rightMenu-group.rightMenu-line
        a.rightMenu-item.menu-link#menu-radompage(href="javascript:toRandomPost();")
            i.fa-solid.fa-shoe-prints
            span='随便逛逛'
        a.rightMenu-item(href="javascript:rmf.switchDarkMode();")
            i.fa.fa-moon
            span='昼夜切换'
        a.rightMenu-item(href="javascript:rmf.translate();")
            i.fa-solid.fa-earth-asia
            span='繁简转换'
        if is_post()||is_page()
            a.rightMenu-item(href="javascript:rmf.switchReadMode();")
                i.fa.fa-book
                span='阅读模式'
```

- 在路径下： themes/butterfly/layout/includes/layout.pug
-     复制以下代码添加到对应位置 注意缩进

```markdown
    include ./rightside.pug
+    !=partial('includes/right-menu/index', {}, {cache: true})
```

![](https://image.6669998.xyz/sdBeQT.png)

- 在路径下： themes/butterfly/source/js/
-     新建文件：  rightMenu.js
-  复制以下代码

```javascript
console.log(
    "Codes uses GPL Licence"
)

function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
rmf.copyWordsLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    btf.snackbarShow("复制成功");
//    Swal.fire("复制成功！");
}
rmf.switchReadMode = function () {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
rmf.scrollToTop = function () {
    btf.scrollToDest(0, 500);
}
rmf.translate = function () {
    document.getElementById("translateLink").click();
}

// 右键菜单事件
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 17) {
        console.log("你知道的太多了");
        return;
    }
}

function popupMenu() {
    //window.oncontextmenu=function(){return false;}
    window.oncontextmenu = function (event) {
        if(event.ctrlKey)return true;
//        console.log(event.keyCode)
        $('.rightMenu-group.hide').hide();
        //如果有文字选中，则显示 文字选中相关的菜单项
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post')) {
            $('#menu-post').show();
        } else {
            if (document.getElementById('page')) {
                $('#menu-post').show();
            }
        }
        var el = window.document.body;
        el = event.target;
        var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        if (a.test(window.getSelection().toString())){
            $('#menu-too').show()
        }
        if (el.tagName == 'A') {
            $('#menu-to').show()
            rmf.open = function () {
                location.href = el.href
            }
            rmf.openWithNewTab = function () {
                window.open(el.href);
            }
            rmf.copyLink = function () {
                let url = el.href
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        }
        if (el.tagName == 'IMG') {
            $('#menu-img').show()
            rmf.openWithNewTab = function () {
                window.open(el.src);
            }
            rmf.click = function () {
                el.click()
            }
            rmf.copyLink = function () {
                let url = el.src
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            //读取剪贴板
                            navigator.clipboard.readText().then(text => {
                                console.log(text)
                                insertAtCursor(el, text)
                            })
                        } else {
                            alert('请允许读取剪贴板！')
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
    let timer = 0 // 初始化timer

    target.ontouchstart = () => {
        timer = 0 // 重置timer
        timer = setTimeout(() => {
            callback();
            timer = 0
        }, 380) // 超时器能成功执行，说明是长按
    }

    target.ontouchmove = () => {
        clearTimeout(timer) // 如果来到这里，说明是滑动
        timer = 0
    }

    target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
        if (timer) {
            clearTimeout(timer)
        }
    }
}

addLongtabListener(box, popupMenu)
```

-  在路径下：themes/butterfly/source/css/
-     新建文件： rightMenu.css
- 复制以下代码

````css
/* rightMenu */
#rightMenu{
  display: none;
  position: fixed;
  width: 160px;
  height: fit-content;
  top: 10%;
  left: 10%;
  background-color: var(--card-bg);
  border: 1px solid var(--font-color);
  border-radius: 8px;
  z-index: 100;
}
#rightMenu .rightMenu-group{
  padding: 7px 6px;
}
#rightMenu .rightMenu-group:not(:nth-last-child(1)){
  border-bottom: 1px solid var(--font-color);
}
#rightMenu .rightMenu-group.rightMenu-small{
  display: flex;
  justify-content: space-between;
}
#rightMenu .rightMenu-group .rightMenu-item{
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
  transition: 0.3s;
  color: var(--font-color);
}
#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item{
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 4px;
}
#rightMenu .rightMenu-group .rightMenu-item:hover{
  background-color: var(--text-bg-hover);
}
#rightMenu .rightMenu-group .rightMenu-item i{
  display: inline-block;
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  padding: 0 5px;
}
#rightMenu .rightMenu-group .rightMenu-item span{
  line-height: 30px;
}

#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item *{
  height: 40px;
  line-height: 40px;
}
.rightMenu-group.hide{
  display: none;
}
````

- 在配置文件： _config.butterfly.yml  引入刚才新建的 CSS js

````yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/rightMenu.css"> #自定义右键
  bottom:
    - <script defer src="https://npm.elemecdn.com/jquery@latest/dist/jquery.min.js"></script> #自定义右键
    - <script defer data-pjax src="/js/rightMenu.js"></script> #自定义右键
````
- [参考大佬](https://yisous.xyz/posts/11eb4aac/)