import React from "react";
import { usePlayer } from "../../contexts/playerContext";
import "./home.css";

const Home = () => {
  const { playSong, toggleLike, likedSongs } = usePlayer();

  const featuredAlbums = [
    {
      id: 1,
      title: "Chill Vibes Collection",
      description: "Những giai điệu thư giãn",
      image:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 2,
      title: "Electronic Dreams",
      description: "Nhạc điện tử hiện đại",
      image:
        "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 3,
      title: "Jazz Classics",
      description: "Những tuyệt phẩm Jazz",
      image:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const recentSongs = [
    {
      id: "song1",
      title: "Midnight Dreams",
      artist: "Artist Name",
      duration: "3:45",
      image:
        "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
    {
      id: "song2",
      title: "Electric Pulse",
      artist: "Electronic Artist",
      duration: "4:12",
      image:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
  ];

  const handlePlayFeatured = (album) => {
    const song = {
      title: album.title,
      artist: album.description,
      image: album.image,
      duration: 225,
    };
    playSong(song);
  };

  const handlePlaySong = (song) => {
    playSong({
      ...song,
      duration:
        parseInt(song.duration.split(":")[0]) * 60 +
        parseInt(song.duration.split(":")[1]),
    });
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <h2>Chào mừng trở lại</h2>
        <p>Khám phá âm nhạc yêu thích của bạn</p>
      </header>

      <section className="featured-section">
        <h3>Nổi bật hôm nay</h3>
        <div className="featured-grid">
          {featuredAlbums.map((album) => (
            <div
              key={album.id}
              className="featured-card glass-card"
              onClick={() => handlePlayFeatured(album)}
            >
              <div className="card-image">
                <img src={album.image} alt={album.title} />
                <div className="play-overlay">
                  <button className="play-btn">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="card-content">
                <h4>{album.title}</h4>
                <p>{album.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-section">
        <h3>Gần đây</h3>
        <div className="recent-list">
          {recentSongs.map((song) => (
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
                  className={`action-btn ${
                    likedSongs.has(song.id) ? "liked" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                >
                  <i
                    className={`${
                      likedSongs.has(song.id) ? "fas" : "far"
                    } fa-heart`}
                  ></i>
                </button>
                <button className="action-btn">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
