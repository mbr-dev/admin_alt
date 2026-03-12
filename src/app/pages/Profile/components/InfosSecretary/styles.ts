import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[300px]
flex
flex-col
z-10

md:w-[400px]

landscape:lg:w-[616px]
`;

export const Card = tw.div`
w-full
bg-white
rounded-lg
shadow-base
border-2
border-mbr-gray-20
p-4
flex
flex-col
gap-4

md:p-6
`;

export const Title = tw.h3`
text-xl
font-bold
text-mbr-blue-10

md:text-2xl
`;

export const Grid = tw.div`
w-full
grid
grid-cols-1
gap-3

landscape:lg:grid-cols-2
`;

export const Field = tw.label`
w-full
flex
flex-col
gap-1
text-sm
font-semibold
text-black

md:text-base
`;

export const Input = tw.input`
w-full
h-11
rounded-lg
bg-mbr-gray-10
border
border-mbr-gray-20
px-3
text-base
text-mbr-gray-80
outline-none

disabled:bg-mbr-gray-20
disabled:text-mbr-gray-80
disabled:cursor-not-allowed
`;

export const Footer = tw.div`
w-full
flex
justify-end
`;

export const Button = tw.button`
px-5
py-2
rounded-lg
bg-mbr-green-30
text-white
font-semibold
text-sm
cursor-pointer

md:text-base
`;
