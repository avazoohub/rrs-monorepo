'use server'

import { NextResponse, NextRequest } from 'next/server'

export async function postSeletedNumber(request: NextRequest): Promise<any> {
    const MATCHIT_URL = process.env.NEXT_PUBLIC_MATCHIT_BASEURL
    const GAME_ID = 1548
    const USER_ID = 2
    const API_TOKEN = 'rpAXSj'
    const AD_ID = 21
    
    const { draw_number, draw_position, is_match, number_draw_id } = await request.json(); 
    console.log('request', request.json());
    
    const response = await fetch(`${MATCHIT_URL}/api/user/save-draw?draw_id=${number_draw_id}&draw_number=${draw_number}&game_id=${GAME_ID}&is_match=${is_match}&api_token=${API_TOKEN}&user_id=${USER_ID}&game_ad_id=${AD_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: await request.json(),
    });

    const data = await response.json();
    if (!data.status) {
        throw new Error('Something went wrong.');
    }

    console.log('data', data);
    
    return data;
}