import tw from "tailwind-styled-components"

export const Container = tw.div`
w-[18.75rem]
h-[20.25rem]
flex
flex-col
items-center
justify-between
border-2
border-mbr-blue-150
gap-4
bg-white
rounded-lg
p-2

landscape:w-[37.5rem]
landscape:p-1
landscape:gap-1
landscape:h-[12.5rem]

md:w-[37.5rem]
md:h-[25rem]
md:p-8
md:gap-8
md:rounded-2xl

landscape:md2:w-[56.25]
landscape:md2:h-[25rem]
landscape:md2:p-10
landscape:md2:gap-8
landscape:md2:rounded-2xl

landscape:lg:w-[56.25]
landscape:lg:h-[25rem]
landscape:lg:p-10
landscape:lg:gap-8
landscape:lg:rounded-2xl
`;

export const Title = tw.h2`
text-xl
text-center

md:text-2xl

landscape:md2:text-3xl

landscape:lg:text-3xl
`;

export const FormField = tw.div`
w-[17.5rem]
flex
flex-col
gap-1

landscape:w-[18.75rem]

md:w-[18.75rem]

landscape:md2:w-[18.75rem]

landscape:lg:w-[18.75rem]
`;

export const Label = tw.label`
text-lg
font-normal
text-black
mb-1

md:text-2xl

landscape:md2:text-2xl

landscape:lg:text-2xl
`;

export const ButtonArea = tw.div`
w-[17.5rem]
flex
items-center
justify-between

md:w-[25rem]

landscape:w-[28.125rem]
`;

export const Button = tw.button<{ color: "default" | "green"}>`
w-[7.5rem]
py-2
rounded-lg
text-white
text-sm
${(props) => props.color === "default" ? "bg-mbr-gray-50" : "bg-mbr-green-30"}
cursor-pointer
disabled:cursor-not-allowed

md:w-[11rem]
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