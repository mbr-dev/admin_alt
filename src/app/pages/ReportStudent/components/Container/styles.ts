import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
min-h-0
w-full
h-full
flex
flex-col
bg-mbr-gray-20
p-4
pb-24
relative
gap-4

md:p-8
md:pb-24
md:gap-6

landscape:lg:p-8
landscape:lg:pb-24
`;

export const Main = tw.div`
flex-1
min-h-0
w-full
h-full
flex
flex-col
gap-4
z-30

md:gap-6
`;

/** Linha: menu (esquerda) + conteúdo rolável (direita). */
export const ReportShell = tw.div`
flex
min-h-0
flex-1
h-full
flex-col
gap-4

lg:flex-row
lg:items-stretch
lg:gap-6
`;

/** Painel direito: única área com scroll vertical. */
export const ContentScroll = tw.div`
min-h-0
flex-1
h-full
overflow-y-auto
overflow-x-hidden
pr-1

lg:max-h-full
`;

export const ContentArea = tw.div`
w-full
flex
min-h-0
flex-1
h-full
flex-col
gap-4
`;

export const Title = tw.h1`
text-lg
font-semibold
text-mbr-gray-30

md:text-xl
`;

export const LoadingBox = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-8
text-center
text-sm
text-mbr-gray-50
animate-pulse
`;
