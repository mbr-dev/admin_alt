import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[9.375rem]
h-[9.375rem]
py-1
px-2
flex
flex-col
items-center
justify-around
rounded-lg
border-2
border-mbr-blue-150
bg-white
relative
z-40

md:w-[12.5rem]
md:h-[12.5rem]
md:rounded-xl

landscape:md2:w-[12.5rem]
landscape:md2:h-[12.5rem]
landscape:md2:rounded-xl

landscape:lg:w-[12.5rem]
landscape:lg:h-[12.5rem]
landscape:lg:rounded-xl

[&:hover>button]:flex
`;

export const Avatar = tw.div`
w-[4.5rem]
h-[4.5rem]
flex
items-center
justify-center
rounded-full
border-2
border-mbr-gray-400

md:w-[4.5rem]
md:h-[4.5rem]

landscape:md2:w-[4.5rem]
landscape:md2:h-[4.5rem]

landscape:lg:w-[4.5rem]
landscape:lg:h-[4.5rem]
`;

export const UserIcon = tw.button`
w-[2rem]
h-[2rem]
flex
items-center
justify-center
rounded-lg
absolute
top-1
right-1
bg-mbr-red-20
cursor-pointer

[&>svg]:text-lg
[&>svg]:text-white
`;

export const Name = tw.h2`
text-base
font-normal
text-black
text-center
max-w-[90%]
text-ellipsis
overflow-hidden
whitespace-nowrap

md:text-xl

landscape:md2:text-xl

landscape:lg:text-xl
`;

export const Unit = tw.p`
text-base
font-normal
text-mbr-blue-150
text-center
line-clamp-1

md:text-xl

landscape:md2:text-xl

landscape:lg:text-xl
`;