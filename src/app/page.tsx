import { NextPage } from "next";
import Hero from "@/components/hero/hero";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Page;
