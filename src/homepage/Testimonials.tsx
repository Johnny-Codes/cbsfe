import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const testimonialData = [
  {
    id: "1",
    name: "L.C.",
    description:
      "We have grandkids tomorrow and this is going to be our fun task to sit and go through and research. But I can already tell you we're going to thoroughly enjoy them! We are loving this subscription!",
  },
];

const Testimonials = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef(null);
  const subscriptionRef = useRef(null);
  const targetRef = props.targetRef;

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % testimonialData.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (activeIndex - 1 + testimonialData.length) % testimonialData.length
    );
  };

  useEffect(() => {
    gsap.fromTo(
      testimonialRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 2, ease: "power1.inOut" }
    );
  }, [activeIndex]);

  const scrollToSubscription = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-900 min-h-screen p-10 flex flex-col justify-between">
        <h1 className="text-4xl sm:text-6xl text-white text-center">
          Testimonials
        </h1>   
      <div className="flex flex-col justify-center flex-grow">
        
        {testimonialData.map(
          (testimonial, index) =>
            index === activeIndex && (
              <div
                ref={testimonialRef}
                key={testimonial.id}
                className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4"
              >
                <div className="md:flex">
                  <div className="p-8">
                    <p className="mt-2 text-gray-500">
                      {testimonial.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
        {testimonialData.length > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrev}
              className="px-3 py-2 mr-2 bg-blue-500 text-white rounded"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-2 ml-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
  
      <div
        className="flex justify-center text-white gap-2 sm:gap-4 text-2xl sm:text-3xl md:text-4xl my-4 cursor-pointer"
        onClick={scrollToSubscription}
      >
        Ready to subscribe?
      </div>
    </div>
  );
};

export default Testimonials;