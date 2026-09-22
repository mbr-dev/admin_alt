import tw from "tailwind-styled-components";

export const Card = tw.article`
w-full
flex
items-center
gap-3
rounded-2xl
bg-[#FDF5DE]
px-4
py-4
shadow-sm

md:gap-4
md:px-6
md:py-5
`;

export const Left = tw.div`
flex
items-center
gap-3
min-w-0
flex-1

md:gap-4
`;

export const LetterIcon = tw.img`
w-12
h-12
object-contain
shrink-0

md:w-16
md:h-16
`;

export const Text = tw.div`
flex
flex-col
gap-1
min-w-0
`;

export const Title = tw.h2`
text-base
font-bold
text-[#FD7603]

md:text-xl
`;

export const Subtitle = tw.p`
text-sm
font-medium
leading-snug
text-[#605D60]

md:text-base
`;

export const CarIcon = tw.img`
w-16
h-16
object-contain
shrink-0

md:w-24
md:h-24
`;
