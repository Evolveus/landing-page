import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContactRequest } from './server/contact.js'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  plugins: [
    react(),
    {
      name: 'contact-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', handleContactRequest)
      },
    },
  ],
})
