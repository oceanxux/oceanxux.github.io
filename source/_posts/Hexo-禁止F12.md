---
title: Hexo 禁止F12
tags:
  - Hexo
categories: Hexo
abbrlink: d7f15970
date: 2024-02-14 01:08:56
cover: 'https://image.6669998.xyz/aUP7jy.png'
description: Hexo + butterfly 禁止F12
top:
password:
---

- 禁止 F12

#  新增以下代码

- 修改【BlogRoot/themes/butterfly/layout/includes/layout.pug】，根据图中位置添加以下 pug 代码
- 注意缩进 跟 head、body同级

![](https://image.6669998.xyz/4QQXDJ.png)

```dtd
  script.
    ((function () {
      var callbacks = [], timeLimit = 50, open = false;
      setInterval(loop, 1);
      return {
        addListener: function (fn) {
          callbacks.push(fn);
        }, cancelListener: function (fn) { // Fixed typo: cancelListener instead of cancleListenr
          callbacks = callbacks.filter(function (v) {
            return v !== fn;
          });
        }
      }

      function loop() {
        var startTime = new Date();
        debugger;
        if (new Date() - startTime > timeLimit) {
          if (!open) {
            callbacks.forEach(function (fn) {
              fn.call(null);
            });
          }
          open = true;
          window.stop();
          alert('你真坏，请关闭控制台！');
          document.body.innerHTML = "";
        } else {
          open = false;
        }
      }
    })()).addListener(function () {
      window.location.reload();
    });
  script.
    function toDevtools() {
      let num = 0;
      let devtools = new Date();
      devtools.toString = function () {
        num++;
        if (num > 1) {
          alert('你真坏，请关闭控制台！')
          window.location.href = "about:blank"
          blast();
        }
      }
      console.log('', devtools);
    }
    toDevtools();
```

- 将以下代码复制到自定义的custom.js
- 如果没有就新建一个 文件目录：themes/butterfly/source/js

```shell
document.onkeydown = function (e) {
    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) return btf.snackbarShow("你真坏，不能打开控制台喔!"), event.keyCode = 0, event.returnValue = !1, !1
};
```

- 将以下代码复制到自定义的disd.js
- - 如果没有就新建一个 文件目录：themes/butterfly/source/js

```shell
document.oncontextmenu = function () { return false; };
document.onselectstart = function () { return false; };

document.onkeydown = function () {
    if (window.event && (123 == window.event.keyCode
      || (window.event.ctrlKey && window.event.shiftKey && (74 === window.event.keyCode || 73 === window.event.keyCode || 67 === window.event.keyCode)) // Ctrl + Shift + I/J/C
      || (window.event.ctrlKey && 85 === window.event.keyCode)) // Ctrl + U
      || (window.event.ctrlKey && 80 === window.event.keyCode)) // Ctrl + P
      || (window.event.ctrlKey && 83 === window.event.keyCode)) // Ctrl + S
    ) {
        return window.event.keyCode = 0, window.event.returnValue = false, false;
    }
};
```

# 引用编译

- 在_config.butterfly.yml找到如下 修改

```shell
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
  bottom:
    - <script src="/js/disd.js"></script>
```
- 重新编译运行，即可看到效果。
- 注意: 如果自己调试阶段，可注释第一步和第二步中的代码，再进行编译，就可以打开控制台了。部署时放开注释，编译好再丢上去就OK了


- 参考以下大佬
- [唐志远](https://fe32.top/articles/hexo1606/#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95)
- [竹叶一山](https://zsyyblog.com/fd972c38.html)