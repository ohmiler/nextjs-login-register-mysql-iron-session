import { NextResponse } from 'next/server';
import { getSession } from '../../../lib/session';

export async function GET(request) {
  try {
    const session = await getSession(request, NextResponse);
    
    if (!session.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json(session.user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
