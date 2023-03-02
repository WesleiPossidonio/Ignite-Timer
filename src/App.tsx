import { ThemeProvider } from 'styled-components'

import { CyclesContextProvider } from './contexts/CyclesContexts'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultThemes } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
