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
					sender: {
						include: {
							points: true
						}
					},
					receiver: {
						include: {
							points: true
						}
					}
				}
			},
			requests: {
				include: {
					receiver: {
						include: {
							points: true
						}
					},
					sender: {
						include: {
							points: true
						}
					}
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

export async function completeTask(id: string, taskTitle: string, points: number) {
	return db.points.create({
		data: {
			userId: id,
			points: points,
			task: taskTitle
		}
	});
}

export async function getCompletedTasks(id: string) {
	return db.points.findMany({
		where: { userId: id }
	});
}

// get user points
export async function getUserPoints(id: string) {
	return db.points.findMany({
		where: { userId: id }
	});
}

// get points from all users
export async function getPoints() {
	// need each user profile and sum of points
	return db.user
		.findMany({
			include: {
				points: true
			}
		})
		.then((users) => {
			return users.map((user) => {
				return {
					profile: user,
					points: user.points.reduce((acc, curr) => acc + curr.points, 0)
				};
			});
		});
}

// get points of each of the user's friends
export async function getFriendPoints(id: string) {
	const user = await db.user.findUnique({
		where: { id },
		include: {
			friends: {
				include: {
					sender: true,
					receiver: true
				}
			}
		}
	});
	const friends = user?.friends.map((friend) => {
		return friend.senderId === friend.receiverId ? friend.receiverId : friend.senderId;
	});
	const friendPoints = await db.user.findMany({
		where: {
			id: {
				in: friends
			}
		},
		include: {
			points: true
		}
	});
	return friendPoints.map((user) => {
		return {
			profile: user,
			points: user.points.reduce((acc, curr) => acc + curr.points, 0)
		};
	});
}
