// pages/_error.js
import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
import { useEffect, useState } from 'react';
import { getMaintainance } from './services/spot-prices';

// export default Error;
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)'
  ]
};

export default async function middleware(req: NextRequest) {
  // Check Edge Config to see if the maintenance page should be shown

  // ----------------------- getting dynamic value-------------------
  // const isInMaintenanceMode = await getMaintainance();

  // ----------------------- getting static value-------------------
  const isInMaintenanceMode = false;

  // If in maintenance mode, point the url pathname to the maintenance page
  if (isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintainance`;
    // Rewrite to the url
    return NextResponse.rewrite(req.nextUrl);
  } else if (isInMaintenanceMode === false) {
    return;
  }
}
