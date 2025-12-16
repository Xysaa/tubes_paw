import React from 'react';

const ClassCard = ({ cls }) => {
  return (
    <div className="class-card">
      {/* Card Header (Schedule) */}
      <div className="class-card-header">
        <div className="class-card-schedule">
          {/* Icon Clock */}
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{cls.schedule}</span>
        </div>
        <div className="class-card-status" title="Live / Available"></div>
      </div>

      {/* Card Body */}
      <div className="class-card-body">
        <h3 className="class-card-title">
          {cls.name}
        </h3>
        <p className="class-card-instructor">
          Instructor: <span>{cls.instructor}</span>
        </p>
        <p className="class-card-description">
          {cls.description || "Deskripsi kelas belum tersedia. Hubungi admin untuk detail lebih lanjut."}
        </p>
      </div>

      {/* Card Footer (Button) */}
      <div className="class-card-footer">
        <button className="class-card-button">
          BOOKING SLOT
          {/* Icon Arrow */}
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClassCard;