import { NextResponse } from 'next/server';
import { comparePasswords } from '../../../lib/auth';
import { ironOptions } from '../../../lib/config';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

import pool from '../../../lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    const session = await getIronSession(cookies(), ironOptions);
    session.user = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    await session.save();

    return NextResponse.json(
        { 
            message: 'Logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        },
        { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}