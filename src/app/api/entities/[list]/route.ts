import { NextResponse } from 'next/server';

// Define the type for the entities group with flexible keys
interface EntitiesGroup {
    [key: string]: {
        [country: string]: string[]; // This allows any country name as a key
    };
}

// Define the entities group with flexible keys
const entitiesGroup: EntitiesGroup = {
    "Phoneix": {
        "England": ["Topco", "Midco"],
        "Luxembourg": ["Holdco", "Google", "Meta"],
    },
    "Jupiter": {
        "England": ["Alpha", "Beta"],
        "Germany": ["Gamma", "Delta"],
    },
    "Saturn": {
        "England": ["Alpha"],
        "France": ["Epsilon", "Zeta"],
    },
    "Pyramid": {
        "Spain": ["Eta", "Theta"],
        "Italy": ["Iota", "Kappa"],
    },
    "Nile": {
        "Egypt": ["Lambda", "Mu"],
        "Canada": ["Nu", "Xi"],
    },
};

export async function GET(
    request: Request,
    { params }: { params: { list: string } }
) {
    const structure = params.list;

    // Check if the structure exists in the entities group object
    if (entitiesGroup[structure]) {
        return NextResponse.json(entitiesGroup[structure]);
    } else {
        // Return a 404 response if the structure is not found
        return NextResponse.json({ error: 'Structure not found' }, { status: 404 });
    }
}
