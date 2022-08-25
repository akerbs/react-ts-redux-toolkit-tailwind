import React, { useEffect, useRef, useState } from 'react';
import { AirportCard } from '../components/AirportCard';
import { AirportFilter } from '../components/AirportFilter';
import { AirportSearch } from '../components/AirportSearch';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { fetchAirports } from '../store/actions/airportActions';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 50

export function MainPage() {
  const dispatch = useAppDispatch()
  // const [page, setPage] = useState(1)
  const page = useRef(1)

  const {error, loading, airports, count} = useAppSelector(state => state.airport)

  const pageCount = Math.ceil(count/ITEMS_PER_PAGE)

  const pageChangeHandler = ({selected}: {selected: number}) => {
    // setPage(selected)
    page.current = selected + 1
  }

  useEffect(() => {
    dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
  }, [dispatch])

  return (
    <div className='container mx-auto max-w-[760px] pt-5'>
      <AirportSearch />

      <AirportFilter />     
      
      {loading && <p className='text-center text-lg'>Loading...</p> }
      {error && <p className='text-center text-red-600'>{error}</p> }

      {
        airports.map(airport => <AirportCard key={airport.id} airport={airport} />)
      }

      {pageCount && <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={page.current - 1}  // текущая страница
        previousLabel="< previous"
        containerClassName="flex"
        pageClassName="py-1 px-2 border mr-2"
        previousClassName="py-1 px-2 border mr-2"  
        nextClassName="py-1 px-2 border"      
        activeClassName="bg-gray-500 text-white"
      />}
    </div>
  )
}