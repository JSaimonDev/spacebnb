import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const createdUsers = [];
  try {
    prisma.$connect()
    // Delete all data from all tables
    const deletedUsers = await prisma.user.deleteMany();
    const deletedAccounts = await prisma.account.deleteMany();
    const deletedListings = await prisma.listing.deleteMany();
    const deletedReservations = await prisma.reservation.deleteMany();

    // Create users
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
    await prisma.$disconnect();
  
    return NextResponse.json({
      message: 'Database reset successful',
      dataDeleted: {
        users: deletedUsers.count,
        accounts: deletedAccounts.count,
        listings: deletedListings.count,
        reservations: deletedReservations.count
      },
      dataSaved: createdUsers
    }, { status: 200 });

  }  catch (error) {
        console.error(error);
        return NextResponse.json( { message: 'Database reset failed' }, { status: 500 } );
    }
}