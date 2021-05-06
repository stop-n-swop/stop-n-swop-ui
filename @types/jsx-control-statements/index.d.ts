import * as React from 'react';

declare global {
  const If: React.ComponentType<{
    condition: any;
    children: React.ReactNode;
  }>;
  const For: React.ComponentType<{
    each: string;
    index?: string;
    of: any[];
    children: React.ReactNode;
  }>;
  const Choose: React.ComponentType<{
    children: React.ReactNode;
  }>;
  const When: React.ComponentType<{
    condition: any;
    children: React.ReactNode;
  }>;
  const Otherwise: React.ComponentType<{
    children: React.ReactNode;
  }>;
}
