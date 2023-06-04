import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MinesweeperApp from './minesweeper/MinesweeperApp.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MinesweeperApp />
  </React.StrictMode>,
)
