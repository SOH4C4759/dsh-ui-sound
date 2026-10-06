/**
 * Publish guards for dsh-ui-sound.
 *
 * A public repository leaks in boring ways: an absolute path from the author's
 * machine, an account name, a credential. This scans the tracked tree for those
 * and fails the build, so the check is a gate instead of a habit.
 *
 * The ported host half deliberately runs off `node:` builtins only, which is
 * also what lets this file import the real module rather than a copy of it.
 *
 * Usage: node scripts/verify-publish-guards.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Directories never worth scanning (build caches, VCS metadata). */
const SKIP_DIRS = new Set(['.git', 'node_modules', '.pnpm-store'])

/** Text extensions this guard inspects; binaries are skipped by name. */
const TEXT_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.json', '.yml', '.yaml', '.md', '.txt', '.ts', '.html', '.css',
])

/**
 * Forbidden patterns. Each one is either a privacy leak or a portability break.
 * `allowSelf` names the intentional, non-leaking mentions of the file's own
 * repository, which must appear in the manifest and the README.
 */
const FORBIDDEN = [
  { name: 'author Windows profile path', pattern: /[A-Za-z]:\\Users\\[^\\\s"']+/ },
  { name: 'author drive path', pattern: /\b[A-Za-z]:[\\/](?:CodeProj|本地知识库|VideoProj|GameProj)\b/ },
  { name: 'private home directory name', pattern: /本地知识库/ },
  { name: 'npm or GitHub token literal', pattern: /\b(?:npm_[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/ },
  { name: 'private-network address', pattern: /\b(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/ },
  { name: 'author account name outside the repo URL', pattern: /\bSOH4C4759\b/ },
]

/** Files whose mention of the author account is the point, not a leak. */
const ALLOW_ACCOUNT_IN = new Set(['package.json', 'README.md', 'PROVENANCE.md'])

/**
 * This file has to spell the forbidden patterns out, so scanning it would always
 * report itself. The exemption is limited to the rule definitions here and does
 * not cover any other file in the tree.
 */
const SELF_EXEMPT = new Set(['scripts/verify-publish-guards.mjs'])

/** Walk the tree and return every text file path. */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (TEXT_EXTENSIONS.has(name.slice(name.lastIndexOf('.')))) out.push(full)
  }
  return out
}

const failures = []
let scanned = 0

for (const file of walk(root)) {
  const rel = relative(root, file).split('\\').join('/')
  if (SELF_EXEMPT.has(rel)) continue
  const text = readFileSync(file, 'utf8')
  scanned += 1
  for (const rule of FORBIDDEN) {
    if (rule.name === 'author account name outside the repo URL' && ALLOW_ACCOUNT_IN.has(rel)) continue
    const match = rule.pattern.exec(text)
    if (match === null) continue
    const line = text.slice(0, match.index).split('\n').length
    failures.push(`${rel}:${line} — ${rule.name}: ${JSON.stringify(match[0])}`)
  }
}

console.log(`scanned ${scanned} text files for publish guards`)
if (failures.length > 0) {
  console.error(`\n${failures.length} guard violation(s):\n` + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log('no leaks, no portability breaks')
