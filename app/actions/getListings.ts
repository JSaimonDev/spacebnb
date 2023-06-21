import prisma from "@/app/libs/prismadb"

export interface IListingParams {
  userId?: string | null;
  guestCount?: number | null;
  roomCount?: number | null;
  bathroomCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  locationValue?: string | null;
  category?: string | null;
}

export default async function getListings(params: IListingParams) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params

        let query: any = {}

        if (userId) {
            query.userId = userId
        }
        
        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

            if (bathroomCount) {
        query.bathroomCount = {
            gte: +bathroomCount
        }
            }
        
        if (locationValue) {
            query.locationValue = locationValue
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            
                            {
                                endDate: { lte: startDate },
                                startDate: { gte: startDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

            if (listings.length === 0) {
            return []
        }

        const SafeListings = listings.map((listings) => ({
            ...listings,
            createdAt: listings.createdAt.toISOString()
        }))


        return SafeListings
    } catch (error: any) {
        throw new Error(error)
    }
}