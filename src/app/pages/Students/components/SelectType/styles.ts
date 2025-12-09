import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
gap-4
z-40

md:gap-8
`;

export const Button = tw.button`
w-[150px]
h-[36px]
bg-mbr-red-10
text-white
text-lg
font-semibold
rounded-lg
cursor-pointer

md:w-[200px]
md:h-[48px]
md:text-2xl
`;