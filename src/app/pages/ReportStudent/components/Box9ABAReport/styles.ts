import tw from "tailwind-styled-components";

/** Linha superior: dois boxes ~50% no `md`. */
export const GridTwo = tw.div`
grid
grid-cols-1
gap-4

md:grid-cols-2
`;

export const CardSubtitle = tw.p`
text-xs
leading-snug
text-mbr-gray-50

sm:text-sm
`;

export const MetricBlock = tw.div`
flex
flex-col
items-center
gap-3
`;

/** Cor de fundo via `style={{ backgroundColor }}` no JSX (evita conflito de injeção CSS / ordem com Tailwind). */
export const MetricCircle = tw.div`
flex
h-24
w-24
shrink-0
items-center
justify-center
rounded-full
text-2xl
font-bold

sm:h-28
sm:w-28
sm:text-3xl
`;

export const MetricLabel = tw.p`
text-center
text-sm
font-medium
text-mbr-gray-30

sm:text-base
`;

export const FieldLabel = tw.span`
text-xs
font-semibold
uppercase
tracking-wide
text-mbr-gray-50
`;

export const FieldValue = tw.p`
text-sm
leading-relaxed
text-mbr-gray-30

sm:text-base
`;
