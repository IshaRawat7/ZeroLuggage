"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, role, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white border-2 border-sky-200 rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500 transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-sky-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
