import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { Name: 'Gabriel', id: 1 },
    { Name: 'Isadora', id: 2 },
    { Name: 'Vinon', id: 3 },
  ];

  return response.json(users);
}