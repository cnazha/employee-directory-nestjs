import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { EmailAddressResolver } from 'graphql-scalars';

export const graphqlConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  resolvers: {
    EmailAddress: EmailAddressResolver,
  },
};
