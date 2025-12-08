import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[300px]
h-[400px]
flex
flex-col
items-center
gap-2
px-2
py-4
rounded-xl
shadow-lg
bg-white
z-10

md:w-[500px]
md:h-[550px]
md:py-6
md:px-4

landscape:lg:w-[450px]
landscape:lg:h-[524px]
landscape:lg:py-6
landscape:lg:px-4

landscape:xl:w-[500px]
landscape:xl:h-[550px]
`;

export const Main = tw.div`
w-full
h-full
flex
flex-col
gap-2
overflow-y-auto

landscape:gap-1

md:gap-4

landscape:lg:gap-4
`;

export const Card = tw.div`
flex
flex-col
bg-mbr-gray-10
rounded-lg
p-2

md:p-3

landscape:lg:p-3
landscape:lg:rounded-xl
`;

export const CardInfo = tw.div`
flex
gap-1
items-center
rounded-lg

md:gap-2

landscape:lg:rounded-xl
landscape:lg:gap-2
`;

export const Dropdown = tw.div`
flex
gap-1
items-center
py-2

[&>p]:text-base

md:[&>p]:text-xl

landscape:lg:[&>p]:text-xl
`;

export const Title = tw.div`
text-base
font-bold

md:text-xl

landscape:lg:text-xl
`;