// client/src/testing/Feed.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import Feed from '../pages/Feed';
import * as AuthContext from '../context/AuthContext';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // wrap in router

// Mock API
vi.mock('../utils/api', () => {
  return {
    default: {
      get: vi.fn(),
      delete: vi.fn(),
    }
  };
});
import api from '../utils/api';

// Mock PostCard to isolate Feed testing
vi.mock('../components/PostCard', () => ({
  default: ({ post }) => <div data-testid="post-card">{post.title}</div>
}));

describe('Feed Page', () => {
  beforeEach(() => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { id: '123' } });
  });

  test('renders header and loading state', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    // Check header and loading state
    expect(screen.getByText(/feed/i)).toBeInTheDocument();
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
    });
  });

  test('renders posts from API', async () => {
    const mockPosts = [{ _id: '1', title: 'Test Post', userId: '123' }];
    api.get.mockResolvedValueOnce({ data: mockPosts });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    // Wait for mocked PostCard to render
    await waitFor(() => {
      expect(screen.getByText(/test post/i)).toBeInTheDocument();
    });
  });

  test('renders error message if API fails', async () => {
    api.get.mockRejectedValueOnce({ response: { data: { message: 'Failed' } } });

    render(
      <MemoryRouter>
        <Feed />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading posts/i)).toBeInTheDocument();
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });
  });
});
