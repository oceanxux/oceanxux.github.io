---
title: GitHub 文件加速
tags:
  - GitHub
  - 笔记
categories: GitHub
cover: 'https://image.6669998.xyz/60jLfo.png'
abbrlink: 53b5b3b3
date: 2025-02-20 17:30:38
description:
---

-  [注册 cloudflare ](https://dash.cloudflare.com/)

# gh-proxy-pro

- [gh-proxy-pro 项目地址](https://github.com/xiaozhou26/gh-proxy-pro/)
- 创建 Worker

![1740047543270.png](https://image.6669998.xyz/SbITED.png)
![1740047610552.png](https://image.6669998.xyz/4WCO5l.png)
![1740047649855.png](https://image.6669998.xyz/NrQByS.png)

- 复制以下.js 代码

```js
'use strict'
/**
 * static files (404.html, sw.js, conf.js)
 */
const ASSET_URL = 'https://xiaozhou26.github.io/gh-proxy-pro/'
// 前缀，如果自定义路由为example.com/gh/*，将PREFIX改为 '/gh/'，注意，少一个杠都会错！
const PREFIX = '/'
const Config = {
    jsdelivr: 1,
    gitclone: 1
}

/** @type {RequestInit} */
const PREFLIGHT_INIT = {
    status: 204,
    headers: new Headers({
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
        'access-control-max-age': '1728000',
    }),
}


const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i

/**
 * @param {any} body
 * @param {number} status
 * @param {Object<string, string>} headers
 */
function makeRes(body, status = 200, headers = {}) {
    headers['access-control-allow-origin'] = '*'
    return new Response(body, {status, headers})
}


/**
 * @param {string} urlStr
 */
function newUrl(urlStr) {
    try {
        return new URL(urlStr)
    } catch (err) {
        return null
    }
}


addEventListener('fetch', e => {
    const ret = fetchHandler(e)
        .catch(err => makeRes('cfworker error:\n' + err.stack, 502))
    e.respondWith(ret)
})


function checkUrl(u) {
    for (let i of [exp1, exp2, exp3, exp4, exp5, exp6 ]) {
        if (u.search(i) === 0) {
            return true
        }
    }
    return false
}
// 创建一个生成器函数，用于生成随机的GitHub加速网站目标URL
const targetUrls = TARGET_URLS.split(',');

function* urlGenerator() {
  while (true) {
    const randomIndex = Math.floor(Math.random() * targetUrls.length);
    yield targetUrls[randomIndex];
  }
}



const getNextUrl = urlGenerator();

// 创建一个生成器函数，用于生成随机的GitHub URL

const GHUrls = GH_URLS.split(',');

function* urlgh() {
  while (true) {
    const randomIndex = Math.floor(Math.random() * GHUrls.length);
    yield GHUrls[randomIndex];
  }
}



const ghUrl = urlgh();
/**
 * @param {FetchEvent} e
 */
async function fetchHandler(e) {
    const req = e.request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    let path = urlObj.searchParams.get('q')
    if (path) {
        return Response.redirect('https://' + urlObj.host + PREFIX + path, 301)
    }
    // cfworker 会把路径中的 `//` 合并成 `/`
    path = urlObj.href.substr(urlObj.origin.length + PREFIX.length).replace(/^https?:\/+/, 'https://')
    if (path.search(exp1) === 0 || path.search(exp5) === 0 || path.search(exp6) === 0 || !Config.gitclone && (path.search(exp3) === 0 || path.search(exp4) === 0)) {
        const newUrl = `${getNextUrl.next().value}/${path}`;
        return Response.redirect(newUrl, 302);
    }else if (path.search(exp2) === 0) {
        if (Config.jsdelivr) {
            const newUrl = path.replace('/blob/', '@').replace(/^(?:https?:\/\/)?github\.com/, 'https://cdn.jsdmirror.com/gh')
            return Response.redirect(newUrl, 302)
        } else {
            path = path.replace('/blob/', '/raw/')
            return httpHandler(req, path)
        }
    } else if (path.search(exp3) === 0) {
        const newUrl = path.replace(/^(?:https?:\/\/)?github\.com/, ghUrl.next().value);
        return Response.redirect(newUrl, 302)
    } else if (path.search(exp4) === 0) {
        const newUrl = path.replace(/(?<=com\/.+?\/.+?)\/(.+?\/)/, '@$1').replace(/^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com/, 'https://cdn.jsdmirror.com/gh')
        return Response.redirect(newUrl, 302)
    } else {
        return fetch(ASSET_URL + path)
    }
}


/**
 * @param {Request} req
 * @param {string} pathname
 */
function httpHandler(req, pathname) {
    const reqHdrRaw = req.headers

    // preflight
    if (req.method === 'OPTIONS' &&
        reqHdrRaw.has('access-control-request-headers')
    ) {
        return new Response(null, PREFLIGHT_INIT)
    }

    const reqHdrNew = new Headers(reqHdrRaw)

    let urlStr = pathname
    if (urlStr.startsWith('github')) {
        urlStr = 'https://' + urlStr
    }
    const urlObj = newUrl(urlStr)

    /** @type {RequestInit} */
    const reqInit = {
        method: req.method,
        headers: reqHdrNew,
        redirect: 'manual',
        body: req.body
    }
    return proxy(urlObj, reqInit)
}


/**
 *
 * @param {URL} urlObj
 * @param {RequestInit} reqInit
 */
async function proxy(urlObj, reqInit) {
    const res = await fetch(urlObj.href, reqInit)
    const resHdrOld = res.headers
    const resHdrNew = new Headers(resHdrOld)

    const status = res.status

    if (resHdrNew.has('location')) {
        let _location = resHdrNew.get('location')
        if (checkUrl(_location))
            resHdrNew.set('location', PREFIX + _location)
        else {
            reqInit.redirect = 'follow'
            return proxy(newUrl(_location), reqInit)
        }
    }
    resHdrNew.set('access-control-expose-headers', '*')
    resHdrNew.set('access-control-allow-origin', '*')

    resHdrNew.delete('content-security-policy')
    resHdrNew.delete('content-security-policy-report-only')
    resHdrNew.delete('clear-site-data')

    return new Response(res.body, {
        status,
        headers: resHdrNew,
    })
}
```

- 复制项目地址里的GH_URLS  TARGET_URLS 内容
- GH_URLS：这个变量应该包含一系列网络上公开的、可以用来反代 GitHub 的网站地址。
- TARGET_URLS：这个变量则应包括一些网上公开的、部署 GH-Proxy 服务的网站地址。

![1740047838411.png](https://image.6669998.xyz/4YGUy2.png)

- 添加变量

![1740047758150.png](https://image.6669998.xyz/gsIpAV.png)

- 右上角访问代码 如果正常会显示以下

![1740047994372.png](https://image.6669998.xyz/jKrzU5.png)

# Flie-proxy

- [file-proxy](https://github.com/zwc456baby/file-proxy) 基于 [gh-proxy](https://github.com/hunshcn/gh-proxy) 修改，理论上支持任意http协议的链接加速，支持下载文件、支持 git bash 终端直接 git clone 项目。
- 创建 Worker

```js
'use strict'

/**
 * static files (404.html, sw.js, conf.js)
 */
const ASSET_URL = 'https://xxx.xxx.xyz/'
// 前缀，如果自定义路由为example.com/gh/*，将PREFIX改为 '/gh/'，注意，少一个杠都会错！
const PREFIX = '/token/'
// git使用cnpmjs镜像、分支文件使用jsDelivr镜像的开关，0为关闭，默认关闭
// 此处不要开启，否则将导致下载问题
const Config = {
    jsdelivr: 0,
    cnpmjs: 0
}

/** @type {RequestInit} */
const PREFLIGHT_INIT = {
    status: 204,
    headers: new Headers({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': true,
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
        'access-control-max-age': '1728000',
    }),
}

/**
 * @param {any} body
 * @param {number} status
 * @param {Object<string, string>} headers
 */
function makeRes(body, status = 200, headers = {}) {
    headers['access-control-allow-origin'] = '*'
    return new Response(body, {status, headers})
}


/**
 * @param {string} urlStr
 */
function newUrl(urlStr) {
    try {
        return new URL(urlStr)
    } catch (err) {
        return null
    }
}


addEventListener('fetch', e => {
    const ret = fetchHandler(e)
        .catch(err => makeRes('cfworker error:\n' + err.stack, 502))
    e.respondWith(ret)
})


/**
 * @param {FetchEvent} e
 */
async function fetchHandler(e) {
    console.log("new request enter")
    const req = e.request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    // let path = urlObj.searchParams.get('q')
    // if (path) {
    //     return Response.redirect('https://' + urlObj.host + PREFIX + path, 301)
    // }
    // cfworker 会把路径中的 `//` 合并成 `/`
    let path = urlObj.href.substr(urlObj.origin.length + PREFIX.length)
    if (path.startsWith('https')){
        path = path.replace(/^https?:\/+/, 'https://')
    }else{
        path = path.replace(/^http?:\/+/, 'http://')
    }
    const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
    const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob)\/.*$/i
    const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
    const exp4 = /^(?:https?:\/\/)?raw\.githubusercontent\.com\/.+?\/.+?\/.+?\/.+$/i

    if (path.search(exp1) === 0 || !Config.cnpmjs && (path.search(exp3) === 0 || path.search(exp4) === 0)) {
        return httpHandler(req, urlObj, path)
    } else if (path.search(exp2) === 0) {
        if (Config.jsdelivr){
            const newUrl = path.replace('/blob/', '@').replace(/^(?:https?:\/\/)?github\.com/, 'https://cdn.jsdelivr.net/gh')
            return Response.redirect(newUrl, 302)
        }else{
            path = path.replace('/blob/', '/raw/')
            return httpHandler(req, urlObj, path)
        }
    } else if (path.search(exp3) === 0) {
        const newUrl = path.replace(/^(?:https?:\/\/)?github\.com/, 'https://github.com.cnpmjs.org')
        return Response.redirect(newUrl, 302)
    } else if (path.search(exp4) === 0) {
        const newUrl = path.replace(/(?<=com\/.+?\/.+?)\/(.+?\/)/, '@$1').replace(/^(?:https?:\/\/)?raw\.githubusercontent\.com/, 'https://cdn.jsdelivr.net/gh')
        return Response.redirect(newUrl, 302)
    } else {
        if (path === '' || path === '/') {
            return new Response("success", {status: 200})
        }
        return httpHandler(req, urlObj, path)
    }
}


/**
 * @param {Request} req
 * @param {string} pathname
 */
function httpHandler(req, reqUrlObj, pathname) {
    console.log("http handler")
    const reqHdrRaw = req.headers

    PREFLIGHT_INIT.headers.set("access-control-allow-origin", reqUrlObj.origin)
    // preflight
    if (req.method === 'OPTIONS' &&
        reqHdrRaw.has('access-control-request-headers')
    ) {
        return new Response(null, PREFLIGHT_INIT)
    }

    let rawLen = ''

    const reqHdrNew = new Headers(reqHdrRaw)

    const fullReqUrl = reqUrlObj.origin + PREFIX
    if (reqHdrNew.get('Referer') && reqHdrNew.get('Referer').indexOf(fullReqUrl) == 0){
        reqHdrNew.set('Referer', reqHdrNew.get('Referer').substr(fullReqUrl.length))
    }

    let urlStr = pathname
    if (urlStr.startsWith('github')) {
        urlStr = 'https://' + urlStr
    }
    // const urlObj = newUrl('http://online.dun.ornglad.com/download/QQ%E9%82%AE%E7%AE%B1_010273872.exe')
    const urlObj = newUrl(urlStr)
    /** @type {RequestInit} */
    const reqInit = {
        method: req.method,
        headers: reqHdrNew,
        redirect: 'manual',
        body: req.body
    }
    return proxy(req, reqUrlObj, urlObj, reqInit, rawLen, 0)
}


/**
 *
 * @param {URL} urlObj
 * @param {RequestInit} reqInit
 */
async function proxy(cfReq, cfReqUrlObj, urlObj, reqInit, rawLen) {
    console.log(urlObj)
    const res = await fetch(urlObj.href, reqInit)
    const resHdrOld = res.headers
    const resHdrNew = new Headers(resHdrOld)

    // verify
    if (rawLen) {
        const newLen = resHdrOld.get('content-length') || ''
        const badLen = (rawLen !== newLen)

        if (badLen) {
            return makeRes(res.body, 400, {
                '--error': `bad len: ${newLen}, except: ${rawLen}`,
                'access-control-expose-headers': '--error',
            })
        }
    }
    var status = res.status
    if (status == 301 || status == 302 || status == 303 || status == 307 || status == 308) {
        var nextLocation = resHdrOld.get('location')
        if ( ! nextLocation.startsWith('https') && ! nextLocation.startsWith('http')){
            if (nextLocation.startsWith('//') && ! nextLocation.startsWith('///')){
                nextLocation = PREFIX + urlObj.protocol + nextLocation
            } else if (urlObj.origin.endsWith('/') || nextLocation.startsWith('/')){
                nextLocation = PREFIX + urlObj.origin + nextLocation
            } else {
                nextLocation = PREFIX + urlObj.origin + '/' + nextLocation
            }
        } else {
            nextLocation = PREFIX + nextLocation
        }
        status = 302
        resHdrNew.set('location', nextLocation)
    }
    if (cfReq.headers.has('origin')){
        resHdrNew.set('access-control-allow-origin', cfReq.headers.get('origin'))
    } else if(cfReq.headers.has('Referer') && newUrl(cfReq.headers.get('Referer'))){
        resHdrNew.set('access-control-allow-origin', newUrl(cfReq.headers.get('Referer')).origin)
    } else {
        resHdrNew.set('access-control-allow-origin', cfReqUrlObj.origin)
    }
    resHdrNew.set('access-control-expose-headers', '*')
    resHdrNew.set('access-control-allow-methods', 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS')
    resHdrNew.set('access-control-allow-credentials', true)

    resHdrNew.delete('content-security-policy')
    resHdrNew.delete('content-security-policy-report-only')
    resHdrNew.delete('clear-site-data')
    resHdrNew.delete('cross-origin-resource-policy')
    return new Response(res.body, {
        status,
        headers: resHdrNew,
    })
}
```

- 添加路由

![1740044208178.png](https://image.6669998.xyz/dq3l88.png)

- 设置 WAF 白名单

![1740044553036.png](https://image.6669998.xyz/LkAdCa.png)

## 使用方法

私有仓库：
git clone https://user:TOKEN@xxx.xxx.xyz/token/https://github.com/hunshcn/gh-proxy.git


- [参考limour大佬](https://hexo.limour.top/-fu-ke-GitHub-wen-jian-jia-su)