import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
items-center
gap-20
bg-gradient-to-b
from-mbr-blue-30
to-mbr-blue-40
p-4
pb-10
relative

landscape:gap-8

md:p-8
md:gap-20
md:pb-15

landscape:lg:p-8
landscape:lg:pb-15
landscape:lg:items-center
landscape:lg:gap-[100px]

landscape:xl:gap-[64px]
`;

export const Main = tw.div`
w-full
flex
flex-wrap
justify-center
items-center
gap-4

landscape:gap-8

md:gap-8

landscape:lg:w-[700px]
landscape:lg:gap-8

landscape:xl:gap-12
`;

export const Titles = tw.div`
text-white
text-center

[&>h2]:text-2xl
[&>h2]:font-bold


md:[&>h2]:text-4xl

landscape:lg:[&>h2]:text-4xl
`;

export const Cards = tw.button`
w-[150px]
h-[100px]
mb-10
flex
border-b-4
border-mbr-gray-20
items-center
justify-center
rounded-xl
bg-white
relative
cursor-pointer
transition-all ease-in-out 3s
skew-y-[3deg]

[&>img]:h-[72px]
[&>img]:bg-transparent
[&>img]:object-contain
[&>img]:absolute
[&>img]:-top-[36px]
[&:hover>img]:animate-shake

[&>p]:text-xl
[&>p]:font-bold
[&>p]:mt-2
[&>p]:text-mbr-blue-30

md:w-[200px]
md:h-[150px]
md:[&>p]:text-3xl
md:[&>img]:h-[92px]
md:[&>img]:-top-[44px]

landscape:lg:w-[200px]
landscape:lg:h-[150px]
landscape:lg:[&>p]:text-3xl
landscape:lg:[&>img]:h-[92px]
landscape:lg:[&>img]:-top-[44px]
`;

export const Activities = tw.div`
w-[300px]
h-[350px]
flex
flex-col
items-center
justify-center
gap-2
py-4
shadow-xl
rounded-xl
relative
bg-white

[&>h2]:text-2xl
[&>h2]:font-bold
[&>h2]:text-mbr-blue-10

landscape:w-[550px]

md:w-[620px]
md:h-[450px]
md:[&>h2]:text-4xl
md:py-6
md:gap-8

landscape:lg:w-[650px]
landscape:lg:py-8
landscape:lg:gap-8
landscape:lg:[&>h2]:text-4xl
`;

export const ActivitiesDiv = tw.div`
h-full
flex
flex-wrap
justify-center
gap-4
items-center
overflow-y-auto

landscape:gap-2

landscape:lg:gap-4
`;

export const Button = tw.div`
w-[232px]
text-center
text-2xl
font-bold
py-2
rounded-lg
shadow-md
text-white
bg-gradient-to-b
from-mbr-blue-30
to-mbr-blue-40

hover:from-mbr-blue-40
hover:to-mbr-blue-30

md:w-[264px]
md:py-4
md:rounded-xl

landscape:lg:w-[264px]
landscape:lg:py-4
landscape:lg:rounded-xl
`;

export const Close = tw.div`
absolute
top-1
right-1
cursor-pointer

[&>svg]:text-2xl

md:top-2
md:right-2
md:[&>svg]:text-4xl
`;