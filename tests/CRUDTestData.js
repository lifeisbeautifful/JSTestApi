export default class CRUDTestUserData{
    constructor(){

    }

    updateUserData = {
        request:{
            data:{
                "name": "changedName",
                "job": "changed job"
            }
        }
    }

    registerUserCreds = {
        data:{
            data:{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        },
        response:{
            "id": 4,
            "token": "QpwL5tke4Pnpja7X4"
        }

    }

    registerUrl = "https://reqres.in/api/register"
}