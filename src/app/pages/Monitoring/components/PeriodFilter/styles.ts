import tw from "tailwind-styled-components";

export const Filter = tw.div`
flex
items-center
flex-col
gap-1
bg-white
shadow-xl
py-2
px-8
border-2
rounded-lg
z-50

[&>h2]:font-bold
[&>h2]:text-center
[&>h2]:text-lg

md:[&>h2]:text-2xl
md:px-8

landscape:lg:[&>h2]:text-2xl
landscape:lg:px-8
landscape:lg:py-4
landscape:lg:gap-4
`;

export const Options = tw.div`
flex
flex-col
gap-1
justify-center

md:flex-row
md:gap-6

landscape:lg:flex-row
landscape:lg:gap-6
`;

export const Option = tw.label`
flex
gap-1
items-center
cursor-pointer
font-medium
text-sm

md:text-base

landscape:lg:text-base
`;

export const Radio = tw.input`
cursor-pointer
accent-mbr-blue-10
`;
