import { useState, useEffect } from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [image, setImage] = useState("");

  const [favoriteGenre, setFavoriteGenre] = useState(
    user?.favoriteGenre || ""
  );

  const [favoritePlatform, setFavoritePlatform] = useState(
    user?.favoritePlatform || ""
  );

  useEffect(() => {
    const savedImage =
      localStorage.getItem("profileImage");

    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setImage(base64);

      localStorage.setItem(
        "profileImage",
        base64
      );
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      favoriteGenre,
      favoritePlatform,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile updated!");
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-header">
          <img
            src={
              image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
          />

          <h1>{user.username}</h1>
        </div>

        <label className="upload-btn">
          Change Profile Picture

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <div className="profile-info">

          <div>
            <strong>Member Since</strong>
            <p>2026</p>
          </div>

          <div className="profile-field">
            <label>Favorite Genre</label>

            <select
              value={favoriteGenre}
              onChange={(e) =>
                setFavoriteGenre(e.target.value)
              }
            >
              <option value="">
                Select Genre
              </option>

              <option value="Action">
                Action
              </option>

              <option value="RPG">
                RPG
              </option>

              <option value="Shooter">
                Shooter
              </option>

              <option value="Adventure">
                Adventure
              </option>

              <option value="Puzzle">
                Puzzle
              </option>

              <option value="Strategy">
                Strategy
              </option>

              <option value="Racing">
                Racing
              </option>

              <option value="Simulation">
                Simulation
              </option>
            </select>
          </div>

          <div className="profile-field">
            <label>Favorite Platform</label>

            <select
              value={favoritePlatform}
              onChange={(e) =>
                setFavoritePlatform(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Platform
              </option>

              <option value="PC">
                PC
              </option>

              <option value="PlayStation">
                PlayStation
              </option>

              <option value="Xbox">
                Xbox
              </option>

              <option value="Nintendo Switch">
                Nintendo Switch
              </option>
            </select>
          </div>

        </div>

        

        <button
          className="save-btn"
          onClick={saveProfile}
        >
          Save Profile
        </button>

        <button
          className="save-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default ProfilePage;