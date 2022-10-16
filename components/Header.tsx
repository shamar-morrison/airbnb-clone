import Image from 'next/image';
import React, { useState } from 'react';
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  function handleSelect(ranges: any) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10'>
      <div className='relative flex items-center h-10 cursor-pointer my-auto'>
        <Image
          src={'https://links.papareact.com/qd3'}
          layout='fill'
          objectFit='contain'
          objectPosition={'left'}
        />
      </div>

      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input
          type='text'
          placeholder='Start your search'
          className='pl-5 bg-transparent outline-none flex-grow placeholder-gray-400'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <SearchIcon className='hidden md:inline-flex h-8 bg-[#FF385C] text-white rounded-full p-2 cursor-pointer md:mx-2' />
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
        </div>
      )}
    </header>
  );
};

export default Header;
