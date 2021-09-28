const express = require('express');
const app = express();
var { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema')


const {createJSonWebToken} = require('./util/auth')
const{authenticate} = require('./middleware/auth')


app.use(authenticate);

app.get('/', (req, res)=>{
    console.log(req.verifiedUser);
    res.json({Message: "Hello World"})
})
app.get('/jwt', (req, res) =>{
    res.json({JWT: createJSonWebToken({
        userName: "Binh",
        age: 22,
        displayName: "Binh2311",
        passWord: "123456",
        admin: true,
    })})
})
app.use('/graphql', graphqlHTTP ({
    schema: schema,
    graphiql: true,
})
)

module.exports = app;