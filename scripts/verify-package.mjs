/**
 * Package-shape verification for dsh-ui-sound.
 *
 * Runs on a bare Node with no dependencies, so CI and a local shell execute the
 * exact same checks. Everything it asserts is a claim the README or the DSH
 * loader depends on:
 *
 *   - the manifest is a well-formed DSH bundle (dsh.bundle.patch -> a real file)
 *   - every `exports` and `files` entry points at something that exists
 *   - the browser half is a loadable `window.__ModuleLoader__.load` factory
 *   - the Host half evaluates offline and still publishes the id tables the
 *     settings route and the browser half agree on
 *   - the documented counts (11 scenarios, 12 packs, 78 cues) are the real ones
 *
 * Usage: node scripts/verify-package.mjs
 */

import { readFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const notes = []

/** Record one assertion result. */
function check(label, ok, detail = '') {
  if (ok) notes.push(`  ok    ${label}${detail === '' ? '' : ` (${detail})`}`)
  else failures.push(`${label}${detail === '' ? '' : ` — ${detail}`}`)
}

// ---------------------------------------------------------------- manifest
const manifestPath = join(root, 'package.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

check('manifest name', manifest.name === 'dsh-ui-sound', manifest.name)
check('manifest is not private', manifest.private !== true)
check('manifest has a real LICENSE file', existsSync(join(root, 'LICENSE')))
check('manifest license field', manifest.license === 'MIT', String(manifest.license))
check('manifest has repository', typeof manifest.repository?.url === 'string' && manifest.repository.url.includes('github.com'))
check('manifest has author', typeof manifest.author === 'string' && manifest.author !== '')
check('manifest engines allow Node 22', />=20/.test(String(manifest.engines?.node)))

const patchRel = manifest.dsh?.bundle?.patch
check('dsh.bundle.patch declared', typeof patchRel === 'string', String(patchRel))
if (typeof patchRel === 'string') {
  check('dsh.bundle.patch exists', existsSync(join(root, patchRel)), patchRel)
  const patch = readFileSync(join(root, patchRel), 'utf8')
  check('bundle patch inserts the package name', patch.includes(`name: '${manifest.name}'`))
  check('bundle patch row id is ui-sound', /id:\s*ui-sound/.test(patch))
}

check('dsh.client platform is web', manifest.dsh?.client?.platform === 'web')
const clientInject = manifest.dsh?.client?.inject
check('dsh.client.inject is an array', Array.isArray(clientInject), JSON.stringify(clientInject))
check(
  'dsh.client.inject declares nothing the shipped build lacks',
  Array.isArray(clientInject) && clientInject.length === 0,
  JSON.stringify(clientInject),
)

for (const [key, rel] of Object.entries(manifest.exports ?? {})) {
  const target = typeof rel === 'string' ? rel : rel?.default
  check(`exports["${key}"] target exists`, typeof target === 'string' && existsSync(join(root, target)), String(target))
}

for (const entry of manifest.files ?? []) {
  check(`files entry exists: ${entry}`, existsSync(join(root, entry)))
}

// ------------------------------------------------------------ browser half
const clientPath = join(root, 'lib', 'client.js')
const client = readFileSync(clientPath, 'utf8')
check('client half uses the ModuleLoader protocol', client.includes('window.__ModuleLoader__.load('))
check('client half registers under the package name', client.includes(`id: "${manifest.name}"`))
check('client half requires only platform seeds', [...client.matchAll(/require\((?:"|')([^"']+)/g)].every((m) => m[1] === 'react'),
  [...client.matchAll(/require\((?:"|')([^"']+)/g)].map((m) => m[1]).join(', '))
check('vendored uisfx engine is inline', client.includes('//#region vendor/uisfx@0.4.0'))
check('client half exposes its own settings route', client.includes('/ui-sound/api/settings'))
check('client half reads pendingInteraction, not the removed pending field', client.includes('pendingInteraction') && !client.includes('snapshot.pending'))
check('client half does not read the removed list.current field', !client.includes('list.current'))

const vendor = join(root, 'vendor', 'uisfx-0.4.0.js')
check('vendored engine source kept for provenance', existsSync(vendor) && statSync(vendor).size > 10_000)

// -------------------------------------------------------------- host half
// lib/index.js imports only node: builtins, so it evaluates on a bare runtime.
const host = await import(new URL('../lib/index.js', import.meta.url).href)
const hostSource = readFileSync(join(root, 'lib', 'index.js'), 'utf8')
check('host half exports apply()', typeof host.apply === 'function')
check('host half injects only webServer', JSON.stringify(host.inject) === '["webServer"]', JSON.stringify(host.inject))
// The word itself is fine in prose (the file explains what the port replaced);
// what must never come back is reading the service.
check('host half never reads a webRuntime service', !/ctx\s*\.\s*webRuntime/.test(hostSource) && !hostSource.includes("get('webRuntime')") && !hostSource.includes('get("webRuntime")'))

check('scenario count matches the README', host.SCENARIO_IDS.length === 11, String(host.SCENARIO_IDS.length))
check('pack count matches the README', host.PACK_IDS.length === 12, String(host.PACK_IDS.length))
check('cue count matches the README', host.CUE_IDS.length === 78, String(host.CUE_IDS.length))

const defaults = host.DEFAULT_PREFS
check('default pack is zen', defaults.pack === 'zen', defaults.pack)
check('default volume is 0.55', defaults.volume === 0.55, String(defaults.volume))
check('every scenario has a default cue', host.SCENARIO_IDS.every((id) => typeof defaults.mapping[id] === 'string'))
check('every default cue exists in the cue table', Object.values(defaults.mapping).every((cue) => host.CUE_IDS.includes(cue)))

// The clamp behaviour the README promises for hand-edited config files.
const clamped = host.normalizePrefs({ volume: 9, pack: 'nope', mapping: { 'task.success': 'not-a-cue', 'click.send': 'send' } })
check('normalizePrefs clamps volume', clamped.volume === 1, String(clamped.volume))
check('normalizePrefs falls back on an unknown pack', clamped.pack === 'zen', clamped.pack)
check('normalizePrefs drops an unknown cue', clamped.mapping['task.success'] === 'success', clamped.mapping['task.success'])
check('normalizePrefs keeps a valid override', clamped.mapping['click.send'] === 'send', clamped.mapping['click.send'])

// ------------------------------------------------------------------ report
console.log(`dsh-ui-sound package verification — ${notes.length} passed, ${failures.length} failed`)
console.log(notes.join('\n'))
if (failures.length > 0) {
  console.error('\nFAILURES:\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log('\nall checks passed')
