import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AttendanceTable from './component/AttendanceTable.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AttendanceTable />
  </StrictMode>,
)
