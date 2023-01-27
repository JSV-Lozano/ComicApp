import { search } from "../../../services/search";

export default async function handler(req, res) {
  const { query } = req;
  const { results } = await search({ query });
  return res.status(200).json(results);
}
