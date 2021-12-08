<div align="center">
  <img alt="Pomotroid in action" src=".github/images/pomotroid-screens.png" width="300px">
</div>

---

## Overview

Kym's Timer 是一个基于[Pomotroid](https://github.com/Splode/pomotroid)简单修改的番茄钟应用，可以作为"3个20"原则的护眼提醒应用。使用Vue和Electron开发。

科学用眼的“三个二十”原则： 每隔20分钟眨眼20下或远眺20秒。亲测可以有效缓解眼疲劳，但是仅靠系统的通知很容易被忽略，经常一天也坚持不了几次，于是加入了强制休息功能。

## Reference

[Pomotroid](https://github.com/Splode/pomotroid) 是一个制作精美的番茄钟应用，并且支持多种主题，此项目基于v0.13.0开发。

[FakeBlueScreen](https://github.com/sposer/FakeBlueScreen) 是一个模拟蓝屏应用，此项目除去了其中的"自毁"程序。
## Modified

- 修改Short Break为秒钟
- 增加Long Break选择开关
- 模拟蓝屏强制休息

## Development


```bash
# install dependencies
npm i

# serve with hot reload at localhost:9080
npm run dev

# build Pomotroid for production
npm run build
```

## Bugs

- 蓝屏程序固定运行20s，不能和休息时间匹配
- 继承Pomotroid的Bug

## Roadmap

- 推出更多的休息时界面
- 实现一套自己风格的UI
- 必不可少的图表