const { where } = require("sequelize");
const usuario = require("../models/usuario.model");
const bcrypt =require('bcryptjs')

class usuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, matricula, email, senha } = req.body;
      if (!matricula || !nome || !email || !senha) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      await usuario.create({ nome, matricula, email, senha: senhaCriptografada });
      res.status(200).json({ msg: 'usuario criado com sucesso' });
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  }
  static async perfil(req, res) {
    try {
      const { matricula } = req.usuario
      const usuario = await usuario.findOne({
        where: {matricula},
        attributes: ['nome','email', 'matricula']
      });
      if (!usuario) {
        return res.status(401).json({ msg: "Não existe usuario cadastrado!" });
      }
      res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  }
}

module.exports = usuarioController