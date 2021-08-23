import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import Image from 'next/image';

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //transform searchResults obj into {latitude: 52.1253, longitude: 13.977752} object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  // console.log(
  //   '🚀 ~ file: Map.js ~ line 19 ~ coordinates ~ coordinates',
  //   coordinates
  // );

  //the lat and long of the center of locations coordinates
  const center = getCenter(coordinates);
  // console.log('🚀 ~ file: Map.js ~ line 26 ~ Map ~ center', center);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  // console.log(
  //   '🚀 ~ file: Map.js ~ line 7 ~ Map ~ selectedLocation',
  //   selectedLocation
  // );

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/areddin409/cksoqm7vk0je418qjijna717n'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce z-10'
              aria-label='push-pin'
            >
              📌
            </p>
          </Marker>

          {/* the popup that should show if a marker is clicked */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div className='flex flex-col z-50'>
                <div className='flex item-center py-4'>
                  <p className='font-semibold'>{result.title}</p>
                  <p className='font-thin pl-5 text-red-400'>{result.total}</p>
                </div>
                <Image
                  className='rounded-lg'
                  width={200}
                  height={200}
                  src={result.img}
                  objectFit='cover'
                />
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
