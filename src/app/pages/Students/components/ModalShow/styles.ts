import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
h-full
flex
items-center
justify-center
absolute
`;

export const Main = tw.main`
w-[20rem]
p-4
flex
flex-col
items-center
gap-4
bg-white
border-2
border-mbr-blue-400
rounded-lg
z-50
relative

landscape:w-[31.25rem]

md:w-[37.5rem]
md:p-8
md:gap-8
md:rounded-2xl

landscape:md2:w-[55rem]
landscape:md2:p-8
landscape:md2:gap-8
landscape:md2:rounded-2xl

landscape:lg:w-[56.25rem]
landscape:lg:p-8
landscape:lg:gap-8
landscape:lg:rounded-2xl
`;

export const Close = tw.button`
absolute
top-2
right-2

[&>svg]:text-xl

md:top-4
md:right-4
md:[&>svg]:text-4xl

landscape:md2:top-4
landscape:md2:right-4
landscape:md2:[&>svg]:text-4xl

landscape:lg:top-4
landscape:lg:right-4
landscape:lg:[&>svg]:text-4xl
`;

export const Delete = tw.div`
w-full
flex
flex-col
items-center
gap-4

md:gap-8

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const Form = tw.div`
w-full
flex
flex-col
items-center
gap-4

md:gap-8

landscape:md2:gap-4

landscape:lg:gap-4
`;

export const Row = tw.div`
w-full
flex
flex-col
items-center
justify-between
gap-2

md:gap-4

landscape:md2:flex-row
landscape:md2:gap-4

landscape:lg:flex-row
landscape:lg:gap-4
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
text-lg
text-mbr-gray-600
border-2
disabled:cursor-not-allowed

md:text-xl
md:p-4

landscape:md2:text-xl
landscape:md2:p-4

landscape:lg:text-xl
landscape:lg:p-4
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

export const UpdateAndDelete = tw.div`
flex
gap-4

md:gap-8

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const ButtonUpDel = tw.button`
h-[2rem]
flex
items-center
gap-2
text-black
text-lg
rounded-lg
bg-mbr-red-10
pr-2

[&>svg]:bg-mbr-blue-400
disabled:cursor-not-allowed

md:gap-4
md:text-2xl
md:rounded-2xl
md:pr-4
md:h-[2.75rem]

landscape:md2:gap-4
landscape:md2:text-2xl
landscape:md2:rounded-2xl
landscape:md2:pr-4
landscape:md2:h-[2.75rem]

landscape:lg:gap-4
landscape:lg:text-2xl
landscape:lg:rounded-2xl
landscape:lg:pr-4
landscape:lg:h-[2.75rem]
`;

export const Icon = tw.div`
w-[2rem]
h-full
flex
items-center
justify-center
gap-2
text-white

rounded-lg
bg-mbr-blue-150

[&>svg]:text-xl

md:w-[2.75rem]
md:rounded-2xl
md:gap-4
md:[&>svg]:text-2xl

landscape:md2:w-[2.75rem]
landscape:md2:rounded-2xl
landscape:md2:gap-4
landscape:md2:[&>svg]:text-2xl

landscape:lg:w-[2.75rem]
landscape:lg:rounded-2xl
landscape:lg:gap-4
landscape:lg:[&>svg]:text-2xl
`;

export const ButtonContainer = tw.div`
w-[17.5rem]
flex
justify-between
mt-4

md:w-[21.875rem]
md:mt-6

landscape:md2:w-[21.875rem]
landscape:md2:mt-6

landscape:lg:w-[21.875rem]
landscape:lg:mt-6
`;

export const ButtonDel = tw.button<{ color: "default" | "green" }>`
w-[6.25rem]
py-1
rounded-lg
text-white
text-base
${(props) => props.color === "default" ? "bg-mbr-gray-50" : "bg-mbr-green-20"}
cursor-pointer
disabled:cursor-not-allowed

md:w-[9.375rem]
md:py-2
md:rounded-2xl
md:text-xl

landscape:md2:w-[9.375rem]
landscape:md2:py-2
landscape:md2:rounded-2xl
landscape:md2:text-xl

landscape:lg:w-[9.375rem]
landscape:lg:py-2
landscape:lg:rounded-2xl
landscape:lg:text-xl
`;