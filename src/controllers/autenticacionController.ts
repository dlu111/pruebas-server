import { Request, Response, NextFunction } from 'express';
import passport from 'passport';


class AutenticacionController {
    
    public LogIn(req: Request, res: Response, next: NextFunction) {
        res.json({message: 'Petición para logIn'});
    }

    public LogOut(req: Request, res: Response, next: NextFunction) {
        //Se limpian todos los datos de la sesion
        /*if (req.session) {
            req.session.destroy( (err) => {
                console.log(err);
            });
            req.session =  undefined;
        };*/
        req.logout();
       /*window.location.assign('https://accounts.google.com/logout');

        //res.redirect('https://accounts.google.com/logout');
        var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            user: "HOLA"
        }));*/
        res.status(200).send();
        
    }

    /*public Google(req: Request, res: Response, next: NextFunction) {
        
        //res.json({text: 'Petición para Google'});
        console.log("Llega a la ruta de google");
       /* passport.authenticate('google', {
            scope: ['profile']
            //scope: ['https://www.googleapis.com/auth/userinfo.email']
            },
            function(err, user, info) {
                console.log("Dentro de Goolge");
            }
        )(req, res, next);
       // res.json("HOLAAAA");
       console.log("Dentro de Goolge");
        console.log("Termina la ruta de google");

    }*/

    public GoogleCallBack(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("CALLBACK");
            var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                user: req.user/*,
                sesionId: req.sessionID*/
            }));
            res.status(200).send(req.user);

        } catch (error) {
            let statusCodeError;
            if (error.statusCode) {
                statusCodeError = error.statusCode;
            } else {
                statusCodeError = 440;
            }
            res.status(statusCodeError).send(error);
        }
    }

}

export default new AutenticacionController();