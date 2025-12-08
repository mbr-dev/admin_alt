import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[300px]
flex
flex-col
items-center
justify-center
gap-2
py-2
px-4
z-50
border-l-[6px]
rounded-xl
shadow-xl
border-white
bg-mbr-yellow-50

[&>h2]:text-lg
[&>h2]:text-center
[&>h2]:font-bold

landscape:w-[480px]

md:gap-8
md:[&>h2]:text-2xl
md:w-[600px]

landscape:lg:gap-8
landscape:lg:[&>h2]:text-2xl
landscape:lg:w-[800px]

landscape:xl:w-[944px]
`;

export const Div = tw.div`
w-full
h-[120px]
flex
flex-col
gap-1
overflow-y-auto

[&>p]:text-base
[&>p]:font-semibold

md:w-[500px]
md:[&>p]:text-lg
md:gap-2

landscape:lg:w-[650px]
landscape:lg:[&>p]:text-lg
landscape:lg:gap-2
`;