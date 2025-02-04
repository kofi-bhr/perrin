const API_BASE = '/api/proxy'  // Instead of process.env.NEXT_PUBLIC_API_URL

export async function fetchPapers() {
  const response = await fetch(`${API_BASE}/papers`)
  if (!response.ok) throw new Error('Failed to fetch papers')
  return response.json()
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) throw new Error('Login failed')
  return response.json()
} 