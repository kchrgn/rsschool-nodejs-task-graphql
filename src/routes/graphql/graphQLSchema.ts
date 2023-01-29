import { GraphQLSchema,
         GraphQLObjectType,
         GraphQLString,
         GraphQLList,
         GraphQLNonNull } from 'graphql';

  // id: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // subscribedToUserIds: string[];

  

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A humanoid creature in the Star Wars universe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the human.',
    },
    firstName: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
    lastName: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
    email: {
      type: GraphQLString,
      description: 'The name of the human.',
    },  
    subscribedToUserIds: {
      type: new GraphQLList(GraphQLString),
      description:
        'The friends of the human, or an empty list if they have none.',
      // resolve: (human) => getFriends(human),
    },
  }),
  // interfaces: [characterInterface],
})

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: userType,
        async resolve(source, args, context) {
          console.log(context.db.users)
          return await context.db.users.findMany();
        },
      },
    },
  }),
});