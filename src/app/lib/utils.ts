// lib/utils/response.ts
import { NextResponse } from 'next/server';

export function createResponse(message: string, data: any = null, status: number) {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

export function createError(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}
