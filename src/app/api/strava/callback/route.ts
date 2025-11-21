import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.json({ error: `Strava auth error: ${error}` }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
    }

    try {
        const clientId = process.env.STRAVA_CLIENT_ID;
        const clientSecret = process.env.STRAVA_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            throw new Error('Missing environment variables');
        }

        const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
        });

        const { access_token, refresh_token, expires_at } = response.data;

        // In a real app, you'd store these securely (e.g., HTTP-only cookies, encrypted session)
        // For this MVP, we'll set them as cookies
        const res = NextResponse.redirect(new URL('/', request.url));

        res.cookies.set('strava_access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_at - Math.floor(Date.now() / 1000),
            path: '/',
        });

        res.cookies.set('strava_refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        return res;

    } catch (err: any) {
        console.error('Error exchanging token:', err.response?.data || err.message);
        return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
    }
}
