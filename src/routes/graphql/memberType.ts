import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

export const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id:              { type: new GraphQLNonNull(GraphQLString) },
    discount:        { type: GraphQLInt },
    monthPostsLimit: { type: GraphQLInt },
  }),
})