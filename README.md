# 个人网站 · 柔光毛玻璃

李涛的个人站。Next.js 15 App Router + TypeScript，视觉规范见上级目录的 `design-spec.md`。

## 怎么看效果

```bash
cd personal-site
npm run dev
```

然后打开 **http://localhost:3000**

> 首次启动 Next.js 会编译一次，通常 5–15 秒。改任何文件保存后页面自动热更新，不用重启。

其他命令：

```bash
npm run build   # 类型检查 + 静态导出，产物在 out/
```

> 项目配了 `output: 'export'`，构建产物是纯静态文件，**没有 `npm run start`**（那是 Node 服务器模式才有的）。

### 预览构建产物：必须用 serve_out.py，不能直接 serve out

构建时 CI 注入 `NEXT_PUBLIC_BASE_PATH=/whoami`，所以 `out/index.html` 里所有
资源引用都带 `/whoami` 前缀：

```html
<link rel="stylesheet" href="/whoami/_next/static/css/xxx.css">
```

如果直接 `npx serve out` 或 `python -m http.server -d out`，服务根目录就是 `out/`，
页面去请求 `/whoami/_next/...` 会**全部 404** —— 表现为页面没有任何样式、
JS 不执行、布局全乱，和「站点坏了」一模一样。

用工作区根目录的 `serve_out.py`，它重写 `translate_path` 把 `/whoami/xxx`
映射到 `out/xxx`，与线上结构一致：

```bash
python ../serve_out.py 3001
# 打开 http://127.0.0.1:3001/whoami/
```

> 注意：`http.server` **不跟随目录符号链接**，所以靠symlink/junction 模拟子路径
> 是无效的，必须走 `translate_path` 映射。

## 需要什么环境

- Node.js ≥ 18.18（当前用的是 22.22.2）
- 首次运行前要装依赖：`npm install`

如果 npm 官方源太慢，换成国内镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 目录结构

```
personal-site/
├── app/
│   ├── layout.tsx        # 根布局：html lang、SEO metadata、noscript 兜底
│   ├── page.tsx          # 首页，只做组件拼装
│   └── globals.css       # ★ 设计系统全部在这里，与 design-spec.md 对应
├── components/
│   ├── BackgroundOrbs    # 背景 4 个柔光色斑
│   ├── Nav               # 吸顶毛玻璃导航
│   ├── Hero              # 首屏 + 名片卡
│   ├── QilinPet          # 首屏 3D 小麒麟（纯 CSS preserve-3d，跟随鼠标）
│   ├── FocusSection      # 能力三卡
│   ├── ExperienceSection # 工作经历 + 项目（两组）
│   ├── SkillsSection     # 技术栈四卡
│   ├── NotesSection      # 技术笔记
│   ├── AwardsSection     # 竞赛与荣誉
│   ├── ContactSection    # 联系
│   ├── SiteFooter        # 页脚
│   ├── Reveal            # 滚动入场（唯一的客户端组件）
│   └── icons/Animals.tsx # ★ 6 只手绘 SVG 动物
├── app/not-found.tsx     # 404 页（狐狸）
└── data/
    └── profile.ts        # ★ 全站内容都在这里
```

## 我要改内容，动哪里

**只改 `data/profile.ts` 一个文件就够了**，组件和样式都不用碰。

- 改名字、城市、邮箱、GitHub → `profile`
- 改首屏标语 → `profile.headline` / `profile.lead`
- 增删能力卡 → `focusItems`
- **换能力卡的动物** → `focusItems[].icon`，可选 `octopus` / `cat` / `rabbit` / `bear` / `penguin` / `fox`
- 增删工作 / 实习 → `experiences`；增删独立项目 → `projects`（`gradient` 取值见 `design-spec.md` 2.5；`wide: true` 让卡片占两列）
- 增删技术栈分组 → `skillGroups`
- 笔记写完了 → 把 `notes` 里对应项的 `state` 从 `'构思中'` 改成发布日期
- 增删奖项 → `awards`
- 改导航项 → `navLinks`

## 动物插画

`components/icons/Animals.tsx` 里有 6 只手绘 SVG 动物，零积分、零网络请求、矢量不失真。

| 动物 | 用在哪 |
|---|---|
| 章鱼 | 服务端与网络（多腿 = 并发） |
| 猫 | 桌面客户端 |
| 兔子 | 系统与性能 |
| 小熊 | 技术笔记区吉祥物 |
| 企鹅 | 联系区 |
| 狐狸 | 404 页面 |

用法：

```tsx
import { Octopus } from '@/components/icons/Animals'
import { ANIMALS } from '@/components/icons/Animals'

<Octopus size={44} className="animal" />
<ANIMALS.rabbit size={56} className="mascot" />
```

新增动物时遵守 `design-spec.md` 第九节的约束：只用圆和椭圆、深色仅限眼鼻、统一 `viewBox="0 0 48 48"`。

## 我要改样式，动哪里

`app/globals.css`。里面按 18 节组织，节号与 `design-spec.md` 的章节对应：

| CSS 节 | 内容 |
|---|---|
| 1–2 | 设计变量 / Reset |
| 3 | 背景柔光色斑 |
| 4 | `.glass` 玻璃基类 |
| 5–9 | 布局、导航、Hero、按钮、名片卡 |
| 10–15 | 各组件样式 |
| 16 | 入场动效 |
| 17 | 响应式断点 |

改之前先翻一遍 `design-spec.md` 第七节的**禁止事项**，尤其是这几条：

- 圆角只用 10 / 16 / 24，字重只用 400 / 500
- 阴影透明度不超过 12%
- 玻璃卡片里不要再套玻璃卡片
- 背景色斑不超过 4 个
- 不要用 CSS 渐变冒充毛玻璃

## 动效

动效规范见 `design-spec.md` 第十节。参考了 Hexo Butterfly 的思路，但**只借机制不借花样**——飘带、点击烟花、打字特效一律没用，那套会把柔光毛玻璃的静气搅掉。

| 动效 | 文件 |
|---|---|
| 背景视差（4 个光斑不同速度随滚动位移） | `components/BackgroundOrbs.tsx` |
| 顶部滚动进度条 | `components/ScrollProgress.tsx` |
| 返回顶部 | `components/BackToTop.tsx` |
| 导航滚动收紧 + 区块高亮 | `components/Nav.tsx` |
| 卡片光标跟随高光 | `components/Spotlight.tsx` |
| 滚动入场 | `components/Reveal.tsx` |

**加新动效时遵守三条**：

1. 缓动只用 `--ease` 一个，混用缓动是「不丝滑」最常见的来源
2. 滚动监听一律 `requestAnimationFrame` 节流 + `{ passive: true }`
3. 位移只用 `transform`，别用 `top/left/width`——后者每帧触发重排
4. 高频值（鼠标坐标等）写 CSS 变量，不走 React state

所有动效在 `prefers-reduced-motion: reduce` 下自动降级。

## 排错：`npm run build` 报 safe-delete 错误

现象：编译和类型检查都过了，最后一步报

```
Error: [safe-delete] 操作失败: ... .next\trace: Error during a `trash` operation
```

**这不是项目的 bug**，是运行环境给 Node 注入了文件删除拦截层，Next.js 清理临时目录时被挡住。

解决：跑命令前清掉注入变量。

```bash
# macOS / Linux
unset NODE_OPTIONS && npm run build

# Windows PowerShell
$env:NODE_OPTIONS=""; npm run build
```

`npm run dev` 同理。已在 Next.js 15.5.24 + Node 22.22.2 验证：清掉变量后编译通过、静态页 4/4 生成、产物正常落盘。

## 首屏视频

首屏背景是一段循环视频，文件在 `public/` 下：

| 文件 | 说明 |
|---|---|
| `public/hero.mp4` | 720p / 30fps / H.264，**715 KB**，时长 2.80 秒，循环播放 |
| `public/hero-poster.jpg` | 首帧，47 KB。视频没加载完时先显示它，也是 `prefers-reduced-motion` 下的静态兜底 |

**当前素材**：`video01.mp4`（工作区根目录，421 KB / 720p / 1.49 秒 / 带 AAC 音轨）。

> 更早用的是 `DSC_6015.mov`（281 MB，ProRes 422 / 4K / 120fps，达芬奇导出），已弃用；需要的话在 git 历史里还能找回 `public/hero.mp4` 的旧版本。

换素材时重新转码（ffmpeg 在 `D:\tools\node_modules\ffmpeg-static\ffmpeg.exe`）：

```bash
FF="D:/tools/node_modules/ffmpeg-static/ffmpeg.exe"

# 素材若是相机直出的 .mov：缩到 1080p、30 帧、setpts 放慢一倍
"$FF" -y -i 新素材.mov -an -vf "scale=1920:-2,fps=30,setpts=2.0*PTS" \
  -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart public/hero.mp4

# 素材已经是 720p/1080p 的 .mp4：不用 scale，只去音轨 + 放慢一倍
"$FF" -y -i 新素材.mp4 -an -vf "fps=30,setpts=2.0*PTS" \
  -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart public/hero.mp4

"$FF" -y -i 新素材.mp4 -frames:v 1 -q:v 4 public/hero-poster.jpg
```

几个参数的含义：

- `-an` 去掉音轨——**背景视频必须静音才能自动播放**，浏览器不允许带声音自动播
- `-pix_fmt yuv420p` 保证所有浏览器都能解（ProRes 是 10-bit 422，不转会有兼容问题）
- `-movflags +faststart` 把索引放文件头部，边下边播，不用等整个文件下载完
- `setpts` 越大越慢，`2.0` 是一半速度；想更慢改成 `4.0`

**两个坑**：ffmpeg 是原生 Windows 程序，路径要写 `D:/...` 而不是 `/d/...`；`.gitignore` 里没有忽略 mp4，这两个文件会正常提交（加起来不到 1 MB，不影响仓库）。

## 首屏 3D 小麒麟

首屏右下角有一只可拖动旋转的小麒麟，用 [model-viewer](https://modelviewer.dev)渲染真 GLB 模型。

| 文件 | 说明 |
|---|---|
| `public/qilin.glb` | 模型本体，**186 KB** |
| `public/model-viewer.min.js` |渲染器，1.04 MB，**本地存放不走 CDN** |

**为什么 bundle 要本地化**：`npm install @google/model-viewer` 在本机装不上（npm registry 长时间无响应），而且 GitHub Pages 在国内访问 unpkg / Google CDN 并不稳。直接把 `dist/model-viewer.min.js` 下载到 `public/`，用 `next/script` 的 `afterInteractive` 策略加载，既绕开网络问题也能配合 `/whoami` basePath。

**模型是怎么压到186 KB 的**：文生 3D 产出的原始 GLB 有 **27.9 MB**，其中 27 MB 是三张 4096×4096 的未压缩 PNG 贴图。压缩脚本做两件事——每张贴图缩到最长边 1024 转 JPEG q82（圆润手办质感，压缩损失肉眼不可见），然后重算所有 `bufferView` 偏移重新打包。**27.91 MB → 0.18 MB，缩小约 150倍。**

> 重新压缩用工作区根目录的 `compress_glb.py`（纯标准库 + Pillow）。
> 注意 glTF 规范要求 JSON chunk 用空格 `0x20` 填充、binary chunk 用 null `0x00`，写错会让解析器直接报JSON 错误。

**交互**：`camera-controls` 让拖动即转、滚轮即缩放；`auto-rotate` 让它平时自己慢慢转（18°/秒），拖动时会自动暂停；`interaction-prompt="none"` 关掉它自带的角标提示，改用自己写的玻璃胶囊提示条（`.pet3d-tip`）。

**类型声明**：`<model-viewer>` 是 Web Component，TS 不认识，在 `types/model-viewer.d.ts` 里补了声明。注意 React 18+ 的 JSX 命名空间挂在 `react` 上（`declare module 'react' { namespace JSX {} }`），声明全局 `JSX` 不生效。另外 JSX 里要用 `className` 而非原生 `class`，否则类型报错。

**降级**：脚本和模型都没就绪前容器 `visibility: hidden`，避免留一块空白；`prefers-reduced-motion` 下关掉提示条呼吸与自动旋转（组件侧通过 `auto-rotate` 属性在 JS 里判断后移除）。900px 缩小、620px 直接隐藏。

## 部署

代码推到 GitHub 后会**自动部署**，不用手动操作。

- 仓库：`https://github.com/stephenlz688/whoami`
- 线上地址：`https://stephenlz688.github.io/whoami/`
- 流程：`.github/workflows/deploy.yml`，push 到 `main` 触发 → 装依赖 → 构建 → 发布到 GitHub Pages

首次部署前需要在仓库 Settings → Pages 里把 **Source 改成 GitHub Actions**（默认可能是 "Deploy from a branch"）。之后每次 push 约 1–2 分钟上线。

### 子路径是怎么处理的

GitHub Pages 的域名 `stephenlz688.github.io` 是账号下所有站点共用的，根路径被 `stephenlz688.github.io` 那个仓库（Hexo 博客）占着，所以本仓库只能挂在子路径 `/whoami/` 下。

这个前缀靠环境变量注入，本地开发不受影响：

```bash
# 本地：不设变量，站点跑在 http://localhost:3000/
npm run dev

# CI：workflow 里注入，站点跑在 /whoami/ 下
NEXT_PUBLIC_BASE_PATH=/whoami npm run build
```

**改仓库名时记得同步改两处**：`deploy.yml` 里的 `NEXT_PUBLIC_BASE_PATH`，以及 `next.config.ts` 的注释说明。

### 为什么有 .nojekyll

`out/.nojekyll` 是 workflow 里 `touch` 出来的。没有它，GitHub Pages 会用 Jekyll 处理站点，而 Jekyll 会忽略下划线开头的目录——`_next` 里的 JS 和 CSS 全丢，页面变成一堆裸 HTML。

## 技术说明

- **只有一个客户端组件**（`Reveal`），其余全是 Server Component，首屏是纯 HTML
- 字体走系统栈，不加载外部字体，无网络依赖
- 无 JS 时 `layout.tsx` 里有 `noscript` 兜底，保证内容可见
- `prefers-reduced-motion` 下所有动效自动关闭

## 待办

- [x] 当前公司的经历（蜂巢电子科技 · C++ 开发工程师 · 2025.08 – 至今）已补进 `experiences`
- [ ] 在线聊天文件分享平台的截图或仓库链接
- [ ] 6 篇技术笔记写完，`notes` 里的 `state` 改成发布日期（座舱日志方向需先确认公司保密边界）
