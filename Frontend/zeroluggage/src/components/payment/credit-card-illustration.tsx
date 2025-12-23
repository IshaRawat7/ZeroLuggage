export function CreditCardIllustration() {
  return (
    <div className="w-full max-w-sm h-64 perspective">
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        {/* 3D Card Container */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col justify-between"
          style={{
            transform: "rotateX(15deg) rotateZ(-5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-start">
            <div className="text-white">
              <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
              <p className="font-semibold text-sm">User</p>
            </div>
            <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center">
              <div className="w-8 h-6 bg-yellow-500 rounded-sm opacity-80"></div>
            </div>
          </div>

          {/* Card Number */}
          <div className="text-white">
            <p className="text-lg font-mono tracking-widest">•••• •••• •••• 4242</p>
          </div>

          {/* Card Footer */}
          <div className="flex justify-between items-end">
            <div className="text-white">
              <p className="text-xs opacity-75 mb-1">VALID THRU</p>
              <p className="font-mono text-sm">12/26</p>
            </div>
            <div className="text-white text-xs font-semibold">VISA</div>
          </div>
        </div>

        {/* Floating Payment Icons */}
        <div
          className="absolute -top-8 -right-8 w-16 h-16 bg-blue-400 rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          <span className="text-2xl">💳</span>
        </div>
        <div
          className="absolute top-12 -left-6 w-12 h-12 bg-yellow-400 rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="text-xl">💰</span>
        </div>
        <div
          className="absolute -bottom-4 right-8 w-14 h-14 bg-purple-400 rounded-lg shadow-lg flex items-center justify-center opacity-80 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-2xl">🔒</span>
        </div>
      </div>
    </div>
  )
}
