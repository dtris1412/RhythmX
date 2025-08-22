import React, { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState({
    title: "Midnight Dreams",
    artist: "Artist Name",
    image:
      "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=120",
    duration: 225, // 3:45 in seconds
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [queue, setQueue] = useState([]);
  const [likedSongs, setLikedSongs] = useState(new Set());

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            handleTrackEnd();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playPause = (playing) => {
    setIsPlaying(playing);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    setCurrentTime(0);
    // Logic for next track would go here
  };

  const previousTrack = () => {
    setCurrentTime(0);
    // Logic for previous track would go here
  };

  const seekTo = (time) => {
    setCurrentTime(time);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const toggleLike = (songId) => {
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  const handleTrackEnd = () => {
    switch (repeatMode) {
      case 0: // No repeat
        nextTrack();
        break;
      case 1: // Repeat all
        nextTrack();
        break;
      case 2: // Repeat one
        setCurrentTime(0);
        break;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const value = {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    isShuffle,
    repeatMode,
    queue,
    likedSongs,
    togglePlayPause,
    playPause,
    playSong,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    formatTime,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
