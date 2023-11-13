import { Router } from 'express';
import { addLogger } from '../utils/logger.js';

const loggerRouter = Router();

loggerRouter.get('/', addLogger, (req, res) => {
    req.logger.fatal('Esto es fatal');
    req.logger.error('Esto es error');
    req.logger.warning('Esto es warning');
    req.logger.info('Esto es info');
    req.logger.http('Esto es http');
    req.logger.debug('Esto es debug');

    res.send('ok');
});

export default loggerRouter;