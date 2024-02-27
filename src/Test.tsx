const Test = () => {
  return (
    <div className="relative h-[50vh] sm:h-[75vh] md:h-[100vh] overflow-hidden flex">
      <img
        src="https://www.coinboxsub.com/coins.webp"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-transparent"></div>
      <div className="relative z-10 w-1/3 h-full flex flex-col justify-center p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">The Coin Box Subscription</h1>
        <p>A box of coins delivered straight to your door every month</p>
        <p>Multiple options for your unique collecting needs</p>
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mt-4">Check our Subscriptions</button>
      </div>
      <div className="relative z-10 w-2/3 h-full flex items-center justify-center">
        <iframe
          width="337.5"
          height="600"
          src="https://www.youtube.com/embed/pgOyRA1UVM4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Test;