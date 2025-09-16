const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 3000;

app.use(express.static('public'))

app.use(session({
    // Middleware para configurar a sessão
    secret: 'meusegredoseguro',
    resave:false, // nao renoar a sessao a cada req
    saveUninitialized: true,

    cookie: { secure: false,
        maxAge: 60 * 100, // 1 minuto
    }

}))

//middleware para ler o corpo da req em JSON
app.use(express.json())

app.get('/',(req,res)=>{

if(req.session.usuario){
    if(req.session.visitas){
        req.session.visitas++
    } else {
        req.session.visitas = 1
    }
    res.send(`Olá ${req.session.usuario}! Você visitou esta página ${req.session.visitas} vezes.`);
    

} else{ 
    res.send('Você visitou esta página 1 vez. Faça Login')

}

})

app.post('/login', (req,res)=>{

    const {username, password} = req.body
    if (username === 'arthur' && password === "321"){

        req.session.usuario = username
        res.send('Login bem sucedido!')
    } 
    else{
        res.send('Credenciais Inválidas!')
    }
})

app.get('perfil', (req, res)=>{

    if(req.session.usuario){

        res.send(`Bem vindo ao seu perfil ${req.session.usuario}`)
        
    } else{
        res.send('Faça o login primeiro');
    }


})

app.get('/logout', (req, res)=>{

    req.session.destroy((err) => {
        if(err){
            return res.send('Erro ao sair')
        }
        res.send('Logout realizado!')
    })
})

app.listen(PORT, ()=>{

    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

