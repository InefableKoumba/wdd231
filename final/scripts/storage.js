const STORAGE_KEY = "photogallery_favorites";

export function getFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error reading favorites from localStorage", e);
    return [];
  }
}

export function isFavorite(photoId) {
  const favorites = getFavorites();
  return favorites.some((item) => item.id === photoId);
}

export function toggleFavorite(photoObj) {
  let favorites = getFavorites();
  const existingIndex = favorites.findIndex((item) => item.id === photoObj.id);

  if (existingIndex > -1) {
    favorites.splice(existingIndex, 1);
  } else {
    favorites.push(photoObj);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }

  return getFavorites();
}
