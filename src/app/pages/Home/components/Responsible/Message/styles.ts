import tw from "tailwind-styled-components";

export const Card = tw.article`
w-full
flex
items-center
gap-3
rounded-2xl
bg-[#FDF2F5]
px-4
py-4
shadow-sm

md:gap-4
md:px-6
md:py-5
`;

export const Text = tw.div`
flex
flex-col
gap-1
min-w-0
flex-1
`;

export const Title = tw.h2`
text-base
font-bold
text-[#E72766]

md:text-xl
`;

export const Subtitle = tw.p`
text-sm
font-medium
leading-snug
text-[#605D60]

md:text-base
`;

export const Star = tw.span`
flex
items-center
justify-center
w-10
h-10
rounded-full
bg-[#FBDBE3]
text-lg
text-[#E72766]
shrink-0

md:w-12
md:h-12
md:text-xl
`;

export const Heart = tw.span`
flex
items-center
justify-center
w-10
h-10
rounded-full
bg-[#FBDBE3]
text-lg
text-[#E72766]
shrink-0

md:w-12
md:h-12
md:text-xl
`;
