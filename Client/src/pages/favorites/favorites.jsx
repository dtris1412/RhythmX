import React from "react";
import { usePlayer } from "../../contexts/playerContext";
import "./favorites.css";

const Favorites = () => {
  const { playSong, toggleLike, likedSongs } = usePlayer();

  const favoriteSongs = [
    {
      id: "song1",
      title: "Midnight Dreams",
      artist: "Artist Name",
      duration: "3:45",
      image:
        "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
    {
      id: "song3",
      title: "Jazz Mood",
      artist: "Jazz Artist",
      duration: "5:20",
      image:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
  ];

  const handlePlaySong = (song) => {
    playSong({
      ...song,
      duration:
        parseInt(song.duration.split(":")[0]) * 60 +
        parseInt(song.duration.split(":")[1]),
    });
  };

  return (
    <div className="favorites-page">
      <header className="page-header">
        <h2>Yêu thích</h2>
        <p>Những bài hát bạn đã thích</p>
      </header>

      <div className="favorites-content">
        {favoriteSongs.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-heart"></i>
            <h3>Chưa có bài hát yêu thích</h3>
            <p>Hãy thêm những bài hát bạn yêu thích để nghe lại sau</p>
          </div>
        ) : (
          <div className="favorites-list">
            {favoriteSongs.map((song) => (
              <div
                key={song.id}
                className="song-item glass-card"
                onClick={() => handlePlaySong(song)}
              >
                <div className="song-info">
                  <img src={song.image} alt={song.title} />
                  <div className="song-details">
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                  </div>
                </div>
                <div className="song-actions">
                  <span className="duration">{song.duration}</span>
                  <button
                    className="action-btn liked"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song.id);
                    }}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
