import React from "react";
import { usePlayer } from "../../contexts/playerContext";
import "./rightsidebar.css";

const RightSidebar = () => {
  const { currentSong } = usePlayer();

  const queue = [
    {
      id: 1,
      title: "Electric Pulse",
      artist: "Electronic Artist",
      image:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=40",
    },
    {
      id: 2,
      title: "Jazz Mood",
      artist: "Jazz Artist",
      image:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=40",
    },
  ];

  return (
    <aside className="right-sidebar">
      <div className="now-playing glass-card">
        <h3>Đang phát</h3>
        <div className="current-song">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="current-song-image"
          />
          <div className="current-song-info">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      </div>

      <div className="queue glass-card">
        <h3>Hàng đợi</h3>
        <div className="queue-list">
          {queue.map((song) => (
            <div key={song.id} className="queue-item">
              <img src={song.image} alt={song.title} />
              <div className="queue-song-info">
                <h5>{song.title}</h5>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
