import * as React from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// The address is deliberately stored in two parts and only joined at click time,
// so no full address (and no mailto:) exists in the served page source.
const USER = 'deep.punj';
const DOMAIN = 'outlook.com';

type ProtectedEmailProps = {
  label?: string;
  subject?: string;
  ariaLabel?: string;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
  className?: string;
};

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard?.writeText(text);
    return true;
  } catch {
    /* fall through to the manual selection path */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    return true;
  } catch {
    return false;
  }
}

export function ProtectedEmail({
  label = 'Email me',
  subject = 'Contact via punjdeep.com',
  ariaLabel = 'Show and send email to Deep Punj',
  variant = 'default',
  size = 'lg',
  className,
}: ProtectedEmailProps) {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const address = revealed ? `${USER}@${DOMAIN}` : '';

  function revealAndSend() {
    const full = `${USER}@${DOMAIN}`;
    setRevealed(true);
    const link = document.createElement('a');
    link.href = `mailto:${full}?subject=${encodeURIComponent(subject)}`;
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function copyAddress() {
    if (!address) return;
    if (await writeClipboard(address)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={revealAndSend}
        aria-label={ariaLabel}
        className="focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <Mail aria-hidden />
        {label}
      </Button>
      {revealed ? (
        <span className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2">
          <span className="font-mono text-sm select-all">{address}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyAddress}
            aria-label={copied ? 'Email address copied' : 'Copy email address'}
            className="focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </span>
      ) : null}
    </div>
  );
}
