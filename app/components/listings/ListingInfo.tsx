'use client'

import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import Image from "next/image"

interface ListingInfoProps {
    user: SafeUser
    description: string
    guestCount: number
    roomCount: number
    bathroomCount: number
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                text-xl
                font-semibold
                flex
                flex-row
                items-center
                gap-4
                "
                >
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div
                    className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                    "
                >
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="test-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Image src='/images/Milky_way_map.jpg' alt='planet gif' width={640} height={360} className="rounded-lg" />
        </div>
    );
}

export default ListingInfo;