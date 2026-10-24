import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProtectedEmail } from '@/components/protected-email';

afterEach(cleanup);

function captureAnchorClicks() {
  const hrefs: (string | null)[] = [];
  const spy = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(function (this: HTMLAnchorElement) {
      hrefs.push(this.getAttribute('href'));
    });
  return { hrefs, spy };
}

function stubClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(window.navigator, 'clipboard', { value: { writeText }, configurable: true });
  return writeText;
}

describe('ProtectedEmail', () => {
  it('keeps the address and any mailto out of the markup until it is used', () => {
    render(<ProtectedEmail />);
    const html = document.body.innerHTML;
    expect(html).not.toContain('mailto:');
    expect(html).not.toContain('deep.punj');
    expect(html).not.toContain('outlook.com');
    expect(screen.getByRole('button', { name: 'Show and send email to Deep Punj' })).toBeInTheDocument();
    expect(screen.queryByText('Copy')).not.toBeInTheDocument();
  });

  it('opens mail with the default subject and reveals the address on click', () => {
    const { hrefs, spy } = captureAnchorClicks();
    render(<ProtectedEmail />);
    fireEvent.click(screen.getByRole('button', { name: 'Show and send email to Deep Punj' }));
    spy.mockRestore();
    expect(hrefs).toHaveLength(1);
    expect(hrefs[0]).toBe('mailto:deep.punj@outlook.com?subject=Contact%20via%20punjdeep.com');
    expect(screen.getByText('deep.punj@outlook.com')).toBeInTheDocument();
  });

  it('copies the revealed address and resets the button after 2 seconds', async () => {
    vi.useFakeTimers();
    const writeText = stubClipboard();
    const { spy } = captureAnchorClicks();
    render(<ProtectedEmail />);
    fireEvent.click(screen.getByRole('button', { name: 'Show and send email to Deep Punj' }));
    spy.mockRestore();
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
    await act(async () => {
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledWith('deep.punj@outlook.com');
    expect(screen.getByRole('button', { name: 'Email address copied' })).toHaveTextContent('Copied');
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('button', { name: 'Copy email address' })).toHaveTextContent('Copy');
    vi.useRealTimers();
  });

  it('accepts a custom label and subject', () => {
    const { hrefs, spy } = captureAnchorClicks();
    render(<ProtectedEmail label="Hire me" subject="Project enquiry" />);
    fireEvent.click(screen.getByRole('button', { name: 'Show and send email to Deep Punj' }));
    spy.mockRestore();
    expect(screen.getByRole('button', { name: 'Show and send email to Deep Punj' })).toHaveTextContent('Hire me');
    expect(hrefs[0]).toBe('mailto:deep.punj@outlook.com?subject=Project%20enquiry');
  });
});
