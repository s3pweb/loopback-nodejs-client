
var LoopbackClient = require('./src')

var loopbackClientWithAuth = new LoopbackClient(
    'http://localhost:13000/api',
    'admin@s3pweb.com',
    'admin')

loopbackClientWithAuth.setCustomloginPath('/users/login?include=user')

loopbackClientWithAuth.createToken()
    .then(function (token) {

        console.log('token',token)

        var Input = loopbackClientWithAuth.getModel('inputs')

        Input.find()
            .then(function (lists) {
                console.log(lists)

            })
            .catch(function (err) {
                console.log(err)
            })

    })
    .catch((err)=>{
        console.log('err',err)
    })