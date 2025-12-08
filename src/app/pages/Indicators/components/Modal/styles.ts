import tw from "tailwind-styled-components";

export const Main = tw.div`
w-full
flex
flex-col
justify-center
items-center
gap-4

landscape:gap-2

md:w-[400px]
md:gap-8
md:py-4

landscape:lg:gap-8
landscape:lg:py-4
`;

export const Form = tw.div`
w-full
flex
flex-col
gap-2

md:gap-4
`;

export const ButtonBox = tw.div`
flex
gap-2

md:gap-8
`;

export const Button = tw.button`
w-[120px]
h-[44px]
border-2
border-mbr-blue-10
rounded-xl
text-white
text-lg
font-bold
cursor-pointer
shadow-lg

disabled:cursor-not-allowed

md:w-[150px]
md:h-[54px]
md:text-xl

landscape:lg:w-[150px]
landscape:lg:h-[54px]
landscape:lg:text-xl
`;