import tw from "tailwind-styled-components";

export const Card = tw.section`
relative
w-full
h-[200px]
overflow-hidden
rounded-2xl
shadow-sm

md:h-[260px]

landscape:lg:h-[300px]
`;

export const Video = tw.video`
absolute
inset-0
w-full
h-full
object-cover
`;

export const Overlay = tw.div`
absolute
inset-0
bg-gradient-to-r
from-black/70
via-black/45
to-black/15
`;

export const Content = tw.div`
relative
z-10
h-full
flex
flex-col
justify-center
gap-1
px-5
py-4
text-white

md:gap-2
md:px-8
md:py-6

landscape:lg:px-10
`;

export const Hello = tw.h1`
text-2xl
font-bold
leading-tight

md:text-4xl

landscape:lg:text-5xl
`;

export const Glad = tw.p`
text-base
font-semibold
leading-snug

md:text-2xl

landscape:lg:text-3xl
`;

export const Subtitle = tw.p`
mt-1
text-sm
font-medium
leading-snug
text-white/90

md:mt-2
md:text-lg

landscape:lg:text-xl
`;

export const Skeleton = tw.div`
w-full
h-[200px]
rounded-2xl
bg-mbr-gray-40
animate-pulse

md:h-[260px]

landscape:lg:h-[300px]
`;
