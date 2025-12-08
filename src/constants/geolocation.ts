import { Location } from '../interfaces/geolocalization';

enum Coordinate {
  LONGITUDE,
  LATITUDE,
}

const NULL_LOCATION: Location = {
  type: 'Point',
  coordinates: [0, 0],
};

export { Coordinate, NULL_LOCATION };
