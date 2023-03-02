import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'

import { DefaulLayout } from './layouts/DefaultLayout'
import { History, Home } from './pages'

export const Router = () => {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<DefaulLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </Routers>
  )
}
