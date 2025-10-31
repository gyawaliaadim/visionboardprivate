// lib/utils/response.ts
import { NextResponse } from 'next/server';
import { Board, Todo } from '@/types/models';
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

export function calculateNewPosition(
  boards: Board[]|Todo[]|undefined,
  toIndex: number,
  fromIndex?: number,
): number {
  if (boards===undefined)return 0;
  // If position not changed, return current position
  if (fromIndex === toIndex) return boards[fromIndex].position;

  // Moving to start
  if (toIndex === 0) {
    return boards[0].position / 2;
  }

  // Moving to end
  if (toIndex === boards.length - 1) {
    return boards[boards.length - 1].position + 1000;
  }

      const prev = boards[toIndex];
    const next = boards[toIndex+1];
    
    return (prev.position + next.position) / 2;
}