import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { GiTwoCoins } from "react-icons/gi";

const HomePage = () => {
    const comp = useRef(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()
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
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from(["#tag-1", "#tag-2", "#tag-3", "#tag-4"], {
          opacity: 0,
          x: "+=50",
          duration: 1,
          delay: 0.3,
          stagger: 0.8,
        })
    }, comp)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="relative" ref={comp}>
        <div
          id="intro-slider"
          className="h-screen p-4 sm:p-10 bg-gray-400 absolute top-0 left-0 z-10 w-full flex flex-col gap-4 sm:gap-10 tracking-tight"
        >
          <h1 className="text-4xl sm:text-9xl" id="title-1">
            The
          </h1>
          <h1 className="text-4xl sm:text-9xl" id="title-2">
            Coin Box
          </h1>
          <h1 className="text-4xl sm:text-9xl" id="title-3">
            Subscription
          </h1>
        </div>
        <div className="text-gray-100 h-screen flex bg-gray-950 justify-center place-items-center flex-col">
          <p className="text-3xl sm:text-5xl flex" id="tag-1"><GiTwoCoins />Embark on a Numismatic Journey...</p>
          <p className="text-3xl sm:text-5xl flex mt-2 sm:mt-4" id="tag-2">...Discovering Treasures...</p>
          <p className="text-3xl sm:text-5xl flex mt-2 sm:mt-4" id="tag-3">...Building a Collection...</p>
          <p className="mt-4 sm:mt-10 text-5xl sm:text-8xl flex" id="tag-4">With The Coin Box Subscription</p>
        </div>
      </div>
      <div className="bg-gray-400 h-screen p-10 text-gray-200">
        <h1>Whatever</h1>
      </div>
    </>
  )
}

export default HomePage;