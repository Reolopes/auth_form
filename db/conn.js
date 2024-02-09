const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('user', 'root', '', {
    dialect: "mysql",
    host: 'localhost'
})

try{

    sequelize.authenticate()
    console.log('Conectado ao banco de dados com sucesso!')

}catch(e){
    console.log(e.message)
}

module.exports = sequelize