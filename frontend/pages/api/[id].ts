import type { NextApiResponse } from 'next'
import one from '../../../api/one.json';
import two from '../../../api/two.json';
import three from '../../../api/three.json';
import four from '../../../api/four.json';

type Message = {
  error: string;
}
type NFTData = {
  name: string;
  description: string;
  image: string;
  strength: number;
};

const data: any = {
  one,
  two,
  three,
  four
}

export default function handler(
  { query: { id } }: any,
  res: NextApiResponse<NFTData|Message>
) {
  if (!data[id]) {
    res.status(404).json({ error: `Id: ${id} not found.` })
  } else {
    res.status(200).json(data[id])
  }
}