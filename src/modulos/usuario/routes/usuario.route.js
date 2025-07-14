const express = require('express');
const UsuarioController = require('../controllers/usuario.controller')
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware')
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware')

const router = express.Router()

// rota de cadastro
router.post('/cadastrar', UsuarioController.cadastrar)

// rota de perfil
router.get('/perfil', AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil)

// rota de tarefa
router.get('/tarefa', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['professor']) )

module.exports = router