import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AttendanceTable from './AttendanceComponent/AttendanceTable.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AttendanceTable />
  </StrictMode>,
)
