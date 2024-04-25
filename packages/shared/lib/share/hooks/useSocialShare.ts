import React from 'react';
import { User, Banner } from '@/types';
import { SOCIAL_PLATFORMS } from '@/lib/constants'
import { authLinkedIn } from "@/lib/share/linkedin/authLinkedIn";
import { useFacebook } from "@/lib/share/facebook/useFacebook";
import { useLinkedIn } from "@/lib/share/linkedin/useLinkedIn";
import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";


type GenericPlatforms<T extends string> = {
  [K in T]?: boolean;
};
type AvailablePlatforms = typeof SOCIAL_PLATFORMS[number];


/**
 * Custom React hook to manage sharing features.
 * 
 * @param {User | null | undefined} user - The user who is sharing the content.
 * @param {Banner | undefined} banner - The banner content to be shared.
 * @returns An object containing methods to check share capability and share content, along with the share status.
 */
export const useSocialShare = (user: User | null | undefined, banner: Banner | undefined) => {
  const supabase = useSupabaseBrowser()
  const [hasShared, setHasShared] = React.useState<GenericPlatforms<AvailablePlatforms>>({});

  React.useEffect(() => {
    const shareStatus: GenericPlatforms<AvailablePlatforms> = SOCIAL_PLATFORMS.reduce((acc, platform) => ({
      ...acc, 
      [platform]: !canShare(platform),
    }), {});

    setHasShared(shareStatus);
  }, [banner]);


  /**
   * Checks if the user can share content on a given platform.
   * 
   * @param {Platform} platform - The social media platform to check.
   * @returns {boolean} - True if the user can share, false otherwise.
   */
  const canShare = (platform: string): boolean => {
    const now = Date.now();
   
    if (banner && banner.shares) {
      const hasShare = banner.shares.filter((share) => share.social_media === platform && share.user_id === user?.id);

      if (hasShare.length > 0) {
        return !hasShare.some((share) => {
            const shareDate = new Date(share.created_at);
            const difference = Math.abs(shareDate.getTime() - now);
          
            // 24 hours in milliseconds
            return difference < 86400000;
          }
        );
      }
    }
    return true;
  };


  /**
   * Attempts to share content on a given social media platform.
   * 
   * @param {Platform} socialPlatform - The platform on which to share content.
   * @returns {Promise<boolean>} - True if the content can be shared, false otherwise.
   */
  const share = (socialPlatform: string, code?: string | null | undefined): Promise<string | boolean | void> => {
    return new Promise((resolve, reject) => {
      if (canShare(socialPlatform)) {
        if (socialPlatform === 'linkedin') {
          if (!code) {
            authLinkedIn()
            return;
          }
        
          useLinkedIn(supabase, user).then(resolve).catch(reject);
          return;

        } else if (socialPlatform === 'facebook') {
          useFacebook(supabase, user).then(resolve).catch(reject);
          return;
        }
      }

      // If none of the if conditions match, resolve the promise without a value
    resolve();
    })
  };
  
  return { canShare, share, hasShared };
};
