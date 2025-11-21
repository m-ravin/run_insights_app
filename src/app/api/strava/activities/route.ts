import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('strava_access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                per_page: 30,
            },
        });

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error('Error fetching activities:', err.response?.data || err.message);
        return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
    }
}
