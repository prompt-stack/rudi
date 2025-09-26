'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, BookOpen, Award, BarChart3, Settings, 
  Menu, X, ChevronDown, User, LogOut, Bell,
  Sparkles, FileText, Shield, Brain
} from 'lucide-react'
import { useOrganization } from '@/frontend/contexts/OrganizationContext'
import { useProgress } from '@/frontend/contexts/ProgressContext'
import { Badge } from '@/frontend/components/primitives/ui/badge'
import { Button } from '@/frontend/components/primitives/ui/button'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { 
    label: 'Courses', 
    href: '/courses', 
    icon: <BookOpen className="h-5 w-5" />,
    children: [
      { label: 'My Courses', href: '/courses/enrolled', icon: <BookOpen className="h-4 w-4" /> },
      { label: 'Browse', href: '/courses/browse', icon: <BookOpen className="h-4 w-4" /> },
      { label: 'Certificates', href: '/courses/certificates', icon: <Award className="h-4 w-4" /> }
    ]
  },
  {
    label: 'AI Tools',
    href: '/ai-tools',
    icon: <Sparkles className="h-5 w-5" />,
    badge: 'New',
    children: [
      { label: 'Policy Builder', href: '/ai-tools/policy', icon: <FileText className="h-4 w-4" /> },
      { label: 'Compliance', href: '/ai-tools/compliance', icon: <Shield className="h-4 w-4" /> },
      { label: 'AI Playground', href: '/ai-tools/playground', icon: <Brain className="h-4 w-4" /> }
    ]
  },
  { label: 'Progress', href: '/progress', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> }
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, organization } = useOrganization()
  const { learningStreak } = useProgress()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">RUDI LMS</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex h-[calc(100vh-4rem)] md:h-screen">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 w-72 border-r bg-card transition-transform duration-300 md:relative md:translate-x-0
        `}>
          <div className="flex h-full flex-col">
            {/* Organization Header */}
            <div className="border-b p-4">
              <div className="flex items-center gap-3">
                {organization?.logo ? (
                  <img 
                    src={organization.logo} 
                    alt={organization.name}
                    className="h-10 w-10 rounded-lg"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    R
                  </div>
                )}
                <div>
                  <h2 className="font-semibold">{organization?.name || 'RUDI LMS'}</h2>
                  <p className="text-xs text-muted-foreground">Applied GenAI Program</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => (
                <div key={item.href}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        toggleExpanded(item.label)
                      }
                    }}
                    className={`
                      flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${isActive(item.href) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                      }
                    `}
                  >
                    <Link 
                      href={item.href}
                      className="flex items-center gap-3 flex-1"
                      onClick={(e) => {
                        if (item.children) {
                          e.preventDefault()
                        }
                      }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                    {item.children && (
                      <ChevronDown className={`
                        h-4 w-4 transition-transform
                        ${expandedItems.includes(item.label) ? 'rotate-180' : ''}
                      `} />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {item.children && expandedItems.includes(item.label) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`
                            flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors
                            ${isActive(child.href)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }
                          `}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Learning Streak */}
            {learningStreak && (
              <div className="border-t p-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Learning Streak</p>
                      <p className="text-2xl font-bold text-primary">
                        {learningStreak.currentStreak} days
                      </p>
                    </div>
                    <div className="text-3xl">🔥</div>
                  </div>
                </div>
              </div>
            )}

            {/* User Profile */}
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{user?.name || 'Guest User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
