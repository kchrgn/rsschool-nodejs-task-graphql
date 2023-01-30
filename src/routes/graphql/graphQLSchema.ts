import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
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
      },
      user: {
        type: userType,
        args: {id: {type: new GraphQLNonNull(GraphQLString)}},
        async resolve(source, args, context) {
          return await context.db.users.findOne({key: 'id', equals: args.id});
        },
      },
      post: {
        type: postType,
        args: {id: {type: new GraphQLNonNull(GraphQLString)}},
        async resolve(source, args, context) {
          return await context.db.posts.findOne({key: 'id', equals: args.id});
        }, 
      },
      profile: {
        type: profileType,
        args: {id: {type: new GraphQLNonNull(GraphQLString)}},
        async resolve(source, args, context) {
          return await context.db.profiles.findOne({key: 'id', equals: args.id});
        }, 
      },
      member: {
        type: memberType,
        args: {id: {type: new GraphQLNonNull(GraphQLString)}},
        async resolve(source, args, context) {
          return await context.db.memberTypes.findOne({key: 'id', equals: args.id});
        }, 
      }
    },
  }),
});