import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[300px]
flex
flex-col

md:w-[400px]

landscape:lg:w-[616px]

landscape:xl:w-[816px]
`;

export const Main = tw.div`
flex
flex-col
gap-4
z-10
`;

export const Div = tw.div`
w-full
flex
flex-col
gap-4

landscape:lg:flex-row
`;

export const DivInside = tw.div`
flex
flex-col
rounded-lg
bg-white
shadow-base
border-2
border-mbr-gray-20
px-4
py-2

[&>h3]:text-xl
[&>h3]:font-bold

[&>p]:flex-1
[&>p]:text-base
[&>p]:truncate
[&>p]:text-mbr-gray-30

md:[&>h3]:text-2xl
md:[&>p]:text-xl
md:gap-1
md:px-6
md:py-4

landscape:lg:w-[300px]
landscape:lg:[&>h3]:text-2xl
landscape:lg:[&>p]:text-xl
landscape:lg:gap-1
landscape:lg:px-4
landscape:lg:py-2

landscape:xl:w-[400px]
`;

export const DivInsideFull = tw.div`
w-full
flex
flex-col
rounded-lg
bg-white
shadow-base
border-2
gap-1
border-mbr-gray-20
px-4
py-2

[&>h3]:text-xl
[&>h3]:font-bold

[&>p]:flex-1
[&>p]:text-base
[&>p]:truncate
[&>p]:text-mbr-gray-30

md:[&>h3]:text-2xl
md:[&>p]:text-xl
md:gap-4
md:px-6
md:py-4

landscape:lg:[&>h3]:text-2xl
landscape:lg:[&>p]:text-xl
landscape:lg:gap-4
landscape:lg:px-4
landscape:lg:py-2
`;

export const AchievementIMG = tw.div`
w-[48px]
h-[48px]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[72px]
md:h-[72px]

landscape:lg:w-[100px]
landscape:lg:h-[100px]

landscape:xl:w-[72px]
landscape:xl:h-[72px]
`;

export const Grafico = tw.div`
w-full
flex
items-center
justify-center

landscape:xl:justify-start
`;

export const Dropdown = tw.div`
w-full
flex
flex-col

[&>p]:flex-1
[&>p]:text-base
[&>p]:truncate
[&>p]:text-mbr-gray-30

[&>svg]:text-xl

md:[&>p]:text-xl

landscape:lg:[&>p]:text-xl
`;

export const ButtonDropdown = tw.div`
w-full
flex
items-center
justify-between

[&>p]:flex-1
[&>p]:text-base
[&>p]:truncate
[&>p]:text-mbr-gray-30

[&>svg]:text-xl

md:[&>p]:text-xl

landscape:lg:[&>p]:text-xl
`;

export const DropdownItem = tw.div`
w-full
flex
flex-col
py-2
gap-1

[&>p]:flex-1
[&>p]:text-base
[&>p]:truncate
[&>p]:text-mbr-gray-30

[&>svg]:text-xl

md:[&>p]:text-xl
md:gap-2

landscape:lg:[&>p]:text-xl
landscape:lg:gap-2
`;