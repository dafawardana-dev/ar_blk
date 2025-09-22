import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUser = async (req, res) => {
    try {
        const user = await prisma.dataUser.findMany();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
  
    }
}

