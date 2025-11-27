import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NestedScreenProps } from '../interfaces/generics';
import ScreenContainer from './ScreenContainer';
import {
  ArtifactState,
  DEFAULT_MODAL_DATA,
  ScreenBackgroundImgSrc,
  UserRole,
} from '../constants';
import Header from './Header';
import GoBackButton from './GoBackButton';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import useMetrics from '../hooks/use-metrics';
import Geolocation from '@react-native-community/geolocation';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import { ModalData } from '../interfaces/Modal';
import { Location } from '../interfaces/geolocalization';
import useArtifactStore from '../store/useArtifactStore';
import styled from 'styled-components/native';
import { MS } from '../interfaces/Metrics';
import ArtifactInventory from './ArtifactInventory';

const MapViewContainer = styled.View<{ $ms: MS }>`
  position: absolute;
  top: ${({ $ms }) => $ms(125, 0.9)}px;
  border-radius: 15px;
  overflow: hidden;
`;

const Swamp = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { hs, vs, ms } = useMetrics();

  const user = usePlayerStore(state => state.user);

  const acolytes = usePlayerStore(state => state.acolytes);
  const setAcolytes = usePlayerStore(state => state.setAcolytes);

  const artifacts = useArtifactStore(state => state.artifacts);

  const modalData: ModalData = { ...DEFAULT_MODAL_DATA };
  const setModalData = useModalStore(state => state.setModalData);

  const [position, setPosition] = useState<Location | null>(null);
  const [watching, setWatching] = useState<boolean>(false);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  const isVillainOrIstvan =
    user?.rol === UserRole.VILLAIN || user?.rol === UserRole.ISTVAN;
  const isAcolyteOrMortimer =
    user?.rol === UserRole.ACOLYTE || user?.rol === UserRole.MORTIMER;

  const mapWidth = hs(328);
  const mapHeight = isVillainOrIstvan ? vs(540) : vs(335);

  useEffect(() => {
    if (user!.rol !== UserRole.ACOLYTE) {
      setAcolytes(prevAcolytes => {
        return prevAcolytes.map(acolyte => {
          if (!acolyte.location) {
            return {
              ...acolyte,
              location: { type: 'Point', coordinates: [0, 0] },
            };
          }
          return acolyte;
        });
      });
    }

    getCurrentPosition();
  }, [user]);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(pos => {
      setPosition({
        type: 'Point',
        coordinates: [pos.coords.latitude, pos.coords.longitude],
      });

      setWatching(true);
    });
  };

  useEffect(() => {
    if (!watching && subscriptionId === null) {
      startWatching();
    }

    return () => {
      if (subscriptionId !== null) {
        Geolocation.clearWatch(subscriptionId);
      }
    };
  }, [watching, subscriptionId]);

  const startWatching = () => {
    try {
      const watchID = Geolocation.watchPosition(
        pos => {
          setPosition({
            type: 'Point',
            coordinates: [pos.coords.latitude, pos.coords.longitude],
          });

          setWatching(true);
        },
        error => {
          console.error('Geolocation Error:', error);
          modalData.content!.message =
            'Please ensure location services are active and the Google Maps API key is configured.';
          setModalData(modalData);
          setWatching(false);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
      setSubscriptionId(watchID);
    } catch (error) {
      console.error('WatchPosition Error:', error);
      modalData.content!.message = 'Could not start position tracking.';
      setModalData(modalData);
    }
  };

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.SWAMP}>
      <Header>The Swamp</Header>

      <GoBackButton onPress={onPressGoBackButton} />

      <MapViewContainer style={{ width: mapWidth, height: mapHeight }} $ms={ms}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          region={{
            latitude: 43.3102,
            longitude: -2.002594,
            latitudeDelta: 0,
            longitudeDelta: 0.003,
          }}
          showsUserLocation={false}
          followsUserLocation={true}
          userInterfaceStyle="dark"
        >
          {position && (
            <Marker
              coordinate={{
                latitude: position.coordinates[0],
                longitude: position.coordinates[1],
              }}
            >
              <Image
                source={{ uri: user!.avatar }}
                style={{
                  width: ms(40, 0.8),
                  height: ms(40, 0.8),
                  borderRadius: ms(20, 2),
                }}
              />
            </Marker>
          )}

          {user?.rol !== UserRole.ACOLYTE &&
            acolytes.map((acolyte, index) => {
              const location = acolyte.location;

              if (location && location.coordinates) {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: acolyte.location!.coordinates[1],
                      longitude: acolyte.location!.coordinates[0],
                    }}
                    description={acolyte.name}
                  >
                    <Image
                      source={{ uri: `${acolyte.avatar}` }}
                      style={{
                        width: ms(40, 0.8),
                        height: ms(40, 0.8),
                        borderRadius: ms(20, 2),
                      }}
                    />
                  </Marker>
                );
              }
            })}

          {isAcolyteOrMortimer &&
            artifacts.map((artifact, index) => {
              if (artifact.state === ArtifactState.ACTIVE) {
                return (
                  <Marker
                    key={`${index}`}
                    coordinate={{
                      latitude: artifact.location.coordinates[1],
                      longitude: artifact.location.coordinates[0],
                    }}
                    description={artifact.name}
                  >
                    <View
                      style={{
                        width: ms(30, 0.9),
                        height: ms(40, 1),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={{ uri: `${artifact.source}` }}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </Marker>
                );
              }
            })}
        </MapView>
      </MapViewContainer>

      {isAcolyteOrMortimer && <ArtifactInventory />}
    </ScreenContainer>
  );
};

export default Swamp;
