import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, City, Convenience, OfferType, UserType, CityName } from '../../types/index.js';

const CITIES: Record<CityName, City> = {
  Paris: { name: CityName.Paris, latitude: 48.85661, longitude: 2.351499 },
  Cologne: { name: CityName.Cologne, latitude: 50.938361, longitude: 6.959974 },
  Brussels: { name: CityName.Brussels, latitude: 50.846557, longitude: 4.351697 },
  Amsterdam: { name: CityName.Amsterdam, latitude: 52.370216, longitude: 4.895168 },
  Hamburg: { name: CityName.Hamburg, latitude: 53.550341, longitude: 10.000654 },
  Dusseldorf: { name: CityName.Dusseldorf, latitude: 51.225402, longitude: 6.776314 },
};

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('Файл не был прочитан');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title, description, publicationDate, cityName, imagePreview, images, isPremium, isFavorite, rating, type, rooms, guests, price, amenities, authorName, authorEmail, authorAvatar, authorPassword, authorType, commentsCount, latitude, longitude
      ]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        city: CITIES[cityName as CityName],
        imagePreview,
        images: images.split(';'),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rooms: parseInt(rooms),
        guests: parseInt(guests),
        price: parseInt(price),
        rating: parseFloat(rating),
        type: type as OfferType,
        conveniences: amenities.split(';') as Convenience[],
        commentsCount: parseInt(commentsCount, 10),
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        author: {
          name: authorName,
          email: authorEmail,
          avatarPath: authorAvatar,
          password: authorPassword,
          type: authorType as UserType,
        },
      }));
  }
}