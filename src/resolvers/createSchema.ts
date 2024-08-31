import { buildSchema } from 'type-graphql';
import { resolvers } from './Resolver';

export const createSchema = async () => await buildSchema({ resolvers })
