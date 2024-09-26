import { NextResponse } from 'next/server';

export async function GET() {
    const roles = ["No Access", "Basic Access", "Full Access"];
    return NextResponse.json(roles);
}