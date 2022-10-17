import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Props {
  placeholder?: string;
}

const Header = ({ placeholder }: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  function handleSelect(ranges: any) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  function resetInput() {
    setSearchInput('');
  }

  function search() {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
  }

  function searchOnKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      search();
    }
  }

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10'>
      <div className='relative flex items-center h-10 cursor-pointer my-auto'>
        <Image
          src={'https://links.papareact.com/qd3'}
          layout='fill'
          objectFit='contain'
          objectPosition={'left'}
          onClick={() => router.push('/')}
        />
      </div>

      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input
          type='text'
          placeholder={placeholder || 'Start your search'}
          className='pl-5 bg-transparent outline-none flex-grow placeholder-gray-400'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={searchOnKeyPress}
        />
        <SearchIcon
          className='hidden md:inline-flex h-8 bg-[#FF385C] text-white rounded-full p-2 cursor-pointer md:mx-2'
          onClick={search}
        />
      </div>

      <div className='flex space-x-4 items-center justify-end text-gray-500'>
        <p className='hidden md:inline cursor-pointer'>Become a host</p>
        <GlobeAltIcon className='h-6 cursor-pointer' />

        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <MenuIcon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>

      {searchInput && (
        <div className='flex flex-col col-span-3 mx-auto'>
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FF385C']}
            onChange={handleSelect}
          />
          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
            <UsersIcon className='h-5' />
            <input
              type='number'
              onSubmit={search}
              className='w-12 pl-2 text-lg outline-none text-[#FF385C]'
              min={1}
              value={numberOfGuests}
              onChange={(e: any) => setNumberOfGuests(e.target.value)}
            />
          </div>
          <div className='flex'>
            <button onClick={resetInput} className='flex-grow text-gray-500'>
              Cancel
            </button>
            <button role={'search'} onClick={search} className='flex-grow text-[#FF385C]'>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
