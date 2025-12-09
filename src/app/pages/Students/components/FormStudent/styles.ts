import tw from "tailwind-styled-components"

export const Container = tw.div`
w-[20rem]
p-4
flex
flex-col
bg-white
rounded-lg
border-2
border-mbr-blue-150

landscape:w-[37.5rem]

md:w-[37.5rem]
md:p-8
md:rounded-2xl

landscape:md2:w-[56.25rem]
landscape:md2:p-8
landscape:md2:rounded-2xl

landscape:lg:w-[56.25rem]
landscape:lg:p-8
landscape:lg:rounded-2xl
`;

export const Form = tw.div`
w-full
flex
flex-col
items-center
gap-2

md:gap-4

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const Loading = tw.div`
w-full
h-[12.5rem]
flex
justify-center
items-center

md:h-[18.25rem]

landscape:md2:h-[18.25rem]

landscape:lg:h-[18.25rem]
`;

export const Row = tw.div`
w-full
flex
flex-col
items-center
justify-between
gap-2

landscape:flex-row

md:gap-4

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const Label = tw.label`
w-full
flex
flex-col
gap-1
text-lg
font-normal
text-black

md:text-2xl

landscape:md2:text-2xl

landscape:lg:text-2xl
`;

export const Input = tw.input`
w-full
p-2
rounded-lg
bg-mbr-gray-10
text-lg
text-black
text-mbr-gray-600
disabled:cursor-not-allowed

md:text-xl
md:p-4

landscape:md2:text-xl
landscape:md2:p-4

landscape:lg:text-xl
landscape:lg:p-4
`;

export const Div = tw.div`
w-full
flex
items-center
justify-between
gap-2

md:gap-4

landscape:md2:gap-4

landscape:lg:gap-4
`;

export const ButtonUser = tw.button`
w-[9.375rem]
py-2
rounded-lg
text-white
text-xl
font-semibold
bg-mbr-green-30
cursor-pointer
disabled:cursor-not-allowed

landscape:py-1
landscape:text-base
landscape:w-[6.25rem]

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

landscape:xl:w-[12.5rem]
landscape:xl:py-2
landscape:xl:rounded-xl
landscape:xl:text-lg
`;

export const Button = tw.button`
w-[12.5rem]
py-2
rounded-lg
text-white
text-xl
font-semibold
bg-mbr-green-30
cursor-pointer
disabled:cursor-not-allowed

landscape:py-1
landscape:text-base
landscape:w-[9.375rem]

md:w-[15.625rem]
md:py-3
md:rounded-2xl
md:text-2xl

landscape:md2:w-[15.625rem]
landscape:md2:py-3
landscape:md2:rounded-2xl
landscape:md2:text-2xl

landscape:lg:w-[15.625rem]
landscape:lg:py-3
landscape:lg:rounded-2xl
landscape:lg:text-2xl

landscape:xl:w-[12.5rem]
landscape:xl:py-2
landscape:xl:rounded-xl
landscape:xl:text-lg
`;