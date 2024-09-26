// app/api/entity/roles/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
    const roles = ["Full Access", "No Access"];
    return NextResponse.json(roles);
}