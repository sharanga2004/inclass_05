import { useState } from 'react'
import { 
  User, Mail, Star, Sun, Moon, Shield, 
  Edit3, CheckCircle, Code, Terminal, Laptop, X, RotateCcw 
} from 'lucide-react'
import './App.css'

const avatarIcons = [
  { id: 'code', icon: Code },
  { id: 'terminal', icon: Terminal },
  { id: 'laptop', icon: Laptop },
  { id: 'user', icon: User },
]

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [name, setName] = useState('Shamal')
  const [email, setEmail] = useState('sharana@nsbm.com')
  const [points, setPoints] = useState(0)
  const [hasClaimedPoint, setHasClaimedPoint] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState('code')
  const [isEditOpen, setIsEditOpen] = useState(false)

  const [tempName, setTempName] = useState(name)
  const [tempEmail, setTempEmail] = useState(email)
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar)

  const handleClaimPoint = () => {
    if (!hasClaimedPoint) {
      setPoints(1)
      setHasClaimedPoint(true)
    }
  }

  const handleResetPoint = () => {
    if (hasClaimedPoint) {
      setPoints(0)
      setHasClaimedPoint(false)
    }
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setName(tempName)
    setEmail(tempEmail)
    setSelectedAvatar(tempAvatar)
    setIsEditOpen(false)
  }

  const ActiveAvatarIcon = avatarIcons.find((a) => a.id === selectedAvatar)?.icon || Code

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="main-wrapper">
        <header className="app-header">
          <h2>Undergraduate Profile</h2>
          <button className="edit-btn" onClick={() => setIsEditOpen(true)}>
            <Edit3 size={20} />
          </button>
        </header>

        {/* 1. Header Profile Card */}
        <div className="glass-card">
          <div className="avatar-wrapper">
            <div className="avatar-circle">
              <div className="avatar-icon-bg">
                <ActiveAvatarIcon size={40} />
              </div>
            </div>
            <CheckCircle className="badge-icon" size={22} />
          </div>
          <h1 className="profile-name">{name}</h1>
          <p className="profile-email">{email}</p>
          <span className="profile-tag">Software Engineering Undergraduate</span>
        </div>

        {/* 2. Student Details */}
        <div className="glass-card">
          <h3 className="section-title">STUDENT DETAILS</h3>
          <div className="tile-container">
            <User className="tile-icon" size={20} />
            <span className="tile-label">Full Name</span>
            <span className="tile-value">{name}</span>
          </div>
          <div className="divider"></div>
          <div className="tile-container">
            <Mail className="tile-icon" size={20} />
            <span className="tile-label">Student Email</span>
            <span className="tile-value">{email}</span>
          </div>
        </div>

        {/* 3. Rewards & Points */}
        <div className="glass-card">
          <h3 className="section-title">REWARDS & POINTS</h3>
          <div 
            className="points-row" 
            onClick={handleClaimPoint}
          >
            <Star size={24} className={hasClaimedPoint ? 'star-filled' : 'star-outline'} />
            <span className="points-count">{points} Point</span>
            {!hasClaimedPoint && <span className="claim-badge">Tap to Pick</span>}
          </div>

          {hasClaimedPoint && (
            <button className="reset-btn" onClick={handleResetPoint}>
              <RotateCcw size={14} /> Remove / Reset Point
            </button>
          )}
        </div>

        {/* 4. Preferences */}
        <div className="glass-card">
          <h3 className="section-title">PREFERENCES</h3>
          <div className="setting-row">
            <div className="setting-label">
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span>Dark Theme</span>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={(e) => setIsDarkMode(e.target.checked)} 
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="divider"></div>
          <div className="setting-row">
            <div className="setting-label">
              <Shield size={20} />
              <span>Privacy & Security</span>
            </div>
            <span style={{ opacity: 0.5 }}>›</span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <div className="modal-header">
              <h3>Edit Student Profile</h3>
              <button className="close-btn" onClick={() => setIsEditOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} style={{ width: '100%' }}>
              <p className="modal-subtext">Select Profile Icon</p>
              <div className="avatar-options">
                {avatarIcons.map(({ id, icon: IconComp }) => (
                  <button
                    key={id}
                    type="button"
                    className={`avatar-opt ${tempAvatar === id ? 'selected' : ''}`}
                    onClick={() => setTempAvatar(id)}
                  >
                    <IconComp size={22} />
                  </button>
                ))}
              </div>

              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group">
                <label>Student Email</label>
                <input 
                  type="email" 
                  value={tempEmail} 
                  onChange={(e) => setTempEmail(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="submit-btn">Save Profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App