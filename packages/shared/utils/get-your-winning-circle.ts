// @ts-nocheck
import { TUser } from '@/types/index'

type TGenerateWinningCircle = {
	users: TUser[] | undefined,
	uid: string
}

export const generateWinningCircle = ({ users, uid }: TGenerateWinningCircle) => {
	if (users) return users && users.length - users.findIndex((user) => user.id === uid)

	return 0
}