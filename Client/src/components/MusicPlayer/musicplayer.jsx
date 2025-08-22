import React from "react";
import { usePlayer } from "../../contexts/playerContext";
import "./musicplayer.css";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    isShuffle,
    repeatMode,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    formatTime,
    likedSongs,
  } = usePlayer();

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * currentSong.duration;
    seekTo(newTime);
  };

  const handleVolumeClick = (e) => {
    const volumeSlider = e.currentTarget;
    const rect = volumeSlider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(percentage);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "fas fa-volume-mute";
    if (volume < 0.5) return "fas fa-volume-down";
    return "fas fa-volume-up";
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 1:
        return "fas fa-redo";
      case 2:
        return "fas fa-redo-alt";
      default:
        return "fas fa-redo";
    }
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;
  const volumePercentage = volume * 100;

  return (
    <div className="music-player glass-card">
      <div className="player-song-info">
        <img src={currentSong.image} alt={currentSong.title} />
        <div className="player-song-details">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
        <button
          className={`like-btn ${likedSongs.has("current") ? "liked" : ""}`}
          onClick={() => toggleLike("current")}
        >
          <i
            className={`${likedSongs.has("current") ? "fas" : "far"} fa-heart`}
          ></i>
        </button>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button
            className={`control-btn ${isShuffle ? "active" : ""}`}
            onClick={toggleShuffle}
          >
            <i className="fas fa-random"></i>
          </button>
          <button className="control-btn" onClick={previousTrack}>
            <i className="fas fa-step-backward"></i>
          </button>
          <button
            className="control-btn play-pause-btn"
            onClick={togglePlayPause}
          >
            <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <button className="control-btn" onClick={nextTrack}>
            <i className="fas fa-step-forward"></i>
          </button>
          <button
            className={`control-btn ${repeatMode > 0 ? "active" : ""}`}
            onClick={toggleRepeat}
          >
            <i className={getRepeatIcon()}></i>
          </button>
        </div>

        <div className="progress-container">
          <span className="time-current">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <div
              className="progress-handle"
              style={{ left: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="time-total">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="player-extras">
        <button className="extra-btn">
          <i className="fas fa-list"></i>
        </button>
        <button className="extra-btn">
          <i className="fas fa-desktop"></i>
        </button>
        <div className="volume-control">
          <button className="volume-btn">
            <i className={getVolumeIcon()}></i>
          </button>
          <div className="volume-slider" onClick={handleVolumeClick}>
            <div
              className="volume-fill"
              style={{ width: `${volumePercentage}%` }}
            ></div>
            <div
              className="volume-handle"
              style={{ left: `${volumePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
