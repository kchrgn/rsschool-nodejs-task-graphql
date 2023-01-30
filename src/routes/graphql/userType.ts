import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id:                   { type: new GraphQLNonNull(GraphQLString) },
    firstName:            { type: GraphQLString },
    lastName:             { type: GraphQLString },
    email:                { type: GraphQLString },  
    subscribedToUserIds:  { type: new GraphQLList(GraphQLString)},
  }),
})