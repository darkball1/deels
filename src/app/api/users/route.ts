import { NextResponse } from 'next/server';

export async function GET() {
    const users = [
        { "user": "Ben Stockton", "email": "ben@dealsplus.io", "organisation": "Dealsplus" },
        { "user": "Sai Padala", "email": "sai@dealsplus.io", "organisation": "Dealsplus" },
        { "user": "Matt Wallis", "email": "matt@dealsplus.io", "organisation": "Phoneix" },
        { "user": "Tim Hill", "email": "tima@dealsplus.io", "organisation": "Phoneix" },

    ];
    return NextResponse.json(users);
}