import { NextResponse } from 'next/server';
import mockCooperatives from '@/data/mock-cooperatives.json';

export async function GET() {
  return NextResponse.json(mockCooperatives);
}
