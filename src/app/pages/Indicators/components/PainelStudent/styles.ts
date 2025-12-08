import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
p-4
pt-6
bg-gradient-to-b
from-white
to-mbr-gray-40
pb-10
relative

md:p-8
md:pb-15

landscape:lg:p-8
landscape:lg:pb-15
`;

export const ButtonBack = tw.div`
flex
items-center
gap-1
absolute
top-1
left-1
font-bold
cursor-pointer

[&>svg]:text-base

md:top-4
md:left-4
md:text-lg
md:[&>svg]:text-xl

landscape:lg:top-4
landscape:lg:left-4
landscape:lg:text-lg
landscape:lg:[&>svg]:text-xl
`;

export const Main = tw.div`
w-full
flex
flex-col
justify-center
items-center
gap-4

landscape:gap-2

md:gap-8

landscape:lg:gap-8

landscape:xl:gap-4
`;

export const Titles = tw.div`
text-black
text-center

[&>h2]:text-xl
[&>h2]:text-mbr-blue-10
[&>h2]:font-bold

[&>p]:flex-1
[&>p]:truncate
[&>p]:text-base
[&>p]:font-bold

md:[&>h2]:text-4xl
md:[&>p]:text-2xl

landscape:lg:[&>h2]:text-4xl
landscape:lg:[&>p]:text-2xl
`;

export const Filter = tw.div`
flex
items-center
flex-col
gap-1
bg-white
shadow-xl
py-2
px-8
border-2
rounded-lg
z-50

[&>h2]:font-bold
[&>h2]:text-center
[&>h2]:text-lg

md:[&>h2]:text-2xl
md:px-8

landscape:lg:[&>h2]:text-2xl
landscape:lg:px-8
landscape:lg:py-4
landscape:lg:gap-4
`;

export const Div = tw.div`
flex
flex-col
gap-1
justify-center

landscape:lg:flex-row
landscape:lg:gap-6
`;

export const FilterDiv = tw.div`
flex
gap-1
items-center
`;

export const Report = tw.div`
w-full
h-[380px]
p-2
gap-2
flex
flex-col
items-end
bg-white
border-[1px]
shadow-xl
rounded-xl
overflow-auto
z-50

landscape:h-[300px]

md:h-[564px]
md:gap-4
md:p-4

landscape:lg:h-[400px]
landscape:lg:gap-4
landscape:lg:p-4

landscape:xl:h-[432px]
`;

export const Load = tw.div`
w-full
h-full
flex
items-center
justify-center
`;