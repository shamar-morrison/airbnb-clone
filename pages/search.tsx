import Footer from 'components/Footer';
import Header from 'components/Header';
import InfoCard from 'components/InfoCard';
import Map from 'components/Map';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export interface DataInterface {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
}

interface Props {
  data: DataInterface[];
}

export default function Search({ data }: Props) {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'MMMM dd');
  const formattedEndDate = format(new Date(endDate), 'MMMM dd');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  const searchInput = `Stay in ${location} from ${range} - ${numberOfGuests} guest(s)`;

  return (
    <div>
      <Header placeholder={searchInput} />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-sm'>
            300+ Stays for {numberOfGuests} guest(s) from {range}
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap '>
            <button className='btn'>Free Cancellation</button>
            <button className='btn'>Breakfast Included</button>
            <button className='btn'>Accepts Credit/Debit Cards</button>
            <button className='btn'>Discounted</button>
            <button className='btn'>Highly Rated</button>
          </div>

          <div className='flex flex-col'>
            {data?.map(item => (
              <InfoCard key={item.img} {...item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch('https://www.jsonkeeper.com/b/5NPS')
    .then(res => res.json())
    .catch(err => console.log(err));

  return {
    props: {
      data,
    },
  };
}
