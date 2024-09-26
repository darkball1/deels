import { NextResponse } from 'next/server';

export async function GET() {
    const structures = ["Phoneix", "Jupiter", "Saturn", "Pyramid", "Nile"];
    return NextResponse.json(structures);
}