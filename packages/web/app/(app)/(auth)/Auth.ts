"use client";

import React from "react";
import { useRouter } from "next/navigation";

import useSupabaseBrowser from "@/lib/supabase/utils/supabase-browser";
import { userStore } from "@/store/userStore";
import {
    watchUserLocation,
    clearWatch,
} from "@/utils/geolocation/watchUserLocation";

type Auth = {
    accessToken: string | undefined;
    children: React.ReactNode;
};

export default function Auth({ accessToken, children }: Auth) {
    const { user, setUser } = userStore((state) => state);

    const supabase = useSupabaseBrowser();
    const router = useRouter();

    React.useEffect(() => {
        let latitude: number;
        let longitude: number;
        let error: any;

        // Supabase authentication state change listener.
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event: any, session: any) => {

            if (session?.access_token !== accessToken) {
                router.refresh();
            }

            if (session) {
                const { id, email, created_at } = session.user;
                const {
                    firstname,
                    lastname,
                    country,
                    mobile,
                    referral_code,
                    referrer_code,
                } = session?.user?.user_metadata;

                setUser({
                    id,
                    firstname,
                    lastname,
                    email,
                    country,
                    mobile,
                    referral_code,
                    referrer_code,
                    created_at,
                    location: {
                        longitude: longitude,
                        latitude: latitude,
                        location: "",
                    },
                });

            }
        });

        // Init geolocation watcher.
        const successCallback = (position: GeolocationPosition) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        };
        const errorCallback = (error: any | string | GeolocationPositionError) => {
            error = `Error: ${error.message}`;
        };
        const watchId = watchUserLocation(successCallback, errorCallback);


        // Cleanup to unsubscribe from auth changes and stop watching the user's location.
        return () => {
            authListener?.unsubscribe();
            clearWatch(watchId);
        };

    }, [accessToken, supabase, router, setUser]);

    return children;
}
