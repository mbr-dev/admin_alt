import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[320px]
flex
items-center
justify-center
gap-2
z-30

landscape:w-[800px]

md:w-[700px]
md:gap-4

landscape:lg:w-[800px]
`;

export const Button = tw.button`
w-[84px]
h-[44px]
bg-mbr-red-10
text-white
text-sm
font-semibold
rounded-lg
cursor-pointer

landscape:w-[124px]

md:w-[200px]
md:h-[48px]
md:text-lg

landscape:lg:w-[200px]
`;