// Persists where to send the user after they finish signing up — needed because
// email verification opens in a fresh page load (the `redirect` query param from
// the register page can't simply flow through the link in the verification email).
const STORAGE_KEY = 'wt:postAuthRedirect'

export function setPostAuthRedirect(path: string) {
  if (path && path !== '/') localStorage.setItem(STORAGE_KEY, path)
}

export function consumePostAuthRedirect(): string {
  const path = localStorage.getItem(STORAGE_KEY)
  if (path) localStorage.removeItem(STORAGE_KEY)
  return path || '/'
}
