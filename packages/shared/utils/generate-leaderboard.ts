// @ts-nocheck
import { User } from '@/types'

export const generateLeaderboard = (data: any) => {
	let arr: any = []

    if(data) {
		data.map(user => {
			let userData = user
			let userReferral = data.filter(fUser => fUser.referrer_code === user.referral_code)

			arr.push({
				user: userData,
				referral_count: userReferral.length
			})
		})

		return arr.sort((a, b) => b.referral_count - a.referral_count);
	}
}