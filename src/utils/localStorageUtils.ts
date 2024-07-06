export const saveToLocalStorage = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to local storage', error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error getting from local storage', error);
    return null;
  }
};
