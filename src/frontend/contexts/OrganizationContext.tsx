'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Organization {
  id: string
  slug: string
  name: string
  description?: string
  logo?: string
  primaryColor?: string
  secondaryColor?: string
  customDomain?: string
  settings: OrganizationSettings
}

export interface OrganizationSettings {
  allowSelfEnrollment: boolean
  requireEmailVerification: boolean
  allowGuestAccess: boolean
  defaultUserRole: UserRole
  features: {
    aiTools: boolean
    policyBuilder: boolean
    complianceTracking: boolean
    customBranding: boolean
    multiLanguage: boolean
  }
}

export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId: string
  avatar?: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  language: string
  timezone: string
  emailNotifications: boolean
  darkMode: boolean
}

interface OrganizationState {
  organization: Organization | null
  user: User | null
  isLoading: boolean
  error: string | null
}

interface OrganizationContextValue extends OrganizationState {
  setOrganization: (org: Organization) => void
  setUser: (user: User) => void
  hasPermission: (permission: string) => boolean
  isAdmin: () => boolean
  isInstructor: () => boolean
}

const OrganizationContext = createContext<OrganizationContextValue | null>(null)

const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.STUDENT]: ['view_courses', 'enroll', 'submit_assignments'],
  [UserRole.INSTRUCTOR]: [
    'view_courses', 'enroll', 'submit_assignments',
    'create_courses', 'edit_courses', 'grade_assignments', 'view_analytics'
  ],
  [UserRole.ADMIN]: [
    'view_courses', 'enroll', 'submit_assignments',
    'create_courses', 'edit_courses', 'grade_assignments', 'view_analytics',
    'manage_users', 'manage_organization', 'view_reports'
  ],
  [UserRole.SUPER_ADMIN]: ['*'] // All permissions
}

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OrganizationState>({
    organization: null,
    user: null,
    isLoading: false,
    error: null
  })

  useEffect(() => {
    // Load organization and user data from API or local storage
    loadOrganizationData()
  }, [])

  const loadOrganizationData = async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      // This would fetch from your API
      // const orgData = await fetchOrganization()
      // const userData = await fetchCurrentUser()
      // setState({ organization: orgData, user: userData, isLoading: false, error: null })
      
      // For now, using mock data
      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load organization data'
      }))
    }
  }

  const setOrganization = (org: Organization) => {
    setState(prev => ({ ...prev, organization: org }))
  }

  const setUser = (user: User) => {
    setState(prev => ({ ...prev, user: user }))
  }

  const hasPermission = (permission: string): boolean => {
    if (!state.user) return false
    
    const userPermissions = rolePermissions[state.user.role]
    return userPermissions.includes('*') || userPermissions.includes(permission)
  }

  const isAdmin = (): boolean => {
    return state.user?.role === UserRole.ADMIN || state.user?.role === UserRole.SUPER_ADMIN
  }

  const isInstructor = (): boolean => {
    return state.user?.role === UserRole.INSTRUCTOR || isAdmin()
  }

  const value: OrganizationContextValue = {
    ...state,
    setOrganization,
    setUser,
    hasPermission,
    isAdmin,
    isInstructor
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (!context) {
    throw new Error('useOrganization must be used within OrganizationProvider')
  }
  return context
}

// Helper hooks
export function usePermissions() {
  const { hasPermission, isAdmin, isInstructor } = useOrganization()
  return { hasPermission, isAdmin, isInstructor }
}

export function useCurrentUser() {
  const { user } = useOrganization()
  return user
}

export function useOrgSettings() {
  const { organization } = useOrganization()
  return organization?.settings
}