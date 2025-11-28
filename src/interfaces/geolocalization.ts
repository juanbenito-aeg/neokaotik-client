interface Location {
  type: 'Point';
  coordinates: Coordinates;
}

type Coordinates = [number, number];

export type { Location, Coordinates };
