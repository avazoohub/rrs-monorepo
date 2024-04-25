import { User } from "@/types";
import { TypedSupabaseClient } from "@/lib/supabase/utils/types";
import { saveBannerShare } from "@/utils/queries/banner";
import { getLocalStorageItem } from "@/utils/localstorage";

/**
 * Attempts to share a banner on LinkedIn and record the share in the database.
 * 
 * @param {TypedSupabaseClient} supabase - The Supabase client instance.
 * @param {User | null | undefined} user - The user information, can be null or undefined.
 * @returns {Promise<string>} 
 */
export async function useLinkedIn(supabase: TypedSupabaseClient, user: User | null | undefined): Promise<string> {
    const banner = getLocalStorageItem("banner") ?? null;
    const { code } = getLocalStorageItem("code") ?? null;

    // Ensure banner data and code are available
    if (!banner || !code) {
        return Promise.reject(new Error('Banner data missing or code is undefined'));
    }

    try {
        // Perform the LinkedIn share operation
        const response = await fetch("/api/share/linkedin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                bannerUrl: banner.site_url,
                bannerTitle: banner.name,
                bannerDesc: banner.description,
            }),
        });

        if (response.status !== 200) {
            throw new Error('LinkedIn share failed');
        }

        // Save the banner share record
        await saveBannerShare(
            supabase,
            user?.id,
            banner.id,
            "linkedin",
            banner.number_of_free_entries,
        );

        return 'Share successful';

    } catch (error) {
        console.error(`Something went wrong. ${error}`);
        throw error;
    }
}
