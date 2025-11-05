"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function Home() {
        const router = useRouter();
      
        const whiteSpeaker = () => {
          router.push("/product/white-speaker");
        };
      
          const earpad = () => {
          router.push("/product/earpad");
        };
        
          const black = () => {
          router.push("/product/black-headphone");
        };

         const blackSpeaker = () => {
          router.push("/product/black-speaker");
        };
      
  return (
    <div className="bg-white"> 
    <div className="font-sans bg-[#101010] text-white ">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between md:px-24 lg:px-32 px-6 py-16 md:py-24 relative overflow-hidden h-[729px]">

        {/* Hero Image for mobile & tablet */}
        <div className="absolute inset-0 flex md:hidden justify-center items-center">
          <Image
            src="/images/hero-headset.png"
            alt="XX99 Mark II Headphones Background"
            width={600}
            height={600}
            className="w-[380px] sm:w-[450px] md:w-[600px] h-auto object-contain"
            priority
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2 relative z-10">
          <p className="tracking-[0.5em] text-sm text-gray-400 mb-4">
            NEW PRODUCT
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            XX99 MARK II <br /> HEADPHONES
          </h1>

          <p className="text-gray-400 max-w-md mx-auto md:mx-0 mb-8">
            Experience natural, lifelike audio and exceptional build quality made
            for the passionate music enthusiast.
          </p>

          <button onClick={black} className="bg-[#D87D4A] hover:bg-[#fbaf85] transition-colors text-white font-semibold py-3 px-8">
            SEE PRODUCT
          </button>
        </div>

        {/* Desktop Image */}
        <div className="hidden md:flex md:w-1/2 justify-end">
          <Image
            src="/images/hero-headset.png"
            alt="XX99 Mark II Headphones"
            width={850}
            height={850}
            className="w-[650px] lg:w-[750px] xl:w-[850px] h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* Additional section two is added here */}
 </div>
      
      <main className="px-8 md:px-16 lg:px-24 py-20s md:py-16 text-black bg-white">
  {/* Category Cards */}
 {/* Category Cards */}
<section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
  {/* Headphones */}
  <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-center  relative shadow-sm overflow-visible h-[200px] w-[300px]">
    <div className="relative -top-16 ">
      <Image
        src="/images/gold.png"
        alt="Headphones"
        width={100}
        height={100}
        className="object-contain"
        priority
      />
    </div>
    <h3 className="text-lg font-bold tracking-wider mb-2">HEADPHONES</h3>
    <a
      href="/product/gold-headphone"
      className="text-[#D87D4A] text-sm font-semibold tracking-wide hover:underline flex items-center gap-2"
    >
      SHOP <span className="text-[#D87D4A] text-lg">{'>'}</span>
    </a>
  </div>

  {/* Speakers */}
  <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-center relative shadow-sm overflow-visible h-[200px] w-[300px]">
    <div className="relative -top-10">
      <Image
        src="/images/speaker.png"
        alt="Speakers"
        width={100}
        height={100}
        className="object-contain"
        priority
      />
    </div>
    <h3 className="text-lg font-bold tracking-wider mb-2">SPEAKERS</h3>
    <a
      href="/product/white-speaker"
      className="text-[#D87D4A] text-sm font-semibold tracking-wide hover:underline flex items-center gap-2"
    >
      SHOP <span className="text-[#D87D4A] text-lg">{'>'}</span>
    </a>
  </div>

  {/* Earphones */}
  <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-center  relative shadow-sm overflow-visible h-[200px] w-[300px]">
    <div className="relative -top-14">
      <Image
        src="/case.png"
        alt="Earphones"
        width={150}
        height={150}
        className="object-contain"
        priority
      />
    </div>
    <h3 className="text-lg font-bold tracking-wider mb-2">EARPHONES</h3>
    <a
      href="/product/earpad"
      className="text-[#D87D4A] text-sm font-semibold tracking-wide hover:underline flex items-center gap-2"
    >
      SHOP <span className="text-[#D87D4A] text-lg">{'>'}</span>
    </a>
  </div>
</section>

  {/* ZX9 Speaker Hero Section */}
  <section className="bg-[#D87D4A] text-white rounded-lg overflow-hidden relative mb-16">
    {/* Decorative Circles */}
    <div className="absolute inset-0 flex justify-center items-center opacity-20">
      <div className="w-[800px] h-[800px] rounded-full border-2 border-white/30 absolute"></div>
      <div className="w-[600px] h-[600px] rounded-full border-2 border-white/20 absolute"></div>
      <div className="w-[400px] h-[400px] rounded-full border-2 border-white/10 absolute"></div>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-20 md:py-24 relative z-10">
      {/* Speaker Image */}
      <div className="flex justify-center md:justify-start md:w-1/2 mb-10 md:mb-0">
        <Image
          src="/images/speaker2.png"
          alt="ZX9 Speaker"
          width={300}
          height={300}
          className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-xl"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="text-center md:text-left md:w-1/2">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          ZX9 <br /> SPEAKER
        </h2>

        <p className="text-white/90 max-w-md mx-auto md:mx-0 mb-8 text-base sm:text-lg">
          Upgrade to premium speakers that are phenomenally built to deliver 
          truly remarkable sound.
        </p>

        <button onClick={whiteSpeaker} className="bg-black hover:bg-[#4C4C4C] transition-colors text-white font-semibold py-3 px-8">
          SEE PRODUCT
        </button>
      </div>
    </div>
  </section>
</main>
<section className="flex flex-row  md:px-16 lg:px-24 mb-24 bg-white  ">
  {/* Left Text Box - 1/3 width */}
  <div className="w-/3 bg-[#F1F1F1] flex flex-col justify-center px-6 md:px-10 lg:px-14 py-16">
    <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-6">
      ZX7 SPEAKER
    </h2>

    <button onClick={blackSpeaker} className="border border-black text-black hover:bg-black hover:text-white transition-colors font-semibold py-3 px-8 w-fit">
      SEE PRODUCT
    </button>
  </div>

  {/* Right Image - 2/3 width */}
  <div className="w-2/3">
    <Image
      src="/images/table-speaker.png"
      alt="ZX7 Speaker"
      width={600}
      height={400}
      className="w-full h-full "
      priority
    />
  </div>
</section>
      {/* Additional section two ends here */}

      {/* section three is added here */}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-16 lg:px-24 mb-24 bg-white">
      {/* Left Image */}
      <div className="rounded-lg overflow-hidden">
        <Image
          src="/images/earpad.png"
          alt="YX1 Earphones"
          width={600}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Right Text Box */}
      <div className="bg-[#F1F1F1] rounded-lg flex flex-col justify-center px-10 md:px-14 lg:px-20 py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-6">
          YX1 EARPHONES
        </h2>

        <button onClick={earpad} className="border border-black text-black hover:bg-black hover:text-white transition-colors font-semibold py-3 px-8 w-fit">
          SEE PRODUCT
        </button>
      </div>
    </section>

      {/* section three ends here */}

      {/*section four is added here */ }

          <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 lg:px-32 py-20 bg-white">
      {/* Left Text Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-black">
          BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
        </h2>
        <p className="text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the best
          place to buy your portable audio equipment.
        </p>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <Image
          src="/images/human copy.png"
          alt="Man with headphones"
          width={500}
          height={500}
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </section>
    <Footer />
   
  </div>
  );
}
