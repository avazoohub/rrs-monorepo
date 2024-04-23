declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: {
            init: any;
            ui: any;
        };
    }
}

export type Session = {
    id: string | undefined | null;
    aud: string | undefined | null;
    role: string | undefined | null;
    email: string | undefined | null;
    email_confirmed_at: string | undefined | null;
    phone: string | undefined | null;
    confirmation_sent_at: string | undefined | null;
    confirmed_at: string | undefined | null;
    recovery_sent_at: string | undefined | null;
    last_sign_in_at: string | undefined | null;
    user_metadata: UserMetaData;
    created_at: string | undefined | null;
    updated_at: string | undefined | null;
};

export type UserMetaData = {
    country: string | undefined | null;
    firstname: string | undefined | null;
    lastname: string | undefined | null;
    mobile: string | undefined | null;
    referral_code: string | undefined | null;
    referrer_code: string | undefined | null;
};

export type Location = {
    longitude: number;
    latitude: number;
    location?: string;
};

export type User = {
    id: string | undefined | null;
    firstname: string | undefined | null;
    lastname: string | undefined | null;
    email: string | undefined | null;
    mobile: string | undefined | null;
    referral_code: string | undefined | null;
    referrer_code: string | undefined | null;
    country: string | undefined | null;
    created_at: string | undefined | null;
    location: Location;
};

type BannerShare = {
    id: string;
    banner_id: number;
    points: number;
    social_media: string;
    user_id: string;
    created_at: string;
};

export type Banner = {
    id: number;
    name: string;
    description: string;
    file: string;
    site_url: string;
    location_longitude2: number;
    location_latitude2: number;
    number_of_free_entries: number;
    is_international: number;
    is_featured: number;
    created_at: string;
    shares: BannerShare[] | null;

    // description: string,
    // end_date: string,
    // file: string,
    // id: number,
    // is_international: number,
    // is_special: boolean
    // is_welcome_banner: number,
    // is_youtube: number,
    // location_latitude: string,
    // location_latitude2: string,
    // location_longitude: string,
    // location_longitude2: string,
    // name: string,
    // number_of_free_entries: number,
    // radius: number,
    // redeem_time: string,
    // site_links: string,
    // site_url: string,
    // spin: number,
    // start_date: string,
    // survey: number,
    // survey_id: number,
    // timezone: string,
    // updated_at: string,
    // user_id: number,
};

export type Message = {
    content: string | undefined | null;
    created_at: string | undefined | null;
    id: string | undefined | null;
    title: string | undefined | null;
    type: string | undefined | null;
};


// Match It
export type AllDrawNumbers = {
    created_at: string,
    draw_number: number,
    draw_position: number,
    game_ads_id: number,
    game_id: number,
    id: number,
    is_match: number,
    is_player_game_number: number,
    number_draw_id: number,
    updated_at: string,
    user_id: number,
    user_timezone_picked: string,
}

export type BoardOrders = {
    created_at: string | null,
    game_id: number,
    id: number,
    number: number,
    position: number,
    updated_at: string | null,
}

export type Game = {
    board_size: number,
    created_at: string,
    current_day: number
    cycle: string,
    description: string,
    end_date: string,
    frequency: number,
    host_id: number,
    id: number,
    is_test_game: number,
    name: string,
    number_picking: number,
    number_picking_cycle: number,
    number_positon: string,
    pause_date: string | null,
    picking_date: string,
    repeat_number_frequency: number,
    start_date: string,
    status: string,
    updated_at: string,
}

export type GameAds = {
    created_at: string | null,
    id: number,
    img: string,
    link: string,
    src: string,
    updated_at: string | null,
}

export type PickedNumbers = {
    created_at: string | null,
    game_id: number,
    id: number,
    is_colored: number,
    number: number,
    player_game_id: number,
    updated_at: string | null,
    user_id: number,
}

export type GameUser = {
    accept_terms: string,
    ads_cycle: number,
    ads_played: string,
    android_notif: number,
    api_token: string,
    avatar: string,
    avazoo_email: string,
    city: string,
    country: string,
    created_at: string,
    daily_notifications: number,
    device: string,
    done_pop_up: number,
    email: string,
    email_verified_at: string | null,
    first_game_date: string | null,
    game_invites: number,
    gender: string,
    general_notification: number,
    id: number,
    ios_notif: number,
    is_eighteen: string,
    is_migrated: number,
    mobile_id: number,
    name: string,
    next_game_date: string | null,
    phone_number: string,
    role: string,
    state: string,
    timezone: string,
    timezone_id: number,
    token: string,
    updated_at: string,
    username: string,
}

export type MatchIt = {
    all_draw_numbers: AllDrawNumbers[],
    board_orders: BoardOrders[],
    four_numbers_draw: any,
    game: Game,
    game_ads: GameAds[],
    picked_numbers: PickedNumbers[],
    user: GameUser,
    status: 'success' | 'failure'
};