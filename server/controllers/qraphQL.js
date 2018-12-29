import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const data = {
  first: 'tsuyoshi',
  last: 'akiyama',
};

// The schema should model the full data object availabl
const schema = buildSchema(`
  type Pokemon {
    id: String
    name: String!
  }
  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String): Pokemon
  }
`);

// The root provides the resolver functions for each type of query or mutation.
const root = {
  Pokemons: () => data,
  Pokemon: request => data.find(pokemon => pokemon.name === request.name),
};

const graphqlRouter = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

export default graphqlRouter;
