import { User } from "@/types";
import { TypedSupabaseClient } from "@/lib/supabase/utils/types";
import { saveBannerShare } from "@/utils/queries/banner";
import { getLocalStorageItem } from "@/utils/localstorage";

/**
 * Shares a banner on Facebook using the FB.ui method and saves the share details asynchronously.
 * This function checks for the presence of the `banner` and the Facebook SDK initialization.
 * If either is missing, the promise is rejected with an appropriate error message.
 * On successful share, it attempts to save the share details using `saveBannerShare`.
 *
 * @param {Object} banner - The banner object to share. Must contain at least `site_url` and `id`.
 * @param {Object} supabase - The Supabase client instance for database operations.
 * @param {Object|null} user - The user object. Should contain the user's `id` if the user is logged in.
 * @returns {Promise<string>} A promise that resolves with a success message or rejects with an error.
 * 
 */
export function useFacebook(supabase: TypedSupabaseClient, user: User | null | undefined): Promise<string> {
    const banner = getLocalStorageItem("banner") ?? null;

    return new Promise((resolve, reject) => {
        // Check if banner data and FB window object are available
        if (!banner || !window.FB) {
            reject(new Error('Banner data missing or FB window not initialized'));
            return;
        }

        window.FB.ui(
            {
                display: "popup",
                method: "share",
                href: banner.site_url,
            },
            function (response: any) {
                // if (response && !response.error_message) {
                
                    // Save the banner share record
                    saveBannerShare(
                        supabase,
                        user?.id,
                        banner.id,
                        "facebook",
                        banner.number_of_free_entries,
                    ).then(() => {
                        resolve('Share successful');
                    }).catch((error) => {
                        reject(new Error('Failed to save banner share: ' + error.message));
                    });

                // } else {
                //     if (response && response.error_message) {
                //         reject(new Error('FB share failed: ' + response.error_message));
                //     } else {
                //         reject(new Error('FB share failed with no error message'));
                //     }
                // }
            }
        );
    });
}