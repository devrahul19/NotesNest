import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

function Dashboard() {
  const [categories] = useState({
    'Published Notes': [
      // Example notes - replace with real data
      { id: 1, title: 'React Hooks Guide', excerpt: 'A comprehensive guide to React Hooks...', date: '2024-01-15' },
      { id: 2, title: 'JavaScript ES6+', excerpt: 'Modern JavaScript features explained...', date: '2024-01-14' },
    ],
    'Saved Drafts': [
      { id: 3, title: 'CSS Grid Layout', excerpt: 'Understanding CSS Grid...', date: '2024-01-13' },
      { id: 4, title: 'TypeScript Basics', excerpt: 'Getting started with TypeScript...', date: '2024-01-12' },
    ],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-gray-500 mt-2">{post.excerpt}</p>
                  <time className="text-sm text-gray-400 mt-4 block">{post.date}</time>
                </div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Dashboard;
