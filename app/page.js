import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="max-w-[90vw] sm:max-w-[70vw] lg:max-w-[40vw] m-auto py-20">
        <div className="text-5xl flex justify-center items-center gap-7 py-5 flex-wrap">
          <span className="pt-10 text-center">Buy Me a Chai</span>
          <Image src="/tea.gif" alt="logo" width={70} height={70} />
        </div>
        <div className="text-lg text-center py-5">Get Me a Chai is a crowdfunding platform designed for creators. Receive direct support from your fans and bring your projects to life.</div>
        <div className="flex justify-center gap-8 py-5 flex-wrap">
          <Link href={"/login"}><Button>Start Here</Button></Link>
          <Link href={"/aboutus"}><Button>Read More</Button></Link>
        </div>
      </div>
      <hr className="opacity-15" />
      <div className="py-20 px-10 sm:px-20">
        <div className="text-center text-3xl">
          How Fans Can Support You
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-8 py-5 text-xl">
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <Image src="/fans.png" alt="fans" width={100} height={100} />
            <span>Collaborative Fans</span>
            <span className="text-base text-center opacity-70">Your fans are eager to support your journey and contribute to your success.</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <Image src="/contribution.png" alt="contribution" width={100} height={100} />
            <span>Direct Contributions</span>
            <span className="text-base text-center opacity-70">Receive financial support from your fans through chai purchases, fueling your projects.</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <Image src="/community.png" alt="community" width={100} height={100} />
            <span>Join a Community</span>
            <span className="text-base text-center opacity-70">Engage with a community of passionate individuals invested in your creative process.</span>
          </div>
        </div>
      </div>
      <hr className="opacity-15" />
      <div className="px-10 sm:px-20">
        <div className="text-center text-3xl">
          Learn More About Us
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-8 py-5 text-xl">
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <Image src="/about_us.png" alt="fans" width={100} height={100} />
            <span>About the Platform</span>
            <span className="text-base text-center opacity-70">We connect creators with their fans, enabling projects to be funded directly by those who love your work.</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <div className="size-[100px] flex items-center"><Image src="/funding.png" alt="contribution" width={100} height={100} /></div>
            <span>Flexible Funding</span>
            <span className="text-base text-center opacity-70 pb-5.5">Our platform offers various funding options to suit your project needs and fan preferences.</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <div className="size-[100px] flex items-center"><Image src="/community2.png" alt="community" width={100} height={100} /></div>
            <span>Our Community</span>
            <span className="text-base text-center opacity-70">Join a growing community of creators and supporters who believe in the power of collaboration.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
