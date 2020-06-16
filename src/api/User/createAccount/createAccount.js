import { prisma } from "../../../../generated/prisma-client";

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const {
				username,
				email,
				firstName = "",
				lastName = "",
				bio = ""
			} = args;
			const exists = await prisma.$exists.user({
				where: {
					OR: [{ username }, { email }]
				}
			});
			if (exists) {
				throw Error("This username / Email is already taken");
			}
			await prisma.createUser({
				username,
				email,
				firstName,
				lastName,
				bio
			});
			return true;
		}
	}
};
