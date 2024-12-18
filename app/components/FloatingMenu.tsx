import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '../utils/menuItems';
import { lexendFont } from '../utils/fonts';

interface FloatingMenuProps {
  items: MenuItem[];
  activeIndex: number | null;
  onHover: (index: number | null) => void;
}

export default function FloatingMenu({
  items,
  activeIndex,
  onHover
}: FloatingMenuProps) {
  const theme = useTheme();
  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeChildren = activeItem?.children || [];

  if (!activeItem) return null;

  return (
    <Box
      onMouseLeave={() => onHover(null)}
      sx={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          paddingTop: '12px', // Espacio entre el header y el menú
        }}
      >
        {/* Safe hover area */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20px',
            left: 0,
            right: 0,
            height: '20px',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '12px',
            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -4px rgba(0, 0, 0, 0.06)',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(activeChildren.length, 3)}, 280px)`,
            gap: '24px',
            opacity: 1,
            transition: 'all 0.15s ease',
          }}
        >
          {activeChildren.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '12px',
                  borderRadius: '8px',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(140, 84, 255, 0.04)'
                      : 'rgba(140, 84, 255, 0.08)',
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(140, 84, 255, 0.08)'
                      : 'rgba(140, 84, 255, 0.16)',
                    flexShrink: 0
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      color: theme.palette.mode === 'light' ? '#1A1A1A' : '#FFFFFF',
                      fontFamily: lexendFont.style.fontFamily,
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      marginBottom: '4px'
                    }}
                  >
                    {item.title}
                  </Box>
                  {item.description && (
                    <Box
                      sx={{
                        color: theme.palette.mode === 'light'
                          ? 'rgba(0, 0, 0, 0.6)'
                          : 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}
                    >
                      {item.description}
                    </Box>
                  )}
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}