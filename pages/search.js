import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

function Search({ searchResults }) {
  const router = useRouter();

  const { location, startDate, endDate, numGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'MMMM do yyyy');
  const formattedEndDate = format(new Date(endDate), 'MMMM do yyyy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numGuests} Guests`} />

      <main className='flex '>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays -{' '}
            <span className='bg-red-400 text-white rounded p-1'>
              {formattedStartDate}
            </span>{' '}
            to{' '}
            <span className='bg-red-400 text-white rounded p-1'>
              {formattedEndDate}
            </span>{' '}
            - {numGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>

          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Room and Beds</p>
            <p className='button'>More Filters</p>
          </div>

          <div className='flex flex-col '>
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  //todo make a unique key instead of img
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>

        <section className='xl:inline-flex xl:min-w-[600px] '>
          <div className='transition duration-500 h-3/6 w-full mt-12 mr-5 border-4 shadow-lg hover:border-red-400 hover:shadow-2xl ease-in-out'>
            <Map searchResults={searchResults} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
