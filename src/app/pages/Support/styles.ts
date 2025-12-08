import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
min-h-full
flex
flex-col
gap-4
items-center
justify-center
bg-gradient-to-b
from-mbr-blue-30
to-mbr-blue-40
p-4
pb-10
relative

landscape:flex-row
landscape:h-[350px]

md:p-8
md:gap-10
md:pb-15

landscape:lg:p-8
landscape:lg:pb-15
landscape:lg:gap-20
`;

export const Card = tw.div`
w-[300px]
h-[220px]
rounded-xl
flex
flex-col
items-center
justify-between
bg-white
shadow-xl
p-4
z-10

md:w-[500px]
md:h-[300px]
md:p-8

landscape:lg:w-[500px]
landscape:lg:h-[300px]
landscape:lg:p-8
`;

export const Infos = tw.div`
flex
flex-col
text-center

[&>h2]:text-2xl
[&>h2]:font-bold
[&>h2]:text-mbr-blue-20

[&>p]:text-base
[&>p]:font-bold

md:[&>h2]:text-4xl
md:[&>p]:text-lg

landscape:lg:[&>h2]:text-4xl
landscape:lg:[&>p]:text-lg
`;

export const Contact = tw.div`
flex
flex-col
gap-2

md:gap-4

landscape:lg:gap-4
`;

export const Button = tw.a`
w-[250px]
h-[44px]
flex
items-center
justify-center
gap-2
rounded-xl
bg-mbr-gray-20
cursor-pointer
text-base
font-bold
transition-colors
duration-300
ease-in-out

[&>svg]:text-lg

md:w-[300px]
md:h-[54px]
md:text-lg
md:[&>svg]:text-2xl

landscape:lg:w-[300px]
landscape:lg:h-[54px]
landscape:lg:text-lg
landscape:lg:[&>svg]:text-2xl
`;

export const Image = tw.div`
hidden
w-[150px]
h-[200px]
z-20
absolute

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:flex
landscape:bottom-[0px]

md:w-[300px]
md:h-[300px]

landscape:lg:flex
landscape:lg:bottom-0
landscape:lg:w-[300px]
landscape:lg:h-[300px]

landscape:xl:bottom-20
`;