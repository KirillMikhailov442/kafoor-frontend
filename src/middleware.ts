import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const refreshToken = req.cookies.get('refresh-token')?.value;

  if (!refreshToken) {
    const url = new URL('/login', req.url);
    url.searchParams.set('from', req.nextUrl);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};
export const config = {
  matcher: ['/', '/profile', '/create', '/quizzes/:id'],
};
