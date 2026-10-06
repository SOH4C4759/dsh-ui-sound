# 来源与许可范围（PROVENANCE）

## 一、这份代码是什么

**本插件不是从零原创的实现**，而是 [`dsh-plugin-uisfx`](https://github.com/XanthanL/dsh-plugin-uisfx)（MIT）
在 **DeepSeek Harness 0.2.0-rc.2** 上的**移植适配版**：音效引擎与设置页形态保留上游，被重写的是**读取 DSH 状态的那一层**
（上游读的三个 API 在 0.2.0 里已经不存在，见第四节）。

上游作者与 uisfx 作者的权利主张均被完整保留，见 [`NOTICE`](NOTICE)。

## 二、许可范围

| 范围 | 许可 |
|---|---|
| `vendor/uisfx-0.4.0.js`，以及 `lib/client.js` 中内联的那一段引擎代码 | **uisfx 0.4.0**，MIT，Copyright © Yuki Capital |
| `lib/client.js` 的设置页组件、zh/en 词典、偏好结构与默认值、cue/pack id 表、情景→cue 默认映射 | **移植自 dsh-plugin-uisfx**，MIT，Copyright © 2026 dsh-uisfx contributors |
| `lib/index.js`（宿主半，整体重写）、`lib/client.js` 中重写的 DSH 集成层、本文件、`README.md` | **本仓库**，MIT，Copyright © 2026 林冠宇 (SOH4C4759) |

## 三、逐项记录

| 文件 / 部分 | 来源 | 改动幅度 |
|---|---|---|
| `vendor/uisfx-0.4.0.js` | uisfx 0.4.0 发行版 | **原样**，未改一字 |
| `lib/client.js` 的引擎区段（单行，`//#region vendor/uisfx@0.4.0` 包裹） | 上游 `lib/client.js` | **逐字节保留**：直接从上游构建产物中切出，未重排、未压缩 |
| `lib/client.js` 的 `SCENARIO_DEFS` / `DEFAULT_MAPPING` / 词典 / `normalizePrefs` / 设置页组件 | 上游 `lib/client.js` | 保留；见第四节的四处修正 |
| `lib/client.js` 的任务状态监听 | 上游同位置 | **重写**（上游实现依赖已不存在的 API） |
| `lib/client.js` 的交互音监听 | 上游同位置 | 保留指针路径，**新增**键盘激活路径与设置页排除 |
| `lib/index.js` | 上游同位置 | **整体重写**（上游依赖不存在的 `webRuntime` 与拿不稳的 `ctx.settings`） |
| `package.json` / `cordis.patch.yml` | 上游对应文件 | 重写：包名、行 id、`dsh.client.inject` 清空、补 repository 字段 |
| `README.md` | 上游 `README.md` | 重写（上游文案描述的是旧版行为） |

## 四、相对上游修正的四点（均可对着 DSH 装机包复核）

上游声明的运行环境是 dsh `0.1.0-rc.6`，本机为 `0.2.0-rc.2`。以下三处**不会报错、只会静默失效**，所以从日志上看不出来：

| 上游写法 | 0.2.0 实情 | 后果 |
|---|---|---|
| 宿主 `inject: ["webServer", "webRuntime"]` | 装机包内没有任何包提供 `webRuntime` | 宿主行无法激活，配置接口 404 |
| `ctx.sessions.list.getSnapshot().current` | 会话列表快照就是 `{ ids, byId, phase, projectionsBySession }` | 任务状态监听拿不到会话 id，任务音全哑 |
| `snapshot.pending` | `SessionSnapshot` 只有 `pendingSubmissions`；待处理交互在 `uiSession.sessionStatus` 的 `pendingInteraction` | 提醒音永远不会响 |

外加一处设计修正：`attentionSounds` 开关在上游被定义、在设置页可点，但**没有任何代码读它**；本版把 `task.pending` 接到这个开关上。

## 五、权利主张 / Takedown

若你是 uisfx 或 dsh-plugin-uisfx 的权利人，认为本移植版超出了 MIT 允许的范围，或希望换一种归属写法，
请在本仓库开一条 issue 说明依据，我们会**立即调整归属或下架**，不附加其它条件。
