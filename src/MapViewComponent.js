// src/MapViewComponent.js
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { listenToLocationUpdates, getAllUsersProfiles } from './database';

const MapViewComponent = ({ userId }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [otherUsersData, setOtherUsersData] = useState([]);

  useEffect(() => {
    const updateLocationCallback = (location) => {
      setUserLocation(location);
    };

    const unsubscribe = listenToLocationUpdates(userId, updateLocationCallback);

    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const allUsersProfilesCallback = (usersProfiles) => {
      const filteredProfiles = Object.entries(usersProfiles || {}).filter(
        ([uid, profile]) => uid !== userId
      );
      setOtherUsersData(filteredProfiles);
    };

    const unsubscribeAllUsers = getAllUsersProfiles(allUsersProfilesCallback);

    return () => {
      unsubscribeAllUsers();
    };
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation?.latitude || 0,
          longitude: userLocation?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You"
            pinColor="blue"
          >
            {userLocation.profilePhoto && (
              <Image
                source={{ uri: userLocation.profilePhoto }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            )}
          </Marker>
        )}

        {otherUsersData.map(([uid, profile]) => (
          <Marker
            key={uid}
            coordinate={{
              latitude: profile.location.latitude,
              longitude: profile.location.longitude,
            }}
            title={`User ${uid}`}
            pinColor="red"
          >
            {profile.profilePhoto && (
              <Image
                source={{ uri: profile.profilePhoto }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            )}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapViewComponent;
