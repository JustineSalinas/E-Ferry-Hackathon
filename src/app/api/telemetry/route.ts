import { NextResponse } from 'next/server';
import mockTelemetry from '@/data/mock-telemetry.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id && mockTelemetry.cooperativeId !== id) {
     return NextResponse.json({ error: "Telemetry not found" }, { status: 404 });
  }

  return NextResponse.json(mockTelemetry);
}
