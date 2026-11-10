import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { ScoreRing } from '../components/common/ScoreRing';
import { Navbar } from '../components/common/Navbar';
import { AppShell } from '../components/common/AppShell';
import { ThemeProvider } from '../context/ThemeContext';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';

describe('Design System Custom Property Integrity & Authoritative Tokens (Task B8)', () => {
  const tokensFilePath = path.resolve(__dirname, '../styles/tokens.css');
  const tokensContent = fs.readFileSync(tokensFilePath, 'utf8');

  it('declares the authoritative three-tier palette with #0A0F1A dark canvas and #F8F7F4 light canvas', () => {
    // Canvas tokens
    expect(tokensContent).toContain('--rs-bg: #0A0F1A;');
    expect(tokensContent).toContain('--rs-bg: #F8F7F4;');
    // Invariant paper canvas
    expect(tokensContent).toContain('--rs-paper: #FFFFFF;');
    expect(tokensContent).toContain('--rs-paper-ink: #0F172A;');
  });

  it('declares all required component scales and typography aliases in tokens.css', () => {
    // Radius scales
    expect(tokensContent).toContain('--radius-sm: 6px;');
    expect(tokensContent).toContain('--radius-md: 10px;');
    expect(tokensContent).toContain('--radius-lg: 16px;');
    expect(tokensContent).toContain('--radius-pill: 9999px;');

    // Typography aliases
    expect(tokensContent).toContain('--font-display:');
    expect(tokensContent).toContain('--font-serif:');
    expect(tokensContent).toContain('--font-body:');
    expect(tokensContent).toContain('--font-sans: var(--font-body);');
    expect(tokensContent).toContain('--font-mono:');
  });

  it('declares semantic subtle background tints for both dark and light scopes', () => {
    // Extract root (dark) block and light block
    const rootBlock = tokensContent.split('html[data-theme="light"]')[0];
    const lightBlock = tokensContent.split('html[data-theme="light"]')[1];

    expect(rootBlock).toContain('--rs-blue-subtle:');
    expect(rootBlock).toContain('--rs-amber-subtle:');
    expect(rootBlock).toContain('--rs-green-subtle:');
    expect(rootBlock).toContain('--rs-red-subtle:');

    expect(lightBlock).toContain('--rs-blue-subtle:');
    expect(lightBlock).toContain('--rs-amber-subtle:');
    expect(lightBlock).toContain('--rs-green-subtle:');
    expect(lightBlock).toContain('--rs-red-subtle:');
  });

  it('ensures every CSS custom property referenced in src/ resolves to a declared token', () => {
    // Extract declared property names from tokens.css
    const declaredVars = new Set<string>();
    const declRegex = /(--[a-zA-Z0-9_-]+)\s*:/g;
    let match: RegExpExecArray | null;
    while ((match = declRegex.exec(tokensContent)) !== null) {
      declaredVars.add(match[1]);
    }

    // Recursively collect all .tsx, .ts, and .css files in src
    function getSourceFiles(dir: string): string[] {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      list.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(getSourceFiles(fullPath));
        } else if (/\.(tsx|ts|css)$/.test(file)) {
          results.push(fullPath);
        }
      });
      return results;
    }

    const srcFiles = getSourceFiles(path.resolve(__dirname, '..'));
    const varUsageRegex = /var\(\s*(--[a-zA-Z0-9_-]+)/g;
    const missingUsages: { file: string; variable: string }[] = [];

    srcFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      let varMatch: RegExpExecArray | null;
      while ((varMatch = varUsageRegex.exec(content)) !== null) {
        const varName = varMatch[1];
        if (!declaredVars.has(varName)) {
          missingUsages.push({ file: path.relative(path.resolve(__dirname, '../..'), file), variable: varName });
        }
      }
    });

    expect(missingUsages).toEqual([]);
  });

  describe('Shared Component Computed Style & Token Adherence', () => {
    it('renders Button with token-backed radius and variants', () => {
      const { container } = render(<Button variant="primary" size="md">Test Action</Button>);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.style.borderRadius).toBe('var(--radius-sm)');
      expect(button?.style.backgroundColor).toBe('var(--rs-blue)');
      expect(button?.style.color).toBe('var(--rs-blue-ink)');
    });

    it('renders StatusBadge with semantic background tints and pill radius', () => {
      const { container, rerender } = render(<StatusBadge status="success" label="Passed ATS" dot />);
      let badge = container.querySelector('span');
      expect(badge?.style.backgroundColor).toBe('var(--rs-green-subtle)');
      expect(badge?.style.color).toBe('var(--rs-green)');
      expect(badge?.style.borderRadius).toBe('var(--radius-pill)');
      expect(badge?.style.fontFamily).toBe('var(--font-sans)');

      rerender(<StatusBadge status="warning" label="Review Gap" />);
      badge = container.querySelector('span');
      expect(badge?.style.backgroundColor).toBe('var(--rs-amber-subtle)');
      expect(badge?.style.color).toBe('var(--rs-amber)');

      rerender(<StatusBadge status="danger" label="Blocked" />);
      badge = container.querySelector('span');
      expect(badge?.style.backgroundColor).toBe('var(--rs-red-subtle)');
      expect(badge?.style.color).toBe('var(--rs-red)');

      rerender(<StatusBadge status="info" label="Verified" />);
      badge = container.querySelector('span');
      expect(badge?.style.backgroundColor).toBe('var(--rs-blue-subtle)');
      expect(badge?.style.color).toBe('var(--rs-blue)');
    });

    it('renders ScoreRing with tabular-nums and mono font', () => {
      const { container } = render(<ScoreRing score={85} />);
      const scoreNumber = container.querySelector('span');
      expect(scoreNumber?.style.fontFamily).toBe('var(--font-mono)');
      expect(scoreNumber?.style.fontVariantNumeric).toBe('tabular-nums');
      expect(scoreNumber?.textContent).toBe('85');
    });

    it('renders Navbar with geometric duotone brand mark and no backdrop blur', () => {
      const { container } = render(
        <ThemeProvider>
          <RouterProvider>
            <AuthProvider>
              <Navbar />
            </AuthProvider>
          </RouterProvider>
        </ThemeProvider>
      );
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header?.style.backdropFilter).toBeFalsy();
      expect(header?.style.backgroundColor).toBe('var(--rs-bg)');

      // Brand mark R
      const brandLogo = screen.getByLabelText('RoleSharp Home');
      expect(brandLogo).toBeInTheDocument();
      const rBox = brandLogo.querySelector('span');
      expect(rBox?.style.backgroundColor).toBe('var(--rs-surface-2)');
      expect(rBox?.style.color).toBe('var(--rs-ink)');
      expect(rBox?.style.fontFamily).toBe('var(--font-serif)');
    });

    it('renders AppShell with clean surface, no backdrop blur, and eliminated static Evidence Engine Active badge', () => {
      const { container } = render(
        <ThemeProvider>
          <RouterProvider>
            <AuthProvider>
              <AppShell title="Integrity Test">
                <div>Content</div>
              </AppShell>
            </AuthProvider>
          </RouterProvider>
        </ThemeProvider>
      );

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header?.style.backdropFilter).toBeFalsy();
      expect(header?.style.backgroundColor).toBe('var(--rs-bg)');

      // Unconditional static badge must be eliminated
      expect(screen.queryByText('Evidence Engine Active')).not.toBeInTheDocument();
    });
  });
});
