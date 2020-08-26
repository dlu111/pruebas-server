import { Router } from 'express';
import passport from 'passport';

import autenticacionController from '../controllers/autenticacionController';
//import autorizacion from '../lib/autorizacion';

class AutenticacionRoutes {

    public router: Router = Router();

    constructor() {
        this.configAutenticacionRoutes();
    }

    //Método para configurar las rutas
    private configAutenticacionRoutes(): void {
        // ****FUNCIONA****
        //ruta POST para verificar si el usuario se puede logear
        //this.router.post('/login', autenticacionController.LogIn);
        this.router.get('/login', autenticacionController.LogIn);
        //Ruta para terminar la sesión de usuario y limpiar todos los objetos.
        this.router.get('/logout', autenticacionController.LogOut);
        //Ruta de callback para Google para que se redirecciones
        this.router.get('/google/callback', passport.authenticate('google'), autenticacionController.GoogleCallBack);
        //Ruta para autenticar el usuario con Google
        this.router.get('/google',passport.authenticate('google', { 
            scope: ['profile','email'], 
            prompt: 'select_account',
            session:false
            })
        );
        /*this.router.get('/google',passport.authenticate('google', { 
            scope: ['profile','email'], 
            prompt: 'select_account',
            session:false
            }), 
            autenticacionController.Google
        );*/

    }
}

//Se exporta solo el router
export default new AutenticacionRoutes().router;