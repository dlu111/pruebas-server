import { Request, Response, NextFunction } from 'express';

class IndexController {
    
    public index(req: Request, res: Response, next: NextFunction) {
        //console.log(req.session);
        res.json({text: "🎉 El servicio API DE SITBCNBUS está funcionando! 🎉"});
    }
}

export default new IndexController();