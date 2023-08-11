import prisma from '@/app/libs/prismadb'
import { Prisma } from '@prisma/client';
import { create } from 'domain';
import { NextRequest, NextResponse } from 'next/server';

type Listing = {
          title: string
        description: string
        imageSrc: string
        category: string
        roomCount: number
        bathroomCount: number
        guestCount: number
        locationValue: string
        price: number
  user: {
    connect: {
            id: string
          }
        }
}

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
    
        console.log(empireUser)
    
        const rebelUser = await prisma.user.findFirst({
      where: {
        name: 'The Rebel Alliance'
      },
      select: {
      id: true,
      }
    })

    const listings = [
      {
        title: 'Sarang Base',
        description: 'Earthers need helium-3 for their fusion reactors, and Sarang Base is the main source. Are you cut for this job?',
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691720420/spacebnb/moon_4k_04_saeffm.jpg',
        category: 'Satellite',
        roomCount: 1,
        bathroomCount: 1,
        guestCount: 1,
        locationValue: 'Moon',
        price: 0,
        user: empireUser
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
        price: 60,
        user: empireUser
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
              price: 0,
        user: rebelUser
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
        price: 120,
        user: empireUser
      },
        {
        title: '2 bedroom apartment in Boralis',
        description: 'Brais is considered one of the most inhospitable worlds in the Kropulu sector. Over sixty percent of the rocky planet is covered in ice sheets, some of which are over two miles thick. Glacial erosion has created a network of steep, jagged mountain ranges and valleys over the millennia',
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691721356/spacebnb/big_hunting_game_on_an_ice_planet_by_klauspillon_d8j84eb-fullview_sg5pkc.jpg',
        category: 'Ice Planet',
        roomCount: 2,
        bathroomCount: 2,
        guestCount: 4,
        locationValue: 'Braxis',
          price: 400,
        user: rebelUser
      },
                {
        title: 'Luxury penthouse',
        description: "Glittering atop one of Coruscant's highest city-spires, this luxurious penthouse apartment is located at the heart of the prestigious Senate District. It features elegant traditional Republic architecture, roomy interiors, and a view of the city skyline to rival any on Coruscant. Discreet but robust security features ensure that only the owner's chosen guests can gain access.",
        imageSrc: 'https://res.cloudinary.com/dqunjerlj/image/upload/v1691727903/spacebnb/coruscant_gqll1i.jpg',
        category: 'Terrestrial Planet',
        roomCount: 4,
        bathroomCount: 5,
        guestCount: 6,
        locationValue: 'Coruscant',
        price: 95000,
        user: rebelUser
      }
    ]

        


      for (const listing of listings) {
  const listingData: Listing = {
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
        id: listing.user!.id
      }
    }
  }
        
        if (listing.user) {
          listingData.user = {
            connect: {
              id: listing.user.id
            }
          }
  }


  const createdListing = await prisma.listing.create({
    data: listingData,
  });

  createdListings.push(createdListing);
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