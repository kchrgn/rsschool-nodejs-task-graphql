import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    reply.type('application/json').code(200);
    return await fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const result = await fastify.db.users.findOne({key: "id", equals: request.params.id});
      if (!result) {
        throw fastify.httpErrors.notFound();
      }
      reply.type('application/json').code(200);
      return result;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const result = await fastify.db.users.create(request.body);
      reply.type('application/json').code(200);
      return result;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      try {
        const deletedUser = await fastify.db.users.delete(request.params.id);
        const subscribers = await fastify.db.users.findMany({key: 'subscribedToUserIds', inArray: request.params.id});
        subscribers.forEach(async (user) => {
          user.subscribedToUserIds.splice(user.subscribedToUserIds.indexOf(request.params.id),1);
          await fastify.db.users.change(user.id, user);
        });

        const posts = await fastify.db.posts.findMany({key: 'userId', equals: request.params.id});
        posts.forEach(async (post) => {
          await fastify.db.posts.delete(post.id);
        });

        const userProfile = await fastify.db.profiles.findOne({key: 'userId', equals: request.params.id});
        if (userProfile) {
          await fastify.db.profiles.delete(userProfile.id);
        }
        
        return deletedUser;
      } catch {
        throw fastify.httpErrors.badRequest();
      }
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await fastify.db.users.findOne({key: "id", equals: request.body.userId});
      if (!user) {
        throw fastify.httpErrors.notFound()
      }
      user.subscribedToUserIds.push(request.params.id);
      return await fastify.db.users.change(request.body.userId, user);
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = await fastify.db.users.findOne({key: "id", equals: request.body.userId});
      if (!user) throw fastify.httpErrors.notFound();

      const indexOfSubcriber = user.subscribedToUserIds.indexOf(request.params.id);
      if (indexOfSubcriber == -1) throw fastify.httpErrors.badRequest();

      user.subscribedToUserIds.splice(indexOfSubcriber, 1);
      return await fastify.db.users.change(request.body.userId, user);;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      try {
        return await fastify.db.users.change(request.params.id, request.body);
      } catch {
        throw fastify.httpErrors.badRequest();
      }
    }
  );
};

export default plugin;
