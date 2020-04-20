import { sign } from 'jsonwebtoken';
import { JWTSECRET } from '../config/Secrets'

export async function generateJwtTokenHelper(args: any) {
    return await sign(args, JWTSECRET, { expiresIn: '60d' });
}