import { db } from '$lib/prisma';
import { FriendStatus } from '@prisma/client';
import { generateId } from 'lucia';

// send a friend request
export async function sendFriendRequest(senderId: string, receiverId: string) {
	return await db.friend.create({
		data: {
			senderId,
			receiverId,
			status: FriendStatus.PENDING
		}
	});
}

// accept a friend request
export async function acceptFriendRequest(id: string) {
	await db.friend.update({
		where: { id },
		data: { status: FriendStatus.ACCEPTED }
	});
}

// reject a friend request
export async function rejectFriendRequest(id: string) {
	await db.friend.update({
		where: { id },
		data: { status: FriendStatus.REJECTED }
	});
}

// cancel a friend request
export async function cancelFriendRequest(id: string) {
	await db.friend.update({
		where: { id },
		data: { status: FriendStatus.CANCELLED }
	});
}

// get user profile
export async function getUserProfile(id: string) {
	return db.user.findUnique({
		where: { id },
		include: {
			friends: {
				include: {
					sender: true,
					receiver: true
				}
			},
			requests: {
				include: {
					receiver: true,
					sender: true
				}
			}
		}
	});
}

export async function resetInviteCode(id: string) {
	return db.user.update({
		where: { id },
		data: { inviteCode: generateId(6) }
	});
}
