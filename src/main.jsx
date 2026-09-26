import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProjectsPage, ProjectPage, NotFound } from './pages.jsx'
import './index.css'
import { Analytics } from "@vercel/analytics/react"

// Plain <a> links + pathname match; each route also has prerendered metadata (scripts/prerender.js).
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const slug = path.match(/^\/projects\/([^/]+)$/)?.[1]
const Page = path === '/' ? App
  : path === '/projects' ? ProjectsPage
  : slug ? () => <ProjectPage slug={slug} />
  : NotFound

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
    <Analytics />
  </React.StrictMode>,
)
