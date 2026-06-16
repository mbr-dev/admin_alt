import tw from "tailwind-styled-components";

export const Box = tw.div`
w-full
max-h-[80dvh]
rounded-2xl
border
border-[#ec5691]/40
bg-white
shadow-sm
overflow-y-auto
`;

export const Title = tw.h2`
border-b
border-mbr-gray-40
px-4
py-4
text-sm
font-semibold
uppercase
tracking-wide
text-[#f21a6f]

sm:px-6
sm:text-base
`;

export const Body = tw.div`
flex
flex-col
gap-8
p-4

sm:p-6
`;

/** 1 — Resumo clínico e 5 — Observações (texto corrido). */
export const Subtitle = tw.h3`
text-xs
font-semibold
uppercase
tracking-wide
text-[#f21a6f]

sm:text-sm
`;

export const Lead = tw.p`
mt-2
text-sm
leading-relaxed
text-mbr-gray-30

sm:text-base
`;

/** Grades de cards. */
export const CardGrid3 = tw.div`
grid
grid-cols-1
gap-4

md:grid-cols-3
`;

export const CardGrid2 = tw.div`
grid
grid-cols-1
gap-4

md:grid-cols-2
`;

/** `overflow-hidden` + `rounded-xl` faz o conteúdo (incl. header) respeitar o canto do card. */
export const ThemeCard = tw.article`
flex
min-h-0
w-full
flex-col
overflow-hidden
rounded-xl
border
border-mbr-gray-40
bg-white
shadow-sm
`;

/**
 * Cabeçalho colorido: cor via `style.backgroundColor`. Cantos superiores vêm do recorte do
 * `ThemeCard` (`overflow-hidden` + `rounded-xl`).
 */
export const ThemeCardHeader = tw.header`
shrink-0
w-full
px-4
py-2.5
text-sm
font-semibold
text-white
[text-shadow:0_1px_2px_rgba(0,0,0,0.28)]

sm:py-3
sm:text-base
`;

export const ThemeCardBody = tw.div`
flex-1
px-4
py-3
text-sm
leading-relaxed
text-mbr-gray-30

sm:text-base
`;

export const PillRow = tw.div`
mt-2
flex
flex-wrap
gap-2
`;

export const PillGreen = tw.span`
inline-flex
rounded-full
border
border-[#46C080]/40
bg-[#46C080]/10
px-3
py-1
text-xs
font-medium
text-[#2d8a5c]

sm:text-sm
`;

export const ListRed = tw.ul`
mt-2
list-inside
list-disc
space-y-1.5
text-sm
leading-relaxed
text-[#B71C1C]

sm:text-base
`;

export const Hint = tw.p`
rounded-xl
border
border-mbr-gray-40
bg-mbr-gray-10
py-10
text-center
text-sm
text-mbr-gray-50
`;

export const Loading = tw.p`
py-10
text-center
text-sm
text-mbr-gray-50
`;
