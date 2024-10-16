
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}



export default function SectionContainer({ children }: Props) {
  return (
    <section className="w-full min-h-screen bg-no-repeat bg-center bg-cover bg-blue-200 dark:bg-gray-800"
      // style={{
      //   backgroundImage: `url("${svgBackground}")`,
      // }}
    >
      {children}
    </section>
  );
}
