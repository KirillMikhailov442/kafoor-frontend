import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get('token')?.value;
  const refreshToken = req.cookies.get('refresh-token')?.value;

  if (!refreshToken && !accessToken) {
    const url = new URL('/login', req.url);
    // @ts-ignore
    url.searchParams.set('from', req.nextUrl);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};
export const config = {
  matcher: ['/', '/profile', '/create/:id', '/quizzes/:id'],
};
