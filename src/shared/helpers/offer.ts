import { City, Convenience, Offer, OfferType, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publicationDate,
    city,
    image,
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
    userType,
    commentsCount,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(publicationDate),
    city: city as City,
    image: image,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    type: type as OfferType,
    rating: parseFloat(rating),
    rooms: parseFloat(rooms),
    guests: parseFloat(guests),
    price: parseFloat(price),
    conveniences: conveniences.split(';') as Convenience[],
    user: {
      name,
      email,
      avatarPath,
      type: userType as UserType,
    },
    commentsCount: parseFloat(commentsCount),
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
}
