import { Camera, Smile, Heart, Star } from "lucide-react";
import { useState } from "react";
// import cameraBackground from "@/assets/camera-background.jpg";
// import avatarCharacter from "@/assets/avatar-character.png";

const filterEmotions = [
  { id: "filter1", icon: "😊", label: "Happy" },
  { id: "filter2", icon: "😎", label: "Cool" },
  { id: "filter3", icon: "😍", label: "Love" },
  { id: "filter4", icon: "🤪", label: "Crazy" },
];

export function CameraInterface() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleCameraClick = () => {
    // Simulate camera capture
    console.log("Camera clicked - capturing snap!");
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 gradient-camera opacity-80" />
      </div>

      {/* Floating hot air balloons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float gradient-bubble rounded-full opacity-60`}
            style={{
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Character Avatar */}
      <div className="absolute bottom-16 right-16 z-10">
        {/* <img
          src={avatarCharacter}
          alt="Avatar Character"
          className="w-64 h-80 object-contain animate-float"
          style={{ animationDelay: "1s" }}
        /> */}
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center p-8">
        {/* Camera Button and Text */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse-glow" />

            {/* Main camera button */}
            <button
              onClick={handleCameraClick}
              className="relative w-32 h-32 bg-white/10 backdrop-blur-sm border-4 border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 animate-pulse-glow"
            >
              <Camera className="w-12 h-12 text-white" />
            </button>
          </div>

          <p className="text-white text-xl font-medium mt-6 drop-shadow-lg">Click the Camera to</p>
          <p className="text-white text-xl font-medium drop-shadow-lg">send Snaps</p>
        </div>

        {/* Filter Emotions */}
        <div className="flex items-center gap-4">
          {filterEmotions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`w-16 h-16 rounded-full backdrop-blur-sm border-2 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                selectedFilter === filter.id ? "bg-white/30 border-white/60 scale-110" : "bg-white/10 border-white/20"
              }`}
            >
              {filter.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Top Navigation Dots */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        <div className="w-2 h-2 bg-white/40 rounded-full" />
        <div className="w-2 h-2 bg-white rounded-full" />
        <div className="w-2 h-2 bg-white/40 rounded-full" />
      </div>

      {/* Side Action Buttons */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
        <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
          <Smile className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
          <Heart className="w-6 h-6 text-white" />
        </button>
        <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
          <Star className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
