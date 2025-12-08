import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[300px]
h-[400px]
flex
flex-col
items-center
justify-between
gap-2
py-4
px-2
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

export const Button = tw.button`
w-[232px]
h-[40px]
flex
items-center
justify-center
rounded-xl
text-xl
text-center
font-bold
text-white
bg-gradient-to-b
from-mbr-yellow-10
to-mbr-yellow-20
cursor-pointer

disabled:cursor-not-allowed

hover:from-mbr-yellow-20
hover:to-mbr-yellow-20

md:w-[300px]
md:h-[56px]
md:text-2xl

landscape:lg:w-[300px]
landscape:lg:h-[56px]
landscape:lg:text-2xl
`;