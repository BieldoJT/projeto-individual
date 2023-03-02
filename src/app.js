import mangasController from './controllers/mangasController.js'
import mangakaController from './controllers/mangakaController.js'
import publisherController from './controllers/publisherController.js'
import usuarioController from './controllers/usuarioController.js'

// Importando o packages
import express from 'express'
import cors from 'cors'

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// configurando o servidor para receber requisições qualquer origem
app.use(cors())

mangasController.rotas(app)
mangakaController.rotas(app)
publisherController.rotas(app)
usuarioController.rotas(app)

export default app
