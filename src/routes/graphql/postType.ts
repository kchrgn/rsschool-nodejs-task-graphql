import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id:       { type: new GraphQLNonNull(GraphQLString) },
    title:    { type: GraphQLString },
    content:  { type: GraphQLString },
    userId:   { type: GraphQLString },  
  }),
})