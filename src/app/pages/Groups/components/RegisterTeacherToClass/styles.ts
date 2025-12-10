import tw from "tailwind-styled-components"

export const Container = tw.div`
w-full
h-full
flex
flex-col
items-center
justify-start
z-30
`;

export const Load = tw.div`
w-full
h-full
flex
flex-col
items-center
justify-center
`;

export const Main = tw.div`
w-full
flex
flex-col
items-center
py-2
gap-2

landscape:w-[37.5rem]
landscape:py-1
landscape:gap-1

md:w-[37.5rem]
md:py-4
md:gap-8

landscape:md2:w-[50rem]
landscape:md2:py-4
landscape:md2:gap-8

landscape:lg:w-[50rem]
landscape:lg:py-4
landscape:lg:gap-8

landscape:xl:gap-2
`;

export const Form = tw.div`
w-full
flex
flex-col
rounded-xl
bg-mbr-red-60
gap-2
p-2

md:gap-4
md:p-4

landscape:md2:gap-4
landscape:md2:p-4

landscape:lg:gap-4
landscape:lg:p-4
`;

export const Header = tw.div`
w-full
px-4
py-1
flex
items-center
justify-between
bg-mbr-red-20
rounded-lg

md:py-2

landscape:md2:px-20
landscape:md2:py-4
landscape:md2:rounded-xl

landscape:lg:px-20
landscape:lg:py-4
landscape:lg:rounded-xl
`;

export const HeaderTxt = tw.div`
text-sm
text-white

md:text-xl

landscape:md2:text-2xl

landscape:lg:text-2xl
`;

export const HeaderTxtInfo = tw.div`
flex-1
text-base
text-center
text-white

md:text-2xl

landscape:md2:text-2xl

landscape:lg:text-2xl
`;

export const FormMain = tw.div`
w-full
h-[18.75rem]
overflow-y-auto
scrollstyled
flex
flex-col
gap-2

landscape:h-[8.25rem]

md:h-[25rem]
md:gap-4

landscape:md2:h-[21.875rem]
landscape:md2:gap-4

landscape:lg:h-[21.875rem]
landscape:lg:gap-4
`;

export const Row = tw.div`
w-full
flex
px-2
py-1
gap-4
rounded-lg
bg-white

md:px-4
md:py-3
md:gap-6
md:rounded-xl

landscape:md2:px-4
landscape:md2:py-3
landscape:md2:gap-6
landscape:md2:rounded-xl

landscape:lg:px-4
landscape:lg:py-3
landscape:lg:gap-6
landscape:lg:rounded-xl
`;

export const Radio = tw.button`
w-[1.75rem]
h-[1.5rem]
flex
items-center
justify-center
bg-mbr-red-20
rounded-md
cursor-pointer

[&>svg]:text-white
[&>svg]:text-lg

md:w-[2.25rem]
md:h-[2.25rem]
md:[&>svg]:text-2xl

landscape:md2:w-[2.25rem]
landscape:md2:h-[2.25rem]
landscape:md2:[&>svg]:text-2xl

landscape:lg:w-[2.25rem]
landscape:lg:h-[2.25rem]
landscape:lg:[&>svg]:text-2xl
`;

export const RowText = tw.p`
w-full
text-sm

md:text-xl

landscape:md2:text-2xl

landscape:lg:text-2xl
`;

export const ConfirmButton = tw.button`
w-[208px]
h-[40px]
bg-mbr-green-30
rounded-lg
text-base
font-semibold
text-white
hover:bg-mbr-green-500/90
transition-colors

disabled:cursor-not-allowed

md:w-[300px]
md:h-[48px]
md:text-xl
md:rounded-xl

landscape:lg:w-[300px]
landscape:lg:h-[48px]
landscape:lg:text-xl
landscape:lg:rounded-xl
`;