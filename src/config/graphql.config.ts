import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import {
  CountryCodeResolver,
  CurrencyResolver,
  EmailAddressResolver,
  LatitudeResolver,
  LongitudeResolver,
  NonNegativeIntResolver,
  PhoneNumberResolver,
  PositiveIntResolver,
  PostalCodeResolver,
  URLResolver,
  UUIDResolver,
} from 'graphql-scalars';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  resolvers: {
    EmailAddress: EmailAddressResolver,
    UUID: UUIDResolver,
    PositiveInt: PositiveIntResolver,
    NonNegativeInt: NonNegativeIntResolver,
    CountryCode: CountryCodeResolver,
    PhoneNumber: PhoneNumberResolver,
    PostalCode: PostalCodeResolver,
    Currency: CurrencyResolver,
    URL: URLResolver,
    Latitude: LatitudeResolver,
    Longitude: LongitudeResolver,
  },
};
