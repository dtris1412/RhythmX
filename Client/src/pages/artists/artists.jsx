import React from "react";
import "./artists.css"; // Import the CSS file for styling
const Artists = () => {
  const artists = [
    {
      id: 1,
      name: "Electronic Artist",
      listeners: "1.2M",
      image:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 2,
      name: "Chill Artist",
      listeners: "800K",
      image:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 3,
      name: "Jazz Master",
      listeners: "650K",
      image:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 4,
      name: "Pop Star",
      listeners: "2.1M",
      image:
        "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ];

  const handlePlayArtist = (artist) => {
    console.log(`Playing songs from ${artist.name}`);
  };

  return (
    <div className="artists-page">
      <header className="page-header">
        <h2>Nghệ sĩ</h2>
        <p>Khám phá các nghệ sĩ yêu thích</p>
      </header>

      <div className="artists-grid">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="artist-card glass-card"
            onClick={() => handlePlayArtist(artist)}
          >
            <div className="artist-image">
              <img src={artist.image} alt={artist.name} />
              <div className="artist-overlay">
                <button className="play-btn">
                  <i className="fas fa-play"></i>
                </button>
              </div>
            </div>
            <div className="artist-info">
              <h4>{artist.name}</h4>
              <p>{artist.listeners} người nghe hàng tháng</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
