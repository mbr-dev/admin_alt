import tw from "tailwind-styled-components";

export const Overlay = tw.div`
fixed
inset-0
z-[999]
bg-black/50
flex
items-center
justify-center
p-4
`;

export const Card = tw.div`
w-full
max-w-[420px]
bg-white
rounded-2xl
border
border-mbr-gray-30
p-5
flex
flex-col
gap-4
`;

export const Title = tw.h3`
text-mbr-blue-10
text-lg
font-bold

md:text-xl
`;

export const Description = tw.p`
text-mbr-gray-80
text-sm
leading-6

md:text-base
`;

export const Footer = tw.div`
w-full
flex
items-center
justify-end
gap-2

md:gap-3
`;

export const Button = tw.button<{ $variant: "primary" | "secondary" }>`
min-w-[96px]
px-4
py-2
rounded-lg
text-sm
font-semibold
cursor-pointer
disabled:opacity-70
disabled:cursor-not-allowed

${({ $variant }) => ($variant === "primary" ? "bg-mbr-red-10 text-white" : "bg-mbr-gray-50 text-white")}
`;
