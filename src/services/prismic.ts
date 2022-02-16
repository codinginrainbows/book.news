import * as Prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = 'ignews124'

const endpoint = Prismic.getEndpoint(repositoryName)

export const prismicClient = Prismic.createClient(endpoint, {
  // If your repo is private, add an access token
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
})





// OLD FORMAT BELOW (ERROR)
// export default function getPrismicClient() {
//   const prismic = Prismic.createClient(
//     process.env.PRISMIC_ENDPOINT,
//     {
//       accessToken: process.env.PRISMIC_ACCESS_TOKEN,
//     }
//   )

//   console.log('teste da branch nextPrismic')

//   return prismic;
// }