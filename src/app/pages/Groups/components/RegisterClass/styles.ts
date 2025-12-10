import tw from "tailwind-styled-components"

export const Container = tw.div`
w-[20rem]
bg-white
rounded-lg
border-[3px]
border-mbr-red-20
z-30
flex
flex-col
items-center
p-4

landscape:w-[31.25rem]

md:w-[650px]
md:p-8
md:rounded-2xl

landscape:md2:w-[50rem]
landscape:md2:p-8
landscape:md2:rounded-2xl

landscape:lg:w-[50rem]
landscape:lg:p-8
landscape:lg:rounded-2xl
`;

export const Form = tw.div`
w-full
flex
flex-col
gap-4

landscape:gap-2

md:gap-8

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const FormGrid = tw.div`
flex
flex-col
items-center
justify-center
gap-4

landscape:gap-2

md:gap-8

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const FormField = tw.div`
w-full
flex
flex-col
gap-1
`;

export const Row = tw.div`
w-full
flex
flex-col
items-center
justify-center
gap-4

landscape:flex-row

md:gap-8

landscape:md2:gap-8

landscape:lg:gap-8
`;

export const Label = tw.label`
text-base
font-normal
text-black
mb-1

md:text-xl

landscape:md2:text-xl

landscape:lg:text-xl
`;

export const Input = tw.input`
w-full
p-2
bg-[#ECF3F9]
rounded-lg
text-base
outline-none
focus:ring-2
focus:ring-[#EC0F68]
disabled:bg-[#ECF3F9]/70
disabled:cursor-not-allowed

md:rounded-2xl
md:p-3
md:tex-xl

landscape:md2:rounded-2xl
landscape:md2:p-3
landscape:md2:text-xl

landscape:lg:rounded-2xl
landscape:lg:p-3
landscape:lg:text-xl
`;

export const ButtonContainer = tw.div`
w-full
flex
justify-center
mt-2

md:mt-5

landscape:md2:mt-6

landscape:lg:mt-6

gap-4
`;

export const ButtonCode = tw.button`
w-[200px]
h-[44px]
bg-mbr-red-20
text-white
font-semibold
rounded-lg
text-sm
disabled:cursor-not-allowed

md:text-base
`;

export const ConfirmButton = tw.button<{ color: "default" | "green" }>`
w-[12.5rem]
py-2
rounded-lg
text-white
text-xl
${(props) => props.color === "default" ? "bg-mbr-gray-50" : "bg-mbr-green-30"}
cursor-pointer
disabled:cursor-not-allowed

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
`;