export const generatePoints = (data: number | undefined, type: string) => {
    if(data) {
		switch(type) {
			case "referrals":
				return data * 5;

			case "users":
				return data * 2;

			case "promotional":
				return data / 25 * 25;

			case "overall":
				return data / 25 * 25 + data * 5;

			default:
				return 0;
		}
	}
}