import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id:           { type: new GraphQLNonNull(GraphQLString) },
    avatar:       { type: GraphQLString },
    sex:          { type: GraphQLString },
    birthday:     { type: GraphQLInt},  
    country:      { type: GraphQLString },
    street:       { type: GraphQLString },
    city:         { type: GraphQLString },
    memberTypeId: { type: GraphQLString },
    userId:       { type: GraphQLString },
  }),
})