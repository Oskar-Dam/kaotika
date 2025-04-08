export const fetchCategory = async (categoryName: string) => {
  console.log('Data not found in local storage. \nFetching : ', categoryName);
  const res = await fetch(`/api/shop/${categoryName}`);

  if (res.status === 200) {
    const response = await res.json();
    return response

  } else if (res.status === 404) {
    throw new Error(`Category "${categoryName}" not found (404).`);

  } else {
    throw new Error(`Error fetching category "${categoryName}": ${res.statusText}`);
  }
};