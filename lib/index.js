/**
 * Host half of the `dsh-ui-sound` bundle.
 *
 * Why this exists: the browser half owns the sound engine and the event
 * watchers, but preferences must outlive the browser profile — clearing site
 * data must not silently reset the user's sound setup, and a hand-editable
 * file is the only configuration surface that survives every UI change.
 *
 * Surface (one loopback-only, same-origin-gated JSON route):
 *   GET  /ui-sound/api/settings   the durable preferences
 *   POST /ui-sound/api/settings   { patch } or { field, value }, merged and persisted
 *   GET  /ui-sound/api/status     where the file lives and what is mounted
 *
 * Deliberate choices, each one a fix for something the stock `dsh-plugin-uisfx`
 * host half got wrong on this build:
 *   - `inject` is only `webServer`. The stock half injected `webRuntime` for a
 *     `trustedHosts` list; no 0.2.0 Host package publishes that service, so the
 *     row could not activate at all. Trust is decided here from the socket
 *     address and the Host authority, the same way `dsh-plugin-restart` does it.
 *   - Preferences live in this plugin's own file instead of the Host settings
 *     namespace, so the plugin does not depend on `ctx.settings` internals that
 *     external bundle plugins cannot reach reliably.
 *
 * @module dsh-ui-sound
 */

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Plugin name shown in loader logs. */
export const name = 'dsh-ui-sound'

/** The Web server is the only required service: it carries the settings route. */
export const inject = ['webServer']

/** This package's own name, used to locate its root from a profile link. */
const PACKAGE_NAME = 'dsh-ui-sound'

/** Route prefix owned by this plugin. */
export const ROUTE_PREFIX = '/ui-sound/api'

/** Directory name this plugin owns under the DSH home. */
const STATE_DIR_NAME = 'ui-sound'

/** File holding the durable preferences. */
const CONFIG_FILE_NAME = 'config.json'

/** uisfx pack ids (mirror of uisfx@0.4.0 `packNames`). */
export const PACK_IDS = [
  'minimal', 'soft', 'glass', 'arcade', 'mechanical', 'organic',
  'dreamy', 'scifi', 'rubber', 'cinematic', 'studio', 'zen',
]

/** uisfx cue ids (mirror of uisfx@0.4.0 `cueNames`). */
export const CUE_IDS = [
  'hover', 'press', 'release', 'double-click', 'focus', 'long-press',
  'select', 'deselect', 'toggle-on', 'toggle-off', 'check', 'uncheck',
  'delete', 'cancel', 'undo', 'redo', 'copy', 'paste', 'open', 'close',
  'back', 'forward', 'expand', 'collapse', 'drag-start', 'drop', 'snap',
  'swipe', 'reorder', 'invalid-drop', 'send', 'receive', 'notification',
  'mention', 'typing', 'reaction', 'success', 'error', 'warning', 'info',
  'blocked', 'retry', 'start', 'stop', 'progress-step', 'complete', 'queued',
  'checkpoint', 'loading', 'processing', 'recording', 'connecting', 'scanning',
  'streaming', 'play', 'pause', 'seek', 'volume-change', 'skip-next',
  'skip-previous', 'connect', 'disconnect', 'lock', 'unlock', 'wake', 'sleep',
  'reward', 'level-up', 'achievement', 'streak', 'badge', 'bonus',
  'add-to-cart', 'remove-from-cart', 'checkout', 'purchase', 'coupon', 'refund',
]

/** Scenario → default cue. The settings page edits exactly these keys. */
export const DEFAULT_MAPPING = {
  'task.start': 'start',
  'task.success': 'success',
  'task.failure': 'error',
  'task.pending': 'notification',
  'click.normal': 'press',
  'click.primary': 'select',
  'click.toggle': 'toggle-on',
  'click.send': 'send',
  'click.close': 'close',
  'click.danger': 'delete',
  'click.link': 'open',
}

/** Scenario ids the settings page can remap, in display order. */
export const SCENARIO_IDS = Object.keys(DEFAULT_MAPPING)

/** Preferences a fresh install runs with. */
export const DEFAULT_PREFS = {
  enabled: true,
  volume: 0.55,
  pack: 'zen',
  taskSounds: true,
  clickSounds: true,
  attentionSounds: true,
  mapping: DEFAULT_MAPPING,
}

/** This module's directory (the package root when the entry is `lib/index.js`). */
const moduleDir = dirname(fileURLToPath(import.meta.url))

/**
 * Resolve the package root by walking up from this module until the manifest
 * names this package. A profile install reaches the file through a link, and
 * `import.meta.url` may already be the link target, so neither `moduleDir` nor
 * its parent can be assumed: the manifest decides.
 * @param from - directory to start from.
 * @returns the directory holding this package's `package.json`.
 */
export function findPackageRoot(from) {
  let current = from
  for (let depth = 0; depth < 6; depth += 1) {
    const manifest = join(current, 'package.json')
    try {
      if (existsSync(manifest)) {
        const parsed = JSON.parse(readFileSync(manifest, 'utf8'))
        if (parsed?.name === PACKAGE_NAME) return current
      }
    } catch {
      /* keep walking */
    }
    const parent = dirname(current)
    if (parent === current) break
    current = parent
  }
  return from
}

/** This package's root directory. */
export const packageRoot = findPackageRoot(moduleDir)

/**
 * Resolve `$DSH_HOME`; the Host's own environment is the authority.
 * @param env - environment to read.
 * @returns the DSH home directory.
 */
export function resolveDshHome(env = process.env) {
  const raw = typeof env.DSH_HOME === 'string' ? env.DSH_HOME.trim() : ''
  return raw === '' ? join(homedir(), '.dsh') : raw
}

/**
 * Directory holding this plugin's configuration.
 * @param env - environment to read.
 * @returns the absolute state directory.
 */
export function resolveStateDir(env = process.env) {
  return join(resolveDshHome(env), STATE_DIR_NAME)
}

/**
 * Absolute path of the durable preferences file.
 * @param env - environment to read.
 * @returns the absolute config path.
 */
export function resolveConfigPath(env = process.env) {
  return join(resolveStateDir(env), CONFIG_FILE_NAME)
}

/** Clamp a value into a range, falling back when it is not a finite number. */
function clampNumber(value, min, max, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, number))
}

/**
 * Coerce arbitrary input into the exact preference shape the browser half reads.
 *
 * Values are clamped or dropped rather than rejected: a hand-edited config file
 * with one bad key must not disable every other preference.
 * @param raw - parsed config, or anything else.
 * @returns a complete, valid preferences object.
 */
export function normalizePrefs(raw) {
  const source = typeof raw === 'object' && raw !== null ? raw : {}
  const mapping = { ...DEFAULT_MAPPING }
  const incoming = typeof source.mapping === 'object' && source.mapping !== null ? source.mapping : {}
  for (const scenario of SCENARIO_IDS) {
    const cue = incoming[scenario]
    if (typeof cue === 'string' && CUE_IDS.includes(cue)) mapping[scenario] = cue
  }
  return {
    enabled: typeof source.enabled === 'boolean' ? source.enabled : DEFAULT_PREFS.enabled,
    volume: clampNumber(source.volume, 0, 1, DEFAULT_PREFS.volume),
    pack: typeof source.pack === 'string' && PACK_IDS.includes(source.pack) ? source.pack : DEFAULT_PREFS.pack,
    taskSounds: typeof source.taskSounds === 'boolean' ? source.taskSounds : DEFAULT_PREFS.taskSounds,
    clickSounds: typeof source.clickSounds === 'boolean' ? source.clickSounds : DEFAULT_PREFS.clickSounds,
    attentionSounds: typeof source.attentionSounds === 'boolean' ? source.attentionSounds : DEFAULT_PREFS.attentionSounds,
    mapping,
  }
}

/**
 * Read the durable preferences; defaults when the file is absent or unreadable.
 * @param env - environment to read.
 * @returns the resolved preferences.
 */
export function readPrefs(env = process.env) {
  const path = resolveConfigPath(env)
  try {
    return normalizePrefs(JSON.parse(readFileSync(path, 'utf8')))
  } catch {
    return normalizePrefs(undefined)
  }
}

/**
 * Persist preferences through a temporary file and a rename, so a crash mid-write
 * cannot leave a truncated config behind.
 * @param prefs - already-normalized preferences.
 * @param env - environment to read.
 * @returns the written path.
 */
export function writePrefs(prefs, env = process.env) {
  const path = resolveConfigPath(env)
  mkdirSync(dirname(path), { recursive: true })
  const temporary = `${path}.tmp`
  writeFileSync(temporary, `${JSON.stringify(prefs, null, 2)}\n`, 'utf8')
  renameSync(temporary, path)
  return path
}

/**
 * Merge one request body into the stored preferences.
 * @param current - the current preferences.
 * @param body - `{ patch }`, `{ field, value }`, or a bare partial object.
 * @returns the merged, normalized preferences.
 */
export function mergePrefs(current, body) {
  if (typeof body !== 'object' || body === null) return current
  if (typeof body.patch === 'object' && body.patch !== null) return normalizePrefs({ ...current, ...body.patch })
  if (typeof body.field === 'string' && body.field !== '') return normalizePrefs({ ...current, [body.field]: body.value })
  return normalizePrefs({ ...current, ...body })
}

/** Whether a socket address is a literal loopback peer. */
function isLoopbackAddress(address) {
  return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1'
}

/** Parse one bare Host authority into a URL, or undefined when malformed. */
function parseAuthority(authority) {
  if (typeof authority !== 'string' || authority.trim() !== authority || authority === '') return undefined
  const match = authority.startsWith('[') ? /^\[[^\]]+\](?::([0-9]+))?$/.exec(authority) : /^[^:@/?#\s]+(?::([0-9]+))?$/.exec(authority)
  if (match === null) return undefined
  try {
    const url = new URL(`http://${authority}`)
    if (url.username !== '' || url.password !== '' || url.pathname !== '/' || url.search !== '' || url.hash !== '') return undefined
    const rawPort = match[1]
    if (rawPort !== undefined && (String(Number(rawPort)) !== rawPort || Number(rawPort) > 65535)) return undefined
    return url
  } catch {
    return undefined
  }
}

/**
 * Loopback-only, same-origin trust decision for the settings routes.
 * @param request - the incoming request.
 * @returns whether the request may read or write preferences.
 */
export function isTrustedRequest(request) {
  if (!isLoopbackAddress(request.socket?.remoteAddress)) return false
  if (request.headers['sec-fetch-site'] === 'cross-site') return false
  const host = request.headers.host
  if (typeof host !== 'string') return false
  const hostUrl = parseAuthority(host)
  if (hostUrl === undefined) return false
  const origin = request.headers.origin
  if (origin === undefined) return true
  try {
    return new URL(origin).host === hostUrl.host
  } catch {
    return false
  }
}

/** Write one JSON response without depending on any Host helper. */
function writeJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'referrer-policy': 'no-referrer',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(payload),
  })
  res.end(payload)
}

/** Read a bounded JSON body; null for a blank, oversized or invalid body. */
async function readJsonBody(req, maxBytes = 16 * 1024) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > maxBytes) {
      req.destroy()
      return null
    }
    chunks.push(chunk)
  }
  const text = Buffer.concat(chunks).toString('utf8')
  if (text.trim() === '') return {}
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

/**
 * Mount the settings routes.
 * @param ctx - Host plugin context carrying `webServer`.
 */
export function apply(ctx) {
  const env = process.env
  const configPath = resolveConfigPath(env)

  const settingsHandler = async (req, res) => {
    if (!isTrustedRequest(req)) {
      writeJson(res, 403, { ok: false, error: { code: 'forbidden', message: 'the settings route is loopback-only' } })
      return
    }
    if (req.method === 'GET') {
      writeJson(res, 200, { ok: true, value: readPrefs(env) })
      return
    }
    if (req.method === 'POST') {
      const body = await readJsonBody(req)
      if (body === null) {
        writeJson(res, 400, { ok: false, error: { code: 'bad-request', message: 'request body is not valid JSON' } })
        return
      }
      const next = mergePrefs(readPrefs(env), body)
      try {
        writePrefs(next, env)
      } catch (error) {
        writeJson(res, 500, {
          ok: false,
          error: { code: 'write-failed', message: error instanceof Error ? error.message : String(error) },
        })
        return
      }
      writeJson(res, 200, { ok: true, value: next })
      return
    }
    writeJson(res, 405, { ok: false, error: { code: 'method-not-allowed', message: `method not allowed: ${req.method ?? ''}` } })
  }

  const statusHandler = (req, res) => {
    if (!isTrustedRequest(req)) {
      writeJson(res, 403, { ok: false, error: { code: 'forbidden', message: 'the status route is loopback-only' } })
      return
    }
    if (req.method !== 'GET' && req.method !== 'POST') {
      writeJson(res, 405, { ok: false, error: { code: 'method-not-allowed', message: `method not allowed: ${req.method ?? ''}` } })
      return
    }
    writeJson(res, 200, {
      ok: true,
      value: {
        packageRoot,
        moduleDir,
        configPath,
        configExists: existsSync(configPath),
        stateDir: resolveStateDir(env),
        packs: PACK_IDS.length,
        cues: CUE_IDS.length,
        scenarios: SCENARIO_IDS,
        prefs: readPrefs(env),
      },
    })
  }

  const disposers = [
    ctx.webServer.register({ kind: 'exact', path: `${ROUTE_PREFIX}/settings`, handler: settingsHandler }),
    ctx.webServer.register({ kind: 'exact', path: `${ROUTE_PREFIX}/status`, handler: statusHandler }),
  ]
  for (const dispose of disposers) {
    if (typeof ctx.effect === 'function') ctx.effect(() => dispose, 'dsh-ui-sound: settings route')
  }
  ctx.logger?.info?.('dsh-ui-sound: settings route mounted at %s (config=%s)', ROUTE_PREFIX, configPath)
}
