import Fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './app/routes'

const app = Fastify()

app.register(cors)
app.register(routes, { prefix: '/api' })

export default app
