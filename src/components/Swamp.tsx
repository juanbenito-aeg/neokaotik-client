import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NestedScreenProps } from '../interfaces/generics';
import ScreenContainer from './ScreenContainer';
import {
  ArtifactImgSrc,
  ArtifactState,
  Coordinate,
  DEFAULT_MODAL_DATA,
  NULL_LOCATION,
  ScreenBackgroundImgSrc,
  UserRole,
} from '../constants';
import GoBackButton from './GoBackButton';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import useMetrics from '../hooks/use-metrics';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import { ModalData } from '../interfaces/Modal';
import { Coordinates, Location } from '../interfaces/geolocalization';
import useArtifactStore from '../store/useArtifactStore';
import styled from 'styled-components/native';
import ArtifactInventory from './ArtifactInventory';
import emitAcolyteMoved from '../socket/events/acolyte-moved';
import { ArtifactId } from '../interfaces/Artifact';
import emitArtifactPressed from '../socket/events/artifact-pressed';
import { useFocusEffect } from '@react-navigation/native';

const MapViewContainer = styled.View`
  position: absolute;
  top: 0;
`;

const Swamp = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { windowWidth, windowHeight, ms } = useMetrics();

  const user = usePlayerStore(state => state.user);

  const isAcolyteOrMortimer =
    user?.rol === UserRole.ACOLYTE || user?.rol === UserRole.MORTIMER;

  const acolytes = usePlayerStore(state => state.acolytes);
  const setAcolytes = usePlayerStore(state => state.setAcolytes);

  const artifacts = useArtifactStore(state => state.artifacts);
  const artifactsRef = useRef(artifacts);

  const modalData: ModalData = { ...DEFAULT_MODAL_DATA };
  const setModalData = useModalStore(state => state.setModalData);

  const [position, setPosition] = useState<Location>(NULL_LOCATION);
  const [watching, setWatching] = useState<boolean>(false);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  const [pressableArtifactId, setPressableArtifactId] =
    useState<ArtifactId>('');

  const markersWidthHeight = {
    width: ms(35, 0.75),
    height: ms(35, 0.75),
  };

  useEffect(() => {
    if (user!.rol !== UserRole.ACOLYTE) {
      setAcolytes(prevAcolytes => {
        return prevAcolytes.map(acolyte => {
          if (!acolyte.location) {
            return { ...acolyte, location: NULL_LOCATION };
          }

          return acolyte;
        });
      });
    }
  }, []);

  useEffect(() => {
    artifactsRef.current = artifacts;
  }, [artifacts]);

  useFocusEffect(
    useCallback(() => {
      if (!watching && subscriptionId === null) {
        getCurrentPosition();
        startWatching();
      }

      return () => {
        if (subscriptionId !== null) {
          // When the user exits the screen, stop watching for changes in their position & reset the related state

          setPosition(NULL_LOCATION);
          setWatching(false);
          setSubscriptionId(null);
          Geolocation.clearWatch(subscriptionId);

          if (user!.rol === UserRole.ACOLYTE) {
            emitAcolyteMoved(user!._id, NULL_LOCATION);
          }
        }
      };
    }, [watching, subscriptionId]),
  );

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(pos => {
      setPosition({
        type: 'Point',
        coordinates: [pos.coords.longitude, pos.coords.latitude],
      });
    });
  };

  const startWatching = () => {
    try {
      const watchID = Geolocation.watchPosition(
        pos => {
          handlePositionChange(pos);
        },
        error => {
          console.error('Geolocation error:', error);

          modalData.content!.message =
            'Please ensure location services are active and the Google Maps API key is configured.';
          setModalData(modalData);

          setWatching(false);
          setSubscriptionId(null);
        },
        {
          interval: 1000,
          maximumAge: 0,
          enableHighAccuracy: true,
          distanceFilter: 0,
        },
      );

      setWatching(true);
      setSubscriptionId(watchID);
    } catch (error) {
      console.error('WatchPosition error:', error);

      modalData.content!.message = 'Could not start position tracking.';
      setModalData(modalData);
    }
  };

  function handlePositionChange(pos: GeolocationResponse) {
    const nextPosition: Location = {
      type: 'Point',
      coordinates: [pos.coords.longitude, pos.coords.latitude],
    };

    setPosition(nextPosition);

    if (user?.rol === UserRole.ACOLYTE) {
      emitAcolyteMoved(user!._id, nextPosition);

      togglePressableArtifactId(nextPosition);
    }
  }

  function togglePressableArtifactId(position: Location) {
    const pressableArtifact = artifactsRef.current.find(artifact => {
      if (artifact.state === ArtifactState.ACTIVE) {
        const distanceBetweenUserAndArtifact =
          calculateDistanceBetweenUserAndArtifact(
            position.coordinates,
            artifact.location.coordinates,
          );

        return distanceBetweenUserAndArtifact < 1;
      }
    });

    if (pressableArtifact?._id !== pressableArtifactId) {
      setPressableArtifactId(pressableArtifact?._id || '');
    }
  }

  function calculateDistanceBetweenUserAndArtifact(
    userCoords: Coordinates,
    artifactCoords: Coordinates,
  ) {
    // Calculate distance between latitude/longitude points (φ is latitude, λ is longitude, R is earth’s radius)

    const R = 6371e3; // meters
    const φ1 = (userCoords[Coordinate.LATITUDE] * Math.PI) / 180; // φ, λ in radians
    const φ2 = (artifactCoords[Coordinate.LATITUDE] * Math.PI) / 180;
    const Δφ =
      ((artifactCoords[Coordinate.LATITUDE] - userCoords[Coordinate.LATITUDE]) *
        Math.PI) /
      180;
    const Δλ =
      ((artifactCoords[Coordinate.LONGITUDE] -
        userCoords[Coordinate.LONGITUDE]) *
        Math.PI) /
      180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in meters

    return d;
  }

  function handleArtifactPress(artifactId: ArtifactId) {
    if (artifactId === pressableArtifactId) {
      emitArtifactPressed(user!._id, position, artifactId);
    }
  }

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.SWAMP}>
      <GoBackButton onPress={onPressGoBackButton} />

      <MapViewContainer style={{ width: windowWidth, height: windowHeight }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 43.309457334777676,
            longitude: -2.002383890907663,
            latitudeDelta: 0,
            longitudeDelta: 0.0025,
          }}
          showsCompass={false}
          showsUserLocation={false}
          userInterfaceStyle="dark"
          toolbarEnabled={false}
          moveOnMarkerPress={false}
        >
          <Marker
            coordinate={{
              latitude: position.coordinates[1],
              longitude: position.coordinates[0],
            }}
            tracksViewChanges={false}
            zIndex={user?.rol !== UserRole.ACOLYTE ? 2 : 0}
          >
            <Image
              source={{ uri: user!.avatar }}
              style={{
                ...markersWidthHeight,
                borderRadius: 9999,
              }}
            />
          </Marker>

          {user?.rol !== UserRole.ACOLYTE &&
            acolytes.map(acolyte => {
              if (acolyte.location) {
                return (
                  <Marker
                    key={acolyte._id}
                    coordinate={{
                      latitude: acolyte.location!.coordinates[1],
                      longitude: acolyte.location!.coordinates[0],
                    }}
                    tracksViewChanges={false}
                    zIndex={0}
                  >
                    <Image
                      source={{ uri: acolyte.avatar }}
                      style={{
                        ...markersWidthHeight,
                        borderRadius: 9999,
                      }}
                    />
                  </Marker>
                );
              }
            })}

          {isAcolyteOrMortimer &&
            artifacts.map(artifact => {
              if (artifact.state === ArtifactState.ACTIVE) {
                return (
                  <Marker
                    key={artifact._id + Date.now()}
                    coordinate={{
                      latitude: artifact.location.coordinates[1],
                      longitude: artifact.location.coordinates[0],
                    }}
                    tracksViewChanges={false}
                    zIndex={1}
                    onPress={() => {
                      handleArtifactPress(artifact._id);
                    }}
                  >
                    <Image
                      source={
                        ArtifactImgSrc[
                          artifact.name as keyof typeof ArtifactImgSrc
                        ]
                      }
                      tintColor={
                        artifact._id === pressableArtifactId ||
                        user.rol === UserRole.MORTIMER
                          ? ''
                          : 'black'
                      }
                      style={{
                        ...markersWidthHeight,
                        resizeMode: 'contain',
                      }}
                    />
                  </Marker>
                );
              }
            })}
        </MapView>
      </MapViewContainer>

      {isAcolyteOrMortimer &&
        !acolytes.find(acolyte => acolyte.has_completed_artifacts_search) && (
          <ArtifactInventory />
        )}
    </ScreenContainer>
  );
};

export default Swamp;
