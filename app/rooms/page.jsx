import React from 'react';
import { Waves, Bed, Wifi, UtensilsCrossed } from 'lucide-react';

const RoomPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-500 to-teal-400 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cpath d='M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z' fill='%23f0f9ff'/%3E%3C/svg%3E")`
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-4 leading-tight">
              Unwind in Elegance — Premium
            </h1>
            <h2 className="text-4xl md:text-5xl font-serif text-white italic">
              Comfort, Trusted Hospitality.
            </h2>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-20 opacity-30">
          <div className="w-32 h-32 border-4 border-white rounded-full"></div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <div className="w-24 h-24 bg-white rounded-lg transform rotate-45"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
            At Xylem Seaside Resort, each room is thoughtfully designed to offer a perfect blend of luxury, privacy, 
            and comfort. From ocean-view suites to cozy retreats, enjoy modern amenities, elegant interiors, and 
            personalized service that ensure a truly restful stay.
          </p>
        </div>

        {/* Amenities Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ocean View */}
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 text-red-500">
              <Waves size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-gray-800 mb-2">Ocean View</h3>
          </div>

          {/* Premium Bedding */}
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 text-red-500">
              <Bed size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-gray-800 mb-2">Premium Bedding</h3>
          </div>

          {/* High-Speed Wi-Fi */}
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 text-red-500">
              <Wifi size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-gray-800 mb-2">High-Speed Wi-Fi</h3>
          </div>

          {/* In-Room Dining */}
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-6 text-red-500">
              <UtensilsCrossed size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif text-gray-800 mb-2">In-Room Dining</h3>
          </div>
        </div>

        {/* Additional Room Features */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Experience Unmatched Comfort</h2>
            <p className="text-gray-600 text-lg">Every detail crafted for your perfect getaway</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Spacious Layouts</h3>
              <p className="text-gray-600">Thoughtfully designed spaces that blend comfort with style</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Modern Amenities</h3>
              <p className="text-gray-600">State-of-the-art facilities for your convenience</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Service</h3>
              <p className="text-gray-600">Dedicated staff ensuring your every need is met</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Book Your Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;