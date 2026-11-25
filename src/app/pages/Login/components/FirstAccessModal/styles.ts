import tw from "tailwind-styled-components";

export const Overlay = tw.div`
fixed
inset-0
z-50
flex
items-center
justify-center
bg-mbr-bg-modal
p-4
`;

export const Dialog = tw.div`
w-full
max-w-md
flex
flex-col
gap-4
p-4
bg-white
rounded-2xl
border-2
border-[#ec5691]/40

md:p-6
md:gap-5
`;

export const Title = tw.h2`
text-[#f21a6f]
text-xl
font-bold

md:text-2xl
`;

export const Hint = tw.p`
text-mbr-gray-50
text-xs
font-normal

md:text-sm
`;

export const Form = tw.form`
w-full
flex
flex-col
gap-3
`;

export const Label = tw.label`
w-full
flex
flex-col
gap-1
text-sm
font-medium
text-black

md:text-base
`;

export const Input = tw.input`
w-full
rounded-lg
border
border-mbr-gray-30
px-3
py-2
text-base
text-black
outline-none

focus:border-[#ec5691]
focus:ring-2
focus:ring-[#ec5691]/30

disabled:cursor-not-allowed
disabled:opacity-60
`;

export const Error = tw.p`
text-xs
font-medium
text-mbr-red-10

md:text-sm
`;

export const Actions = tw.div`
flex
flex-col
gap-2

sm:flex-row
sm:justify-end
`;

export const CancelButton = tw.button`
rounded-lg
border
border-mbr-gray-30
bg-white
px-4
py-2
text-sm
font-medium
text-black
cursor-pointer

hover:bg-mbr-gray-10
focus-visible:ring-2
focus-visible:ring-[#ec5691]
focus-visible:ring-offset-2

disabled:cursor-not-allowed
disabled:opacity-60

md:text-base
`;

export const ConfirmButton = tw.button`
rounded-lg
bg-[#ED598D]
px-4
py-2
text-sm
font-semibold
text-white
cursor-pointer

hover:bg-[#f21a6f]
focus-visible:ring-2
focus-visible:ring-[#ec5691]
focus-visible:ring-offset-2

disabled:cursor-not-allowed
disabled:opacity-60

md:text-base
`;
