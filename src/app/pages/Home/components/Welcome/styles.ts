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
w-[280px]
h-[144px]
flex
items-center
justify-between
relative
z-10
bg-red-20

[&>img]:w-[250px]
[&>img]:h-full
[&>img]:object-contain

landscape:w-[450px]

md:w-[600px]
md:h-[250px]

landscape:lg:w-[800px]
landscape:lg:h-[350px]
landscape:lg:rounded-2xl

landscape:xl:w-[1000px]
landscape:xl:h-[380px]
`;

export const Div = tw.div`
w-[200px]
text-[32px]
text-white
text-center

landscape:w-[400px]

md:w-[450px]
md:text-[44px]

landscape:lg:w-[600px]
landscape:lg:text-[64px]

landscape:xl:w-[800px]
`;

export const Kid = tw.div`
w-[84px]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-cover

md:w-[150px]

landscape:lg:w-[200px]
`;