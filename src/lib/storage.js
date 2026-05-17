const STORAGE_KEY = 'grad_tracker_v1'

export function loadState() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveState(state) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function clearState() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {}
}