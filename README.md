# dsh-ui-sound

DeepSeek Harness Web GUI 的**界面音效**插件：把「界面交互」和「任务状态更新」都变成可听见的语义反馈，每一类反馈都能在设置页里单独挑音效、单独开关。

> ### ⚠️ 这是社区移植版，不是上游官方延续
>
> 本仓库是 [`dsh-plugin-uisfx`](https://github.com/XanthanL/dsh-plugin-uisfx)（MIT，作者 XanthanL）在 **DSH 0.2.0** 上的**移植适配版**。
> 上游声明支持 dsh `0.1.0-rc.6`；在 0.2.0 上它的宿主行无法激活、任务音静默失效。
> **请优先使用上游**——只有当你确实运行在 0.2.0+ 且撞上那些问题时才需要本版。
> 改了什么、依据是什么，逐条记录在 [PROVENANCE.md](PROVENANCE.md)。
>
> 音效引擎来自开源项目 [uisfx](https://github.com/romainsimon/uisfx)（MIT，Copyright © Yuki Capital），
> 共 **78 个 cue × 12 个音色包**，全部由 Web Audio 实时合成，**不含任何音频文件、不发起网络请求**。
> 见 [NOTICE](NOTICE) 与 [vendor/uisfx-0.4.0.js](vendor/uisfx-0.4.0.js)。

## 安装

```powershell
dsh plugin --profile <你的 profile> add github:SOH4C4759/dsh-ui-sound
# 然后重启 dsh
```

`lib/` 是构建产物且已随仓库提交，**没有构建步骤**，git 源安装开箱可用。装完在 **设置 → 音效** 里配置。

## 它解决什么

DSH 默认几乎没有声音反馈：任务跑完了？失败了？按钮点中了没有？只能靠眼睛确认。
本插件补上两类语义音效：

- **交互音效** —— 按钮按下时按语义分类发声（普通 / 主要 / 开关 / 发送 / 关闭 / 危险 / 链接），键盘 Enter、Space 激活同样发声。
- **任务状态音效** —— 当前会话开始运行、运行成功结束、运行失败结束，以及**出现需要你处理的交互**（授权请求 / 提问 / 计划复核）时发声。

## 触发时机

| 情景 id | 默认 cue | 什么时候响 |
| --- | --- | --- |
| `task.start` | `start` | 当前会话的 agent 开始运行 |
| `task.success` | `success` | 当前会话正常结束一轮 |
| `task.failure` | `error` | 当前会话因错误结束一轮 |
| `task.pending` | `notification` | 任意会话出现待处理交互（授权 / 提问 / 计划复核） |
| `click.normal` | `press` | 普通按钮 |
| `click.primary` | `select` | 主要 / 强调按钮 |
| `click.toggle` | `toggle-on` | 开关、checkbox、`aria-pressed` |
| `click.send` | `send` | 发送 / 提交 |
| `click.close` | `close` | 关闭 / 取消 |
| `click.danger` | `delete` | 删除 / 清空 / 危险操作 |
| `click.link` | `open` | 链接 |

三条刻意的取舍：

1. **任务音只跟「你正在看的那个会话」**。子代理和后台会话会不停地起停，全都发声等于噪声。
   判据是会话列表里 `retainedBy.mainView > 0` 的那一行——和 DSH 自己判定「当前会话」的规则一致。
   你切到设置页、文件页时，沿用**最后一个**主视图会话，不会突然静音。
2. **待处理提醒对所有会话生效**。它的价值就在于你**没在看**那个会话时提醒你，所以不按主视图过滤，用 `提醒音` 开关单独控制。
3. **首帧只记基线**。页面加载时已经在跑的会话不会补一声「开始」。

## 配置

设置 → **音效**。可配置项：

| 设置 | 默认值 | 说明 |
| --- | --- | --- |
| 启用音效 | 开 | 总开关 |
| 音量 | 55% | 0–100% |
| 音色包 | `zen` | 12 种整体音色，一键切换整套性格 |
| 任务音 | 开 | `task.start` / `success` / `failure` 三类 |
| 按钮音 | 开 | 所有 `click.*` |
| 提醒音 | 开 | `task.pending` |
| 每情景 cue | 见上表 | 每个情景独立下拉选择 + 试听按钮 |

**持久化落点**（可直接手改，改完刷新页面生效）：

```
%USERPROFILE%\.dsh\ui-sound\config.json
```

```json
{
  "enabled": true,
  "volume": 0.55,
  "pack": "zen",
  "taskSounds": true,
  "clickSounds": true,
  "attentionSounds": true,
  "mapping": { "task.success": "complete", "click.send": "send" }
}
```

宿主半会校验并裁剪这个文件：音量夹到 0–1，未知音色包回落到 `zen`，未知 cue 回落到该情景的默认值——
一个手滑写错的键不会让其它配置一起失效。设置页的改动也写回同一个文件，所以**清浏览器数据不会丢配置**。

### 12 个音色包

`minimal`（干练精确） / `soft`（圆润温暖） / `glass`（明亮清脆） / `arcade`（像素游戏） /
`mechanical`（机械硬朗） / `organic`（木石水声） / `dreamy`（空灵慢速） / `scifi`（全息数字） /
`rubber`（弹性俏皮） / `cinematic`（深沉大片） / `studio`（克制精准） / `zen`（纸、木、风铃，默认）

## 浏览器自动播放策略

浏览器不允许网页在没有用户手势前启动 AudioContext，因此**页面加载后第一次点击之前不会有声音**，
这是浏览器行为、不是插件故障。插件在第一次 `pointerdown` 时预热并恢复 AudioContext，
所以从第一次点击起就该有声；若仍无声，先点一下页面任意位置。

## 给其它插件用的 API

浏览器半通过 `ctx.reflect.provide("uiSound", service)` 暴露服务：

```js
ctx.uiSound.play("task.success")   // 按情景触发（受对应开关与总开关约束）
ctx.uiSound.playCue("achievement") // 直接播一个 cue
ctx.uiSound.preview("success")     // 设置页那种无门控试听
ctx.uiSound.getPrefs()             // 当前偏好
```

调试入口：`window.__dshUISound()`（player）、`window.__dshUISoundDebug()`（当前 prefs）。

## 架构

- **宿主半** `lib/index.js`：只注入 `webServer`，提供 `/ui-sound/api/settings`（GET/POST）与 `/ui-sound/api/status`，
  仅接受回环地址 + 同源的请求；偏好走临时文件 + rename 原子写入。
- **浏览器半** `lib/client.js`：内联 uisfx 0.4.0 引擎 + DSH 集成层。
  任务状态来自 `ctx.sessions.list` 的行级 `running` 与 `ctx.uiSession.sessionStatus` 的 `pendingInteraction`；
  交互音来自 document 捕获阶段的 `pointerdown` / 键盘合成 `click`。
- **无 Host 设置命名空间依赖、无 `webRuntime` 依赖**——前者外部 bundle 插件拿不稳，后者在 DSH 0.2.0 里不存在。

## 与 `dsh-plugin-uisfx` 的关系

本插件是 [`dsh-plugin-uisfx`](https://github.com/XanthanL/dsh-plugin-uisfx)（MIT）在 **DSH 0.2.0-rc.2** 上的**就地移植适配版**，
音效引擎与其 78 cue / 12 音色包完整保留，只重写了 DSH 集成层。原版在本版本上失效的三处（都不报错、只静默失效）：

| 原版读取 | 0.2.0 实情 | 后果 |
| --- | --- | --- |
| 宿主 `inject: ["webServer","webRuntime"]` | 没有任何包提供 `webRuntime` | 宿主行无法激活 |
| `ctx.sessions.list.getSnapshot().current` | 快照是 `{ ids, byId, phase, projectionsBySession }` | 任务状态监听静默失效 |
| `snapshot.pending` | `SessionSnapshot` 只有 `pendingSubmissions`，待处理交互在 `uiSession.sessionStatus.pendingInteraction` | 提醒音永远不会响 |

另有一处设计修正：`attentionSounds` 开关在上游被定义、在设置页可点，但没有任何代码读它；本版把 `task.pending` 接到该开关上。

逐文件的来源、改动幅度与许可归属见 [PROVENANCE.md](PROVENANCE.md)。

## 校验（改代码前后都该跑）

仓库里的 `lib/` 是提交进版本库的产物，所以 CI 不构建，只守**会被手改悄悄破坏的不变量**。
三条命令本地与 CI 完全一致，不需要 `pnpm install`（不依赖任何 npm 包）：

```powershell
node scripts/verify-bundle.mjs           # 发布形态契约：manifest、exports/files 目标、入口语法
node scripts/verify-package.mjs          # 发布元数据、浏览器半契约、宿主半离线求值、文档里的条数
node scripts/verify-publish-guards.mjs   # 本机绝对路径 / 账号名 / 凭据 / 内网地址
```

三者分工不重叠：

- **`verify-bundle.mjs`** 管「包装出来能不能被加载」——`dsh.bundle.patch`、每个 `exports`/`files` 目标是否真实存在、入口文件能否解析。它接受一个可选 root，所以既能查检出，也能查**解包后的发布压缩包**（`release.yml` 就是这么复核产物的）。
- **`verify-package.mjs`** 管「发布出去是否安全、是否还在用当前 dsh 的 API」——真实 LICENSE 文件、非 `private`、repository/author/meta；浏览器半只有一个 ModuleLoader 工厂、只 `require("react")`、不再读 0.2.0 已移除的 `list.current` 与 `snapshot.pending`。它会真的 `import` `lib/index.js`（宿主半只依赖 `node:` 内置模块），读回 `SCENARIO_IDS` / `PACK_IDS` / `CUE_IDS` / `DEFAULT_PREFS`，核对 README 写的 **11 情景 / 12 音色包 / 78 cue** 是否就是代码真实值，并验一遍 `normalizePrefs` 的裁剪行为。**文档漂移会让 CI 红**，不会等读者踩坑才发现。
- **`verify-publish-guards.mjs`** 扫全树文本文件，命中作者本机路径、账号名、token 字面量或内网网段即失败。

`.github/workflows/ci.yml` 在 push / PR 上跑全部三条，另加一次 `npm pack` 并核对压缩包里含全部运行期文件；
`release.yml` 在 `v*` tag 上出发布包。发布流程见 [RELEASING.md](RELEASING.md)。

## 已知边界（未做）

- 只做**合成音效**，不支持导入自定义音频文件（uisfx 引擎本身是参数化合成，没有采样播放通道）。
- 不做 `hover` 音（78 个 cue 里有 `hover`，但悬停发声在长时间使用中会变成噪声）。
- 不做工具调用级别的逐次音效（一轮里几十次工具调用，会淹没真正重要的状态变化）。

## 许可与归属

- 本仓库新增与重写的代码：MIT，Copyright © 2026 林冠宇 (SOH4C4759)，见 [LICENSE](LICENSE)。
- 内联的 uisfx 0.4.0 运行时：MIT，Copyright © Yuki Capital，全文见 [NOTICE](NOTICE)。
- 移植自 `dsh-plugin-uisfx`：MIT，Copyright © 2026 dsh-uisfx contributors，全文见 [NOTICE](NOTICE)。
- 逐文件的来源与改动幅度见 [PROVENANCE.md](PROVENANCE.md)。

若你是上述任一权利人或维护者，对归属写法或移植本身有异议，开一条 issue 即可，我们会立即调整或下架。
