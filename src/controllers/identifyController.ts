import { Request, Response, NextFunction } from 'express';
import { reconcileIdentity } from '../services/identify';
import { ValidationError } from '../utils/errors';

/**
 * POST /identify
 * Request: { email?: string, phoneNumber?: string }
 * At least one field must be present. Validation and errors are handled by the service.
 */
export async function identify(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, phoneNumber } = req.body ?? {};
    const result = await reconcileIdentity(email, phoneNumber);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
