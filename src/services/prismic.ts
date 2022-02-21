import * as Prismic from '@prismicio/client'

//const Prismic = require('@prismicio/client')

const endpoint = process.env.PRISMIC_ENDPOINT
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

export default function prismicClient() {
  const prismic = Prismic.createClient(
    endpoint,
    {
      accessToken,
    }
  )

  return prismic;
}
