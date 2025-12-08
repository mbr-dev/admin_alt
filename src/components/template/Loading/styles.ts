import tw from "tailwind-styled-components";

export const Container = tw.div`
bg-mbr-blue-10
w-full
h-full
flex
items-center
justify-center
absolute
top-0
left-0
z-[10000]
overflow-hidden
`;

export const Main = tw.div`
w-[250px]
h-[150px]
flex
flex-col
gap-4
animate-pulse

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:w-[300px]
landscape:h-[150px]

md:w-[450px]
md:h-[280px]

landscape:lg:w-[450px]
landscape:lg:h-[280px]

landscape:xl:w-[500px]
landscape:xl:h-[300px]
`;