import React from 'react';

const PopularServices = () => {
  const services = [
    { name: 'Web Development', imageUrl: '/images/s2.png', description: 'Building modern websites' },
    { name: 'Graphic Design', imageUrl: '/images/s3.png', description: 'Creating stunning visuals' },
    { name: 'Digital Marketing', imageUrl: '/images/s1.png', description: 'Promoting your business online' },
    { name: 'SEO', imageUrl: '/images/s4.png', description: 'Optimizing search engine visibility' },
    { name: 'Content Writing', imageUrl: '/images/s5.png', description: 'Crafting engaging content' },
    { name: 'Social Media Management', imageUrl: '/images/s6.png', description: 'Managing social media presence' },
  ];

  return (
    <div className="py-10 px-6 md:px-20 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Popular Services</h2>
      <div className="flex space-x-6 overflow-x-auto no-scrollbar max-w-[90%] mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            style={{ minWidth: '160px' }} // Reduced width of each item
          >
            <img
              className="w-full h-48 object-cover"
              src={service.imageUrl}
              alt={service.name}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
