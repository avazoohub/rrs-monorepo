'use server'

import { cookies } from 'next/headers'
import { createClient } from '../../../lib/supabase/server'

/**
 * Updates the points for a user based on auction points and optionally overall points.
 *
 * @param {string | undefined | null} uid - User's ID
 * @param {number} auction - Points to update from the auction.
 * @param {number} [overall] - Optional. The overall number of points to update. 
 * @returns {Promise<void | null>} 
 */
export async function addUserPoints(uid: string | undefined | null, points: number, type: string, overall?: number) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    let updatePayload: any = {};
    updatePayload['user_id'] = uid;
    updatePayload['points'] = points;
    updatePayload['type'] = type;

    if (overall !== undefined) {
        updatePayload['overall'] = overall;
    }

    if (uid) {
        const { data, error } = await supabase
            .from('user_points')
            .insert(updatePayload)
            .select()

        return { data, error }

    } else {
        throw new Error("User ID must be provided.");
    }

}