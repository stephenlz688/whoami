/**
 * 全站内容数据源。
 *
 * 改网站内容只需要动这个文件，不用碰任何组件。
 * 所有字段都来自 profile.md，未经过美化的虚构内容一律不写。
 */

export const profile = {
  name: '李涛',
  nameEn: 'LI TAO',
  title: 'C/C++ 开发',
  location: '上海',
  status: '目前在职',
  email: 'stephen47_30@126.com',
  github: 'https://github.com/stephenlz688',
  githubLabel: 'stephenlz688',
  tagline: 'C/C++ 开发 · 现居上海',
  headline: {
    line1: '把底层的事情',
    prefix: '做',
    em: '扎实',
  },
  lead:
    '我是李涛，C/C++ 开发，现在做座舱域中间件基础组件。之前维护过 OFD 版式文档 SDK 的 API，' +
    '也独立写过聊天与网盘系统。喜欢把并发、内存、协议这些事拆开想清楚，再写成能长期跑的代码。',
  specs: [
    { label: '方向', value: 'C/C++ 开发' },
    { label: '侧重', value: '服务端 · 桌面客户端 · 中间件' },
    { label: '状态', value: '在职 · 开放交流' },
  ],
} as const

import type { AnimalName } from '@/components/icons/Animals'

export type FocusItem = {
  /** 动物插画名：octopus / cat / rabbit / bear / penguin / fox */
  icon: AnimalName
  title: string
  desc: string
}

export const focusItems: FocusItem[] = [
  {
    icon: 'octopus',
    title: '服务端与网络',
    desc: 'Socket 编程、select / poll / epoll 多路复用，设计过自定义通信协议，处理粘包半包这类实际会咬人的问题。',
  },
  {
    icon: 'cat',
    title: '桌面客户端',
    desc: 'Qt / QML，熟悉信号槽与事件机制，搭过完整的 C/S 架构应用，从界面到网络层一手实现。',
  },
  {
    icon: 'rabbit',
    title: '系统与性能',
    desc: '座舱域中间件与 Linux 系统编程：用 journald 收集崩溃现场、保障车载日志采集的稳定可用；维护 V4 / V6 多平台、定位并修复线上缺陷。也熟悉多线程、线程池、gdb 与内存泄漏排查。',
  },
]

export type ExperienceItem = {
  chip: string
  title: string
  role: string
  desc: string
  period: string
  /** 缩略图渐变，取自 design-spec.md 2.5 */
  gradient: string
}

export const experiences: ExperienceItem[] = [
  {
    chip: '在职',
    title: '座舱域日志中间件 log_service',
    role: '蜂巢电子科技 · C++ 开发工程师',
    desc:
      '负责座舱域中间件基础组件 log_service 的开发与维护，覆盖 V4 / V6 两代平台。' +
      '基于 journald 实现 coredump 捕获与收集；将日志编号改为 6 位十六进制递增，' +
      '取代对旧日志的全量 rename，消除拉取过程中的中断失败。日常承接多平台缺陷定位与修复。',
    period: '2025.08 – 至今',
    gradient: 'linear-gradient(150deg,#DDE4EF,#EDF1F7)',
  },
  {
    chip: '独立开发',
    title: '在线聊天文件分享平台',
    role: 'C++ · Qt · QML · MySQL',
    desc: '集社交聊天与网盘存储于一体的 C/S 系统。自研通信协议、线程池、文件哈希去重，解决了 TCP 粘包半包。',
    period: '2024.06 – 2024.08',
    gradient: 'linear-gradient(150deg,#DCE7F5,#EAF1F8)',
  },
  {
    chip: '实习',
    title: 'OFD 版式文档 SDK',
    role: '北京数科网维 · C++ 实习生',
    desc: '负责 API 维护与功能迭代，独立定位修复十余个关键 bug（含内存泄漏），后期主责电子发票插件。',
    period: '2024.10 – 2025.04',
    gradient: 'linear-gradient(150deg,#E2D9F0,#F0EBF8)',
  },
]

export type SkillGroup = {
  kicker: string
  title: string
  desc: string
}

export const skillGroups: SkillGroup[] = [
  {
    kicker: 'Language',
    title: '语言与基础',
    desc: 'C/C++，面向对象；C++11 新特性（智能指针、强制类型转换）；STL 容器：vector、stack、queue、map。现用于座舱域中间件与服务端开发。',
  },
  {
    kicker: 'Algorithm',
    title: '数据结构与算法',
    desc: '数组、链表、栈、队列、树；堆排、快排、归并、计数排序。',
  },
  {
    kicker: 'System',
    title: '系统与网络',
    desc: 'Linux（g++、vim、gdb、ps）；系统日志与崩溃收集（journald / coredump）；select / poll / epoll；TCP/UDP、HTTP/HTTPS、Socket 编程；多平台（V4/V6）构建维护与兼容性。',
  },
  {
    kicker: 'Storage',
    title: '存储与工程',
    desc: 'MySQL（索引、事务、日志）；Redis（缓存、淘汰策略、持久化、主从同步）；Git 分支与协作。',
  },
]

export type Note = {
  title: string
  /** 写完后改成发布日期，例如 '2026.09.02' */
  state: string
}

export const notes: Note[] = [
  { title: '基于 journald 的 coredump 捕获：车载日志系统的一次实践', state: '构思中' },
  { title: '粘包半包到底怎么解：一次完整的协议设计复盘', state: '构思中' },
  { title: '线程池为什么快：不只是"少创建几个线程"', state: '构思中' },
  { title: '文件去重：MD5 与 SHA 交叉校验的一点思考', state: '构思中' },
  { title: '独立定位十几个内存泄漏，我用的方法', state: '构思中' },
  { title: 'OFD 与电子发票：实习半年学到的东西', state: '构思中' },
]

export type Award = {
  name: string
  level: string
}

export const awards: Award[] = [
  { name: '全国高校商业精英挑战赛 · 创新创业赛', level: '国家级一等奖' },
  { name: '中国高校计算机大赛 · 网络技术挑战赛', level: '国家级三等奖' },
  { name: '睿抗机器人开发者大赛', level: '国家级三等奖' },
  { name: '全国大学生数字媒体科技作品及创意竞赛', level: '国家级三等奖' },
  { name: '中国大学生计算机设计大赛', level: '省级一等奖' },
  { name: '中国国际「互联网+」大学生创新创业大赛', level: '省级银奖' },
  { name: '校优秀学生奖学金', level: '多次' },
  { name: '大学英语四级', level: 'CET-4' },
]

export const navLinks = [
  { href: '#work', label: '经历' },
  { href: '#skills', label: '技能' },
  { href: '#notes', label: '笔记' },
  { href: '#awards', label: '奖项' },
] as const
