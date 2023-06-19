
import { SafeListing, SafeUser } from "../types"
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingReservation from "../components/listings/ListingReservation";
import ListingCard from "../components/listings/ListingCard";
import React from "react";

interface FavoritesClientProps {
    listings: SafeListing[]
    currentUser: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <div>
            <Container >
                <Heading
                    title="Trips"
                    subtitle="Where you've been and where you're going"
                />
                <div
                    className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                "
                >
                    {listings.map((listing) => (
                        <ListingCard
                            currentUser={currentUser}
                            key={listing.id}
                            data={listing}
                        />
                    ))}
                </div>
            </Container >
        </div>
    );
}

export default FavoritesClient;