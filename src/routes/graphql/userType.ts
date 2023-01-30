import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { postType } from './postType';
import { profileType } from './profileType';
import { memberType } from './memberType';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id:                   { type: new GraphQLNonNull(GraphQLString) },
    firstName:            { type: GraphQLString },
    lastName:             { type: GraphQLString },
    email:                { type: GraphQLString },  
    subscribedToUserIds:  { type: new GraphQLList(GraphQLString)},
    posts: {
      type: new GraphQLList(postType),
      async resolve(source, args, context) {
        return await context.db.posts.findMany({key: 'userId', equals: source.id});
      },
    },
    profile: {
      type: profileType,
      async resolve(source, args, context) {
        return await context.db.profiles.findOne({key: 'userId', equals: source.id});
      },
    },
    member: {
      type: memberType,
      async resolve(source, args, context) {
        const profile = await context.db.profiles.findOne({key: 'userId', equals: source.id});
        return await context.db.memberTypes.findOne({key: 'id', equals: profile?.memberTypeId});
      },
    }
  }),
})