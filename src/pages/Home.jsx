import React from "react";
import { rooms, projects, mentors, currentUser } from "@/data/mockData";
import { ArrowRight, Users, FolderKanban } from "lucide-react";

function StatCard({ icon: Icon, value, label, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
      <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="mt-4 text-4xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-slate-500 text-sm">{label}</div>
    </div>
  );
}

function RoomPreviewCard({ room }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={`h-1.5 bg-gradient-to-r ${room.color}`} />
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{room.icon}</div>
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold text-slate-900">{room.name}</h3>
            <p className="mt-2 text-slate-500 leading-7 line-clamp-2">{room.description}</p>
          </div>
        </div>
        <div className="mt-4 text-slate-400 text-sm">{room.member_count} members</div>
      </div>
    </div>
  );
}

function ProjectPreviewCard({ project }) {
  const stageStyles = {
    Recruiting: "bg-green-100 text-green-700",
    Idea: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${stageStyles[project.stage] || "bg-slate-100 text-slate-700"}`}>
          {project.stage}
        </span>
        <span className="text-sm text-slate-400">{project.skills_needed} skills needed</span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-slate-900 leading-tight">{project.title}</h3>
      <p className="mt-3 text-slate-500 leading-7 line-clamp-3">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 text-sm text-slate-400">{project.members}</div>
    </div>
  );
}

export default function Home() {
  const featuredRooms = rooms.slice(0, 6);
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <section className="rounded-[28px] overflow-hidden bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 text-white px-8 py-10 md:px-12 md:py-14 relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/20" />
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-white/10" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="text-white/80 text-lg">
            Welcome back, {currentUser.full_name.split(" ")[0]}
          </p>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight">
            Discover. Collaborate.
            <br />
            Build something real.
          </h1>
          <p className="mt-6 text-xl text-white/90 leading-8 max-w-2xl">
            Join themed rooms, find teammates, and turn your ideas into projects
            with fellow students and mentors.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-white text-indigo-700 hover:bg-slate-100 transition px-6 py-4 rounded-2xl font-semibold flex items-center gap-2">
              Explore Rooms <ArrowRight className="h-4 w-4" />
            </button>
            <button className="bg-white/15 hover:bg-white/20 border border-white/20 transition text-white px-6 py-4 rounded-2xl font-semibold">
              Browse Projects
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          value={rooms.length}
          label="Active Rooms"
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatCard
          icon={FolderKanban}
          value={projects.length}
          label="Open Projects"
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
        />
        <StatCard
          icon={Users}
          value={mentors.length}
          label="Mentors"
          iconBg="bg-rose-100"
          iconColor="text-rose-500"
        />
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-4xl font-bold text-slate-900">Trending Rooms</h2>
          <span className="text-indigo-600 font-medium">See all →</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <RoomPreviewCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-4xl font-bold text-slate-900">Recent Projects</h2>
          <span className="text-indigo-600 font-medium">See all →</span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {recentProjects.map((project) => (
            <ProjectPreviewCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
