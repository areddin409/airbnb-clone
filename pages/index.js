import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className=''>
      <Head>
        <title>Airbnb Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      <main className='max-w-4/5 mx-auto px-8 sm:px-16 xl:max-w-9/10'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          {/* Pull data from a server - API endpoints */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                //perferred to use actually id of some sort
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <section>
          <LargeCard
            img='https://links.papareact.com/4cj'
            title='The Greatest Outdoors'
            description='Wishlists curated by Airbnb.'
            buttonText='Get Inspired'
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/TZFG').then((res) =>
    res.json()
  );

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
