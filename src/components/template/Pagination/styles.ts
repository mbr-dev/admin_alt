import tw from "tailwind-styled-components";

export const Container = tw.div`
flex
flex-row
gap-4
`;

export const Main = tw.div`
w-full
flex
items-center
justify-center
`;

export const NextAndPrevious = tw.button`
flex
items-center
justify-center
gap-1
text-sm
cursor-pointer
text-mbr-blue-10
disabled:cursor-not-allowed
font-semibold

[&>p]:hidden
[&>p]:text-sm

[&>svg]:text-base

landscape:[&>p]:flex
landscape:[&>p]:text-lg
landscape:[&>svg]:text-lg

md:[&>p]:flex
md:[&>p]:text-lg
md:[&>svg]:text-lg

landscape:lg:[&>p]:flex
landscape:lg:[&>p]:text-xl
landscape:lg:[&>svg]:text-xl
`;

export const ButtonPages = tw.button`
rounded-lg
py-1
px-3
flex
items-center
justify-center
text-mbr-blue-10
text-sm

landscape:text-lg

md:text-xl

landscape:lg:text-xl
`;
