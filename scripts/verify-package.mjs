/**
 * Runtime-contract verification for dsh-ui-sound.
 *
 * This is the *complement* of `scripts/verify-bundle.mjs`, not a second opinion
 * on it. That script owns the published-shape contract (manifest identity,
 * `dsh.bundle.patch`, every `exports`/`files` target, entry-file syntax) and runs
 * both on the checkout and against an unpacked release archive. This one owns the
 * things a shape check cannot see:
 *
 *   - the metadata a *public* release needs, not just a loadable bundle
 *     (a real LICENSE file, no `private: true`, repository/author)
 *   - browser-half invariants: one ModuleLoader factory, platform seeds only,
 *     and no read of an API the current dsh removed
 *   - the Host half evaluated offline, which is possible because it depends on
 *     `node:` builtins only; its id tables and defaults are then checked against
 *     the numbers the README promises, so document drift is a red build
 *   - the preference-clamping behaviour the README promises for hand-edited files
 *
 * No dependencies, so CI and a local shell run the identical code.
 *
 * Usage: node scripts/verify-package.mjs
 */

import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const passed = []

/** Record one assertion result. */
function check(label, ok, detail = '') {
  const suffix = detail === '' ? '' : ` (${detail})`
  if (ok) passed.push(`  ok    ${label}${suffix}`)
  else failures.push(`${label}${suffix}`)
}

// ------------------------------------------------- release metadata (public)
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

check('not publishable as private', manifest.private !== true)
check('a real LICENSE file exists', existsSync(join(root, 'LICENSE')))
check('license field', manifest.license === 'MIT', String(manifest.license))
check('repository points at a public host', String(manifest.repository?.url ?? '').includes('github.com'))
check('author is set', typeof manifest.author === 'string' && manifest.author !== '')
check('engines.node documents the supported runtime', typeof manifest.engines?.node === 'string', String(manifest.engines?.node))
check('meta.title is set for the plugin list', typeof manifest.meta?.title === 'string' && manifest.meta.title !== '')
check('meta.description is set for the plugin page', typeof manifest.meta?.description === 'string' && manifest.meta.description !== '')

// The phantom-package bug the port fixed: the stock manifest declared an external
// that does not exist in the shipped build. Nothing may be declared here that the
// bundle does not actually request.
const clientInject = manifest.dsh?.client?.inject
check('dsh.client.inject is an array', Array.isArray(clientInject), JSON.stringify(clientInject))
check('dsh.client.inject declares no non-existent external', Array.isArray(clientInject) && clientInject.length === 0, JSON.stringify(clientInject))
check('dsh.client.platform is web', manifest.dsh?.client?.platform === 'web')

// ------------------------------------------------------- browser-half contract
const client = readFileSync(join(root, 'lib', 'client.js'), 'utf8')
const requires = [...client.matchAll(/require\((?:"|')([^"']+)/g)].map((m) => m[1])

check('client half uses the ModuleLoader protocol', client.includes('window.__ModuleLoader__.load('))
check('client half registers under the package name', client.includes(`id: "${manifest.name}"`))
check('client half requires only platform seeds', requires.every((r) => r === 'react'), requires.join(', ') || 'none')
check('vendored uisfx engine is inline', client.includes('//#region vendor/uisfx@0.4.0'))
check('client half targets its own settings route', client.includes('/ui-sound/api/settings'))
// Regression guards for the exact 0.2.0 breakages reported upstream as issue #3.
check('client half reads pendingInteraction, not the removed `pending`', client.includes('pendingInteraction') && !client.includes('snapshot.pending'))
check('client half never reads the removed `list.current`', !client.includes('list.current'))

const vendor = join(root, 'vendor', 'uisfx-0.4.0.js')
check('vendored engine source kept for provenance', existsSync(vendor) && statSync(vendor).size > 10_000)

// ---------------------------------------------------------- host-half contract
// lib/index.js imports only node: builtins, so it evaluates on a bare runtime.
const host = await import(new URL('../lib/index.js', import.meta.url).href)
const hostSource = readFileSync(join(root, 'lib', 'index.js'), 'utf8')

check('host half exports apply()', typeof host.apply === 'function')
check('host half injects only webServer', JSON.stringify(host.inject) === '["webServer"]', JSON.stringify(host.inject))
// The word may appear in prose (the file explains what the port replaced); what
// must never come back is reading the service.
check(
  'host half never reads a webRuntime service',
  !/ctx\s*\.\s*webRuntime/.test(hostSource) && !hostSource.includes("get('webRuntime')") && !hostSource.includes('get("webRuntime")'),
)

// Documented counts: the README states 11 scenarios, 12 packs, 78 cues.
check('scenario count matches the README', host.SCENARIO_IDS.length === 11, String(host.SCENARIO_IDS.length))
check('pack count matches the README', host.PACK_IDS.length === 12, String(host.PACK_IDS.length))
check('cue count matches the README', host.CUE_IDS.length === 78, String(host.CUE_IDS.length))

const defaults = host.DEFAULT_PREFS
check('default pack is zen', defaults.pack === 'zen', defaults.pack)
check('default volume is 0.55', defaults.volume === 0.55, String(defaults.volume))
check('every scenario has a default cue', host.SCENARIO_IDS.every((id) => typeof defaults.mapping[id] === 'string'))
check('every default cue exists in the cue table', Object.values(defaults.mapping).every((cue) => host.CUE_IDS.includes(cue)))

// The clamp behaviour the README promises for a hand-edited config file.
const clamped = host.normalizePrefs({ volume: 9, pack: 'nope', mapping: { 'task.success': 'not-a-cue', 'click.send': 'send' } })
check('normalizePrefs clamps volume', clamped.volume === 1, String(clamped.volume))
check('normalizePrefs falls back on an unknown pack', clamped.pack === 'zen', clamped.pack)
check('normalizePrefs drops an unknown cue', clamped.mapping['task.success'] === 'success', clamped.mapping['task.success'])
check('normalizePrefs keeps a valid override', clamped.mapping['click.send'] === 'send', clamped.mapping['click.send'])

// ------------------------------------------------------------------- report
console.log(`verify-package: ${manifest.name}@${manifest.version} — ${passed.length} passed, ${failures.length} failed`)
console.log(passed.join('\n'))
if (failures.length > 0) {
  console.error('\nFAILURES:\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log('verify-package: OK')
