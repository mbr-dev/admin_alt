import tw from "tailwind-styled-components";

export const Main = tw.div`
w-full
flex
flex-col
justify-center
items-center
gap-4

landscape:flex-row

md:flex-row
md:gap-8
md:py-4

landscape:lg:gap-8
landscape:lg:py-4
`;

export const Button = tw.button`
cursor-pointer
shadow-lg

disabled:cursor-not-allowed
`;