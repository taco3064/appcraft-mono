import { useRouter } from 'next/router';

export default function Test() {
  const { query } = useRouter();

  console.log(query);

  return <div>TEST</div>;
}
