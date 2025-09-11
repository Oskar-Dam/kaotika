export const fetchPlayerData = async (email: string) => {
  try {
    console.log('Fetching user character');
    const res = await fetch(`/api/shop/player?email=${email}`);

    if (res.status === 200) {
      const response = await res.json();
      console.log('User character fetch complete:', response);
      return response;
    } else if (res.status === 404) {
      throw new Error('User character not found (404).');
    } else {
      throw new Error('An unexpected error occurred while fetching user character');
    }
  } catch (error) {
    console.error('Error during fetchPlayerData: ', error);
    throw error;
  }
};