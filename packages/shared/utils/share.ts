type Share = {
    url: string
}
export default function Share({
    url
}: Share) {
    window.FB.ui(
    {
        method: "share",
        href: url,
    },
    function (response: any) {
        if (response && !response.error_message) {
            return 'Share success.'
        } else {
            return 'Something went wrong. Try again.'
        }
    }
    );
}