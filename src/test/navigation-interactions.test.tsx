import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AnchorHTMLAttributes } from 'react';
import { SiteHeader } from '@/components/site-header';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, hash, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string }) => <a href={`${to}${hash ? `#${hash}` : ''}`} {...props} />,
}));
afterEach(cleanup);

describe('Shared navigation interactions', () => {
  it('moves skip-link focus to the main content', () => {
    render(<><SiteHeader /><main id="main">Content</main></>);
    fireEvent.click(screen.getByRole('link', { name: 'Skip to content' }));
    expect(document.activeElement).toBe(screen.getByRole('main'));
  });
  it('dismisses the menu with Escape and restores focus to its toggle', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });
  it('closes the open menu when the home logo is activated', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.click(screen.getByRole('link', { name: 'Deep Punj — home' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});