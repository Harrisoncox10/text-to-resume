import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './App.css';

function App() {
  const [resume, setResume] = useState({
    name: '',
    title: '',
    address: '',
    phone: '',
    email: '',
    bio: '',
    experience: [{ company: '', role: '', duration: '', description: '' }],
    education: [{ school: '', degree: '', year: '' }],
    skills: '',
  });

  const [isPro, setIsPro] = useState(false);
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const handleChange = (field, value, index = null, section = null) => {
    if (section) {
      const updated = [...resume[section]];
      updated[index][field] = value;
      setResume({ ...resume, [section]: updated });
    } else {
      setResume({ ...resume, [field]: value });
    }
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { company: '', role: '', duration: '', description: '' }],
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { school: '', degree: '', year: '' }],
    });
  };

  const removeItem = (section, index) => {
    const updated = resume[section].filter((_, i) => i !== index);
    setResume({ ...resume, [section]: updated });
  };

  return (
    <div className="container">
      <h1>Simple Resume Builder</h1>

      <label>
        <input
          type="checkbox"
          checked={isPro}
          onChange={() => setIsPro(!isPro)}
        />
        Pro Version (remove watermark)
      </label>

      <button onClick={handlePrint}>Download PDF</button>

      <div className="builder" style={{ display: 'flex', gap: '2rem' }}>
        {/* Left column: form */}
        <form className="form" style={{ flex: 1 }}>
          <input placeholder="Full Name" value={resume.name}
            onChange={(e) => handleChange('name', e.target.value)} />
          <input placeholder="Job Title" value={resume.title}
            onChange={(e) => handleChange('title', e.target.value)} />
          <input placeholder="Address" value={resume.address}
            onChange={(e) => handleChange('address', e.target.value)} />
          <input placeholder="Phone" value={resume.phone}
            onChange={(e) => handleChange('phone', e.target.value)} />
          <input placeholder="Email" value={resume.email}
            onChange={(e) => handleChange('email', e.target.value)} />
          <textarea placeholder="Professional Summary"
            value={resume.bio}
            onChange={(e) => handleChange('bio', e.target.value)} />

          <h3>Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={i}>
              <input placeholder="Company" value={exp.company}
                onChange={(e) => handleChange('company', e.target.value, i, 'experience')} />
              <input placeholder="Role" value={exp.role}
                onChange={(e) => handleChange('role', e.target.value, i, 'experience')} />
              <input placeholder="Duration" value={exp.duration}
                onChange={(e) => handleChange('duration', e.target.value, i, 'experience')} />
              <textarea placeholder="Description" value={exp.description}
                onChange={(e) => handleChange('description', e.target.value, i, 'experience')} />
              <button type="button" onClick={() => removeItem('experience', i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addExperience}>+ Add Experience</button>

          <h3>Education</h3>
          {resume.education.map((edu, i) => (
            <div key={i}>
              <input placeholder="School" value={edu.school}
                onChange={(e) => handleChange('school', e.target.value, i, 'education')} />
              <input placeholder="Degree" value={edu.degree}
                onChange={(e) => handleChange('degree', e.target.value, i, 'education')} />
              <input placeholder="Year" value={edu.year}
                onChange={(e) => handleChange('year', e.target.value, i, 'education')} />
              <button type="button" onClick={() => removeItem('education', i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addEducation}>+ Add Education</button>

          <textarea placeholder="Skills (comma separated)"
            value={resume.skills}
            onChange={(e) => handleChange('skills', e.target.value)} />
        </form>

        {/* Right column: always-rendered preview */}
        <div
          ref={previewRef}
          className={`preview ${isPro ? 'pro' : ''}`}
        >
          <h1>{resume.name || 'Your Name'}</h1>
          <h3>{resume.title || 'Your Title'}</h3>
          <p className="contact">{`${resume.address} · ${resume.phone} · ${resume.email}`}</p>
          <hr />

          <section>
            <h2>Profile</h2>
            <p>{resume.bio || 'Professional summary goes here.'}</p>
          </section>

          <section>
            <h2>Experience</h2>
            {resume.experience.length === 0 ? (
              <p>No experience added yet.</p>
            ) : (
              resume.experience.map((exp, i) => (
                <div key={i}>
                  <strong>{exp.role || 'Role'}</strong> – {exp.company || 'Company'} ({exp.duration || 'Duration'})
                  <em>{exp.description || 'Description...'}</em>
                </div>
              ))
            )}
          </section>

          <section>
            <h2>Education</h2>
            {resume.education.length === 0 ? (
              <p>No education added yet.</p>
            ) : (
              resume.education.map((edu, i) => (
                <div key={i}>
                  {edu.degree || 'Degree'}, {edu.school || 'School'} ({edu.year || 'Year'})
                </div>
              ))
            )}
          </section>

          <section>
            <h2>Skills</h2>
            <p>{resume.skills || 'List your skills here.'}</p>
          </section>

          {!isPro && (
            <div className="watermark">
              Created with Simple Resume Builder · Upgrade to Pro to remove this
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
