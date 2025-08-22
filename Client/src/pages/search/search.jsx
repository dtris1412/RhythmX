import React, { useState } from "react";
import { usePlayer } from "../../contexts/playerContext";
import "./search.css";

const Search = () => {
  const { playSong, toggleLike, likedSongs } = usePlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchResults, setSearchResults] = useState([]);

  const mockResults = [
    {
      type: "song",
      id: "song1",
      title: "Midnight Dreams",
      artist: "Artist Name",
      duration: "3:45",
      image:
        "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
    {
      type: "song",
      id: "song2",
      title: "Electric Pulse",
      artist: "Electronic Artist",
      duration: "4:12",
      image:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
    {
      type: "artist",
      id: "artist1",
      name: "Electronic Artist",
      listeners: "1.2M",
      image:
        "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=60",
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredResults = mockResults.filter((item) => {
      const searchTerm = query.toLowerCase();
      return (
        (item.title && item.title.toLowerCase().includes(searchTerm)) ||
        (item.artist && item.artist.toLowerCase().includes(searchTerm)) ||
        (item.name && item.name.toLowerCase().includes(searchTerm))
      );
    });

    setSearchResults(filteredResults);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Filter results based on category
    if (category === "all") {
      handleSearch(searchQuery);
    } else {
      const filtered = searchResults.filter(
        (item) =>
          item.type === category ||
          (category === "songs" && item.type === "song")
      );
      setSearchResults(filtered);
    }
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
    <div className="search-page">
      <header className="page-header">
        <div className="search-container">
          <div className="search-box glass-card">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="search-results">
        <div className="search-categories">
          {[
            { key: "all", label: "Tất cả" },
            { key: "songs", label: "Bài hát" },
            { key: "artists", label: "Nghệ sĩ" },
            { key: "albums", label: "Album" },
          ].map((category) => (
            <button
              key={category.key}
              className={`category-btn ${
                activeCategory === category.key ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="search-results-container">
          {searchResults.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <h3>
                {searchQuery ? "Không tìm thấy kết quả" : "Bắt đầu tìm kiếm"}
              </h3>
              <p>
                {searchQuery
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Nhập từ khóa để tìm kiếm âm nhạc yêu thích"}
              </p>
            </div>
          ) : (
            <div className="results-list">
              {searchResults.map((item) =>
                item.type === "song" ? (
                  <div
                    key={item.id}
                    className="song-item glass-card"
                    onClick={() => handlePlaySong(item)}
                  >
                    <div className="song-info">
                      <img src={item.image} alt={item.title} />
                      <div className="song-details">
                        <h4>{item.title}</h4>
                        <p>{item.artist}</p>
                      </div>
                    </div>
                    <div className="song-actions">
                      <span className="duration">{item.duration}</span>
                      <button
                        className={`action-btn ${
                          likedSongs.has(item.id) ? "liked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                      >
                        <i
                          className={`${
                            likedSongs.has(item.id) ? "fas" : "far"
                          } fa-heart`}
                        ></i>
                      </button>
                      <button className="action-btn">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={item.id} className="artist-card glass-card">
                    <div className="artist-image">
                      <img src={item.image} alt={item.name} />
                      <div className="artist-overlay">
                        <button className="play-btn">
                          <i className="fas fa-play"></i>
                        </button>
                      </div>
                    </div>
                    <div className="artist-info">
                      <h4>{item.name}</h4>
                      <p>{item.listeners} người nghe hàng tháng</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
