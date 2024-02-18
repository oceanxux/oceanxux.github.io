---
title: Hexo+Butterfly 实现随便看看2.0
tags:
  - Hexo
categories: Hexo
cover: 'https://image.6669998.xyz/VE1FGN.png'
description: Hexo+Butterfly 实现随便看看2.0
abbrlink: e2cd64b9
date: 2024-02-18 18:19:44
top:
password:
---

# 新建文件

- 创建themes/butterfly/scripts/helpers/random.js文件
- 开启pjax

![](https://image.6669998.xyz/B1Z6Ee.png)

```javascript
hexo.extend.generator.register("random", function (locals) {
  const config = hexo.config.random || {};
  const posts = [];
  for (const post of locals.posts.data) {
    if (post.random !== false) posts.push(post.path);
  }
  return {
    path: config.path || "sam/random.js",
    data: `var posts=${JSON.stringify(
      posts
    )};function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};`,
  };
});
```

- 未开启pjax用下面的代码

```javascript
hexo.extend.generator.register("random", function (locals) {
  const config = hexo.config.random || {};
  const posts = [];
  for (const post of locals.posts.data) {
    if (post.random !== false) posts.push(post.path);
  }
  return {
    path: config.path || "sam/random.js",
    data: `var posts=${JSON.stringify(
      posts
    )};function toRandomPost(){window.open('/'+posts[Math.floor(Math.random() * posts.length)],"_self");};`,
  };
});
```

# 引用

- 在主题配置文件引入themes/butterfly/_config.yml，inject的bottom里添加

```yaml
 <script src="/sam/random.js"></script>
```

# 调用

- 在需要调用的位置执行toRandomPost()函数即可。

- 比如任意dom添加onclick="toRandomPost()"

- 例如在配置文件导航栏中需要的位置添加，随便逛逛: javascript:toRandomPost() || fa fas fa-bus

- [张洪大佬](https://blog.zhheo.com/p/c116857c.html)
- [安知鱼大佬](https://blog.anheyu.com/posts/sdxhu.html#random-js-%E9%9A%8F%E6%9C%BA%E8%B7%B3%E8%BD%AC%E4%B8%80%E7%AF%87%E6%96%87%E7%AB%A0)
