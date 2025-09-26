/**
 * Header Component
 *
 * Global navigation header with responsive mobile menu and dropdown support.
 * Fixed positioning with backdrop blur for modern glass-morphism effect.
 *
 * @component
 * @returns {JSX.Element} Site-wide navigation header
 *
 * Features:
 * - Responsive mobile hamburger menu
 * - Dropdown navigation for resource sections
 * - Fixed header with backdrop blur
 * - Click-outside detection for dropdowns
 * - Smooth transitions and animations
 */
'use client';

import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Assessment', href: '/assessment' },
    { name: 'Courses', href: '/courses' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'Ohio Programs', href: '/upskill-ohio',
      submenu: [
        { name: 'Upskill Ohio', href: '/upskill-ohio' },
        { name: 'Ohio TechCred', href: '/ohio-techcred' },
      ]
    },
    { name: 'Framework', href: '/framework' },
    { name: 'Resources', href: '/resources',
      submenu: [
        { name: 'Training PDFs', href: '/resources' },
        { name: 'Research', href: '/research' },
      ]
    },
  ];

  const externalLinks: { name: string; href: string; external: boolean }[] = [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light text-gray-900">
            RUDI<span className="font-medium">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.name}
                            href={subitem.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                          >
                            {subitem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            {externalLinks.length > 0 && (
              <div className="border-l border-gray-200 pl-8 flex items-center gap-4">
                {externalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
            <a href="/get-started" className="btn-primary text-sm">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <div className="py-2 text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="pl-4">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-4">
              {externalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a href="/get-started" className="w-full mt-4 btn-primary text-sm block text-center">
              Get Started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
