import tw from "tailwind-styled-components";

export const Box1 = tw.div`
w-full
rounded-2xl
border
border-mbr-blue-80/40
bg-white
shadow-sm
overflow-hidden
`;

export const Section = tw.section`
min-w-0
px-4
py-5

sm:px-6
sm:py-6
`;

/** Dados pessoais + Responsável: colunas lado a lado a partir de md. */
export const TopPairGrid = tw.div`
grid
grid-cols-1
divide-y
divide-mbr-gray-40

md:grid-cols-2
md:divide-x
md:divide-y-0
`;

export const SectionDivider = tw.div`
h-px
bg-mbr-gray-40
`;

export const BlockTitle = tw.h2`
text-xs
font-semibold
uppercase
tracking-wide
text-mbr-blue-10

sm:text-sm
`;

export const PersonalRow = tw.div`
mt-3
flex
flex-col
items-center
gap-4
text-center

sm:mt-4
sm:flex-row
sm:items-center
sm:text-left
`;

export const InitialsCircle = tw.div`
flex
h-16
w-16
shrink-0
items-center
justify-center
rounded-full
bg-mbr-blue-10
text-lg
font-semibold
text-white

sm:h-[4.5rem]
sm:w-[4.5rem]
sm:text-xl
`;

export const PersonalTextCol = tw.div`
flex
min-w-0
flex-1
flex-col
gap-1
`;

export const PersonalName = tw.p`
text-base
font-semibold
text-mbr-gray-30

sm:text-lg
`;

export const MetaRow = tw.p`
flex
flex-wrap
items-center
justify-center
gap-x-2
gap-y-0.5
text-sm
text-mbr-gray-50

sm:justify-start
`;

export const MetaIcon = tw.span`
inline-flex
shrink-0
text-mbr-blue-10

[&>svg]:text-base
`;

export const GuardianBlock = tw.div`
mt-3
flex
flex-col
gap-3

sm:mt-4
`;

export const GuardianName = tw.p`
text-base
font-semibold
text-mbr-gray-30

sm:text-lg
`;

export const InfoRow = tw.div`
flex
flex-wrap
items-start
gap-2
text-sm
text-mbr-gray-50
`;

export const CidBlock = tw.div`
mt-3
grid
grid-cols-1
gap-x-4
gap-y-3

sm:mt-4

md:grid-cols-2
lg:grid-cols-3
`;

export const CidLine = tw.p`
min-w-0
break-words
text-sm
leading-relaxed
text-mbr-gray-30

sm:text-base
`;

export const CidEmpty = tw.p`
col-span-full
text-sm
italic
text-mbr-gray-50
`;
