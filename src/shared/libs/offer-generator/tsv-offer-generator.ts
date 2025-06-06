import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, UserType } from '../../types/index.js';
import {
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
  generateRandomCoordinate,
  generateRandomValue,
} from '../../helpers/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs()
      .subtract(generateRandomValue(1, 7), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const image = getRandomItem(this.mockData.images);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const type = getRandomItem(this.mockData.types);
    const rating = generateRandomValue(1, 5);
    const rooms = generateRandomValue(1, 3);
    const guests = generateRandomValue(1, 4);
    const price = generateRandomValue(100, 500);
    const conveniences = getRandomItems(this.mockData.conveniences).join(';');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarPaths);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem([UserType.Common, UserType.Pro]);
    const commentsCount = generateRandomValue(1, 10);
    const latitude = generateRandomCoordinate();
    const longitude = generateRandomCoordinate();

    return [
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
      password,
      userType,
      commentsCount,
      latitude,
      longitude
    ].join('\t');
  }
}
