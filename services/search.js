//microservicio
import algoliasearch from "algoliasearch";


const client = algoliasearch("A222DK0A4C", "63291d72f8c858280fbde6d37801f7a6");
const index = client.initIndex("prod_comics");

export const search = async ({ query }) => {
  const { hits } = await index.search(query.q, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10, //Número de vista por paginas al buscar
  });
  return { results: hits };
};
