import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
px-4
py-[44px]
relative

md:py-[64px]

landscape:lg:py-[100px]
`;

export const Main = tw.div`
w-full
flex
flex-col
items-center
justify-center
gap-4

landscape:flex-row

md:gap-10

landscape:lg:gap-10

landscape:xl:gap-20
`;

export const Infos = tw.div`
flex
flex-col
gap-2
z-10

[&>h2]:text-white
[&>h2]:text-xl
[&>h2]:pl-4
[&>h2]:font-bold

md:[&>h2]:pl-8
md:gap-4
md:[&>h2]:text-3xl

landscape:lg:gap-4
landscape:lg:[&>h2]:pl-8
landscape:lg:[&>h2]:text-3xl
`;