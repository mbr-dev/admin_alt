import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[300px]
h-[300px]
flex
flex-col
items-center
justify-center
gap-4
rounded-xl
shadow-xl
bg-gradient-to-b
from-mbr-blue-10
to-mbr-blue-80
z-10
border-2
border-mbr-gray-20
relative

md:w-[400px]
md:h-[400px]

landscape:lg:w-[360px]
landscape:lg:h-[360px]
`;

export const Avatar = tw.div`
w-[100px]
h-[100px]
border-2
border-mbr-blue-10
rounded-full
bg-blue-400
relative

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[150px]
md:h-[150px]

landscape:lg:w-[150px]
landscape:lg:h-[150px]
`;

export const Button = tw.div`
w-[32px]
h-[32px]
flex
items-center
justify-center
rounded-lg
absolute
-left-3
-top-2
bg-white
cursor-pointer
border
border-mbr-blue-10

[&>svg]:text-mbr-blue-10
[&>svg]:text-xl

md:w-[36px]
md:h-[36px]
md:-top-1
md:-left-1
md:[&>svg]:text-2xl

landscape:lg:w-[36px]
landscape:lg:h-[36px]
landscape:lg:-top-1
landscape:lg:-left-1
landscape:lg:[&>svg]:text-2xl
`;

export const Main = tw.div`
flex
flex-col
gap-4
items-center
justify-center

[&>h3]:w-[232px]
[&>h3]:text-center
[&>h3]:truncate
[&>h3]:text-xl
[&>h3]:text-white
[&>h3]:font-bold

md:[&>h3]:w-[300px]
md:[&>h3]:text-2xl

landscape:lg:[&>h3]:w-[300px]
landscape:lg:[&>h3]:text-2xl
`;

export const Infos = tw.div`
flex
flex-col
gap-2
`;

export const Div = tw.div`
flex
gap-2
bg-white
relative
border-2
rounded-tr-xl
rounded-br-xl
px-2
pl-5
shadow-xl
border-mbr-orange-10

[&>img]:w-[32px]
[&>img]:absolute
[&>img]:-top-[4px]
[&>img]:-left-[16px]

[&>p]:text-xl
[&>p]:font-bold
[&>p]:text-mbr-orange-10

md:[&>img]:w-[36px]
md:[&>p]:text-2xl
md:pl-6

landscape:lg:[&>img]:w-[36px]
landscape:lg:[&>p]:text-2xl
landscape:lg:pl-6
`;