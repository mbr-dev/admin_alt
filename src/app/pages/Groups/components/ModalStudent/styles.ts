import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
h-full
flex
flex-col
items-center
justify-center
absolute

landscape:md2:justify-start

landscape:lg:justify-start
`;

export const Main = tw.main`
w-[20rem]
p-2
flex
flex-col
items-center
gap-2
bg-white
border-2
border-mbr-blue-400
rounded-lg
z-50
relative
-ml-8

landscape:w-[34.375rem]
landscape:p-1
landscape:gap-1

md:w-[31.25rem]
md:gap-4
md:p-4

landscape:md2:w-[40.625rem]
landscape:md2:p-8
landscape:md2:gap-8
landscape:md2:rounded-2xl

landscape:lg:w-[40.625rem]
landscape:lg:p-8
landscape:lg:gap-8
landscape:lg:rounded-2xl
`;

export const Close = tw.button`
absolute
top-1
right-1

[&>svg]:text-xl

md:top-2
md:right-2
md:[&>svg]:text-4xl

landscape:md2:top-2
landscape:md2:right-2
landscape:md2:[&>svg]:text-4xl

landscape:lg:top-2
landscape:lg:right-2
landscape:lg:[&>svg]:text-4xl
`;

export const Form = tw.div`
w-full
h-[21.875rem]
flex
p-2
flex-col
gap-2
overflow-y-auto
scrollstyled

landscape:p-1
landscape:gap-1
landscape:h-[12.5rem]

md:h-[31.25rem]
md:p-4
md:gap-4

landscape:md2:h-[28.125rem]
landscape:md2:p-4
landscape:md2:gap-4

landscape:lg:h-[28.125rem]
landscape:lg:p-4
landscape:lg:gap-4
`;

export const Title = tw.h2`
text-xl

md:text-4xl

landscape:md2:text-4xl

landscape:lg:text-4xl
`;

export const List = tw.p`
flex
gap-2
items-center
justify-between
px-1
pb-1
text-base
border-b-2
border-mbr-blue-150

[&>svg]:text-2xl
[&>svg]:text-mbr-blue-150

md:px-2
md:pb-2
md:[&>svg]:text-2xl
md:gap-8
md:text-2xl

landscape:md2:px-2
landscape:md2:text-2xl
landscape:md2:pb-2
landscape:md2:[&>svg]:text-2xl
landscape:md2:gap-8

landscape:lg:px-2
landscape:lg:text-2xl
landscape:lg:pb-2
landscape:lg:[&>svg]:text-2xl
landscape:lg:gap-8
`;

export const ButtonDelete = tw.button`
bg-mbr-red-20
rounded-lg
w-[1.75rem]
h-[1.75rem]
flex
items-center
justify-center

[&>svg]:text-base
[&>svg]:text-white

md:w-[2.75rem]
md:h-[2.75rem]
md:[&>svg]:text-2xl
md:rounded-xl

landscape:md2:w-[2.75rem]
landscape:md2:h-[2.75rem]
landscape:md2:[&>svg]:text-2xl
landscape:md2:rounded-xl

landscape:lg:w-[2.75rem]
landscape:lg:h-[2.75rem]
landscape:lg:[&>svg]:text-2xl
landscape:lg:rounded-xl
`;

export const Delete = tw.div`
w-full
h-[15.625rem]
p-2
flex
flex-col
items-center
justify-between

landscape:p-1
landscape:h-[12.5rem]

md:h-[31.25rem]
md:p-4

landscape:md2:h-[28.125rem]
landscape:md2:p-4

landscape:lg:h-[28.125rem]
landscape:lg:p-4
`;

export const Div = tw.div`
flex-1
w-full
flex
flex-col
items-center
justify-center
gap-2

md:gap-4

landscape:md2:gap-4

landscape:lg:gap-4
`;

export const TextDelete = tw.p`
text-base
text-center

md:text-2xl

landscape:md2:text-2xl

landscape:lg:text-2xl
`;

export const ButtonArea = tw.div`
w-full
flex
items-center
justify-between
`;

export const Button = tw.button<{ color: "default" | "green"}>`
w-[7.75rem]
py-2
rounded-lg
text-white
text-base
${(props) => props.color === "default" ? "bg-mbr-gray-50" : "bg-mbr-green-30"}
cursor-pointer
disabled:cursor-not-allowed

md:w-[12.5rem]
md:py-3
md:rounded-2xl
md:text-2xl

landscape:md2:w-[12.5rem]
landscape:md2:py-3
landscape:md2:rounded-2xl
landscape:md2:text-2xl

landscape:lg:w-[12.5rem]
landscape:lg:py-3
landscape:lg:rounded-2xl
landscape:lg:text-2xl
`;