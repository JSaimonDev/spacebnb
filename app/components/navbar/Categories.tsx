'use client'

import Container from "../Container"
import CategoryBox from "../CategoryBox"

import { FaEarthAsia } from 'react-icons/fa6'
import {
    GiMoonOrbit, GiAsteroid, GiCometSpark, GiLava, GiFrozenOrb, GiJupiter,
    GiAtomicSlashes, GiSun, GiDustCloud, GiBlackHoleBolas, GiLeechingWorm
} from 'react-icons/gi'
import { IoWater } from 'react-icons/io5'
import { SiSaturn, SiQuasar } from 'react-icons/si'

import { usePathname, useSearchParams } from "next/navigation"


export const categories = [
    {
        label: 'Moon',
        icon: GiMoonOrbit,
        description: 'Satellite'
    },
    {
        label: 'Asteroid',
        icon: GiAsteroid,
        description: 'Minor rock planet'
    },
    {
        label: 'Comet',
        icon: GiCometSpark,
        description: 'Icy space object with gas tail'
    },
    {
        label: 'Terrestrial',
        icon: FaEarthAsia,
        description: 'Terrestrial planet'
    },
    {
        label: 'Ocean',
        icon: IoWater,
        description: 'Ocean planet'
    },
    {
        label: 'Lava',
        icon: GiLava,
        description: 'Lava planet'
    },
    {
        label: 'Ice',
        icon: GiFrozenOrb,
        description: 'Ice planet'
    },
    {
        label: 'Gas Giant',
        icon: GiJupiter,
        description: 'Gas giant planet'
    },
    {
        label: 'Rings',
        icon: SiSaturn,
        description: 'Planet with rings'
    },
    {
        label: 'Red Giant',
        icon: GiSun,
        description: 'Luminous giant star'
    },
    {
        label: 'Neutron Star',
        icon: GiAtomicSlashes,
        description: 'The collapsed core of a supergiant star'
    },
    {
        label: 'Nebula',
        icon: GiDustCloud,
        description: 'Giant cloud of dust and gas in space'
    },
    {
        label: 'Quasar',
        icon: SiQuasar,
        description: 'Gas spiraling at high velocity into a huge black hole'
    },
    {
        label: 'Black Hole',
        icon: GiBlackHoleBolas,
        description: 'Body of extremely intense gravity from which nothing can escape'
    },
    {
        label: 'Worm Hole',
        icon: GiLeechingWorm,
        description: "'Tunnel' between two distant points in our universe"
    },
]

const Categories: React.FC = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    if (!isMainPage) {
        return null
    }
    return (
        <Container>
            <div className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
            ">
                {categories.map(item => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories