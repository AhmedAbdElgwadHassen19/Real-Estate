
import ConnectingPeople from "./_components/ConnectingPeople";
import FeaturedProperties from "./_components/FeaturedProperties";
import Hero from "./_components/Hero";
import WhatClientWant from "./_components/WhatClientWant";
import WhatWeDo from "./_components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhatWeDo />
      <ConnectingPeople />
      <WhatClientWant />
    </>
  );
}
