'use client'

export type CountrySelectValue = {
    flag: string
    label: string
    latlng: number[]
    region: string
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue
    onChange: React.Dispatch<React.SetStateAction<string | undefined>>
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            {/* <Select
                placeholder='Anywhere'
                isClearable
                options={getAll()}
                value={value}
                onChange={value => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>{option.flag}</div>
                        <div>
                            {option.label}
                            <span className='text-neutral-500 ml-1'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#CEF3E1'
                    }
                })}
            /> */}
            <div className='w-full relative'>
                <input
                    id='country-selector'
                    placeholder=" "
                    onChange={handleInputChange}
                    className={`
                peer
                w-full
                p-4
                pt-6
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                border-neutral-300
                focus:border-black
                `}
                />
                <label
                    className={`
                absolute
                text-md
                duration-150
                transform
                -translate-y-3
                top-5
                left-5
                z-10
                origin-[0]
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                text-zinc-400
                `}
                >
                    In a galaxy far, far away...
                </label>
            </div>
        </div>
    );
}

export default CountrySelect;