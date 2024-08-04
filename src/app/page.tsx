import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import Header from "@/components/header";
import SubHeader from "@/components/sub-header";
import UserInput from "@/components/user-input";
import Output from "@/components/output";
import { BioProvider } from "@/context/bio-context";

export default function Home() {
  return (
    <main className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 px-4 py-12 sm:py-16 sm:px-8 md:px-10   p-24">
      <div className="group col-span-full w-full flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Link href="/bio" target="_blank">
          <AnimatedGradientText className="px-6 py-2 rounded-full">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-400" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            Star on Github{" "}
            <ChevronRight className="m-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
        <Header>
          <span className="font-extrabold text-3xl md:text-5xl lg:text-7xl text-center w-full uppercase mx-auto pt-4 flex flex-col items-center">
            <p>
              CRAFT THE <span className="text-indigo-600">PERFECT</span> SOCIAL{" "}
              <span className="text-indigo-600">BIOS</span>
            </p>
            <p>IN SECONDS</p>
          </span>
        </Header>
        <SubHeader>
          <span className="text-sm sm:text-base md:text-lg text-red-800 ">
            Just answer a few questions and we&apos;ll craft a bio that captures
            who you are.!
          </span>
        </SubHeader>
      </div>

      <BioProvider>
        <UserInput />
        <Output />
      </BioProvider>
    </main>
  );
}
