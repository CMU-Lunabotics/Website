/**
 * Sync UPDATES_PASSWORD from GitHub Actions secrets into the Vercel project.
 * Vercel Preview/Production runtimes do not read GitHub repo secrets — only
 * variables stored on the Vercel project (or synced by this script).
 *
 * Required env: VERCEL_TOKEN, UPDATES_PASSWORD
 * Optional: VERCEL_TEAM_SLUG (default cmu-lunabotics), VERCEL_PROJECT_NAME (default moonminers-website)
 */

const token = process.env.VERCEL_TOKEN
const password = process.env.UPDATES_PASSWORD
const teamSlug = process.env.VERCEL_TEAM_SLUG ?? 'cmu-lunabotics'
const projectName = process.env.VERCEL_PROJECT_NAME ?? 'moonminers-website'
const targets = ['production', 'preview', 'development']

if (!token || !password) {
  console.log(
    'Skip: set VERCEL_TOKEN and UPDATES_PASSWORD in GitHub Actions secrets to sync to Vercel.'
  )
  process.exit(0)
}

async function vercel(path, options = {}) {
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const text = await res.text()
  let body
  try {
    body = text ? JSON.parse(text) : {}
  } catch {
    body = { raw: text }
  }
  if (!res.ok) {
    const msg = body?.error?.message ?? body?.message ?? res.statusText
    throw new Error(`${path} → ${res.status}: ${msg}`)
  }
  return body
}

async function main() {
  const teamData = await vercel(`/v2/teams?slug=${encodeURIComponent(teamSlug)}`)
  const teamId = teamData.teams?.[0]?.id
  if (!teamId) {
    throw new Error(`Vercel team not found for slug "${teamSlug}"`)
  }

  const project = await vercel(
    `/v9/projects/${encodeURIComponent(projectName)}?teamId=${teamId}`
  )
  const projectId = project.id
  if (!projectId) {
    throw new Error(`Vercel project not found: ${projectName}`)
  }

  const existing = await vercel(`/v9/projects/${projectId}/env?teamId=${teamId}`)
  const envRows = existing.envs ?? []

  for (const row of envRows.filter((e) => e.key === 'UPDATES_PASSWORD')) {
    await vercel(`/v9/projects/${projectId}/env/${row.id}?teamId=${teamId}`, {
      method: 'DELETE',
    })
    console.log(`Removed old UPDATES_PASSWORD (${(row.target ?? []).join(',')})`)
  }

  await vercel(`/v10/projects/${projectId}/env?teamId=${teamId}`, {
    method: 'POST',
    body: JSON.stringify({
      key: 'UPDATES_PASSWORD',
      value: password,
      type: 'encrypted',
      target: targets,
    }),
  })

  console.log(`Set UPDATES_PASSWORD for: ${targets.join(', ')}`)
  console.log(
    'Redeploy the Vercel preview (Deployments → Redeploy) so the new variable is picked up.'
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
