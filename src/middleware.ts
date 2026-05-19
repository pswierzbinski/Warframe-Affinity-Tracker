import { NextRequest, NextResponse } from 'next/server';

const MOBILE_UA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  const isMobile = MOBILE_UA.test(ua);
  const { pathname } = req.nextUrl;

  const isAlreadyMobile = pathname.startsWith('/_mobile');
  const isAlreadyDesktop = pathname.startsWith('/_desktop');

if (isMobile && !pathname.startsWith('/mobile')) {
  return NextResponse.rewrite(new URL(`/mobile${pathname}`, req.url));
}

if (!isMobile && !pathname.startsWith('/desktop')) {
  return NextResponse.rewrite(new URL(`/desktop${pathname}`, req.url));
}
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mobile|desktop|Icons).*)',
  ],
};