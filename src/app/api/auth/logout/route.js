import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../../lib/config';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const session = await getIronSession(cookieStore, ironOptions);
    
    // Clear the user data from the session
    session.user = undefined;
    await session.save();
    
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}