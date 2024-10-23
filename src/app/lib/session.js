import { getIronSession } from 'iron-session';
import { ironOptions } from './config';

export async function getSession(request, response) {
  const session = await getIronSession(request, response, ironOptions);
  return session;
}