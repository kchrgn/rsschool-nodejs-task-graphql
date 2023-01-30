import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { memberType } from './memberType';
import { postType } from './postType';
import { profileType } from './profileType';
import { userType } from './userType';

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(userType),
        async resolve(source, args, context) {
          return await context.db.users.findMany();
        },
      },
      posts: {
        type: new GraphQLList(postType),
        async resolve(source, args, context) {
          return await context.db.posts.findMany();
        }, 
      },
      profiles: {
        type: new GraphQLList(profileType),
        async resolve(source, args, context) {
          return await context.db.profiles.findMany();
        }, 
      },
      members: {
        type: new GraphQLList(memberType),
        async resolve(source, args, context) {
          return await context.db.memberTypes.findMany();
        }, 
      }
    },
  }),
});