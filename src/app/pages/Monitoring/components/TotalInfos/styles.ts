import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
flex-wrap
gap-4
z-50

md:gap-8

landscape:lg:gap-8
`;

export const Div = tw.div`
w-[150px]
h-[110px]
flex
flex-col
items-center
justify-center
rounded-xl
shadow-lg
text-white
text-center

[&>img]:w-[36px]

[&>h3]:text-base
[&>h3]:font-bold

[&>p]:text-sm

md:w-[280px]
md:h-[164px]
md:[&>img]:w-[54px]
md:[&>h3]:text-2xl
md:[&>p]:text-lg

landscape:lg:w-[292px]
landscape:lg:h-[164px]
landscape:lg:[&>img]:w-[54px]
landscape:lg:[&>h3]:text-2xl
landscape:lg:[&>p]:text-xl
`;