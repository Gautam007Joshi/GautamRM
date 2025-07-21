import { NextResponse } from 'next/server';
import { pingGoogle } from '@/lib/pingGoogle';

export async function GET() {
  try {
    await pingGoogle();
    return NextResponse.json({ success: true, message: 'Pinged Google successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
