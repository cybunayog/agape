const commonElements = (array1: any[], array2: any[]) => array1.filter((item) => array2.includes(item));

export const getProfile = (user: any) => JSON.parse(JSON.stringify(user)).profile;

export const getPreferences = (user: any) => JSON.parse(JSON.stringify(user)).preferences;

export const getId = (user: any) => JSON.parse(JSON.stringify(user))._id;

const isAlreadySwiped = (user1: any, user2: any) => {
  const { swipedLeft } = JSON.parse(JSON.stringify(user1));
  const { swipedRight } = JSON.parse(JSON.stringify(user1));
  const swiped = swipedLeft.concat(swipedRight);
  const userId = getId(user2);
  return swiped.includes(userId);
};

const commonHobbies = (user1: any, user2: any) => {
  const user1Profile = getProfile(user1);
  const user2Profile = getProfile(user2);
  return commonElements(user1Profile.hobbies, user2Profile.hobbies).length;
};

const matchSexuality = (user1: any, user2: any) => {
  const user1Gender = getProfile(user1).gender.toLowerCase();
  const user1Sexuality = getPreferences(user1).sexuality.toLowerCase();
  const user2Gender = getProfile(user2).gender.toLowerCase();
  const user2Sexuality = getPreferences(user2).sexuality.toLowerCase();
  if (user1Gender === 'male' && (user1Sexuality === 'bisexual' || user1Sexuality === 'gay')) {
    if (user2Gender === 'male' && (user2Sexuality === 'bisexual' || user2Sexuality === 'gay')) {
      return true;
    }
    if (user2Gender === 'female' && (user2Sexuality === 'bisexual' || user2Sexuality === 'straight')) {
      return true;
    }
  }
  if (user1Gender === 'male' && user1Sexuality === 'straight') {
    if (user2Gender === 'female' && (user2Sexuality === 'bisexual' || user2Sexuality === 'straight')) {
      return true;
    }
  }
  if (user1Gender === 'female' && (user1Sexuality === 'bisexual' || user1Sexuality === 'lesbian')) {
    if (user2Gender === 'female' && (user2Sexuality === 'bisexual' || user2Sexuality === 'lesbian')) {
      return true;
    }
    if (user2Gender === 'male' && (user2Sexuality === 'bisexual' || user2Sexuality === 'straight')) {
      return true;
    }
  }
  if (user1Gender === 'female' && user1Sexuality === 'straight') {
    if (user2Gender === 'male' && (user2Sexuality === 'bisexual' || user2Sexuality === 'straight')) {
      return true;
    }
  }
  return false;
};

const matchAge = (user1: any, user2: any) => {
  const user1Profile = getProfile(user1);
  const user1Preferences = getPreferences(user1);
  const user2Profile = getProfile(user2);
  const user2Preferences = getPreferences(user2);
  if (user2Profile.age >= user1Preferences.minAge && user2Profile.age <= user1Preferences.maxAge) {
    if (user1Profile.age >= user2Preferences.minAge && user1Profile.age <= user2Preferences.maxAge) {
      return true;
    }
  }
  return false;
};

const matchReligion = (user1: any, user2: any) => {
  const user1Profile = getProfile(user1);
  const user1Preferences = getPreferences(user1);
  const user2Profile = getProfile(user2);
  const user2Preferences = getPreferences(user2);
  if (user1Preferences.religion.includes(user2Profile.religion)) {
    if (user2Preferences.religion.includes(user1Profile.religion)) {
      return true;
    }
  }
  return false;
};

const validateUsers = (user1: any, user2: any, romantic: string) => {
  if (romantic === 'true') {
    if (!matchSexuality(user1, user2)) return false;
  }
  if (isAlreadySwiped(user1, user2)) return false;
  return true;
};

export const generatePercentage = (user1: any, user2: any, romantic: string) => {
  if (!validateUsers(user1, user2, romantic)) return 0;
  let percentage = 50;
  percentage += commonHobbies(user1, user2) / 3 * 20;
  if (matchAge(user1, user2)) percentage += 20;
  if (matchReligion(user1, user2)) percentage += 10;
  return Math.ceil(percentage);
};

export const sortByPercentage = (users: any[]) => users.sort((user1, user2) => ((user1.percentage > user2.percentage) ? -1 : 1));

export const verifyUser = (user: any) => {
  const profile = getProfile(user);
  const preferences = getPreferences(user);
  // verify profile
  if (!(profile && profile.hobbies && profile.gender && profile.age)) return false;
  // verify preferences
  if (!(preferences && preferences.sexuality && preferences.minAge && preferences.maxAge && preferences.religion)) return false;
  return true;
};
