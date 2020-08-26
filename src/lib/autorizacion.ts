import {Request, Response, NextFunction} from 'express';


class Autorizacion {

    public isLoggedIn(req: Request, res: Response, next: NextFunction) {

        if (req.session) { 
            return next();
        } else {
            res.status(441).send({scope: "auth", message: "El usuario no está autenticado"});
        }
        //Si el usuario está autenticado, es decir que se ha logeado correctamente, se permite ir a la siguiente función
        /* if (req.isAuthenticated()) {
             return next();
         }*/
        //return next();
        //Si el usuario no está autenticado se muestra un mensaje de error
        //res.status(441).send({scope: "auth", message: "El usuario no está autenticado"});
    }

    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            /*console.log(req.header('sitbcn')?.length);
            if (!req.header('sitbcn')) {
                return res.status(411).send('Unauhtorized Request2');
            }*/
            //console.log(req.session);
            console.log(req.cookies);
            console.log("Auth1");
            if (!req.headers.authorization) {
                return res.status(441).send({scope: "auth", message: "El usuario no está autorizado"});
            }
            console.log("Auth2");
            //let token = req.headers.authorization.split(' ')[1];
            let token = req.headers.authorization;
            if (token === 'null') {
                return res.status(441).send({scope: "auth", message: "El usuario no está autorizado"});
            }
            console.log(token);
            console.log(req.headers.authorization);
            console.log(req.cookies);
           /* const payload = await jwt.verify(token, 'PruebaSecret');
    
            if (!payload) {
                return res.status(403).send({scope: "auth", message: "El usuario no está autorizado"});
            }*/
    
            //req.userId = payload._id;
            return next();
    
        } catch(error) {
            return res.status(error.statusCode).send(error);
        }
    
    }
}

export default new Autorizacion();