import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AnchorHTMLAttributes } from 'react';
import { SiteHeader } from '@/components/site-header';
import { THEME_STORAGE_KEY } from '@/hooks/use-theme';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, hash, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string }) => <a href={`${to}${hash ? `#${hash}` : ''}`} {...props} />,
}));

afterEach(cleanup);

describe('Theme choice', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('switches to dark mode and remembers the choice', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });

  it('switches back to light mode and remembers that choice too', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });

  it('restores a remembered dark choice on the next visit', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(<SiteHeader />);
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });

  it('keeps a remembered light choice when the system prefers dark', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    render(<SiteHeader />);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });
});
