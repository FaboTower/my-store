// src/composables/useTheme.js
import { ref, onMounted, onBeforeUnmount } from 'vue'

const THEME_KEY = 'theme'
const DEFAULT_THEME = 'acid'
const ALLOWED = ['auto', 'light', 'pastel', 'dark', 'aqua', 'acid']

export function useTheme() {
  const theme = ref(DEFAULT_THEME)
  let mediaQuery

  const appliedTheme = () => {
    if (theme.value !== 'auto') return theme.value
    // Detecta tema del sistema cuando se usa 'auto'
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  const setTheme = (name) => {
    if (!ALLOWED.includes(name)) name = DEFAULT_THEME
    theme.value = name
    document.documentElement.setAttribute('data-theme', name === 'auto' ? appliedTheme() : name)
    // Debug: registra el valor escrito en data-theme y el guardado
    const current = document.documentElement.getAttribute('data-theme')
    console.log('[theme] setTheme ->', name, 'applied:', current)
    localStorage.setItem(THEME_KEY, name)
  }

  onMounted(() => {
    const saved = localStorage.getItem(THEME_KEY)
    setTheme(ALLOWED.includes(saved) ? saved : DEFAULT_THEME)
    console.log('[theme] onMounted saved =', saved, 'default =', DEFAULT_THEME, 'applied =', document.documentElement.getAttribute('data-theme'))

    // Escucha cambios del sistema si el usuario selecciona 'auto'
    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        if (theme.value === 'auto') {
          document.documentElement.setAttribute('data-theme', appliedTheme())
          console.log('[theme] system change -> applied =', document.documentElement.getAttribute('data-theme'))
        }
      }
      // Safari/Chrome usan addEventListener, otros soportan addListener
      mediaQuery.addEventListener?.('change', handler)
      mediaQuery.addListener?.(handler)
      // Guardamos para poder remover en cleanup
      mediaQuery._handler = handler
    }
  })

  onBeforeUnmount(() => {
    if (mediaQuery && mediaQuery._handler) {
      mediaQuery.removeEventListener?.('change', mediaQuery._handler)
      mediaQuery.removeListener?.(mediaQuery._handler)
    }
  })

  return { theme, setTheme }
}