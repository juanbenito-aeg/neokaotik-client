interface MapNavigationContextInterface {
  mapNavigation: number;
  setMapNavigation: setMapNavigation;
}

type setMapNavigation = (mapNavigation: number) => void;

export type { MapNavigationContextInterface, setMapNavigation };
