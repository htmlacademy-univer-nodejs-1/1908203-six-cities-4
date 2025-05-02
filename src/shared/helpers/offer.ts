import { CityName, Convenience, Offer, OfferType, UserType} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publicationDate,
    cityName,
    cityLatitude,
    cityLongitude,
    imagePreview,
    images,
    isPremium,
    isFavorite,
    type,
    rating,
    rooms,
    guests,
    price,
    conveniences,
    name,
    email,
    avatarPath,
    password,
    userType,
    commentsCount,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: {
        name: cityName as CityName,
        latitude: parseFloat(cityLatitude),
        longitude: parseFloat(cityLongitude),
    },
    imagePreview,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    type: type as OfferType,
    rating: parseFloat(rating),
    rooms: parseFloat(rooms),
    guests: parseFloat(guests),
    price: parseFloat(price),
    conveniences: conveniences.split(';') as Convenience[],
    author: {
        name,
        email,
        avatarPath,
        password,
        type: userType as UserType,
    },
    commentsCount: parseFloat(commentsCount),
    coordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
    }
  };
}