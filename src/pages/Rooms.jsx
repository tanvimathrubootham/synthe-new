import React, { useMemo, useState } from "react";
import { rooms } from "@/data/mockData";
import { Search } from "lucide-react";

const categories = [
  { value: "all", label: "All" },
  { value: "Design", label: "🎨 Design" },
  { value: "Technology", label: "💻 Technology" },
  { value: "Music", label: "🎵 Music" },
  { value: "Film", label: "🎬 Film" },
  { value: "Writing", label: "✍️ Writing" },
  { value: "Business", label: "📈 Business" },
  { value: "Science", label: "🔬 Science" },
  { value: "Social Impact", label: "🌍 Social Impact" },
  { value: "Gaming", label: "🎮 Gaming" },
];

function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={`h-28 bg-gradient-to-r ${room.color} relative`}>
        {room.featured && (
          <span className="absolute right-4 top-4 bg-white/90 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <div className="absolute left-5 top-5 text-3xl">{room.icon}</div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-white/75 blur-md" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-slate-900">{room.name}</h3>
        <p className="mt-3 text-slate-500 leading-7 line-clamp-3">{room.description}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-sm">
            {room.category}
          </span>
          <span className="text-slate-400 text-sm">{room.member_count}</span>
        </div>
      </div>
    </div>
  );
}

export default function Rooms() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        !search ||
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || room.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-slate-900">Rooms</h1>
        <p className="mt-3 text-slate-500 text-xl">
          Drop into themed spaces to chat, share ideas, and find collaborators.
        </p>
      </div>

      <div className="space-y-5 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const active = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`h-10 px-4 rounded-full text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-slate-400">No rooms found</p>
          <p className="text-sm text-slate-400 mt-2">
            Try adjusting your search or selected category.
          </p>
        </div>
      )}
    </div>
  );
}
