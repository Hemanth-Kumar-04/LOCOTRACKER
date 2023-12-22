import { getDatabase, ref, set, onValue } from '@react-native-firebase/database';

const database = getDatabase();

export const updateProfileData = (userId, data) => {
  set(ref(database, `users/${userId}/profile`), data);
};

export const getAllUsersProfiles = (callback) => {
  const usersProfileRef = ref(database, 'users');
  return onValue(usersProfileRef, (snapshot) => {
    const usersProfiles = snapshot.val();
    callback(usersProfiles);
  });
};

export const updateLocation = (userId, latitude, longitude) => {
  set(ref(database, `users/${userId}/location`), {
    latitude,
    longitude,
  });
};

export const listenToLocationUpdates = (userId, callback) => {
  const locationRef = ref(database, `users/${userId}/location`);
  return onValue(locationRef, (snapshot) => {
    const location = snapshot.val();
    callback(location);
  });
};
