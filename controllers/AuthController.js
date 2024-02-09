const { where } = require('sequelize')
const User = require('../model/User')
const { raw } = require('express')
const bcrypt = require('bcryptjs')
const flash = require('express-flash')
const session = require('express-session')

module.exports = class AuthController {
    static login(req, res) {
        res.render("auth/login")

    }

    static register(req, res) {
        res.render("auth/register")
    }

    static async registered(req, res) {

        const { name, email, password, confirmpassword } = req.body

        /* Password match validation  */

        if (password != confirmpassword) {
            req.flash("message", "As senhas não conferem")
            res.render("auth/register")

            return
        }

        /* Check if user exists */

        const emailExists = await User.findOne({ where: { email: email } })

        if (emailExists) {
            req.flash("message", "O e-mail já está cadastrado!")
            res.render("auth/register")

            return
        }

        /* Hashed Password */

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }
        try {
            const createdUser = await User.create(user)

            /* Initialize session */

            req.session.userid = createdUser.id

            req.flash("message", "Cadastro realizado")

            req.session.save(() => {
                res.redirect("/")
            })
        } catch (e) {
            console.log(e.message)
        }

    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect("/login")
    }

    static async existsAccount(req, res) {

        const { email, password } = req.body

        const authUser = await User.findOne({ where: { email: email } })

        if (!authUser) {
            req.flash("message", "E-mail não cadastrado")
            res.render("auth/login")
            return
        }

        const passwordMatch = bcrypt.compareSync(password, authUser.password)

        if (!passwordMatch) {
            req.flash("message", "Senha inválida")
            res.render("auth/login")
            return
        }

        req.session.userid = authUser.id
        req.flash("message", "login efetuado com sucesso")

        req.session.save(() => {
            res.redirect("/")
        })
    }


}  