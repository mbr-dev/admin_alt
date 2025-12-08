import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
items-center
justify-center
p-4
gap-4
pb-10
relative
bg-mbr-gray-10

md:gap-8
md:p-8
md:pb-15

landscape:lg:p-8
landscape:lg:gap-8
landscape:lg:pb-15
`;

export const Titles = tw.div`
text-black
text-center

[&>h2]:text-xl
[&>h2]:text-mbr-blue-10
[&>h2]:font-bold

[&>p]:text-base
[&>p]:font-bold

md:[&>h2]:text-4xl
md:[&>p]:text-2xl

landscape:lg:[&>h2]:text-4xl
landscape:lg:[&>p]:text-2xl
`;

export const Main = tw.div`
w-[300px]
flex
flex-col
justify-center
items-center
gap-4
landscape:gap-2

landscape:w-[480px]

md:w-[600px]
md:gap-8

landscape:lg:w-[800px]
landscape:lg:gap-8

landscape:xl:w-[944px]
landscape:xl:gap-8
`;