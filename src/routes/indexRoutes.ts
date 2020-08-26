//Método del servidor que devuelve un objeto en el que se encuentran las rutas
import { Router } from 'express';
import  indexController from '../controllers/indexController';

class IndexRoutes {

    public router: Router = Router();
    
    constructor() {
        this.configIndexRoutes();
    }

    //Método para configurar las rutas principales
    private configIndexRoutes():void {
        this.router.get('/', indexController.index);
    }
}

//Se exporta solo el router
export default new IndexRoutes().router;