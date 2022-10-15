import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Header from 'components/Header';
import LargeCard from 'components/LargeCard';
import MediumCard from 'components/MediumCard';
import SmallCard from 'components/SmallCard';
import Head from 'next/head';

export type ExploreType = {
  img: string;
  location: string;
  distance: string;
};

export type SmallCardType = {
  img: string;
  title: string;
};

export type LargeCardType = {
  img: string;
  title: string;
  description: string;
  buttonText: string;
};
interface Props {
  exploreData: ExploreType[];
  cardsData: SmallCardType[];
}

export default function Home({ exploreData, cardsData }: Props) {
  return (
    <div>
      <Head>
        <title>Airbnb - Made by Shamar Morrison</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map(({ distance, img, location }) => (
              <SmallCard key={img} img={img} location={location} distance={distance} />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img='https://links.papareact.com/4cj'
          buttonText={'Get Inspired'}
          description={'Wishlists curated by Airbnb.'}
          title={'The Greatest Outdoors'}
        />

        <Footer />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://www.jsonkeeper.com/b/4G1G')
    .then(res => res.json())
    .catch(err => console.log(err));

  const cardsData = await fetch('https://www.jsonkeeper.com/b/VHHT')
    .then(res => res.json())
    .catch(err => console.log(err));

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
