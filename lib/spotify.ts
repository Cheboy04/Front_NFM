const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3500 }, // el token dura 3600s, renovamos antes
  });

  const data = await res.json();
  return data.access_token;
}

export async function getShowEpisodes(limit = 6) {
  const token = await getAccessToken();
  const showId = process.env.SPOTIFY_SHOW_ID;

  const res = await fetch(
    `https://api.spotify.com/v1/shows/${showId}/episodes?limit=${limit}&market=ES`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();
  return data.items as SpotifyEpisode[];
}

export async function getShow() {
  const token = await getAccessToken();
  const showId = process.env.SPOTIFY_SHOW_ID;

  const res = await fetch(
    `https://api.spotify.com/v1/shows/${showId}?market=ES`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    }
  );

  return res.json() as Promise<SpotifyShow>;
}

export function extractPlaylistId(description: string): string | null {
  const match = description.match(/spotify\.com\/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export async function getMostRecentPlaylists() {
  const token = await getAccessToken();
  const latestEpisodes = await getShowEpisodes(10);

  const playlistId = extractPlaylistId(latestEpisodes[0].description)

  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?fields=id,name,description,images,tracks.total,external_urls`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );

  return res.json() as Promise<SpotifyPlaylist>;
}

// ── Tipos
export interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  duration_ms: number;
  release_date: string;
  external_urls: { spotify: string };
  images: { url: string; width: number; height: number }[];
  html_description: string;
}

export interface SpotifyShow {
  id: string;
  name: string;
  description: string;
  total_episodes: number;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export interface SpotifyPlaylist{
    id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
  external_urls: { spotify: string };
  owner: { display_name: string };
}