import prisma from '@/app/libs/prismadb'
import { create } from 'domain';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const createdUsers = [];
  const createdListings =[]
  try {
    prisma.$connect()

    const deletedUsers = await prisma.user.deleteMany();
    const deletedAccounts = await prisma.account.deleteMany();
    const deletedListings = await prisma.listing.deleteMany();
    const deletedReservations = await prisma.reservation.deleteMany();

    const users = [
      {
        name: 'The Galactic Empire',
        email: 'vader@empire.com',
        image: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691651314/spacebnb/cyber_darth_vader_by_ugain_dfnihxf-pre_x2yhho.jpg',
      },
      {
        name: 'The Rebel Alliance',
        email: 'ackbar@rebels.com',
        image: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691651314/spacebnb/Ackbar_milestone_ROTJ_cover_1_fv0kul.jpg',
      }
    ];

    const listings = [
      {
        title: 'Earth moon villa',
        description: 'Beautiful house on earth moon',
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691654186/spacebnb/moon_villa_vwkkxp.jpg',
        category: 'Satellite',
        roomCount: 3,
        bathroomCount: 2,
        guestCount: 6,
        locationValue: 'Moon',
        price: 150,
      },
      {
        title: 'Bunk bed in orbit station',
        description: 'Enjoy the wonderful views and study this enigmatic planet',
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691657014/spacebnb/gas-giant_drzo4q.jpg',
        category: 'Gas Giant',
        roomCount: 6,
        bathroomCount: 2,
        guestCount: 30,
        locationValue: 'KELT-9b',
        price:60
      },
            {
        title: 'Endurance spaceship',
        description: 'Live the last moments of this expedition trying to save humanity from extinction',
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691657626/spacebnb/gargantua_wmmiw7.webp',
        category: 'Black Hole',
        roomCount: 1,
        bathroomCount: 1,
        guestCount: 5,
        locationValue: 'Gargantua',
        price: 0
      },
                        {
        title: 'Klegger Corp Mining Facility',
        description: 'The facility used electromagnetic extraction technologies as well as manual Mustafarian and droid extraction. Owned by the Techno Union',
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691658432/spacebnb/KleggerCorpMiningFacility_sueotg.webp',
        category: 'Lava Planet',
        roomCount: 8,
        bathroomCount: 2,
        guestCount: 16,
        locationValue: 'Mustafar',
        price: 120
      }
    ]

        
    for (const user of users) {
      const createdUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
      createdUsers.push(createdUser);
    }

    const empireUser = await prisma.user.findFirst({
      where: {
        name: 'The Galactic Empire'
      },
      select: {
      id: true,
      }
    })

        const rebelsUser = await prisma.user.findFirst({
      where: {
        name: 'The Galactic Empire'
      },
      select: {
      id: true,
      }
    })

    if (empireUser) {
      for (const listing of listings) {
        const createdListing = await prisma.listing.create({
          data: {
            title: listing.title,
            description: listing.description,
            imageSrc: listing.imageSrc,
            category: listing.category,
            roomCount: listing.roomCount,
            bathroomCount: listing.bathroomCount,
            guestCount: listing.guestCount,
            locationValue: listing.locationValue,
            price: listing.price,
            user: {
          connect: {
            id: empireUser.id
          }
        }
          },
        });
        createdListings.push(createdListing);
      }
    }

    await prisma.$disconnect();
  
    return NextResponse.json({
      message: 'Database reset successful',
      dataDeleted: {
        users: deletedUsers.count,
        accounts: deletedAccounts.count,
        listings: deletedListings.count,
        reservations: deletedReservations.count
      },
      usersCreated: createdUsers,
      listingsCreated: createdListings
    }, { status: 200 });

  }  catch (error) {
        console.error(error);
        return NextResponse.json( { message: 'Database reset failed' }, { status: 500 } );
    }
}