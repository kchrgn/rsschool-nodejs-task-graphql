import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql } from 'graphql';
import { graphqlBodySchema } from './schema';
import { graphQLSchema } from './graphQLSchema';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      return await graphql({
        schema: graphQLSchema,
        source: String(request.body.query),
        contextValue: fastify,
        variableValues: request.body.variables
      });
    }
  );
};

export default plugin;
