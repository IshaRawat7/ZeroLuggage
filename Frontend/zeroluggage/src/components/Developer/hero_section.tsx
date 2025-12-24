"use client"

export default function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-5 sm:pt-10">
      <div className="text-center max-w-4xl mx-auto animate-slide-down">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance mb-4 sm:mb-6 bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Connect with Brilliant Developers
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-foreground/70 mb-8 sm:mb-12 leading-relaxed text-balance">
         Meet  talented engineers, designers, and creators of ZeroLuggage  and collaborate on innovative
          projects that shape the future of technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-sky-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-300 hover:scale-105 animate-glow">
            Start Connecting
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-sky-500 text-sky-500 rounded-full font-semibold hover:bg-sky-50 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sky-500/40 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-sky-500/60 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
