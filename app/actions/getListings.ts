import prisma from "@/app/libs/prismadb"

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

            if (listings.length === 0) {
            return []
        }


        return listings
    } catch (error: any) {
        throw new Error(error)
    }
}