import { FastifyInstance } from 'fastify'

import Music from './controllers/MusicController'

export async function routes(app: FastifyInstance): Promise<void> {
  app.post('/music/store', Music.store)
  app.get('/music/:id', Music.findById)
  app.put('/music/edit/:id', Music.edit)
  app.get('/musics', Music.getAll)
  app.delete('/music/delete/:id', Music.delete)
  app.delete('/music/deleteAll', Music.deleteAll)
}
