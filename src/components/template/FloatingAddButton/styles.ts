import tw from "tailwind-styled-components";

export const Button = tw.button`
fixed
bottom-6
right-6
w-14
h-14
rounded-full
bg-mbr-green-30
flex
items-center
justify-center
cursor-pointer
shadow-lg
z-20

hover:opacity-90

[&>svg]:text-white
[&>svg]:text-2xl

md:w-16
md:h-16
md:bottom-8
md:right-8
`;
