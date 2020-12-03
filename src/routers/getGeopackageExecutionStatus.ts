import { Router } from 'express';
import { container } from 'tsyringe';
import { GetExecutionStatusController } from '../controllers/getGeopackageExecutionStatus';

const getExecutionStatusRouter = Router();
const controller = container.resolve(GetExecutionStatusController);

getExecutionStatusRouter.get(
  '/',
  controller.exportStatusRequestHandler.bind(controller)
);

export { getExecutionStatusRouter };
