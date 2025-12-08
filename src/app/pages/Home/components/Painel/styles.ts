import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
bg-gradient-to-b
from-mbr-blue-30
to-mbr-blue-40
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

export const Painel = tw.button`
w-[300px]
flex
flex-col
items-center
gap-2
px-2
py-4
border-2
rounded-xl
shadow-lg
text-center
text-white
cursor-pointer
z-10

[&>div>h2]:text-2xl
[&>div>h2]:font-bold

[&>div>p]:text-sm
[&>div>p]:font-semibold

md:w-[500px]
md:py-8
md:gap-4
md:px-4
md:[&>div>h2]:text-3xl
md:[&>div>p]:text-lg

landscape:lg:w-[450px]
landscape:lg:py-8
landscape:lg:gap-4
landscape:lg:px-4
landscape:lg:[&>div>h2]:text-3xl
landscape:lg:[&>div>p]:text-lg

landscape:xl:w-[500px]
`;

export const PainelIcon = tw.div`
w-[64px]

[&>svg]:w-full
[&>svg]:h-full
[&>svg]:object-contain

md:w-[100px]

landscape:lg:w-[100px]
`;