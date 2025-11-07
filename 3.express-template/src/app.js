import { initializeTracing } from './tracing.js'
await initializeTracing()

console.log('✅ Tracing initialized, starting server...')

// Só agora importamos o servidor (que importa express/mongoose)
await import('./server.js')
