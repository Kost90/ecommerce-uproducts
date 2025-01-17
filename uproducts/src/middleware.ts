import { NextRequest, NextResponse } from 'next/server';
import { isValidPassword } from './helpers/isValidpassword';

// Middleware for take accese to the admin route
export default async function Middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }
}

// Function for checking username and password thaht store in env file.
async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');

  if (authHeader === null) return false;

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

  return username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && (await isValidPassword(password, process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string));
}

export const config = {
  matcher: '/admin/:path*',
};
