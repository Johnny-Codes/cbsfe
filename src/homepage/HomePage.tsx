import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { GiTwoCoins } from "react-icons/gi";
import SubscriptionCard from "./SubscriptionCard";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
const HomePage = () => {
  const comp = useRef(null);
  const subscriptionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        // .to(["#title-1", "#title-2", "#title-3"], {
        //   opacity: 0,
        //   y: "-=30",
        //   delay: 0.3,
        //   stagger: 0.5,
        // })
        .to("#intro-slider", {
          xPercent: "100",
          duration: 2,
        })
        .from(["#tag-1", "#tag-2", "#tag-3", "#tag-4"], {
          opacity: 0,
          x: "+=50",
          duration: 1,
          delay: 0.3,
          stagger: 0.8,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="relative overflow-hidden" ref={comp}>
        <div
          id="intro-slider"
          className="h-screen p-4 sm:p-10 bg-gray-950 absolute top-0 left-0 z-10 w-full flex flex-col gap-4 sm:gap-10 tracking-tight"
        >
          <h1 className="text-4xl sm:text-9xl text-gray-50" id="title-1">
            The
          </h1>
          <h1 className="text-4xl sm:text-9xl text-gray-50" id="title-2">
            Coin Box
          </h1>
          <h1 className="text-4xl sm:text-9xl text-gray-50" id="title-3">
            Subscription
          </h1>
        </div>
        <div className="text-gray-950 h-screen flex bg-gray-400 justify-center place-items-center flex-col">
          <p className="text-3xl sm:text-5xl flex" id="tag-1">
            <GiTwoCoins />
            Embark on a Numismatic Journey...
          </p>
          <p className="text-3xl sm:text-5xl flex mt-2 sm:mt-4" id="tag-2">
            ...Discovering Treasures...
          </p>
          <p className="text-3xl sm:text-5xl flex mt-2 sm:mt-4" id="tag-3">
            ...Building a Collection...
          </p>
          <p className="mt-4 sm:mt-10 text-5xl sm:text-8xl flex" id="tag-4">
            With The Coin Box Subscription
          </p>
        </div>
      </div>
      <div 
      ref={subscriptionRef}
      className="bg-gray-950 min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h1
          
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-50"
        >
          Three Subscription Levels
        </h1>
        <SubscriptionCard />
      </div>
      <div className="bg-gray-400 min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between mx-auto w-full max-w-screen-lg mb-4">
          <iframe
            className="w-full md:w-auto md:max-w-md"
            height="560"
            src="https://www.youtube.com/embed/pgOyRA1UVM4"
            allowFullScreen
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          ></iframe>
          <iframe
            className="w-full md:w-auto md:max-w-md mt-4 md:mt-0"
            height="560"
            src="https://youtube.com/embed/Oe0pAtPdwk8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-50">
            Connect with us
          </h2>
          <div className="flex justify-center text-white gap-2 sm:gap-4 text-2xl sm:text-3xl md:text-4xl my-4">
            <a href="https://www.facebook.com/coinboxsub">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/coinboxsub/">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@coinboxsub">
              <FaYoutube />
            </a>
            <a href="https://www.tiktok.com/@thecoinboxsubscription">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
      <Testimonials targetRef={subscriptionRef} />
      <Footer />
    </>
  );
};

export default HomePage;
